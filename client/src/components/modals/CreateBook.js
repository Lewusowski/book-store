import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "../../index";
import {
    createBook,
    fetchGenres,
    fetchPublishHouse,
    fetchPublishHouses,
    fetchVacantIndex,
    fetchWarehouses
} from "../../http/bookAPI";
import {Button, Dropdown, Form, FormLabel, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";

const CreateBook = observer(({show, onHide})=>{
    const {book} = useContext(Context)
    const [name, setName] = useState('')
    const [book_description, setBookDescription] = useState('')
    const [page_amount, setPageAmount] = useState(0)
    const [price, setPrice] = useState(0)
    const [author_surname, setAuthorSurname] = useState('')
    const [author_name, setAuthorName] = useState('')
    const [author_fathername, setAuthorFathername] = useState('')
    const [file, setFile] = useState(null)
    const [publishHouseName, setPublishHouseName] = useState('')
    const [availableBooks, setAvailableBooks] = useState(0)
    const [vacantIndex, setVacantIndex] = useState(1)

    useEffect(()=>{
        fetchGenres().then(genres => book.setGenres(genres));
        fetchVacantIndex().then(ind => setVacantIndex(ind));
        fetchWarehouses().then(warehouses => book.setWarehouses(warehouses));
        fetchPublishHouses().then(publishHouses => book.setPublishHouses(publishHouses));
    }, [])

    function usePublishHouseName(publishHouseId){
        const [name, setName] = useState('');

        useEffect(()=>{
            fetchPublishHouse(publishHouseId).then(res=>{setName(res.pub_house_name)});
        }, [publishHouseId]);

        return name
    }

    function PublishHouseNameFormatted({publishHouseId}){
        const name = usePublishHouseName(publishHouseId);
        return <span>{name}</span>
    }


    const selectFile = e =>{
        setFile(e.target.files[0]);
    }

    const addBook = ()=>{
        const formData = new FormData();
        formData.append('book_name', name);
        formData.append('book_description', book_description);
        formData.append('page_amount', page_amount);
        formData.append("genre", book.getSelectedGenre().name);
        formData.append("price", price);
        formData.append("author_surname", author_surname);
        formData.append("author_name", author_name);
        formData.append("author_fathername", author_fathername);
        formData.append('publish_house_id', book.getSelectedPublishHouse().id);
        formData.append("img", file);
        formData.append('warehouse_id', book.getSelectedWarehouse().id);
        formData.append('available_books', availableBooks);
        formData.append('book_id', vacantIndex[0].vacantind||1);
        createBook(formData).then(res=>onHide())
    }

    return(
        <Modal
            show={show}
            onHide={onHide}
            size={"lg"}
            centered
            >
            <ModalHeader closeButton>
                <Modal.Title>Добавить новую книгу</Modal.Title>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Dropdown className={'mt-2 mb-2'}>
                    <Dropdown.Toggle>{book.getSelectedGenre().name||'Выберите жанр'}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        {book.getGenres().map((genre, index) =>(
                            <Dropdown.Item
                                onClick={()=>{
                                    book.setSelectedGenre(genre);
                                }}
                                key={genre.id}>
                                {genre.name}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{book.getSelectedPublishHouse().pub_house_name||'Выберите издателя'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {book.getPublishHouses().map((publishHouse) =>(
                                    <Dropdown.Item
                                        onClick={()=>{
                                            book.setSelectedPublishHouse(publishHouse);
                                        }}
                                        key={publishHouse.id}>
                                        {publishHouse.pub_house_name}</Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={'mt-2 mb-2'}>
                        <Dropdown.Toggle>{book.getSelectedWarehouse().id||'Выберите склад'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {book.getWarehouses().map((warehouse) =>(
                                    <Dropdown.Item
                                        onClick={()=>{
                                            book.setSelectedWarehouse(warehouse);
                                        }}
                                        key={warehouse.id}>
                                        Номер: {warehouse.id},
                                        <br/>Владелец: <PublishHouseNameFormatted publishHouseId={warehouse.publish_house_id}/>,
                                        <br/>Адрес: {warehouse.country}, {warehouse.city}, {warehouse.street}, {warehouse.building},
                                        <br/>Вместительность: {warehouse.capacity}.
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={availableBooks===0?'':availableBooks}
                        onChange={e=>setAvailableBooks(Number(e.target.value))}
                        className="mt-3"
                        type="number"
                        placeholder={'Введите количество книг, доступных на складе: '}/>
                    <Form.Control
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите название книги"} />
                    <Form.Control
                        value={book_description}
                        onChange={e=>setBookDescription(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите описание книги"} />
                    <Form.Control
                        value={page_amount===0?'':page_amount}
                        onChange={e=>setPageAmount(Number(e.target.value))}
                        className="mt-3"
                        type="number"
                        placeholder={'Введите количество страниц книги: '}/>
                    <Form.Control
                        value={price===0?'':price}
                        onChange={e=>setPrice(Number(e.target.value))}
                        className="mt-3"
                        type="number"
                        placeholder={'Введите стоимость книги: '}/>
                    <Form.Control
                        value={author_surname}
                        onChange={e=>setAuthorSurname(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите фамилию автора: "} />
                    <Form.Control
                        value={author_name}
                        onChange={e=>setAuthorName(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите имя автора: "} />
                    <Form.Control
                        value={author_fathername}
                        onChange={e=>setAuthorFathername(e.target.value)}
                        className="mt-3"
                        placeholder={"Введите отчество автора: "} />
                    <Form.Control className={'mt-3'} placeholder={'Прикрепите фото устройства'} onChange={selectFile} type={'file'}/>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button variant={'outline-danger'} onClick={onHide}>Закрыть</Button>
                <Button variant={'outline-success'} onClick={addBook}>Добавить</Button>
            </ModalFooter>
        </Modal>
    )

})

export default CreateBook;