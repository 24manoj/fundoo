/********************************************************************************************************************
 * @Execution : default nodemon : cmd> server.js
 * @Purpose : learn backend using node
 * @description : Using nodejs,express build backend api,login,register,reset,forgot  
 * @overview : fundoo
 * @author : manoj kumar k s<manoj.ks.24.mk@gmail.com>
 * @version : 1.0
 * @since : 21-aug-2019
 *******************************************************************************************************************/
//importing  modules
const express = require('express');
const expressvalidator = require('express-validator');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const routes = require('../server/router/router');
require('dotenv').config();
const passport = require('passport')
var auth = require('./router/auth');
//creating object of express
const cors = require('cors')
const app = express();
// app.use(session({
//     secret: 's3cr3t',
//     resave: true,
//     saveUninitialized: true
// }));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(express.static('../client'))
app.use(expressvalidator())
app.use(passport.initialize());
app.use(passport.session());
//allow OPTIONS on just one resource
app.options('http://localhost:3000/*', cors())

//allow OPTIONS on all resources
app.options('*', cors())

app.use('/auth', auth);
app.use('/', routes)
//creating connection for mongodb
mongoose.connect("mongodb://localhost:27017/fundoo", { useCreateIndex: true, useNewUrlParser: true })
//event Emiters
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

app.listen(4000, () => {
    console.log("Running sucessfully on port 4000")
})
// Try fetching the result from Redis first in case we have it cached

module.exports = app;