var mailer = require('nodemailer')

exports.sendmail = (mailReciver, value, callback) => {
    var transpoter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });
    var mailoptions = {
        from: 'manoj.mk.24.mk@gmail.com',
        to: mailReciver,
        subject: "Reset passowrd",
        text: value
    }
    transpoter.sendMail(mailoptions, (err, mail) => {
        if (err) {
            callback(err)
        }
        else {
            callback(null, mail)
        }
    })
}