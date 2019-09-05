const model = require('../app/modules/notesModule')
exports.createNotes = (req) => {
    return new Promise((resolve, reject) => {
        model.createNotes(req)
            .then((data) => resolve(data))
            .catch((err) => reject(err))
    })

}
exports.getNotes = (req) => {
    return new Promise((resolve, reject) => {
        model.getNotes(req)
            .then((notes) => resolve(notes))
            .catch(err => reject(err))
    })
}
exports.updateNotes = (req) => {
    return new Promise((resolve, reject) => {
        model.updateNotes(req)
            .then(updated => resolve(updated))
            .catch(err => reject(err))
    })
}
exports.deleteNotes = (req) => {
    return new Promise((resolve, reject) => {
        model.deleteNotes(req)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
exports.noteTrash = (req) => {
    return new Promise((resolve, reject) => {
        model.noteTrash(req)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
exports.noteArchive = (req) => {
    return new Promise((resolve, reject) => {
        model.noteArchive(req)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}

exports.noteReminder = (req) => {
    return new Promise((resolve, reject) => {
        model.noteReminder(req)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
