import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {BOOK_ROUTE} from "../../utils/consts";
import {
    Button,
    Card, Col,
    Dropdown,
    Form,
    FormLabel,
    Image,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Row
} from "react-bootstrap";

import {makeOrder, proceedOrder} from "../../http/clientAPI";

const ConfirmOrder = observer(({show, onHide, bookData, bookSumData, id})=>{

    const [book, setBook] = useState([]);
    const [bookSum, setBookSum] = useState(0);
    const [clientId, setClientId] = useState(0);
    const navigate = useNavigate();
    const date = new Date()
    const currentDate = date.getFullYear() + '-' +
        (date.getMonth() + 1) + '-' +
        (date.getDate()) + ' ' +
        (date.getHours()) + ':' +
        (date.getMinutes()) + ':' +
        (date.getSeconds());

    useEffect(() => {
        if (bookData && bookSumData&&id) {
            setBook(bookData||null);
            setBookSum(bookSumData||0);
            setClientId(id||0);
        }
    }, [bookData, bookSumData, id]);


    const makeOrder = ()=> {
        let currentBook;
        try {
            {
                book.map((res) => {
                        const formData = new FormData();
                        currentBook = res.book_name;
                        formData.append("client_id", id);
                        formData.append("book_id", res.id);
                        formData.append("amount", res.amount);
                        formData.set("price", res.price);
                        formData.append("publish_house_id", res.publish_house_id);
                        formData.append("date", currentDate);
                        proceedOrder(formData).then((res) => {});
                    }
                )
            }
        } catch (error) {
            alert('Боюсь, на складе не хватает книг, а именно книг: ' + currentBook);
        }
        onHide()
        alert('Заказ успешно оформлен! Скоро придет сообщение на почту, ожидайте) Хорошего дня!')

        window.location.reload()
    }


    return(
        <Modal
            show={show}
            onHide={onHide}
            size={"lg"}
            centered>

            <ModalHeader closeButton>
                <Modal.Title>Оформление заказа</Modal.Title>
            </ModalHeader>
            <ModalBody>
                {book.map((book) => (
                    <Row key={book.id}  className={'mt-3'}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={process.env.REACT_APP_API_URL+'/'+book.img} />
                        <Card.Body>
                            <Card.Title>{book.book_name}</Card.Title>
                            <Card.Text>
                                {book.book_description}
                            </Card.Text>
                            <Button variant="primary" onClick={()=>navigate(BOOK_ROUTE+'/'+book.id)}>Перейти!</Button>
                        </Card.Body>
                    </Card>
                        <Col>
                            <Card body>Цена: {book.price} рублей</Card>
                            <Card body className={'mt-3'}>Количество: {book.amount} штук</Card>
                        </Col>
                    </Row>
                ))}
            </ModalBody>
            <ModalFooter>
                <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
                <Button variant={'outline-success'} onClick={makeOrder}>Оформить заказ</Button>
            </ModalFooter>
        </Modal>
    )

})

export default ConfirmOrder;