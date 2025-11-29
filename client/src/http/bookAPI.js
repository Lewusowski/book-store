import {$host, $authHost} from "./index";
import {registration} from "./clientAPI";
import {LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";

export const createGenre = async (genre) =>{
    const {data} = await $authHost.post('api/genre', genre);
    return data
}

export const fetchGenres = async () =>{
    const {data} = await $host.get('api/genre');
    return data
}

export const createWarehouse = async (warehouse) =>{
    const {data} = await $authHost.post('api/warehouse', warehouse);
    return data
}

export const fetchWarehouses = async () =>{
    const {data} = await $host.get('api/warehouse');
    return data
}

export const createPublishHouse = async (publishHouse) =>{
    const {data} = await $authHost.post('api/publishHouse', publishHouse);
    return data
}

export const fetchPublishHouses = async () =>{
    const {data} = await $authHost.get('api/publishHouse');
    return data
}

export const fetchWarehouseHouse = async (id) =>{
    const {data} = await $host.get('api/warehouse/'+id);
    return data
}

export const fetchPublishHouse = async (id) =>{
    const {data} = await $host.get('api/publishHouse/'+id);
    return data
}

export const createBook = async (book) =>{
    const {data} = await $authHost.post('api/book', book);
    return data
}

export const fetchVacantIndex = async (req, res) => {
    const {data} = await $host.get('api/book/vacantIndex');
    return data
}

export const fetchBooks = async (genre, page, limit ) =>{
    const {data} = await $host.get('api/book', {params:{
        genre, page, limit
        }});
    return data
}

export const deleteFromCart = async (clientId, bookId) =>{
    const {data} = await $authHost.delete('api/book/cart/del', {params:{
        clientId, bookId
        }});
    return data
}

export const addToCart = async (clientId, bookId, amount) =>{
    const cartBook = new FormData();
    cartBook.append('clientId', clientId);
    cartBook.append('bookId', bookId);
    cartBook.append('amount', amount);
    const {data} = await $authHost.post('api/book/cart/add', cartBook);
    return data
}

export const fetchBook = async (id) =>{
    const {data} = await $host.get('api/book/'+id);
    return data
}

export const fetchReviews = async (id) =>{
    const {data} = await $host.get('api/book/reviews/'+id);
    return data
}

export const sendFeedback = async (feedback) =>{
    const {data} = await $authHost.post('api/book/feedback', feedback);
    return data
}







