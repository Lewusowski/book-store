const database = require('../db')
const {QueryType, QueryTypes} = require('sequelize')
const uuid = require('uuid')
const ApiError = require("../errors/ApiErrors");
const path = require('path');

class bookController{
    async create(req, res, next){
        try{
            let {book_name, book_description, page_amount, genre, price, author_surname, author_name, author_fathername, publish_house_id, warehouse_id, available_books, book_id} = req.body
            const {img}= req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname,'..', 'static', fileName))
            const book = await database.query(`insert into book(book_name, book_description, page_amount, genre, price, author_surname, author_name, author_fathername, publish_house_id, img) values ('${book_name}', '${book_description}', ${page_amount}, (select id from genre where genre.name='${genre}'), ${price}, '${author_surname}', '${author_name}', '${author_fathername}', ${publish_house_id}, '${fileName}')`);
            const warehouse_pos = await database.query(`insert into warehouse_pos(book_id, amount, warehouse_id) values ('${book_id}', '${available_books}','${warehouse_id}')`)
            return res.json(book)
        }catch (e){
            next(ApiError.badRequest(e.message));
        }
    }

    // async getAll(req, res) {
    //     let {genreName, page, limit} = req.query;
    //
    //     page = page || 1;
    //     limit = limit || 9;
    //     let offset = page * limit - limit;
    //
    //     let books;
    //     let totalCount;
    //
    //     if (!genreName) {
    //         totalCount = await database.query(
    //             `SELECT COUNT(*) FROM book`,
    //             { type: QueryTypes.SELECT }
    //         );
    //         books = await database.query(
    //             `SELECT * FROM book LIMIT ${limit} OFFSET ${offset}`,
    //             { type: QueryTypes.SELECT }
    //         );
    //     } else {
    //         totalCount = await database.query(
    //             `SELECT COUNT(*) FROM book WHERE genre='${genreName}'`,
    //             { type: QueryTypes.SELECT }
    //         );
    //         books = await database.query(
    //             `SELECT * FROM book WHERE genre='${genreName}' LIMIT ${limit} OFFSET ${offset}`,
    //             { type: QueryTypes.SELECT }
    //         );
    //     }
    //
    //     return res.json({
    //         rows: books,
    //         count: totalCount[0].count
    //     });
    // }
    async getAll(req, res) {
        let {genre, page, limit} = req.query;

        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;

        let books;
        let totalCount;

        if (!genre) {
            totalCount = await database.query(
                `SELECT COUNT(*) FROM book`,
                { type: QueryTypes.SELECT }
            );
            books = await database.query(
                `select distinct t1.id, t1.book_name, t1.book_description, t1.page_amount, t2.name as genre, t1.price, t1.author_surname, t1.author_name, t1.publish_house_id, t1.img, t3.rating from book t1 join genre t2 on t1.genre = t2.id left join cart_book t3 on t1.id = book_id LIMIT ${limit} OFFSET ${offset}`,
                { type: QueryTypes.SELECT }
            );
        } else {
            totalCount = await database.query(
                `SELECT COUNT(*) FROM book WHERE genre= (select id from genre where name = '${genre}')`,
                { type: QueryTypes.SELECT }
            );
            books = await database.query(
                `select distinct t1.id, t1.book_name, t1.book_description, t1.page_amount, t2.name as genre, t1.price, t1.author_surname, t1.author_name, t1.publish_house_id, t1.img, t3.rating from book t1 join genre t2 on t1.genre = t2.id left join cart_book t3 on t1.id = book_id WHERE genre=(select id from genre where name = '${genre}')
                    LIMIT ${limit} OFFSET ${offset}`,
                { type: QueryTypes.SELECT }
            );
        }

        return res.json({
            rows: books,
            count: totalCount[0].count
        });
    }

    async getVacantIndex(req, res){
        const vacantIndex = await database.query(`select max(id) + 1 as vacantind from book`, {type:QueryTypes.SELECT})
        return res.json(vacantIndex)
    }

    async getOne(req, res){
        const {id} = req.params;
        const book = await database.query(`select distinct t1.id, t1.book_name, t1.book_description, t1.page_amount, t2.name as genre, t1.price, t1.author_surname, t1.author_name, t1.publish_house_id, t1.img from book t1 join genre t2 on t1.genre = t2.id  where t1.id = ${id}`, {type:QueryTypes.SELECT})
        return res.json(book[0])
    }

    async removeFromCart(req, res){
        const {clientId, bookId} =req.query;
        const book = await database.query(`delete from cart_book where cart_book.cart_id = (select id from cart where cart.client_id = ${clientId}) and book_id = ${bookId}`);
        return res.json(book[0])
    }

    async addToCart(req, res){
        const {clientId, bookId, amount} =req.body;
        const book = await database.query(`insert into cart_book(cart_id, book_id, amount) values ((select id from cart where cart.client_id = ${clientId}), ${bookId}, ${amount}) on conflict (cart_id, book_id)
                                                do update set amount = (select count(amount) from cart_book where cart_id=(select id from cart where cart.client_id = ${clientId}) and book_id = ${bookId})+${amount}`);
        return res.json('Successfully added to the cart!');
    }

    async getReviews(req, res){
        const {id} =req.params;
        const reviews = await database.query(`select distinct review, rating, country, surname, name from cart_book join client on client.id=(select client_id from cart where cart.id=cart_book.cart_id) where book_id = ${id} and review is not null`, {type:QueryTypes.SELECT});
        return res.json(reviews)
    }

    async sendFeedback(req, res){
        const {order_id, amount, review, rating} = req.body;
        const feedback = database.query(`
            insert into cart_book(cart_id, book_id, amount, review, rating) values(
                (select id from cart where client_id = (select client_id from orders where id = ${order_id})),
                (select book_id from orders where id = ${order_id}),
                ${amount},
                '${review}',
                ${rating});`)

        return res.json(1)
    }
}

module.exports = new bookController();

