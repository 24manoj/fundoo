let noteService = require('../services/notesService')
let response = {}
exports.createNotes = (req, res) => {
    console.log(req.body)
    req.checkBody('userId', 'userId invalid ').isEmail()
    req.checkBody('title', 'Title invalid').isAlpha()
    let errors = req.validationErrors()
    if (errors) {
        response.sucess = false,
            response.data = null,
            response.errors = errors
        res.status(422).send(response)
    }
    else {
        noteService.createNotes(req)
            .then((data) => {
                response.sucess = true,
                    response.data = data,
                    response.errors = null
                res.status(200).send(response)
            })
            .catch((err) => {
                response.sucess = false,
                    response.data = null,
                    response.errors = err
                res.status(404).send(response)
            })
    }
}

exports.getNotes = (req, res) => {
    req.check('userId', 'userId invalid').isEmail()
    let errors = req.validationErrors()
    if (errors) {
        response.sucess = false,
            response.data = null,
            response.errors = errors
        res.status(422).send(responsess)
    } else {
        noteService.getNotes(req)
            .then((notes) => {

                response.sucess = true,
                    response.data = notes,
                    response.errors = null
                res.status(200).send(response)
            })
            .catch(err => {
                response.sucess = false,
                    response.data = null,
                    response.errors = err
                res.status(404).send(response)
            })
    }
}


exports.updateNotes = (req, res) => {
    req.check('userId', 'userId invalid').isEmail()
    let errors = req.validationErrors()
    if (errors) {
        response.sucess = false,
            response.data = null,
            response.errors = errors
        res.status(422).send(response)
    } else {
        noteService.updateNotes(req)
            .then((notes) => {
                response.sucess = true,
                    response.data = notes,
                    response.errors = null
                res.status(200).send(response)
            })
            .catch(err => {
                response.sucess = false,
                    response.data = null,
                    response.errors = err
                res.status(404).send(responsess)
            })
    }
}