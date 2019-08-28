try {
    //importing express router
    var router = require('express').Router();
    var controller = require('../controler/userController')
    var auth = require('../middleware/auth')
    var upload = require('../middleware/medialFile')
    var rediscache = require('../middleware/redisService')
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