let noteService = require('../services/notesService')
let status = require('../middleware/httpStatusCode')
let redisCache = require('../middleware/redisService')
let elastic = require('../middleware/elasticSearch')
let response = {}
let details = {};

/**
 * @desc takes input as http req ,error validation is done,passes request data to  next services
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */
exports.createNotes = (req, res) => {
    try {
        req.checkBody('userId', 'userId invalid ').notEmpty()
        let errors = req.validationErrors()
        if (errors) {
            response.sucess = false,
                response.data = null,
                response.errors = errors
            res.status(status.UnprocessableEntity).send(response)
        }
        else {
            if (req.body.title != null || req.body.content != null) {
                noteService.createNotes(req)
                    .then(data => {
                        response.sucess = true,
                            response.data = data,
                            response.errors = null
                        res.status(status.sucess).send(response)
                    })

                    .catch((err) => {
                        response.sucess = false,
                            response.data = null,
                            response.errors = err

                        res.status(status.notfound).send(response)
                    })
            }
            else {
                response.sucess = true,
                    response.data = "no data",
                    response.errors = null
                res.status(status.sucess).send(response);
            }
        }
    } catch (e) { console.log(e) }
}

/**
 * @desc takes input as http req ,error validation is done,passes request data to  next services,
 * respoonses with array of notes
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */

exports.getNotes = (req, res) => {
    try {
        req.checkBody('userId', 'userId invalid').notEmpty()
        let errors = req.validationErrors()
        if (errors) {
            response.sucess = false,
                response.data = null,
                response.errors = errors
            res.status(status.UnprocessableEntity).send(response)
        } else {
            details.id = req.body.userId
            redisCache.getRedis(details, (err, data) => {
                if (data) {
                    response.sucess = true,
                        response.data = data,
                        response.errors = null
                    res.status(status.sucess).send(response)
                } else {
                    noteService.getNotes(req)
                        .then(notes => {
                            console.log("in in controler")
                            elastic.addDocument(notes)
                            details.id = req.body.userId
                            details.value = notes
                            redisCache.setRedis(details, (err, data) => {
                                if (data) {
                                    response.sucess = true,
                                        response.data = notes,
                                        response.errors = null
                                    res.status(status.sucess).send(response)
                                }
                            })


                        })
                        .catch(err => {
                            response.sucess = false,
                                response.data = null,
                                response.errors = err
                            res.status(status.notfound).send(response)
                        })
                }
            })
        }
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc takes input as http req ,error validation is done,passes request data to  next services,
 *  updates collection with valid details
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */

exports.updateNotes = (req, res) => {
    try {
        req.check('userId', "userId invalid").notEmpty()
        req.check('id', 'userId invalid').notEmpty()
        let errors = req.validationErrors()
        if (errors) {
            response.sucess = false,
                response.data = null,
                response.errors = errors
            res.status(status.UnprocessableEntity).send(response)
        } else {
            details.id = req.body.userId
            redisCache.delRedis(details, (err, dele) => {
                if (err) {
                    throw new "error  in catch"
                } else {
                    noteService.updateNotes(req)
                        .then((notes) => {
                            response.sucess = true,
                                response.data = notes,
                                response.errors = null
                            res.status(status.sucess).send(response)
                        })
                        .catch(err => {
                            response.sucess = false,
                                response.data = null,
                                response.errors = err
                            res.status(status.notfound).send(responsess)
                        })
                }
            })

        }
    } catch (e) { console.log(e) }
}

/**
 * @desc takes input as http req ,error validation is done,passes request data to  next services,
 * removes  data from collection
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */

exports.deleteNotes = (req, res) => {
    try {
        req.check('userId', "userId invalid").notEmpty()
        req.check('id', 'id invalid').notEmpty()
        let errors = req.validationErrors()
        if (errors) {
            response.errors = errors
            response.data = null
            response.sucess = false
            res.status(status.UnprocessableEntity).send(response)
        }
        else {
            details.id = req.body.userId
            redisCache.delRedis(details, (err, del) => {
                if (err) {
                    throw new err
                }
                else {
                    noteService.deleteNotes(req)
                        .then(data => {
                            response.errors = null
                            response.data = data
                            response.sucess = true
                            res.status(status.sucess).send(response)
                        })
                        .catch(err => {
                            response.errors = err
                            response.data = null
                            response.sucess = false
                            res.status(status.notfound).send(response)
                        })

                }
            })
        }
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc takes input as http req ,error validation is done,passes request data to  next services,
 * updates collection with verified details
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */

exports.noteTrash = (req, res) => {
    try {
        req.check('userId', "userId invalid").notEmpty()
        req.check('id', 'Id invalid').notEmpty()
        req.check('isTrash', 'value should be boolean').isBoolean()
        let errors = req.validationErrors()
        if (errors) {
            response.errors = errors
            response.data = null
            response.sucess = false
            res.status(status.UnprocessableEntity).send(response)
        }
        else {
            details.id = req.body.userId;
            redisCache.delRedis(details, (err, deleted) => {
                if (err) {
                    throw new "error in radis", err;
                } else {
                    noteService.noteTrash(req)
                        .then(data => {
                            response.errors = null
                            response.data = data
                            response.sucess = true
                            res.status(status.sucess).send(response)


                        })
                        .catch(err => {
                            response.errors = err
                            response.data = null
                            response.sucess = false
                            res.status(status.notfound).send(response)
                        })
                }
            })

        }
    } catch (e) {
        console.log(e)
    }
}

/**
 * @desc takes input as http req ,error validation is done,passes request data to  next services,
 * updates collection with verified details
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */

exports.noteArchive = (req, res) => {
    try {
        req.check('userId', 'User Id invalid').notEmpty()
        req.check('id', 'Id invalid').notEmpty()
        req.check('isArchive', 'value  must be boolean').isBoolean()
        let errors = req.validationErrors()
        if (errors) {
            response.errors = errors
            response.data = null
            response.sucess = false
            res.status(status.UnprocessableEntity).send(response)
        }
        else {
            details.id = req.body.userId;
            redisCache.delRedis(details, (err, del) => {
                if (err) {
                    throw new "error in radis", err;
                } else {
                    noteService.noteArchive(req)
                        .then(data => {
                            response.errors = null
                            response.data = data
                            response.sucess = true
                            res.status(status.sucess).send(response)


                        })
                        .catch(err => {
                            response.errors = err
                            response.data = null
                            response.sucess = false
                            res.status(status.notfound).send(response)
                        })




                }
            })

        }
    } catch (e) {
        console.log(e)
    }
}

/**
 * @desc takes input as http req ,error validation is done,passes request data to  next services,
 * updates collection with verified details
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */
exports.noteReminder = (req, res) => {
    try {
        req.check('userId', "userId invalid").notEmpty()
        req.check('id', 'Id invalid').notEmpty()
        req.check('date', 'requires a time and date').notEmpty()
        let errors = req.validationErrors()
        if (errors) {
            response.errors = errors
            response.data = null
            response.sucess = false
            res.status(status.UnprocessableEntity).send(response)
        }
        else {
            noteService.noteReminder(req)
                .then(data => {
                    response.errors = null
                    response.data = data
                    response.sucess = true
                    res.status(status.sucess).send(response)
                })
                .catch(err => {
                    response.errors = err
                    response.data = null
                    response.sucess = false
                    res.status(status.notfound).send(response)
                })
        }
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc takes input as http req ,error validation is done,passes request data to  next services,
 * updates collection with verified details
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */

exports.noteLabel = (req, res) => {
    try {
        req.check('userId', "id invalid").notEmpty()
        req.check('id', 'Id invalid').notEmpty()
        req.check('labels', 'label invalid').notEmpty()
        let errors = req.validationErrors()
        if (errors) {
            response.errors = errors
            response.data = null
            response.sucess = false
            res.status(status.UnprocessableEntity).send(response)
        }
        else {
            details.id = req.body.userId
            redisCache.delRedis(details, (err, del) => {
                if (err) throw new err
                else {
                    noteService.noteLabel(req)
                        .then(data => {
                            response.errors = null
                            response.data = data
                            response.sucess = true
                            res.status(status.sucess).send(response)
                        })

                        .catch(err => {
                            response.errors = err
                            response.data = null
                            response.sucess = false
                            res.status(status.notfound).send(response)
                        })
                }

            })

        }
    } catch (e) {
        console.log(e)
    }
}/**
 * @desc takes input as http req ,error validation is done,passes request data to  next services,
 * collects the data and save in collection
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */

exports.createLabel = async (req, res) => {
    try {
        req.check('userId', 'userId invalid').notEmpty()
        req.check('labelName', 'labelName invalid').notEmpty()
        let errors = req.validationErrors()
        if (errors) {
            response.errors = errors
            response.data = null
            response.sucess = false
            res.status(status.UnprocessableEntity).send(response)
        }
        else {
            await noteService.createLabel(req, (err, data) => {
                if (data) {
                    response.errors = null
                    response.data = data
                    response.sucess = true
                    res.status(status.sucess).send(response)


                }
                else {
                    response.errors = err
                    response.data = null
                    response.sucess = false
                    res.status(status.notfound).send(response)
                }
            })
        }
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc takes input as http req ,error validation is done,passes request data to  next services,
 * updates collection with verified details
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */

exports.updateLabel = async (req, res) => {
    try {
        req.check('userId', "id invalid").notEmpty()
        req.check('id', 'Id invalid').notEmpty()
        req.check('labelName', 'labelName invalid').notEmpty()
        let errors = req.validationErrors()
        if (errors) {
            response.errors = errors
            response.data = null
            response.sucess = false
            res.status(status.UnprocessableEntity).send(response)
        }
        else {
            details.id = req.body.userId;
            await redisCache.delRedis(details, (err, del) => {
                if (err) {
                    throw new err
                } else {
                    noteService.updateLabel(req, res)
                        .then(data => {
                            response.errors = null
                            response.data = data
                            response.sucess = false
                            res.status(status.sucess).send(response)

                        })
                        .catch(err => {
                            response.errors = err
                            response.data = null
                            response.sucess = false
                            res.status(status.notfound).send(response)
                        })
                }
            })

        }
    } catch (e) { console.log(es) }
}

/**
 * @desc takes input as http req ,error validation is done,passes request data to  next services,
 * removes documents from collection
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */
exports.deleteLabel = async (req, res) => {
    try {
        req.check('userId', 'userId invalid').notEmpty()
        req.check('id', "label id invalid").notEmpty()
        //req.check('lableName', 'lableName invalid').notEmpty()
        let errors = req.validationErrors()
        if (errors) {
            response.errors = errors
            response.data = null
            response.sucess = false
            res.status(status.UnprocessableEntity).send(response)
        }
        else {
            details.id = req.body.userId;
            await redisCache.delRedis(details, (err, del) => {
                if (err) {
                    throw new err
                } else {
                    noteService.deleteLabel(req)
                        .then(data => {
                            details.id = data._id
                            details.value = data

                            response.errors = null
                            response.data = data
                            response.sucess = true
                            res.status(status.sucess).send(response)

                        })
                        .catch(err => {
                            response.errors = err
                            response.data = null
                            response.sucess = false
                            res.status(status.notfound).send(response)
                        })

                }
            })

        }
    } catch (e) {
        console.log(e)
    }
}

/**
 * @desc takes input as http req ,error validation is done,passes request data to  next services,
 * response with array of labels document
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */
exports.getLabels = async (req, res) => {
    try {
        req.check('userId', 'userId invalid').notEmpty()
        let errors = req.validationErrors()
        if (errors) {
            response.errors = errors
            response.data = null
            response.sucess = false
            res.status(status.UnprocessableEntity).send(response)
        }
        else {
            details.id = req.body.userId;
            await redisCache.getRedis(details, (err, data) => {
                if (err) {
                    throw new err
                } else {
                    noteService.getLabels(req)
                        .then(data => {
                            response.errors = null
                            response.data = data
                            response.sucess = true
                            res.status(status.sucess).send(response)
                        })
                        .catch(err => {
                            response.errors = err
                            response.data = null
                            response.sucess = false
                            res.status(status.notfound).send(response)
                        })

                }
            })

        }
    } catch (e) {
        console.log(e)
    }
}
