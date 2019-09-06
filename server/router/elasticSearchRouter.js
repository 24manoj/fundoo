let elsticRouter = require('express').Router()
let elasticSearch = require('../controler/elasticSearch')
elsticRouter.get('/ping', elasticSearch.ping)
module.exports = elsticRouter