const ApiError = require('../errors/ApiErrors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const database = require('../db');
const {options} = require("pg/lib/defaults");
const {QueryTypes} = require("sequelize");
const {id} = require("nodemon");
const currentDate = new Date();
const registrationDate = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`

const generateJwt = (id, email, role) =>{
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '15m'});
}

class ClientController{
    async registration(req, res, next){
        const {email, password, role} = req.body;
        if(!email || !password){
            return next(ApiError.badRequest('Email or password is required!'))
        }
        const candidate = await database.query(`select * from client where email = '${email}'`, {type:QueryTypes.SELECT});
        if (candidate.length!==0){
            return next(ApiError.badRequest('A user with this email already exists!'))
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const client = await database.query(`insert into client(email, password, registration_date, role) values ('${email}', '${hashPassword}', '${registrationDate}', 'Пользователь')`);
        const [max] =  await database.query(`select max(id) from client`, {type:QueryTypes.SELECT});

        const clientId = max.max;

        const token = generateJwt(clientId, email, role);
        return res.json({token});
    }

    async login(req, res, next){
        const {email, password} = req.body;
        const client = await database.query(`select * from client where email = '${email}'`, {type:QueryTypes.SELECT});
        if (client.length===0){
            return next(ApiError.internal('There is no client with this email!'));
        }
        const clientInfoPromise = database.query(`select id, password, role from client where email = '${email}'`, {type:QueryTypes.SELECT});
        let clientId = null;
        let clientRole = null;
        let clientPassword = null;

        await clientInfoPromise.then((result) => {
            console.log(result);
            clientId = result[0].id;
            clientPassword = result[0].password;
            clientRole = result[0].role;
        })

        let comparedPasswords = await bcrypt.compare(password,clientPassword);
        if(!comparedPasswords){return next(ApiError.badRequest('Wrong password!'))}
        const token = generateJwt(clientId, email, clientRole);
        return res.json({token})
    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({token});
    }

    async getAll(req, res){

        let {limit, page} = req.query;

        page = page||1
        limit = limit||9
        let offset = page*limit - limit;

        const clients = await database.query(`select * from client limit ${limit} offset ${offset}`, {type:QueryTypes.SELECT})
        return res.json(clients)
    }

    async getOne(req, res){
        const {id} = req.params;
        const client = await database.query(`select * from client where id = ${id}`, {type:QueryTypes.SELECT})
        return res.json(client)
    }

    async getCart(req, res){
        let {id} = req.params;
        const cart = await database.query(`select t1.id, t1.book_name, t1.book_description, t1.page_amount, t2.name as genre, t1.price, t1.author_surname, t1.author_name, t1.publish_house_id, t1.img, t3.amount from book t1 join cart_book t3 on t1.id = t3.book_id
            join genre t2 on t1.genre = t2.id where t3.cart_id=(select id from cart where client_id = ${id})`, {type:QueryTypes.SELECT})
        return res.json(cart)
    }

    async editProfileInfo(req, res){
        const {id, surname, name, father_name, phone_number, country, city, street, building, apartment_number, email, role} = req.body;
        const data = await database.query(`update client set surname = '${surname}', name = '${name}', father_name='${father_name}', phone_number='${phone_number}', country='${country}', city='${city}', street='${street}', building=${building}, apartment_number=${apartment_number}, email='${email}' where id = ${id} returning id, surname, name, father_name, phone_number, country, city, street, building, apartment_number, email`, {type:QueryTypes.UPDATE});
        return res.json(data[0][0])
    }

    async makeOrder(req, res){
        const {client_id,book_id, amount, price, publish_house_id, date} = req.body;
        const initState = 'Оформлено';
        const data = await database.query(`insert into orders(client_id, book_id, amount, total_price, date, status) values(${client_id}, ${book_id}, ${amount}, ${amount*price}, '${date}', '${initState}')`);
        return res.json(data)
    }

    async getOrders(req, res){
        const {id} = req.params;
        const data = await database.query(`select t1.id as order_id, t2.id as book_id, t2.book_name, t2.author_surname, t2.author_name,t2.author_fathername, t2.book_description, t2.img, t3.pub_house_name, t1.amount, t1.total_price, t1.date, t1.status
                                           from orders t1 join book t2 on t1.book_id=t2.id join publish_house t3 on t3.id=t2.publish_house_id where t1.client_id=${id}`, {type:QueryTypes.SELECT})
        return res.json(data)
    }
}

module.exports = new ClientController();