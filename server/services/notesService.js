const model = require('../app/modules/notesModule')
exports.createNotes = (req) => {
    return new Promise((resolve, reject) => {
        model.createNotes(req)
            .then((data) => resolve(data))
            .catch((err) => reject(errr))
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