const labelSchema = require('../app/model/labelSchema')
const collSchema = require('../app/model/collaboraterSchema')
const noteSchema = require('../app/model/notesSchema')
/**
 * @desc gets validated request from services,performs database operations needed
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.createNotes = (req) => {
    try {
        console.log("in controler", req.body.reminder)

        return new Promise((resolve, reject) => {
            let noteDetails = new noteSchema.notes({
                "userId": req.decoded.id,
                "title": req.body.title,
                "content": req.body.content,
                "color": req.body.color,
                "isArchive": req.body.Archive,
                "labels": req.body.label,
                "reminder": (req.body.reminder !== undefined ? req.body.reminder + 1 : null)

            });
            //save data in collection
            noteDetails.save(noteDetails, (err, data) => {
                if (err) { reject(err) }
                else {
                    resolve(data)
                }
            })
        })
    } catch (e) {
        console.log(e)
    }
}

/**
 * @desc gets validated request from services,performs database operations needed
 * returns notes data present in database,based on conditions given
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.getNotes = (id) => {
    try {
        return new Promise((resolve, reject) => {
            noteSchema.notes.find({
                "userId": id,
                "isTrash": false,
                "isArchive": false,
            }, (err, notes) => {
                (err) ? reject(err) : resolve(notes)
            })
        })
    } catch (e) {
        console.log(e)
    }
}

/**
 * @desc gets validated request from services,performs database operations needed
 * updates collection data for given condition
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.updateNotes = (req) => {
    try {
        return new Promise((resolve, reject) => {
            noteSchema.notes.updateOne({
                _id: req.body.noteId
            }, {
                'title': req.body.title,
                'content': req.body.content
            }, (err, updated) => {
                if (err) reject(err)
                else resolve(updated)
            })
        })
    } catch (e) {
        console.log(e)
    }
}

/**
 * @desc gets validated request from services,performs database operations needed
 * updates collection data for given condition
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.updateColor = (req) => {
    try {
        return new Promise((resolve, reject) => {
            console.log(req.body.color);

            noteSchema.notes.updateOne({
                _id: req.body.noteId
            }, {
                'color': req.body.color,
            }, (err, updated) => {
                if (err) reject(err)
                else resolve(updated)
            })
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed
 *  removes data from the collection based on given condition
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.deleteNotes = (req) => {
    try {
        console.log("delete api", req.body)
        return new Promise((resolve, reject) => {
            noteSchema.notes.deleteOne({
                _id: req.body.id
            }, (err, deletd) => {
                if (err) reject(err)
                else resolve(deletd)
            })
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed
 *  updates isTrash attribute for given note id
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.noteTrash = (req) => {
    try {
        return new Promise((resolve, reject) => {
            noteSchema.notes.updateOne({
                '_id': req.body.id
            }, {
                isTrash: true
            }, (err, updated) => {
                if (err) reject(err)
                else resolve(updated)
            })
        })
    } catch (e) {
        console.log(e)
    }
}

/**
 * @desc gets validated request from services,performs database operations needed
 *  updates isTrash attribute for given note id
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.noteUnTrash = (req) => {
    try {
        return new Promise((resolve, reject) => {
            // console.log(req.body.trash)
            noteSchema.notes.update({
                '_id': req.body.id
            }, {
                isTrash: false
            }, (err, updated) => {
                if (err) reject(err)
                else resolve(updated)
            })
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed,
 * updates is Archive attribute ,on given condition
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.noteArchive = (req) => {
    try {
        return new Promise((resolve, reject) => {
            noteSchema.notes.updateOne({
                '_id': req.body.noteId
            }, {
                isArchive: true
            }, (err, updated) => {
                if (err) reject(err)
                else resolve(updated)
            })
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed,
 * updates is Archive attribute ,on given condition
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.noteUnArchive = (req) => {
    try {
        return new Promise((resolve, reject) => {
            noteSchema.notes.update({
                '_id': req.body.noteId
            }, {
                isArchive: false
            }, (err, updated) => {
                if (err) reject(err)
                else resolve(updated)
            })
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed,
 * updates reminder on given condition 
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.noteUndoReminder = (req) => {
    try {
        return new Promise((resolve, reject) => {
            noteSchema.notes.updateOne({
                '_id': req.body.noteId
            }, {
                reminder: null,
            }, (err, updated) => {
                if (err) reject(err)
                else resolve(updated)
            })
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed,
 * updates reminder on given condition 
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.noteReminder = (req) => {
    try {
        let date = new Date(req.body.reminder)
        return new Promise((resolve, reject) => {
            noteSchema.notes.update({
                '_id': req.body.noteId
            }, {
                reminder: date,
            }, (err, updated) => {
                if (err) reject(err)
                else resolve(updated)
            })
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed,
 * pushes Collaborates
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.addCollaborate = (req) => {
    try {

        return new Promise((resolve, reject) => {
            collSchema.colldata.findOne({
                noteId: req.body.noteId
            }, (err, found) => {
                if (err || found == null) {
                    let data = new collSchema.colldata({
                        noteId: req.body.noteId,
                        userId: req.decoded.id,
                        collaborateId: req.id
                    })
                    data.save((err, store) => {
                        if (err) reject(err)
                        else resolve(store)
                    })
                } else {
                    collSchema.colldata.updateOne({
                        noteId: found.noteId
                    }, {
                        $push: {
                            collaborateId: req.id
                        }
                    }, (err, update) => {
                        if (err) {
                            reject(err)
                        }
                        else {
                            resolve(update)
                        }

                    })
                }

            })

        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed,
 * updates labels attribute on given condition 
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.noteUndoLabel = (req) => {
    try {
        console.log("labelId", req.body.labelId)
        return new Promise((resolve, reject) => {
            noteSchema.notes.updateOne({
                _id: req.body.noteId
            }, {
                $pull: {
                    labels: {
                        id: req.body.labelId
                    }
                }

            }, (err, update) => {
                if (err) reject(err)
                else resolve(update)
                // }
            })

        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed,
 * updates labels attribute on given condition 
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.noteLabel = (req) => {
    try {
        console.log("label body", req.body.label.id, req.decoded.id, req.body.noteId)
        return new Promise((resolve, reject) => {
            noteSchema.notes.updateOne({
                _id: req.body.noteId
            }, {
                $push: {
                    labels: req.body.label
                }
            }, (err, update) => {
                if (err) {
                    console.log("err", err);
                    reject(err)
                }
                else {
                    console.log("updated", update);

                    resolve(update)
                }

            })
        })

    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed,
 * removes added collaboraters
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.removeCollaborate = (req) => {
    try {
        console.log('in module')
        return new Promise((resolve, reject) => {
            collSchema.colldata.updateOne({
                noteId: req.body.noteId
            }, {
                $pull: { collaborateId: req.body.collaborateId }
            }, (err, removed) => {
                console.log(err, removed)
                if (err) reject(err)
                else resolve(removed)
            })
        })
    } catch (e) {
        console.log(e)
    }
}

/**
 * @desc gets validated request from services,performs database operations needed
 *  stores data in collection 
 * @param req request contains http request
 * @return returns  a callback function
 */
exports.createLabel = async (req, callback) => {
    try {
        const data = new labelSchema.labels({
            "userId": req.decoded.id,
            "labelName": req.body.labelName
        })
        await data.save((err, data) => {
            if (err) callback(err)
            else callback(null, data)
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed
 * updates the changes of label 
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.updateLabel = (req) => {
    try {
        return new Promise((resolve, reject) => {
            labelSchema.labels.updateOne({
                '_id': req.body.id
            }, {
                'labelName': req.body.labelName
            }, (err, update) => {
                if (err) reject(err)
                else resolve(update)
            })
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed,
 * deletes label data for specified label ids
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.deleteLabel = (req) => {
    try {
        return new Promise((resolve, reject) => {
            labelSchema.labels.deleteOne({
                '_id': req.body.id
            }, (err, update) => {
                if (err) reject(err)
                else resolve(update)
            })
        })
    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc gets validated request from services,performs database operations needed,
 * finds labels data from database 
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.getLabels = (req) => {
    try {
        console.log("get labels", req.decoded.id);

        return new Promise((resolve, reject) => {
            labelSchema.labels.find({
                'userId': req.decoded.id
            }, (err, labels) => {
                if (err) reject(err)
                else {
                    console.log("labels", labels)
                    resolve(labels)
                }
            })
        })
    } catch (e) {
        console.log(e)
    }
}
