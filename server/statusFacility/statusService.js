const database = require('../db')
const {types} = require("pg");
const {QueryTypes, or} = require("sequelize");

const statusService = async (initDate)=>{

    const orders = await database.query(`select id, date, status from orders`, {type:QueryTypes.SELECT})

    for (const order in orders){
        const currentOrder = orders[order];
        const dataDifference = (initDate - currentOrder.date)/60000
        if(dataDifference >= 60 && currentOrder.status!='Получено'){
            const updatedOrder = await database.query(`update orders set status = 'Получено' where id = ${orders[order].id}`)
        } else if(dataDifference >= 30 && dataDifference < 60 && currentOrder.status!='Отправлено'){
            const updatedOrder = await database.query(`update orders set status = 'Отправлено' where id = ${orders[order].id}`)
        } else if(dataDifference >= 15 && dataDifference < 30 && currentOrder.status!='Сформировано'){
            const updatedOrder = await database.query(`update orders set status = 'Сформировано' where id = ${orders[order].id}`);
        }
    }
    return new Date();
}

module.exports = statusService