/********************************************************************************************************************
 * @Execution : default nodemon : cmd> server.js
 * @Purpose : learn backend using node
 * @description : Using nodejs,express build backend api,login,register,reset,forgot  
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since : 21-aug-2019
 *
 *******************************************************************************************************************/

try {
     //importing 
    const express = require('express');
    const expressvalidator = require('express-validator');
    const mongoose = require('mongoose');
    const bodyparser = require('body-parser');
    const routes = require('../server/router/router');
    require('dotenv').config();
    const app = express();
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({
        extended: true
    }))
    app.use(expressvalidator())
    app.use('/', routes)
    mongoose.connect("mongodb://localhost:27017/fundoo", { useNewUrlParser: true })
    mongoose.connection.on("connected", () => {
        console.log("Database connected sucessfully");
    })

    mongoose.connection.on("disconnected", () => {
        console.log("database Disconnected");
        process.exit(0)
    })
    mongoose.connection.on("error", () => {
        console.log("database coudnt connected")
        process.exit(1)
    })
    app.listen('3000', () => {
        console.log("Running sucessfully on port 3000")
    })
} catch (e) {
    console.log(e);
}