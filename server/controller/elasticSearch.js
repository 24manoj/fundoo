const client = require('../middleware/elasticSearch')
const status = require('../middleware/httpStatusCode')
let response = {}
/**
 * @desc  validates http requests 
 * @param req request contains http requested data
 * @param res responses back to frontend
 * @return response 
 */
exports.createIndex = (req, res) => {
    try {
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

    } catch (e) {
        console.log(e)
    }

}

/**
 * @desc  validates http requests
 * @param req request contains http requested data
 * @param res responses back to frontend
 * @return response
 */
exports.search = (req, res) => {
    try {
        client.searchkey(req, (err, data) => {
            if (err) {
                response.sucess = false
                response.error = err
                response.data = null

                res.status(status.notfound).send(response)
            }
            else {
                response.sucess = true
                response.error = null
                response.data = data

                res.status(status.sucess).send(response)
            }
        })
    } catch (e) {
        console.log(e)
    }
}