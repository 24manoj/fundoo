var express = require('express');
var router = express.Router();
var cors = require('cors')
var passportGoogle = require('../auth/google');
/* initates the coonection for login with google*/
router.get('/google',
    passportGoogle.authenticate('google', { scope: ['profile', 'email'] })
);
/**Handles callback from google accoutnts */
router.get('/google/callback',
    passportGoogle.authenticate('google', { failureRedirect: "/", session: false }),
    function (req, res) {
        var token = req.user.token;
        res.redirect("http://localhost:3000/dashboard");

    });
module.exports = router