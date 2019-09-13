const elasticsearch = require('elasticsearch');
/**
 * @desc creates a connection for elasticsearch client
 */
const client = new elasticsearch.Client({
    host: 'http://localhost:9200'
});
/**
 * @desc creates index for search
 * @param req request contains http request from frontend
 * @param callback passes request back to invoked function
 * @return callback function err or data
 */
exports.createIndex = (req, callback) => {
    console.log("in")
    client.indices.create({
        'index': req.body.userId
    }, ((err, result, status) => {
        err ? callback(err) : callback(null, result)
    }))
}
/**
 * @desc  deletes  created index
 * @param req request contains http requested data
 */
exports.Documentdelete = (req) => {
    client.indices.delete({ index: req.body.userId })
        .then(data => console.log(data))
        .catch(err => console.log(err))
}
/**
 * @desc  adds details to searchdocument
 * @param req request contains http requested data
 */
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
        err ? console.log("failed operation", err) : console.log("sucessfully inserted to search")
    });
}
/**
 * @desc used wildcard to search for given charatcters
 * @param req request contains http requested data
 * @param callback calls invoked function with err or data
 */
exports.searchkey = (req, callback) => {
    let body = {
        query: {
            query_string: {
                query: `*${req.body.search}*`,
                analyze_wildcard: true,
                fields: ["title", "content", "labels", "id", "reminder"]
            }
        }
    }
    client.search({ index: req.body.userId, body: body, type: 'notes' })
        .then(searchresult => {
            console.log(searchresult.hits.hits.length)
            callback(null, searchresult)
        })
        .catch(err => {
            console.log(err)
            callback(err)
        })
}
