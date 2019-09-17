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
exports.notes = mongoose.model('notes', note)