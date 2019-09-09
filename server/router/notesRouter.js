let noteRouter = require('express').Router();
let notesController = require('../controler/notescontroller')
/** @description routes to specified endPoints */
noteRouter.post('/createNotes', notesController.createNotes);
noteRouter.get('/getNotes', notesController.getNotes)
noteRouter.post('/updateNotes', notesController.updateNotes);
noteRouter.post('/deleteNotes', notesController.deleteNotes)
noteRouter.post('/noteTrash', notesController.noteTrash);
noteRouter.post('/noteArchive', notesController.noteArchive);
noteRouter.post('/noteReminder', notesController.noteReminder);
noteRouter.post('/noteLabel', notesController.noteLabel);
noteRouter.post('/createLabel', notesController.createLabel)
noteRouter.post('/deleteLabel', notesController.deleteLabel)
noteRouter.post('/updateLabel', notesController.updateLabel)
noteRouter.get('/getLabels', notesController.getLabels)
module.exports = noteRouter