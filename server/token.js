var jsonToken = require('jsonwebtoken');
exports.generateToken = (id, callback) => {
    try {
        let payload = {
            "id": id
        }
        jsonToken.sign(payload, process.env.key, { expiresIn: '3h' }, (err, token) => {
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
            console.log(result)
            if (result != undefined) {
                callback(null, result);
            }
            else {
                callback(`invalid Token ${err}`);
            }
        })

    } catch (e) {
        console.log(e)
    }
}