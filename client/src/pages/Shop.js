import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {Col, Container, Row} from "react-bootstrap";
import GenreBar from "../components/GenreBar";
import {observer} from "mobx-react-lite";
import {fetchBooks, fetchGenres, fetchPublishHouses, fetchWarehouses} from "../http/bookAPI";
import {check, login} from "../http/clientAPI";
import BookList from "../components/BookList";
import Pages from "../components/Pages";
import {render} from "@testing-library/react";
import {jwtDecode} from "jwt-decode";

const Shop = observer(() => {

    const {book} = useContext(Context);
    const {client} = useContext(Context);

    useEffect(() => {
        check().then(data => {
            console.log(data)
            if(data!==null){
                console.log(client.getClient().role)
                client.setClient(data)
                console.log(client.getClient().role)
                client.setIsAuth(true)
                console.log("сделал")
                client.setIsAdmin(data.role==="Админ")
                console.log(client.getIsAuth())
            } else{
                client.setIsAuth(false)
                client.setIsAdmin(false)
            }
        })
        fetchPublishHouses().then(publishHouses => book.setPublishHouses(publishHouses));
        fetchGenres().then((genres) => book.setGenres(genres));
        fetchWarehouses().then(warehouses => book.setWarehouses(warehouses));
        fetchPublishHouses(client.getClient().id).then(res=>client.setClient(res));
        fetchBooks(null, book.getPage(), book.getLimit()).then(books => {
            book.setBooks(books["rows"]);
            book.setTotalCount(books["count"]);
        })

    }, []);
    console.log(client.getIsAuth())

    useEffect(() => {
        fetchBooks(book.getSelectedGenre().name, book.getPage(), book.getLimit()).then(books => {
            book.setBooks(books["rows"]);
            book.setTotalCount(books["count"]);
        });
    }, [book._page, book._selectedGenre.id])



    return (
        <Container>
            <Row className="mt-2">

                <Col md={3}>
                    <GenreBar />
                </Col>

                <Col md={9}>
                    <BookList />
                    <Pages />
                </Col>

            </Row>
        </Container>
    );
});

export default Shop;