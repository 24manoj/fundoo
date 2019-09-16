const mongoose = require('mongoose')
/**@description schema for notes */
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


/**@description schema for collaborate */
const collaborateData = mongoose.Schema({
    collaborateId: [{
        type: String,
        required: true,
        unique: true
    }], noteId: {
        type: String
    }, userId: {
        type: String
    }
})
/** @description schema for storing labels in database */
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

let registration = new mongoose.Schema({
    "firstName": {
        type: String,
        required: true
    },
    "lastName":
    {
        type: String
    },
    "email":
    {
        type: String,
        required: true,
        unique: true
    }
    , "password":
    {
        type: String

    },

    "provider": {
        type: String
    }

}, {
    timestamps: true
})
//creating model of schema
const s3Upload = new mongoose.Schema({

    "user": {
        type: String,
        required: true
    },
    "url":
    {
        type: String,
        required: true
    }
}, {

    timestamps: true

})
exports.userRegistration = mongoose.model('userRegistration', registration);
exports.fileUpload = mongoose.model("fileUploads", s3Upload);
exports.labels = mongoose.model("label", label)
exports.colldata = mongoose.model("collaborates", collaborateData)
exports.notes = mongoose.model('notes', note)