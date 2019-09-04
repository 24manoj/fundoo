const router = require('express').Router();
let notesController = require('../controler/notescontroller')
router.post('/createNotes', notesController.createNotes);
router.get('/getNotes', notesController.getNotes)
router.post('/updateNotes', notesController.updateNotes);
module.exports = router