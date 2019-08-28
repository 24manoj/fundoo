const aws = require('aws-sdk')
const multer = require("multer");
const multers3 = require('multer-s3')
require('dotenv').config();

const s3 = new aws.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'us-east-2'
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error("not a valid format"), false)
    }
}


const upload = multer({
    fileFilter,
    storage: multers3({
        s3: s3,
        bucket: 'fundoonotess3',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_META_DATA' });
        },
        key: function (req, file, cb) {

            cb(null, file.originalname)
        }
    })
})
module.exports = upload; 