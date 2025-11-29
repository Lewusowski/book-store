import {useState} from "react";
import {createBook, createGenre, sendFeedback} from "../../http/bookAPI";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {login} from "../../http/clientAPI";

const ProvideFeedback = ({show, onHide, order_id, amount}) => {
    const [review, setReview] = useState(null);
    const [rating, setRating] = useState(0);
    const ratingRange = [1, 2, 3, 4, 5]

    const prepareFeedback = () => {
        const formData = new FormData();
        console.log(order_id)
        formData.append('order_id', order_id);
        formData.append('amount', amount);
        formData.append("review", review);
        formData.append("rating", rating);
        sendFeedback(formData).then((res) => {
            onHide();
            alert('Ваш отзыв успешно сохранен! Спасибо, Ваше мнение очень важно для нас!')
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Оставляем отзыв</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control value={review} onChange={e=>setReview(e.target.value)} placeholder={'Опишите Ваши впечатления о книге...'}/>
                </Form>
                <Form>
                    <Dropdown className={'mt-3 mb-2'}>
                        <Dropdown.Toggle>{rating||'Какую оценку Вы могли бы посавить этой книге?'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {ratingRange.map((value, index) =>(
                                <Dropdown.Item
                                    onClick={()=>{
                                        setRating(value);
                                    }}
                                    key={index}
                                    value={value}>
                                    {value}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={()=>onHide()}>Закрыть</Button>
                <Button variant="outline-success" onClick={()=>prepareFeedback()}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProvideFeedback;