const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connDb = require('../functions/connectToDb.js');
const read = require('../functions/readFromDb');

const url = "mongodb+srv://rankylau:18369012@cool-nfey6.mongodb.net/test"

function create(user_id,lastOffense,numOffense) {
  console.log("Begin create");
    MongoClient.connect("mongodb+srv://rankylau:18369012@cool-nfey6.mongodb.net/test?retryWrites=true", function (err, client) {
        console.log("Begin db");
        var db = client.db('Cool');
        //db.collection("offences").ensureIndex({user_id: 1}, {unique: true, dropDups: true});
        var doc1 = {
            'user_id': user_id + "",
            'lastOffense': lastOffense,
            'numOffense': numOffense,
            'expiresAfterSeconds' : 60
        };
        console.log("Done doc1");
        db.collection('offences').insert(doc1);
        console.log("Done insert");
        if (!err) {
            console.log("Create, offences: " + numOffense + "\n");
        }
        client.close();
    });
}


async function update(user_id,lastOffense,numOffense) {
  let client = await MongoClient.connect(url);
  let db = await client.db('Cool');
  //db.collection("offences").ensureIndex({user_id: 1}, {unique: true, dropDups: true});
        db.collection('offences').updateOne({"user_id":user_id + ""},
            {
                $set: { "lastOffense": lastOffense, "numOffense": numOffense, 'expiresAfterSeconds' : 60  }
            });
        console.log("Update, offences:" + numOffense + "\n");
        client.close();
}


/**
* Adds to DB
* @param {string} user user
* @param {integer} lastModified unix timestamp of last modification
* @param {integer} numOffences number of offences committed
* @returns {any}
*/

module.exports = async (user, lastModified, numOffences) => {
  console.log("User ID (addToDb): " +  user);
  //var result = await read(user);
  //console.log("Result (addToDb)" + result);
  if (numOffences == 1) {
    console.log("Create");
    create(user, lastModified, numOffences);
  } else {
    console.log("Update");
    update(user, lastModified, numOffences); 
  }
}