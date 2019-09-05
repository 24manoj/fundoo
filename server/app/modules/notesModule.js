const mongoose = require('mongoose')
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
    lables: [{
        type: String
    }]
}, {
        timestamps: true
    })

const notes = mongoose.model('notes', note)

exports.createNotes = (req) => {
    return new Promise((resolve, reject) => {
        let noteDetails = new notes({
            "userId": req.body.userId,
            "title": req.body.title,
            "content": req.body.content,
            "reminder": req.body.date

        });
        noteDetails.save(noteDetails, (err, data) => {
            if (err) { reject(err) }
            else { console.log(data); resolve(data) }
        })
    })
}

exports.getNotes = (req) => {
    return new Promise((resolve, reject) => {

        notes.find({
            "userId": req.body.userId,
            "isTrash": false,
            "isArchive": false,
        }, (err, notes) => {
            if (err || notes.length <= 0) reject(err)
            else resolve(notes)
        })

    })

}

exports.updateNotes = (req) => {
    return new Promise((resolve, reject) => {
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

}

exports.deleteNotes = (req) => {
    return new Promise((resolve, reject) => {
        notes.deleteOne({
            _id: req.body.id,
            isArchive: false,
            isTrash: true
        }, (err, deletd) => {
            if (err) reject(err)
            else resolve(deletd)
        })

    })
}

exports.noteTrash = (req) => {
    return new Promise((resolve, reject) => {
        notes.update({
            '_id': req.body.id
        }, {
                isTrash: req.body.trash,
            }, (err, updated) => {
                if (err) reject(err)
                else resolve(updated)
            })
    })

}

exports.noteArchive = (req) => {
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

}
exports.noteReminder = (req) => {
    return new Promise((resolve, reject) => {
        notes.update({
            '_id': req.body.id
        }, {
                reminder: req.body.date,
            }, (err, updated) => {
                if (err) reject(err)
                else resolve(updated)
            })
    })
}