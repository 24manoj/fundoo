let mongoose = require('mongoose')
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
exports.colldata = mongoose.model("collaborates", collaborateData)