/**@description importing required module */
const model = require('../app/modules/notesModule')
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return promise data
 */
exports.createNotes = (req) => {
    return new Promise((resolve, reject) => {
        model.createNotes(req)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return promise data
 */
exports.getNotes = (req) => {
    return new Promise((resolve, reject) => {
        model.getNotes(req)
            .then((notes) => {
                // console.log(notes)
                resolve(notes)
            })
            .catch(err => reject(err))
    })
}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains http requested data
 * @return promise data
 */
exports.addCollaborate = (req) => {
    return new Promise((resolve, reject) => {
        model.addCollaborate(req)
            .then((notes) => {
                // console.log(notes)
                resolve(notes)
            })
            .catch(err => reject(err))
    })
}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return promise data
 */
exports.updateNotes = (req) => {
    return new Promise((resolve, reject) => {
        model.updateNotes(req)
            .then(updated => resolve(updated))
            .catch(err => reject(err))
    })
}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return promise data
 */
exports.deleteNotes = (req) => {
    return new Promise((resolve, reject) => {
        model.deleteNotes(req)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return promise data
 */
exports.noteTrash = (req) => {
    return new Promise((resolve, reject) => {
        model.noteTrash(req)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return promise data
 */
exports.noteArchive = (req) => {
    return new Promise((resolve, reject) => {
        model.noteArchive(req)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return promise data
 */
exports.noteReminder = (req) => {
    return new Promise((resolve, reject) => {
        model.noteReminder(req)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return promise data
 */
exports.noteLabel = (req) => {
    return new Promise((resolve, reject) => {
        model.noteLabel(req)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return callback err or data
 */
exports.createLabel = async (req, callback) => {
    await model.createLabel(req, (err, data) => {
        if (err) callback(err)
        else callback(null, data)
    })

}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return promise data
 */
exports.updateLabel = (req) => {
    return new Promise((resolve, reject) => {
        model.updateLabel(req)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return promise data
 */
exports.deleteLabel = (req) => {
    return new Promise((resolve, reject) => {
        model.deleteLabel(req)
            .then(data => resolve(data))
            .catch(err => reject(err))
    })
}
/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return promise data
 */
exports.getLabels = (req) => {
    return new Promise((resolve, reject) => {
        model.getLabels(req)
            .then((data) => resolve(data))
            .catch((err) => reject(err))
    })
}

/**
 * @desc gets validated request from controller,serves to modules
 * @param req request contains all the requested data
 * @return promise data
 */
exports.removeCollaborate = (req) => {
    return new Promise((resolve, reject) => {
        model.removeCollaborate(req)
            .then((data) => resolve(data))
            .catch((err) => reject(err))
    })
}
