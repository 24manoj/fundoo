let noteRouter = require('express').Router();
let auth = require('../middleware/auth')
let notesController = require('../controller/notescontroller')
/** @description routes to specified endPoints */
noteRouter.post('/createNotes', auth.verifyUser, notesController.createNotes);
noteRouter.get('/getNotes', auth.verifyUser, notesController.getNotes)
noteRouter.put('/updateNotes', notesController.updateNotes);
noteRouter.delete('/deleteNotes', notesController.deleteNotes)
noteRouter.put('/noteTrash', notesController.noteTrash);
noteRouter.put('/noteUnTrash', notesController.noteUnTrash);
noteRouter.put('/noteArchive', notesController.noteArchive);
noteRouter.put('/noteUnArchive', notesController.noteUnArchive);
noteRouter.put('/noteReminder', notesController.noteReminder);
noteRouter.put('/noteLabel', notesController.noteLabel);
noteRouter.post('/createLabel', auth.verifyUser, notesController.createLabel)
noteRouter.delete('/deleteLabel', notesController.deleteLabel)
noteRouter.put('/updateLabel', notesController.updateLabel)
noteRouter.get('/getLabels', auth.verifyUser, notesController.getLabels)
noteRouter.post('/addCollaborate', auth.verifyUser, notesController.addCollaborate)
noteRouter.delete('/removeCollaborate', notesController.removeCollaborate)
module.exports = noteRouter