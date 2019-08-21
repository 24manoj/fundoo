var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt')
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
var userRegistration = mongoose.model('userRegistration', registration);

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
            console.log(data.length)
            callback("Data exist")
        }
    })
}

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

exports.resetPassword = (req, callback) => {

    console.log(req.decoded.id)
    bcrypt.hash(req.password, 10, (err, hash) => {
        userRegistration.updateOne({
            "_id": req.decoded.id
        }, {
                "password": require.password
            }, (err, data) => {
                if (err) { callback(err) }
                else {
                    callback(null, data)
                }
            })
    })


}