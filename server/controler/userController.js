var services = require('../services/userServices')
var mailchecker = require('email-existence')
var token = require('../token')
var rediscache = require('../middleware/redisService')

var mail = require('../middleware/userMailer')
var response = {}
/**
 * @desc takes input ,error validation is done,passes request next services
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */
exports.register = (req, res) => {
    try {
        req.checkBody('firstName', 'firstName invalid').isAlpha().isLength({
            min: 4
        })
        req.checkBody('lastName', 'lastName invalid').isAlpha()
        req.checkBody('email', 'email invalid').isEmail()
        req.checkBody('password', 'password invalid').isLength({ min: 8 })
        let errors = req.validationErrors();

        if (errors) {
            response.errors = errors
            response.sucess = false
            res.status(422).send(response)
        }
        else {
            mailchecker.check(req.body.email, (error, result) => {
                if (result == false) {
                    response.data = null
                    response.errors = "Email is not valid"
                    response.sucess = false
                    res.status(404).send(response);
                }
                else {

                    services.register(req, (err, data) => {
                        if (err) {
                            response.data = null
                            response.errors = err
                            response.sucess = false
                            res.status(404).send(response);

                        }
                        else {
                            response.data = data
                            response.errors = null
                            response.sucess = true
                            res.status(200).send(response);
                        }
                    })
                }
            })
        }

    } catch (e) {
        console.log(e);
    }

}
/**
 * @desc takes input ,error validation is done,passes request next services
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */
exports.login = (req, res) => {
    try {
        req.checkBody('email', 'email invalid').isEmail()
        req.checkBody('password', 'password invalid').isLength({ min: 8 })
        let errors = req.validationErrors();
        if (errors) {
            response.data = null
            response.errors = errors
            response.sucess = false
            res.status(422).send(response);
        }
        else {
            services.login(req, (err, data) => {
                if (err) {
                    response.data = null
                    response.errors = err
                    response.sucess = false
                    res.status(404).send(response);

                } else {
                    response.errors = null
                    response.data = data
                    response.sucess = true

                    res.status(200).send(response);
                }
            })
        }
    } catch (e) {
        console.log(e);
    }

}
/**
 * @desc takes input ,error validation is done,passes request next services
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */

exports.forgotPassword = (req, res) => {
    try {
        req.checkBody('email', 'email invalid').isEmail()
        let errors = req.validationErrors();
        if (errors) {
            response.data = null
            response.errors = errors
            response.sucess = false
            res.status(422).send(response);
        }
        else {
            services.forgotPassword(req, (err, data) => {
                if (err) {
                    response.data = null
                    response.errors = err
                    response.sucess = false
                    res.status(404).send(response);
                }
                else {

                    token.generateToken(data._id, (err, token) => {
                        if (err) {

                            response.data = null
                            response.errors = err
                            response.sucess = false
                            res.status(404).send(response);
                        }
                        else {
                            mail.sendmail(data.email, (`${process.env.url}#!/resetPassword/?token=${token}`), (err, mail) => {
                                if (err) {

                                    response.data = null
                                    response.errors = err
                                    response.sucess = false
                                    res.status(404).send(response);
                                } else {
                                    response.data = mail
                                    response.errors = null
                                    response.sucess = true
                                    rediscache.setToken(token, (err, data) => {
                                        if (err) {
                                            console.log("token not instered to cache");
                                        } else {

                                            res.status(200).send(response);

                                        }
                                    })

                                }
                            })

                        }
                    })
                }

            })
        }


    } catch (e) {
        console.log(e)
    }
}
/**
 * @desc takes input ,error validation is done,passes request next services
 * @param req request contains all the requested data
 * @param res contains response from backend
 * @return return respose sucess or failure
 */
exports.resetPassword = (req, res) => {
    try {

        req.checkBody('password', 'password is not valid').isLength({ min: 8 })
        req.checkBody('confirmPassword', 'confirmPassword is not valid').isLength({ min: 8 })
        let errors = req.validationErrors();
        if (errors) {

            response.data = null
            response.errors = errors
            response.sucess = false
            res.status(422).send(response);
        }
        else {
            if (req.body.password == req.body.confirmPassword) {

                services.resetPassword(req, (err, data) => {
                    if (err) {
                        response.data = null
                        response.errors = err
                        response.sucess = false
                        res.status(404).send(response);
                    }
                    else {
                        response.data = data
                        response.errors = null
                        response.sucess = true

                    }
                })
            }
            else {
                response.data = null
                response.errors = "Passwords mis match"
                response.sucess = false
                res.status(404).send(response);
            }
        }
    } catch (e) {
        console.log(e)
    }
}