var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
//schema design for register
let registration = new mongoose.Schema({
    "firstName": {
        type: String,
        required: true
    },
    "lastName":
    {
        type: String,
        required: true
    },
    "email":
    {
        type: String,
        required: true,
        unique: true
    }
    , "password":
    {
        type: String,
        required: true
    }
}, {
        timestamps: true
    })
//creating model of schema
var userRegistration = mongoose.model('userRegistration', registration);

/**
 * @desc gets validated request from services,performs database operations needed
 * @param req request contains http request 
 * @param callback contains response from backend
 * @return return respose sucess or failure
 */
exports.register = (req, callback) => {
    userRegistration.find({
        "email": req.body.email
    }, (err, data) => {

        if (data.length <= 0) {

            bcrypt.hash(req.body.password, 10, (err, hash) => {

                var details = new userRegistration({
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "email": req.body.email,
                    "password": hash
                })
                details.save((err, data) => {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, data);
                    }
                });

            })
        }
        else {

            callback("Data exist")
        }
    })
}

/**
 * @desc gets validated request from services,performs database operations needed
 * @param req request contains http request
 * @param callback contains response from backend
 * @return return respose sucess or failure
 */
exports.login = (req, callback) => {
    try {
        userRegistration.findOne({
            "email": req.body.email
        }, (err, data) => {

            if (data != null) {

                bcrypt.compare(req.body.password, data.password, (err, match) => {

                    if (match == false) {
                        callback("password misMatch");
                    }
                    else {
                        callback(null, data)
                    }

                })
            }
            else {

                callback(`Incorrect username and password `);
            }
        })

    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed
 * @param req request contains http request
 * @param callback contains response from backend
 * @return return respose sucess or failure
 */
exports.forgotpassword = (req, callback) => {
    try {

        userRegistration.findOne({
            "email": req.body.email
        }, (err, data) => {
            if (data != null) {
                callback(null, data);
            }
            else {
                console.log("in module")
                callback("NO data found");
            }
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed
 * @param req request contains http request
 * @param callback contains response from backend
 * @return return respose sucess or failure
 */
exports.resetPassword = (req, callback) => {

    console.log("dfdfdf", req.decoded)
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {

            callback(err)
        } else {
            userRegistration.updateOne({
                "_id": req.decoded.id
            }, {
                    "password": hash
                }, (err, data) => {
                    if (err) {

                        callback(err)
                    }
                    else {
                        callback(null, data)
                    }
                })
        }
    })



}