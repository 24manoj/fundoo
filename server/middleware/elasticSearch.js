const elasticsearch = require('elasticsearch');
const esClient = new elasticsearch.Client({
    host: 'http://localhost:9200',
    log: 'error'
});

exports.ping = (req, res) => {
    esClient.ping({
        requestTimeout: 30000,
    }, (error) => {
        if (error) {
            res.status(500).send("down")
            //res.json({ status: false, msg: 'Elasticsearch cluster is down!' })
        } else {
            res.status(200).send("up")
            // res.json({ status: true, msg: 'Success! Elasticsearch cluster is up!' })
        }
    });
}
