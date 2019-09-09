const mongoose = require('mongoose')
//creating schema for note
const note = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    isTrash: {
        type: Boolean,
        default: false
    },
    reminder: {
        type: Date
    },
    labels: [{
        type: String
    }]
}, {
    timestamps: true
})
const notes = mongoose.model('notes', note)
/**
 * @desc gets validated request from services,performs database operations needed
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.createNotes = (req) => {
    try {
        return new Promise((resolve, reject) => {
            let noteDetails = new notes({
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
        return new Promise((resolve, reject) => {
            notes.find({
                "userId": req.body.userId,
                "isTrash": false,
                "isArchive": false,
            }, (err, notes) => {
                console.log(notes)
                if (err || notes.length <= 0) reject(err)
                else resolve(notes)
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
            console.log(req.body)
            notes.update({
                '_id': req.body.id
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
            notes.findOneAndDelete({
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
 * updates labels attribute on given condition 
 * @param req request contains http request
 * @return returns  promise data resolve or reject
 */
exports.noteLabel = (req) => {
    try {
        console.log(req.body.labels)
        return new Promise((resolve, reject) => {
            notes.findOneAndUpdate({
                _id: req.body.id
            }, {
                labels: req.body.labels
            }, (err, update) => {
                if (err) reject(err)
                else resolve(update)
            })
        })
    } catch (e) {
        console.log(e)
    }
}
/** schema for storing labels in database */
const label = new mongoose.Schema
    ({
        "userId": {
            type: String,
            required: true
        },
        "labelName": {
            type: String,
            required: true
        }
    }, {
        timestamps: true
    })
const labels = mongoose.model("label", label)
/**
 * @desc gets validated request from services,performs database operations needed
 *  stores data in collection 
 * @param req request contains http request
 * @return returns  a callback function
 */
exports.createLabel = async (req, callback) => {
    try {
        const data = new labels({
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
            labels.update({
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
            labels.findOneAndDelete({
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
                else resolve(update)
            })
        })
    } catch (e) {
        console.log(e)
    }
}
