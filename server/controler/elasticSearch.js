const client = require('../middleware/elasticSearch')
exports.ping = () => {
    client.cluster.health({}, function (err, resp, status) {
        console.log("-- Client Health --", resp);
    });
}