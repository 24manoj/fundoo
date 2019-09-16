var passport = require('passport');
const user = require('../app/model/userModel')
var GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
try {
    //invokes when client is requesting for autherization,it encrypts the user details and requests for login
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    //invokes when users autherizations is completed,it decrypts the data sent by provider
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    }); /**? configuring  with details  */
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
        proxy: true
    },
        function (accessToken, refreshToken, profile, done) {
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
                            done(null, "da")
                        })
                })
        }
    ));
} catch (e) {
    console.log(e)
}
module.exports = passport;