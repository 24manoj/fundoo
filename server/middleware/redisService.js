var redis = require('redis')
var client = redis.createClient()
client.on('error', (err) => {
    console.log("error", err)
})
var token;

exports.checkToken = (req, res, next) => {
    token = req.params.token

    return client.get(token, (err, data) => {
        if (data) {

            res.status(200).send(data)
        }
        else {

            next();
        }
    })

}
exports.setToken = (token, callback) => {

    client.setex('token', 3600, JSON.stringify(token), (err, store) => {
        console.log("token set to cache")
        if (err)
            callback(err)

        else
            callback(null, store)

    })
}