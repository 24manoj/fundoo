const elastic = require('../middleware/elasticSearch')
exports.ping = (req, res) => {

    elastic.ping(req, res)
    //res.status(200).send("up")
}