import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {addToCart, fetchBook, fetchPublishHouse, fetchReviews} from "../http/bookAPI";
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from "../assets/bigStar.png";
import {keys} from "mobx";
import {fetchClient} from "../http/clientAPI";
import {jwtDecode} from "jwt-decode";

const BookPage = () => {
    const [book, setBook] = React.useState({})
    const [publishHouse, setPublishHouse] = React.useState({})
    const [review, setReview] = React.useState([])
    const {id} = useParams();
    const hiddenKeys = ["id","price","img"]
    const bookDescription = ['Название', 'Описание', 'Количество страниц', 'Жанр', 'Фамилия автора', 'Имя автора', 'Отчество автора', 'Издательство', 'Рейтинг']

    let info = []

    useEffect(() => {
        async function fetchInfo() {
            try {
                const bookData = await fetchBook(id);
                setBook(bookData);
                console.log('book', bookData);

                if (bookData.publish_house_id) {
                    const publishHouseData = await fetchPublishHouse(bookData.publish_house_id);
                    const reviews = await fetchReviews(id);
                    setPublishHouse(publishHouseData);
                    setReview(reviews);
                }
            } catch (error) {
                console.error('Ошибка загрузки:', error);
            }
        }
        fetchInfo();
    }, [id])

    for (let key in Object.keys(book)){
        key = Object.keys(book)[key]
        if(!hiddenKeys.includes(key)){
            if(key === 'publish_house_id'){
                info.push({'publish_house':publishHouse.pub_house_name})
            }
            else info.push({[key]:book[key]})}
    }

    console.log('info')
    console.log(info)

    const gatherCartPosInfo = async ()=> {
        let amount;
        while (true) {
            amount = prompt('Сколько книг берем?')
            if (isNaN(amount)) {
                alert('Не похоже, что вы и вправду хотите столько взять) Попробуйте еще раз!')
            }
            else break;
        }

        await addToCart(jwtDecode(localStorage.getItem('token')).id, book.id, +amount);
    }

    return (
        <Container>
            <Row className="d-flex flex-row">
                <Col md={4} className={'mt-3'}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL+"/"+book.img}/>
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column justify-content-center align-items-center">
                        <div className='d-flex flex-column align-items-center'>
                            <h2>{book.name}</h2>
                        </div>
                        <div
                            className = {'d-flex justify-content-center align-items-center'}
                            style = {{background: `url(${bigStar}) no-repeat center center`, width:240, height:240, backgroundRepeat:'cover', fontSize:64}}>
                            {book.rating?book.rating:0}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="mt-3 f-flex flex-column justify-content-around align-items-center"
                        style={{width:300, height:300, fontSize:32, borderWidth:'5px solid lightgrey'}}>
                        <h3>От {book.price} рублей</h3>
                        <Button variant={'outline-dark'} onClick = {()=>gatherCartPosInfo()}>Добавить в корзину</Button>
                        </Card>
                </Col>
            </Row>
            <Row className={"d-flex flex-column m-3"}>
                <h1>Характеристики</h1>
                {info.map((description, index)=>
                    <Row key = {index} style={{background:index%2===0?'lightgrey':'transparent'}}>
                        {bookDescription[index]}: {description[Object.keys(description)[0]]?description[Object.keys(description)[0]]:0}
                    </Row>
                )}
            </Row>
            <Col>
                <Card className={'d-flex flex-row justify-content-center'} style={{fontSize:32, borderWidth:3, borderRadius:20}} border={'primary'}>Отзывы наших прекрасных клиентов!!</Card>
                {review.length === 0 &&
                    <h1 style={{fontSize:32, fontFamily:'monospace'}} className={'mt-5 d-flex justify-content-center'}>Хмм, пока отзывов нет. Будьте первыми, кто его оставит!</h1>
                }
                {review.map((description, index)=>
                    <Card className={'mt-5'}>
                        <Card.Header>Отзыв</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p>
                                    {description.review}
                                </p>
                                <p>
                                    Оценка: {description.rating} звезд
                                </p>
                                <footer className="blockquote-footer">
                                    Наш прекрасный чтец <cite title="Source Title">{description.surname} {description.name[0]}.</cite>
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                )}
            </Col>
        </Container>
    )

};

export default BookPage;