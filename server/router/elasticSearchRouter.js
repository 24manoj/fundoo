let elsticRouter = require('express').Router()
let elasticSearch = require('../controller/elasticSearch')
/**@description routes to endpoints */
elsticRouter.post('/createIndex', elasticSearch.createIndex)
elsticRouter.get('/search', elasticSearch.search)
module.exports = elsticRouter