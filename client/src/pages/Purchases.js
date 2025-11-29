import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {fetchCart, fetchClient, fetchOrders} from "../http/clientAPI";
import {jwtDecode} from "jwt-decode";
import {observer} from "mobx-react-lite";
import {Button, Card, Col, Container} from "react-bootstrap";
import {BOOK_ROUTE} from "../utils/consts";
import ProvideFeedback from "../components/modals/ProvideFeedback";
import {createBook} from "../http/bookAPI";

const Purchases = observer(() => {

    const {client} = useContext(Context)
    const [orders, setOrders] = useState([])
    const navigate = useNavigate();
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(0);
    const [selectedOrderAmount, setSelectedOrderAmount] = useState(false);

    const orderColors = {
        'Оформлено':'blue',
        'Сформировано':'yellow',
        'Отправлено':'orange',
        'Получено':'green',
    }


    useEffect(() => {
        const clientId = jwtDecode(localStorage.getItem('token')).id
        fetchClient(clientId).then(data=>{
            client.setClient(data)
        })
        fetchOrders(clientId).then(data=>{
            setOrders(data)
        })
    },[]);

    function getFormattedDate(date) {
        const formattedDate = new Date(date)
        return formattedDate.getFullYear() + '-' + formattedDate.getMonth() + '-' + formattedDate.getDate() + ' ' + formattedDate.getHours() + ':' + formattedDate.getMinutes() + ':' + formattedDate.getSeconds()
    }

    return (
        <Container>
            <h1 className={'d-flex mt-5 justify-content-center'}>Мои заказы</h1>
            <h1 className={'d-flex mt-5 justify-content-center'}>Сводная таблица</h1>
            <table className="table table-striped mt-5">
                <thead>
                <tr>
                    <th scope="col">Позиция</th>
                    <th scope="col">Нзвание книги</th>
                    <th scope="col">Автор</th>
                    <th scope="col">Издательство</th>
                    <th scope="col">Количество</th>
                    <th scope="col">Сумма заказа</th>
                    <th scope="col">Дата оформления</th>
                    <th scope="col">Статус заказа</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) =>(
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{order.book_name}</td>
                        <td>{order.author_surname + ' ' + order.author_name[0] + '.' + order.author_fathername[0]+'.'}</td>
                        <td>{order.pub_house_name}</td>
                        <td>{order.amount}</td>
                        <td>{order.total_price}</td>
                        <td>{getFormattedDate(order.date)}</td>
                        <td style={{color:orderColors[order.status]}}>{order.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h1 className={'d-flex mt-5 justify-content-center'}>Мои товары</h1>
            <Container className="d-flex flex-row flex-wrap justify-content-around">
            {orders.map((order, index) =>(
                    <Card key={index} className={'mt-5 me-5'} style={{ width: '18rem' }}>
                        <Card.Img variant='top' src={process.env.REACT_APP_API_URL+'/'+order.img} />
                        <Card.Body>
                            <Card.Title>{order.book_name}</Card.Title>
                            <Card.Text>
                                {order.book_description}
                            </Card.Text>
                            <Col>
                                <Button variant="primary" onClick={()=>navigate(BOOK_ROUTE+'/'+order.book_id)}>Просмотреть</Button>
                                <Button variant="outline-success" className={'mt-3'} disabled={!(order.status==='Получено')} onClick={()=>{
                                    setSelectedOrderId(order.order_id)
                                    setSelectedOrderAmount(order.amount)
                                    setShowFeedbackModal(true)}}>Оставить отзыв</Button>
                            </Col>
                        </Card.Body>

                    </Card>
            ))}
            </Container>
            <ProvideFeedback show = {showFeedbackModal} onHide = {()=>setShowFeedbackModal(false)} order_id={selectedOrderId} amount={selectedOrderAmount} />
        </Container>
    );
});

export default Purchases;

