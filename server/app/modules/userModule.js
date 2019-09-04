let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
//schema design for register

let registration = new mongoose.Schema({
    "firstName": {
        type: String,
        required: true
    },
    "lastName":
    {
        type: String
    },
    "email":
    {
        type: String,
        required: true,
        unique: true
    }
    , "password":
    {
        type: String

    },

    "provider": {
        type: String
    }

}, {
        timestamps: true
    })
//creating model of schema
let userRegistration = mongoose.model('userRegistration', registration);
const s3Upload = new mongoose.Schema({

    "user": {
        type: String,
        required: true
    },
    "url":
    {
        type: String,
        required: true
    }
}, {

        timestamps: true

    })
const fileUpload = mongoose.model("fileUploads", s3Upload);
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
 * @return re5500turn respose sucess or failure
 */
exports.forgotpassword = (req, callback) => {
    try {

        userRegistration.find({
            "email": req.body.email
        }, (err, data) => {
            if (data.length > 0) {

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


// /**
//  * @desc gets validated request from services,performs database operations needed
//  * @param req request contains http request
//  * @param callback contains response from backend
//  * @return return respose sucess or failure
//  */
// exports.fileUpload = (req, callback) => {
//     try {
//         let uploadDetails = new fileUpload
//             ({
//                 "user": process.env.user,
//                 "url": req.file.location
//             });
//         uploadDetails.save((err, data) => {
//             if (data) {
//                 callback(null, data);
//             }
//             else {
//                 callback("Details not Stored");
//             }
//         })
//     } catch (e) {
//         console.log(e)
//     }
// }
/**
 * @desc gets validated request from services,performs database operations needed
 * @param req request contains http request
 * @param callback contains response from backend
 * @return return respose sucess or failure
 */
exports.find = (req) => {
    try {

        return new Promise((resolve, reject) => {
            userRegistration.find({
                "email": req.email
            }, (err, data) => {
                if (err || data.length > 0) reject("data not exist")
                else resolve(data)
            })
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
exports.save = (req) => {
    try {
        return new Promise((resolve, reject) => {
            const saveData = new userRegistration(req)
            saveData.save((err, data) => {
                if (data) resolve(data)
                else reject(err)
            })
        })

    } catch (e) {
        console.log(e)
    }
}