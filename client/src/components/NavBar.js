import {observer} from "mobx-react-lite";
import React, {useContext} from "react";
import {Context} from "../index";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, PURCHASES_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import Profile from "../pages/Profile";

const NavBar = observer(()=>{
    const {client} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        client.setClient({});
        client.setIsAuth(false);
        localStorage.removeItem("token");
        localStorage.setItem('alertShown', 'false');
        navigate(SHOP_ROUTE);
    }

    return(
        <Navbar bg = "dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{color:'white', fontSize:25, textDecoration:"none"}} to={SHOP_ROUTE}>БуквоГрыз</NavLink>
                {!(localStorage.getItem('alertShown'))?
                    <Nav className={'d-flex flex-row justify-content-between'}>
                        <Button variant={'outline-light'} className={'me-3'} onClick={logOut}>Выйти</Button>
                        <Button variant={'outline-light'} className={'me-3'} onClick={()=>navigate(BASKET_ROUTE)}>Корзина</Button>
                        <Button variant={'outline-light'} className={'me-3'} onClick={()=>navigate(PURCHASES_ROUTE)}>Мои покупки</Button>
                        <Button variant={'outline-light'} onClick={()=>navigate(PROFILE_ROUTE)}>Профиль</Button>
                    </Nav>
                    :
                    <Nav>
                        <Button variant={'outline-light'} onClick={()=>navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    )})

export default NavBar;
