import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container, Placeholder, Row, Table, Alert} from "react-bootstrap";
import {Context} from "../index";
import {fetchCart, fetchClient, login} from "../http/clientAPI";
import {deleteFromCart} from "../http/bookAPI";
import {click} from "@testing-library/user-event/dist/click";
import {jwtDecode} from "jwt-decode";
import {BASKET_ROUTE, BOOK_ROUTE, PROFILE_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useNavigate} from 'react-router-dom';
import ConfirmOrder from "../components/modals/ConfirmOrder";



const Basket = observer(() => {
    const {book} = useContext(Context)
    const {client} = useContext(Context)
    const [bookSum, setBookSum] = useState(0);
    const navigate = useNavigate();
    const [showWarn, setShowWarn] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfirmButton, setShowConfirmButton] = useState(true);
    const [update, setUpdate] = useState(true);
    let clientId;

    useEffect(() => {
        fetchCart(jwtDecode(localStorage.getItem('token')).id).then(data => {
            book.setBooks(data)
            setBookSum(data.reduce((sum, curVal)=>sum+curVal.price, 0))
        })
        fetchClient(jwtDecode(localStorage.getItem('token')).id).then(data=>{
            clientId = data.id
            client.setClient(data)
        })
    }, [update]);

    const removeFromCart = async (clientId, bookId) => {
        await deleteFromCart(clientId, bookId);
        setUpdate(!update);
        alert('Товар успешно удален из корзины!')
    }

    const checkOrderPermission = () => {
        const clientData = client.getClient()[0];
        if(clientData.country&&clientData.city&&clientData.street&&clientData.building&&clientData.apartment_number){
            setShowWarn(false);
        }else{
            setShowConfirmModal(true);
        }
    }


    return (
        <Container>
            <h1 className={'d-flex justify-content-center mt-5'}>Моя корзина</h1>
            {showWarn && (
                <Alert variant="danger" onClose={() => setShowWarn(false)} dismissible className={'mt-5'}>
                    <Alert.Heading>Ой! Видимо, у нас проблемка...</Alert.Heading>
                    <p>
                        Мы очень рады, что Вы так сильно хотите купить наши книги, но похоже, что Вы не полностью
                        заполнили свой профиль. Чтобы знать, куда доставлять Ваши книги - перейдите в раздел "Профиль"
                        и укажите куда привести Вам книги!
                    </p>
                    <Button variant="outline-primary" className={'mt-2'} onClick={()=>navigate(PROFILE_ROUTE)}>Перейти в профиль</Button>
                </Alert>
            )}
            <Container className={"mt-5 d-flex justify-content-between"}>
                <div className="d-flex flex-column gap-3">
                    {book.getBooks().length === 0 &&
                        <h1 style={{fontSize:32, fontFamily:'monospace'}}>Ваша корзина пуста! Поскорее добавьте в неё что-нибудь! </h1>
                    }
                    {book.getBooks().map(book=>(
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={process.env.REACT_APP_API_URL+'/'+book.img} />
                            <Card.Body>
                                <Card.Title>{book.book_name}</Card.Title>
                                <Card.Text>
                                    {book.book_description}
                                </Card.Text>
                                <Card.Text>
                                    Цена за одну книгу: {book.price} рублей
                                </Card.Text>
                                <Card.Text>
                                    Количество книг в корзине: {book.amount} шт.
                                </Card.Text>
                                <Button className={"me-3"} variant="outline-primary" onClick={()=>navigate(BOOK_ROUTE+'/'+book.id)}>Просмотреть!</Button>
                                <Button variant="outline-danger" onClick={()=>{removeFromCart(jwtDecode(localStorage.getItem('token')).id, book.id)}}>Убрать</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <Container className={'d-flex flex-column align-items-end '}>
                    <Card style={{width: 300, height: 300}}>
                        <ol className={'mt-3'}>
                            {book.getBooks().map(book=>(
                                <li key = {book.book_id} className={'mt-2'}>Книга "{book.book_name}" ({book.amount} шт.) - {book.price*book.amount} рублей</li>//сделай список
                            ))}
                        </ol>
                        <br></br>
                        <div style={{fontSize:22}} className={'d-flex justify-content-center'}>Итог: {bookSum} рублей</div>
                    </Card>
                    {book.getBooks().length!==0&&<Button variant="outline-success" className={'mt-2'} onClick={()=>{checkOrderPermission()}}>Перейти к оформлению заказа!</Button>}
                    <ConfirmOrder show={showConfirmModal} onHide={()=>setShowConfirmModal(false)} bookData={book.getBooks()} bookSumData={bookSum} id = {jwtDecode(localStorage.getItem('token')).id}></ConfirmOrder>
                </Container>
            </Container>
        </Container>

    );
});

export default Basket;