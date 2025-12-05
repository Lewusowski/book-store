const database = require('../db');
const {QueryTypes} = require('sequelize');

class genreController {

    async create(req, res){
        const {name} = req.body
        console.log(name)
        const genre = await database.query(`insert into genre (name) values ('${name}')`)
        return res.json(genre[0])
    }

    async getAll(req, res){

        let {limit, page} = req.query;
        const genre = await database.query(`select * from genre`, {type:QueryTypes.SELECT})
        return res.json(genre)
    }

    async getOne(req, res){
        const {id} = req.params
        const genre = await database.query(`select * from genre where id = ${id}`, {type: QueryTypes.SELECT})
        return res.json(genre[0])
    }
}


module.exports = new genreController();


