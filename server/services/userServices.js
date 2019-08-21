var model = require('../app/modules/userModule')
exports.register = (req, callback) => {
    try {
        console.log("in services")
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


exports.forgotPassword = (req, callback) => {
    try {
        console.log("in service")
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