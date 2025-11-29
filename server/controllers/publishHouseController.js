const database = require('../db');
const {QueryTypes} = require('sequelize');

class publishHouseController {

    async create(req, res){
        const {pub_house_name, country, city, street, building, floor, room, inn, ogrn} = req.body
        const publishHouse = await database.query(`insert into warehouse (pub_house_name, country, city, street, building, floor, room, inn, ogrn) values (${pub_house_name},${country}, ${city}, ${street}, ${building}, ${floor}, ${room}, ${inn}, ${ogrn})`)
        return res.json(publishHouse[0])
    }

    async getAll(req, res){

        let {limit, page} = req.query;

        const publishHouse = await database.query(`select * from publish_house`, {type:QueryTypes.SELECT})

        return res.json(publishHouse)
    }

    async getOne(req, res){
        const {id} = req.params
        const publishHouse = await database.query(`select * from publish_house where id = ${id}`, {type: QueryTypes.SELECT})
        return res.json(publishHouse[0])
    }
}


module.exports = new publishHouseController()  ;


