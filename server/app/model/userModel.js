let schema = require('./schema')
let bcrypt = require('bcrypt');

/**
 * @desc gets validated request from services,performs database operations needed
 * @param req request contains http request 
 * @param callback contains response from backend
 * @return return respose sucess or failure
 */
exports.register = (req, callback) => {
    schema.userRegistration.find({
        "email": req.body.email
    }, (err, data) => {

        if (data.length <= 0) {

            bcrypt.hash(req.body.password, 10, (err, hash) => {
                var details = new schema.userRegistration({
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
        schema.userRegistration.findOne({
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

        schema.userRegistration.find({
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
            schema.userRegistration.updateOne({
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


/**
 * @desc gets validated request from services,performs database operations needed
 * @param req request contains http request
 * @param callback contains response from backend
 * @return return respose sucess or failure
 */
exports.fileUpload = (req, callback) => {
    try {
        let uploadDetails = new schema.fileUpload
            ({
                "user": process.env.user,
                "url": req.file.location
            });
        uploadDetails.save((err, data) => {
            if (data) {
                callback(null, data);
            }
            else {
                callback("Details not Stored");
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
exports.find = (req) => {
    try {
        console.log("in", req)
        return new Promise((resolve, reject) => {
            schema.userRegistration.find({
                "email": req
            }, (err, data) => {
                if (err || data.length <= 0) reject("data not exist")
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
            const saveData = new schema.userRegistration(req)
            saveData.save((err, data) => {
                if (data) resolve(data)
                else reject(err)
            })
        })

    } catch (e) {
        console.log(e)
    }
}