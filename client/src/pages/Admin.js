import React from 'react';
import {Button, Col, Container, Form, InputGroup, Navbar, Row} from "react-bootstrap";
import CreateGenre from "../components/modals/CreateGenre";
import CreateBook from "../components/modals/CreateBook";

const Admin = () => {
    const [genreVisible, setGenreVisible] = React.useState(false);
    const [bookVisible, setBookVisible] = React.useState(false);

    return (
        <Container className={'d-flex flex-column'}>
            <Button variant="outline-dark" className={'mt-4 p-2'} onClick={() => setGenreVisible(true)}>Добавить жанр</Button>
            <Button variant="outline-dark" className={'mt-4 p-2'} onClick={() => setBookVisible(true)}>Добавить книгу</Button>
            <CreateGenre show = {genreVisible} onHide={()=>setGenreVisible(false)} />
            <CreateBook show = {bookVisible} onHide={()=>setBookVisible(false)} />
        </Container>
    );
};

export default Admin;