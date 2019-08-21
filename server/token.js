var jsonToken = require('jsonwebtoken');
exports.generateToken = (id, callback) => {
    try {
        let payload = {
            "id": id
        }
        jsonToken.sign(payload, process.env.key, (err, token) => {
            if (err) {
                callback(err);
            } else {
                callback(null, token);
            }

        })
    }
    catch (e) {
        console.log(e)
    }
}
exports.verifyToken = (token, callback) => {
    try {
        jsonToken.verify(token, process.env.key, (err, result) => {
            if (err) {
                callback(err)
            }
            else {
                callback(null, result);
            }
        })

    } catch (e) {
        console.log(e)
    }
}