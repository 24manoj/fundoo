try {
    //importing express router
    let router = require('express').Router();
    let controller = require('../controler/userController')
    let auth = require('../middleware/auth')
    let upload = require('../middleware/medialFile')


    //routes to specified fouction when mentioned endpoint hits
    router.route('/register').post(controller.register)
    router.route('/login').post(controller.login)
    router.route('/forgotPassword').post(controller.forgotPassword)
    router.route('/resetPassword/:token').post(auth.verify, controller.resetPassword)
    router.route('/upload').post(upload.single('image'), controller.fileUpload)
    
    module.exports = router
} catch (e) {
    console.log(e);
}