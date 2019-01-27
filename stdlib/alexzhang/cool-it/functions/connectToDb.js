const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


/**
* Connects to DB
* @param {string} user_id userid
* @param {integer} lastOffense unix timestamp of last offense
* @param {integer} numOffense offenses committed without cooldown
* @returns {any}
*/
module.exports = (user_id, lastOffense, numOffense, callback) => {
    MongoClient.connect("mongodb+srv://rankylau:18369012@cool-nfey6.mongodb.net/test?retryWrites=true", function (err, client) {
        var db = client.db('Cool');
        if (!err) {
            callback(null, "We are connected");
        } else {
          callback(null, err)
        }
        client.close()
    });
}