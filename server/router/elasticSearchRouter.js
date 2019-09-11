let elsticRouter = require('express').Router()
let elasticSearch = require('../controler/elasticSearch')
elsticRouter.post('/createIndex', elasticSearch.createIndex)
elsticRouter.get('/search', elasticSearch.search)
module.exports = elsticRouter