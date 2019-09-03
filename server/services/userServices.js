var model = require('../app/modules/userModule')
var awss3 = require('../middleware/medialFile')
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @param callback contains response from backend
 * @return return respose sucess or failure
 */
exports.register = (req, callback) => {
    try {
        model.register(req, (err, data) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, data);
            }

        })

    } catch (e) {
        console.log(e);
    }
}


/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @param callback contains response from backend
 * @return return respose sucess or failure
 */
exports.login = (req, callback) => {
    try {
        model.login(req, (err, data) => {
            if (err) {
                callback(err)
            }
            else {
                callback(null, data)
            }
        })
    } catch (e) {
        console.log(e)
    }
}


/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @param callback contains response from backend
 * @return return respose sucess or failure
 */
exports.forgotPassword = (req, callback) => {
    try {
        // return new Promise(resole, reject)
        model.forgotpassword(req, (err, data) => {
            if (err) {
                console.log(err)
                callback(err)
            }
            else {
                callback(null, data)
            }
        })
    }
    catch (e) {
        console.log(e)
    }
}




/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @param callback contains response from backend
 * @return return respose sucess or failure
 */
exports.resetPassword = (req, callback) => {
    try {
        model.resetPassword(req, (err, data) => {
            if (err) {
                callback(err);
            }
            else {
                callback(null, data)
            }
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @param callback contains response from backend
 * @return return respose sucess or failure
 */
exports.fileUpload = (req, callback) => {
    try {
        model.fileUpload(req, (err, data) => {

            if (err) {
                callback(err);
            }
            else {
                callback(null, data)
            }
        })
    } catch (e) {
        console.log(e)
    }
}