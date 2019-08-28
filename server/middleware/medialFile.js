const aws = require('aws-sdk')
const multer = require("multer");
const multers3 = require('multer-s3')
require('dotenv').config();
// exports.upload = (req, next) => {
// console.log('in')
const s3 = new aws.s3({
    acessKeyId: process.env.acessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'us-east-2'
});

// const fileFilter

const upload = multer({
    // fileFilter,
    storage: multers3({
        s3,
        bucket: process.env.Bucket,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_META_DATA' });
            // console.log(file.fieldname)
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})
module.exports = upload; 