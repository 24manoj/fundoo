const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'http://localhost:9200'
});

exports.createIndex = (req, callback) => {
    client.indices.create({
        'index': req.body.userId
    }, ((err, result, status) => {
        if (err) {
            callback(err)
        }
        else {
            callback(null, result)
        }
    }))
}
exports.addDocument = (req) => {
    let bulk = [];
    req.forEach((element, key) => {
        bulk.push({
            index: {
                _index: element.userId,
                _type: "notes"
            }
        })
        let data = {
            "id": element._id,
            "title": element.title,
            "content": element.content,
            "labels": element.labels
        }
        bulk.push(data)
        data = " "
    });

    //perform bulk indexing of the data passed
    client.bulk({ body: bulk }, (err, response) => {
        if (err) {
            console.log("Failed Bulk operation", err)
        } else {
            console.log("Sucessfully inserted to elastic");
        }
    });
}

exports.searchkey = (req, callback) => {
    let body = {
        "query": {
            
                "query_string": {
                    "query": `*${req.body.search}*`,
                    "analyze_wildcard": true,
                    "default_operator": "AND"
                }
                // "fields": ["title", "content", "labels", "id"]
            // }
        }
        // "_source": ["title", "content", "labels"]
    }



    client.search({ index: req.body.userId, body: body, type: 'notes' })
        .then(searchresult => {
            console.log(searchresult)
            callback(null, searchresult)
        })
        .catch(err => {
            console.log(err)
            callback(err)
        })

}

    // exports.ping = (req, res) => {
    //     esClient.ping({
    //         requestTimeout: 30000,
    //     }, (error) => {
    //         if (error) {
    //             res.status(500).send("down")
    //             //res.json({ status: false, msg: 'Elasticsearch cluster is down!' })
    //         } else {
    //             res.status(200).send("up")
    //             // res.json({ status: true, msg: 'Success! Elasticsearch cluster is up!' })
    //         }
    // });

