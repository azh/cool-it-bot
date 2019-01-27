// Retrieve
const MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
// Connect to the db
function create(user_id,lastOffense,numOffense) {
    MongoClient.connect("mongodb+srv://rankylau:18369012@cool-nfey6.mongodb.net/test?retryWrites=true", function (err, client) {
        var db = client.db('Cool');
        var doc1 = {
            'user_id': user_id + "",
            'lastOffense': lastOffense,
            'numOffense': numOffense
        };
        db.collection('offences').insert(doc1);
        if (!err) {
            console.log("We are connected");
        }
        client.close()
    });
}
// Connect to the db
function remove(user_id) {
    MongoClient.connect("mongodb+srv://rankylau:18369012@cool-nfey6.mongodb.net/test?retryWrites=true", function (err, client) {
        var db = client.db('Cool');
        db.collection('offences').remove({"user_id":user_id + ""});
        if (!err) {
            console.log("We are connected");
        }
        client.close()
    });
}
function update(user_id,lastOffense,numOffense) {
    MongoClient.connect("mongodb+srv://rankylau:18369012@cool-nfey6.mongodb.net/test?retryWrites=true", function (err, client) {
        var db = client.db('Cool');
        db.collection('offences').updateOne({"user_id":user_id + ""},
            {
                $set: { "lastOffense": lastOffense, "numOffense": numOffense }
            });
        if (!err) {
            console.log("We are connected");
        }
        client.close()
    });
}
function read(user_id) {
    var toReturn;
    MongoClient.connect("mongodb+srv://rankylau:18369012@cool-nfey6.mongodb.net/test?retryWrites=true", async function (err, client) {
        var db = client.db('Cool');
        toReturn = await db.collection('offences').findOne({"user_id": user_id}, {
            user_id: 1,
            lastOffense: 1,
            numOffense: 1
        });
        console.log(toReturn)
        if (!err) {
            console.log("We are connected");
        }
        client.close()
    });
    return toReturn;
}