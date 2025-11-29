import React, {useContext} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {registration, login} from "../http/clientAPI";

const Auth = observer(()=>{
    const {client} = useContext(Context)
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const click = async () => {
        try{
            let data;
            if(isLogin){
                data = await login(email, password);
            }else{
                data = await registration(email, password);
            }
            client.setClient(data)
            client.setIsAuth(true);
            localStorage.removeItem('alertShown')
            if(data.role==='Админ')client.setIsAdmin(true);
            navigate(SHOP_ROUTE);
        }catch(err) {alert(err.response.data.message)}
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}}>
            <Card style={{width:600}} className={'p-5'}>
                <h2 className={'m-auto'}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className={'d-flex flex-column'}>
                    <Form.Control
                        className={'mt-3'}
                        placeholder={'Введите Ваш email...'}
                        value = {email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                    <Form.Control
                        className={'mt-3'}
                        placeholder={'Введите Ваш пароль...'}
                        value = {password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password">
                    </Form.Control>
                   <Row className="justify-content-between align-items-center mt-3">
                       {isLogin?
                           <Col xs = 'auto'>
                               Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегестрируйтесь!</NavLink>
                           </Col>
                           :
                           <Col xs = 'auto'>
                               Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                           </Col>
                       }
                       <Col xs = 'auto'>
                           <Button variant={'outline-success'} onClick={click}>
                               {isLogin?'Войти':'Регистрация'}
                           </Button>
                       </Col>
                   </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;