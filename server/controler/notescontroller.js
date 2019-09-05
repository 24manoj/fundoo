let noteService = require('../services/notesService')
let status = require('../middleware/httpStatusCode')
let response = {}
exports.createNotes = (req, res) => {
    console.log(req.body)
    req.checkBody('userId', 'userId invalid ').isEmail()
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
                .then((data) => {
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
}

exports.getNotes = (req, res) => {
    req.check('userId', 'userId invalid').isEmail()
    let errors = req.validationErrors()
    if (errors) {
        response.sucess = false,
            response.data = null,
            response.errors = errors
        res.status(status.UnprocessableEntity).send(responsess)
    } else {
        noteService.getNotes(req)
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
                res.status(status.notfound).send(response)
            })
    }
}


exports.updateNotes = (req, res) => {
    req.check('id', 'userId invalid').isEmail()
    let errors = req.validationErrors()
    if (errors) {
        response.sucess = false,
            response.data = null,
            response.errors = errors
        res.status(status.UnprocessableEntity).send(response)
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
}

exports.deleteNotes = (req, res) => {
    req.check('id', 'Id invalid').isEmail()
    let errors = req.validationErrors()
    if (errors) {
        response.errors = errors
        response.data = null
        response.sucess = false
        res.status(status.UnprocessableEntity).send(response)
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
}
exports.noteTrash = (req, res) => {
    req.check('id', 'Id invalid').notEmpty()
    let errors = req.validationErrors()
    if (errors) {
        response.errors = errors
        response.data = null
        response.sucess = false
        res.status(status.UnprocessableEntity).send(response)
    }
    else {
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
}


exports.noteArchive = (req, res) => {
    req.check('id', 'Id invalid').notEmpty()
    let errors = req.validationErrors()
    if (errors) {
        response.errors = errors
        response.data = null
        response.sucess = false
        res.status(status.UnprocessableEntity).send(response)
    }
    else {
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
}


exports.noteReminder = (req, res) => {
    req.check('id', 'Id invalid').notEmpty()
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
}
