const redis = require('redis')
const fetch = require("no de-fetch");
// create and connect redis client to local instance.
const client = redis.createClient(6379)

// echo redis errors to the console
client.on('error', (err) => {
    console.log("Error " + err)
});