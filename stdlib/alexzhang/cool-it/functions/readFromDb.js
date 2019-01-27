const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb+srv://rankylau:18369012@cool-nfey6.mongodb.net/test"
/**
* Reads from DB
* @param {string} user_id userid
* @returns {any}
*/
module.exports = async (user_id) => {
  var toReturn;
  var con = await MongoClient.connect(url);
  let db = await con.db('Cool')
  let cursor = await db.collection('offences').find({'user_id': user_id+""});
  //console.log(await cursor.next())
  
      
  while (await cursor.hasNext()) {
    toReturn = await cursor.next();
  }
  await con.close()
  //console.log(toReturn)
  if (toReturn == null) {
    console.log("nullish read");
    return 0;
  }
  console.log("Read: " + toReturn);
  return toReturn.numOffense;
}