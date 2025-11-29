require('dotenv').config();

const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')
const statusService = require("./statusFacility/statusService");
let date = new Date();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));
app.use('/api', router)
app.use(errorHandler)
app.use(statusService)



const start = async () => {

    try{
        await sequelize.authenticate();
        await sequelize.sync();
        setInterval(async () => {
            try {
                date = await statusService(date);
            } catch (error) {
                console.log(error);}
        }, 300000)
        app.listen(PORT, ()=>console.log(`Server has started on port ${PORT}`));
    } catch(e){
        console.log(e);
    }
}

start();