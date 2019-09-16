
const schema = require('./schema')
/**
 * @desc gets validated request from services,performs database operations needed
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.createNotes = (req) => {
    try {
        return new Promise((resolve, reject) => {
            let noteDetails = new schema.notes({
                "userId": req.body.userId,
                "title": req.body.title,
                "content": req.body.content

            });
            //save data in collection
            noteDetails.save(noteDetails, (err, data) => {
                if (err) { reject(err) }
                else { resolve(data) }
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
exports.getNotes = (req) => {
    try {
        console.log("in module")
        return new Promise((resolve, reject) => {
            notes.find({
                "userId": req.body.userId,
                "isTrash": false,
                "isArchive": false,
            }, (err, notes) => {
                (err | notes.length <= 0) ? reject(err) : resolve(notes)
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
            notes.updateOne({
                _id: req.body.id
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
 *  removes data from the collection based on given condition
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.deleteNotes = (req) => {
    try {
        return new Promise((resolve, reject) => {
            console.log(req.body.id)
            notes.deleteOne({
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
            // console.log(req.body.trash)
            notes.update({
                '_id': req.body.id
            }, {
                isTrash: req.body.trash,
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
            notes.update({
                '_id': req.body.id
            }, {
                isArchive: req.body.archive,
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
        let date = new Date(req.body.date)
        console.log(date, req.body.date)
        return new Promise((resolve, reject) => {
            notes.update({
                '_id': req.body.id
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
        console.log(req.id, req.body.id)
        return new Promise((resolve, reject) => {
            colldata.findOne({
                noteId: req.body.noteId
            }, (err, found) => {
                console.log(found)
                if (err || found == null) {
                    let data = new schema.colldata({
                        noteId: req.body.noteId,
                        userId: req.body.userId,
                        collaborateId: req.id
                    })
                    data.save((err, store) => {
                        if (err) reject(err)
                        else resolve(store)
                    })
                } else {
                    colldata.updateOne({
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
exports.noteLabel = (req) => {
    try {
        console.log(req.body.label)
        return new Promise((resolve, reject) => {
            notes.updateOne({
                _id: req.body.id
            }, {
                $push: {
                    labels: req.body.label
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
 * removes added collaboraters
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.removeCollaborate = (req) => {
    try {
        console.log('in module')
        return new Promise((resolve, reject) => {
            colldata.updateOne({
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
        const data = new schema.labels({
            "userId": req.body.userId,
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
            labels.updateOne({
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
            labels.deleteOne({
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
        return new Promise((resolve, reject) => {
            labels.find({
                'userId': req.body.userId
            }, (err, update) => {
                if (err) reject(err)
                else {
                    console.log(update)
                    resolve(update)
                }
            })
        })
    } catch (e) {
        console.log(e)
    }
}
