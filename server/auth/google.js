var passport = require('passport');
const user = require('../app/modules/userModule')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
//invokes when client is requesting for autherization,it encrypts the user details and requests for login
passport.serializeUser(function (user, done) {
    done(null, user);
});
//invokes when users autherizations is completed,it decrypts the data sent by provider
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
try {
    passport.use(new GoogleStrategy({
        /**? configuring  with details  */
        clientID: process.env.CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET,
        callbackURL: process.env.google_url,
        proxy: true
    },
        function (accessToken, refreshToken, profile, done) {
            console.log("google ==> ", profile)
            console.log("google===>", refreshToken)
            console.log("google===>", accessToken)
            const userData = {
                "firstName": profile.name.givenName,
                "lastName": profile.name.familyName,
                "email": profile.emails[0].value,
                "provider": profile.provider
            }
            //checks for the existance of user in database
            user.find(profile.emails[0].value)
                .then((data) => {
                    console.log("user exist");
                    done(null, data)
                })
                .catch((err) => {
                    //user not present save in database
                    user.save(userData)
                        .then((data) => {
                            console.log("user saved")
                            done(null, data)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
        }
    ));
} catch (e) {
    console.log(e)
}
module.exports = passport;