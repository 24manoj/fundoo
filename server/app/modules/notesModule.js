const mongoose = require('mongoose')
const note = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    isArchive: {
        type: Boolean,
        default: false
    },
    isTrash: {
        type: Boolean,
        default: false
    }


}, {
        timestamps: true
    })

const notes = mongoose.model('notes', note)

exports.createNotes = (req) => {
    return new Promise((resolve, reject) => {
        let noteDetails = new notes({
            "userId": req.body.userId,
            "title": req.body.title,
            "content": req.body.content

        });
        console.log("user details==>", noteDetails)
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
            "isArchive": false
        }, (err, notes) => {
            if (err || notes.length <= 0) reject(err)
            else resolve(notes)
        })
    })
}
exports.updateNotes = (req) => {
    return new Promise((resolve, reject) => {
        if (req.body.content != null) {
            notes.update({
                'userId': req.body.userId
            }, {
                    'content': req.body.content

                }, (err, updated) => {
                    if (err) reject(err)
                    else resolve(updated)
                })
        } else {
            notes.update({
                'userId': req.body.userId
            }, {
                    'isArchive': req.body.isArchive,
                    'isTrash': req.body.isTrash

                }, (err, updated) => {
                    if (err) reject(err)
                    else resolve(updated)
                })

        }
    })

}
