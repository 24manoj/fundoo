let express = require('express');
let router = express.Router();
let cors = require('cors')
let passportGoogle = require('../auth/google');
/** @description  initates the coonection for login with google*/
router.get('/google', cors(),
    passportGoogle.authenticate('google', { scope: ['profile', 'email'] })
);
/** @description Handles callback from google accoutnts */
router.get('/google/callback', cors(),
    passportGoogle.authenticate('google', { failureRedirect: "/", session: false }),
    function (req, res) {
        res.json({ msg: "with corss" })
        res.redirect("http://localhost:3000/dashboard");

    });
module.exports = router