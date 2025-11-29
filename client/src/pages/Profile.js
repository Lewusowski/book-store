import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {fetchClient, login} from "../http/clientAPI";
import {jwtDecode} from "jwt-decode";
import {Col, Container, Row, Image, Button} from "react-bootstrap";
import {data} from "react-router-dom";
import CreateBook from "../components/modals/CreateBook";
import EditProfileInfo from "../components/modals/EditProfileInfo";

const Profile = () => {
    const {client} = useContext(Context)
    const hiddenKeys = ["id","password"]
    const bookDescription = ['Фамилия', 'Имя', 'Отчества', 'Номер телефона', 'Страна', 'Город', 'Улица', 'Строение', 'Квартира', 'Электорнная почта', 'Дата регистрации','Роль']
    const [editVisible, setEditVisible] = React.useState(false);

    const [info, setInfo] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const id = jwtDecode(token).id;

        fetchClient(id).then(data => {
            client.setClient(data);

            const clientData = data[0];
            const filtered = [];


            for (let key of Object.keys(clientData)) {
                if (!hiddenKeys.includes(key)) {
                    filtered.push({ [key]: clientData[key] });
                }
            }
            setInfo(filtered);
        });
    }, []);

    return (
        <Container>
            <Row className="align-items-center justify-content-center">
                <Col xs={6} md={4}>
                    <Image
                        className="mt-5"
                        width={300}
                        height={300}
                        src={process.env.REACT_APP_API_URL + "/reader.jpg"}
                        thumbnail/>
                </Col>
                <Col className="d-flex justify-content-center">
                    <h1>Мой профиль</h1>
                </Col>
                <Row className={"d-flex flex-column m-3"}>
                    <h1 className={'d-flex flex-row justify-content-center mt-2'}>Данные о мне</h1>
                    <br/>
                    {info.map((description, index)=>
                        <Row key = {index} style={{background:index%2===0?'lightgrey':'transparent'}}>
                            {bookDescription[index]}: {description[Object.keys(description)[0]]?description[Object.keys(description)[0]]:'Нет данных'}
                        </Row>
                    )}
                </Row>
            </Row>
            <Button className={'mt-1 m-3'} onClick={()=>setEditVisible(true)}>Редактировать</Button>
            <EditProfileInfo show = {editVisible} onHide={()=>setEditVisible(false)} clientData={client.getClient()[0]} />
        </Container>
    );
};

export default Profile;