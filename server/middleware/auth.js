var webtoken = require('../token')
var response = {}
exports.verify = (req, res, next) => {
    console.log(req.params.token)
    webtoken.verifyToken(req.params.token, (err, result) => {
        console.log(result)
        if (err) {
            response.data = null
            response.errors = err
            response.sucess = false
            res.status(422).send(response)
        }
        else {
            req.decoded = result
            next()
        }
    })
}