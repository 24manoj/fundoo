const router = require('express').Router();
let notesController = require('../controler/notescontroller')
router.post('/createNotes', notesController.createNotes);
router.get('/getNotes', notesController.getNotes)
router.post('/updateNotes', notesController.updateNotes);
router.post('/deleteNotes', notesController.deleteNotes)
router.post('/noteTrash', notesController.noteTrash);
router.post('/noteArchive', notesController.noteArchive);
router.post('/noteReminder', notesController.noteReminder);
module.exports = router