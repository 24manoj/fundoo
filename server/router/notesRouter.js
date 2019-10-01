let noteRouter = require('express').Router();
let auth = require('../middleware/auth')
let notesController = require('../controller/notescontroller')
/** @description routes to specified endPoints */
noteRouter.post('/createNotes', auth.verifyUser, notesController.createNotes);
noteRouter.get('/getNotes', auth.verifyUser, notesController.getNotes)
noteRouter.put('/updateNotes', auth.verifyUser, notesController.updateNotes);
noteRouter.delete('/deleteNotes', auth.verifyUser, notesController.deleteNotes)
noteRouter.put('/noteTrash', auth.verifyUser, notesController.noteTrash);
noteRouter.put('/noteUnTrash', auth.verifyUser, notesController.noteUnTrash);
noteRouter.put('/noteArchive', auth.verifyUser, notesController.noteArchive);
noteRouter.put('/noteUnArchive', auth.verifyUser, notesController.noteUnArchive);
noteRouter.put('/noteReminder', auth.verifyUser, notesController.noteReminder);
noteRouter.put('/noteLabel', auth.verifyUser, notesController.noteLabel);
noteRouter.post('/createLabel', auth.verifyUser, notesController.createLabel)
noteRouter.delete('/deleteLabel', auth.verifyUser, notesController.deleteLabel)
noteRouter.put('/updateLabel', auth.verifyUser, notesController.updateLabel)
noteRouter.get('/getLabels', auth.verifyUser, notesController.getLabels)
noteRouter.post('/addCollaborate', auth.verifyUser, notesController.addCollaborate)
noteRouter.delete('/removeCollaborate', notesController.removeCollaborate)
noteRouter.put('/updateColor', auth.verifyUser, notesController.updateColor)
module.exports = noteRouter