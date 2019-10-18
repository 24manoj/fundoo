// Load the AWS SDK for Node.js
require('dotenv').config();
console.log("process", process.env.URL);

const AWS = require('aws-sdk');
AWS.config.getCredentials((err) => {
    if (err) {
        console.log(err);

    } else {
        console.log(AWS.config.credentials)
    }
})
// Set region
AWS.config.update({ region: 'us-east-2' });
console.log("Topic", process.env.AWS_TOPIC_ARN);

// Create publish parameters
let params = {
    Message: 'demo', /* required */
    TopicArn: process.env.AWS_TOPIC_ARN
};

// Create promise and SNS service object
let publishTextPromise = new AWS.SNS().publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
    function (data) {
        console.log(`message ${params.Message} send sent to the topic ${params.TopicArn}`);
        console.log("MessageID is ", data.MessageId);
    }).catch(
        function (err) {
            console.error(err, err.stack);
        });