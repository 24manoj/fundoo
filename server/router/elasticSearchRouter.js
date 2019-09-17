let elsticRouter = require('express').Router()
let elasticSearch = require('../controller/elasticSearch')
let auth = require('../middleware/auth')
/**@description routes to endpoints */
elsticRouter.post('/createIndex', auth.verifyUser, elasticSearch.createIndex)
elsticRouter.get('/search', auth.verifyUser, elasticSearch.search)
module.exports = elsticRouter