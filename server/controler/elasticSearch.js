const client = require('../middleware/elasticSearch')
const status = require('../middleware/httpStatusCode')
let response = {}
exports.createIndex = (req, res) => {
    req.check('userId', 'UserId invalid').notEmpty()
    let errors = req.validationErrors()
    if (errors) {
        response.sucess = false
        response.error = errors
        response.data = null
        res.status(status.UnprocessableEntity).send(response)
    } else {
        client.createIndex(req, (err, data) => {
            if (err) {
                response.sucess = false
                response.error = err
                response.data = null
                res.status(status.alreadyExist).send(response)
            }
            else {
                response.sucess = true
                response.error = null
                response.data = data
                res.status(status.sucess).send(response)
            }

        })

    }
}

exports.search = (req, res) => {
    client.searchkey(req, (err, data) => {
        if (err) {
            response.sucess = false
            response.error = err
            response.data = null
            res.status(status.alreadyExist).send(response)
        }
        else {
            response.sucess = true
            response.error = null
            response.data = data
            res.status(status.sucess).send(response)
        }
    })
}