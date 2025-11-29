import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";

import {Button, Dropdown, Form, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {editProfileInfo, fetchClient} from "../../http/clientAPI";
import {jwtDecode} from "jwt-decode";

const EditProfileInfo = observer(({show, onHide, clientData})=>{

    const [id, setId] = useState(0);
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('')
    const [father_name, setFatherName] = useState('')
    const [phone_number, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [building, setBuilding] = useState(0);
    const [apartment_number, setApartmentNumber] = useState(0);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    function setClient(client) {
        setId(clientData.id||0);
        setSurname(client.surname || '');
        setName(client.name || '');
        setFatherName(client.father_name || '');
        setPhoneNumber(client.phone_number || '');
        setCountry(client.country || '');
        setCity(client.city || '');
        setStreet(client.street || '');
        setBuilding(client.building || 0);
        setApartmentNumber(client.apartment_number || 0);
        setEmail(client.email || '');
        setRole(client.role || '');
    }

    useEffect(() => {
        if (clientData) {
            setClient(clientData);
        }
    }, [clientData]);

    const sendProfileInfo = () => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('surname', surname);
        formData.append('name', name);
        formData.append('father_name', father_name);
        formData.append('phone_number', phone_number);
        formData.append('country', country);
        formData.append('city', city);
        formData.append('street', street);
        formData.append('building', building);
        formData.append('apartment_number', apartment_number);
        formData.append('email', email);
        formData.append('role', role);

        const updatedClient = editProfileInfo(formData)

        updatedClient.then((updatedClient) => {
            setClient(updatedClient);
            onHide()
            alert('Измнения успешно записаны! Для просмотра актуальной информации обновите страницу!')
            document.location.reload();
        })

    }

    return(
        <Modal
            show={show}
            onHide={onHide}
            size={"lg"}
            centered>

            <ModalHeader closeButton>
                <Modal.Title>Изменить информацию о мне</Modal.Title>
            </ModalHeader>

            <ModalBody>
                <Form>
                    <p className={'mt-1'}>Фамилия</p>
                    <Form.Control
                        value={surname}
                        onChange={e=>setSurname(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите Вашу фамилию"} />
                </Form>
                <Form>
                    <p className={'mt-3'}>Имя</p>
                    <Form.Control
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите Ваше имя"} />
                </Form>
                <Form>
                    <p className={'mt-3'}>Отчество</p>
                    <Form.Control
                        value={father_name}
                        onChange={e=>setFatherName(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите Ваше отчество"} />
                </Form>
                <Form>
                    <p className={'mt-3'}>Номер телефона</p>
                    <Form.Control
                        value={phone_number}
                        onChange={e=>setPhoneNumber(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите Ваш номер телефона"} />
                </Form>
                <Form>
                    <p className={'mt-3'}>Страна</p>
                    <Form.Control
                        value={country}
                        onChange={e=>setCountry(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите страну проживания/доставки"} />
                </Form>
                <Form>
                    <p className={'mt-3'}>Город</p>
                    <Form.Control
                        value={city}
                        onChange={e=>setCity(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите город проживания/доставки"} />
                </Form>
                <Form>
                    <p className={'mt-3'}>Улица</p>
                    <Form.Control
                        value={street}
                        onChange={e=>setStreet(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите улицу проживания/доставки"} />
                </Form>
                <Form>
                    <p className={'mt-3'}>Строение</p>
                    <Form.Control
                        value={building}
                        onChange={e=>setBuilding(e.target.value)}
                        className="mt-3"
                        type={'number'}
                        placeholder={"Введите дом проживания/доставки"} />
                </Form>
                <Form>
                    <p className={'mt-3'}>Номер квартиры</p>
                    <Form.Control
                        value={apartment_number}
                        onChange={e=>setApartmentNumber(e.target.value)}
                        className="mt-3"
                        type={'number'}
                        placeholder={"Введите номер квартиры проживания/доставки"} />
                </Form>
                <Form>
                    <p className={'mt-3'}>Электронная почта</p>
                    <Form.Control
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите Вашу электронную почту"} />
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
                <Button variant={'outline-success'} onClick={sendProfileInfo}>Добавить</Button>
            </ModalFooter>
        </Modal>
    )

})

export default EditProfileInfo;