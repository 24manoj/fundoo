var redis = require('redis')
var client = redis.createClient()
client.on('error', (err) => {
    console.log("error", err)
})
exports.setToken = (token, callback) => {
    client.setex('token', 3600, JSON.stringify(token), (err, store) => {
        console.log("token set to cache")
        if (err)
            callback(err)
        else
            callback(null, store)

    })
}