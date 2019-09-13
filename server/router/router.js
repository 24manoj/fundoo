/**@description importing modules */
let router = require('express').Router();
let controller = require('../controler/userController')
let auth = require('../middleware/auth')
let upload = require('../middleware/medialFile')

/** @description   routes to endPoints*/
router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/forgotPassword').post(controller.forgotPassword)
router.route('/resetPassword/:token').post(auth.verify, controller.resetPassword)
router.route('/upload').post(upload.single('image'), controller.fileUpload)

module.exports = router;