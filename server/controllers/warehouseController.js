const database = require('../db');
const {QueryTypes} = require('sequelize');

class warehouseController {
    async create(req, res){
        const {country, city, street, building, capacity, publish_house_id} = req.body
        const warehouse = await database.query(`insert into warehouse (country, city, street, building, capacity, publish_house_id) values (${country},${city}, ${street}, ${building}, ${capacity}, ${publish_house_id})`)
        return res.json(warehouse[0])
    }

    async getAll(req, res){

        let {limit, page} = req.query;

        const warehouse = await database.query(`select * from warehouse`, {type:QueryTypes.SELECT})

        return res.json(warehouse)
    }

    async getOne(req, res){
        let {id} = req.params
        const warehouse = await database.query(`select * from warehouse where id = ${id}`, {type:QueryTypes.SELECT})
        return res.json(warehouse[0])
    }
}


module.exports = new warehouseController();
