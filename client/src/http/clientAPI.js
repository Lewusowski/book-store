import {$host, $authHost} from "./index";
import {jwtDecode} from 'jwt-decode';
import {useRef} from "react";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/client/registration', {email, password});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/client/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
}

export const check = async () => {

    try{
        const {data} = await $authHost.get('api/client/auth' )
        localStorage.setItem('token', data.token)
        localStorage.removeItem('alertShown')
        return jwtDecode(data.token)
    } catch(error) {
        console.log(error.message);
        if (localStorage.getItem('alertShown') !== 'true') {
            alert('Время сеанса вышло! Зарегистрируйтесь еще раз!');
            localStorage.setItem('alertShown', 'true')
            document.location.reload();
        }
        return null;
    }
}

export const fetchCart = async (id) =>{
    const {data} = await $authHost.get('/api/client/cart/'+id);
    return data
}

export const fetchClient = async (id) =>{
    const {data} = await $authHost.get('/api/client/'+id);
    return data
}

export const editProfileInfo = async (client) => {
    const {data} = await $authHost.put('/api/client/profile/', client);
    return data
}

export const proceedOrder = async (order) => {
    const {data} = await $authHost.post('/api/client/cart/order/', order);
    return data
}

export const fetchOrders = async(id) => {
    const {data} = await $authHost.get('/api/client/purchases/'+id);
    return data
}