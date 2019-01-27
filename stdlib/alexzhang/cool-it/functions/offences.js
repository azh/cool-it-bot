const readFromDb = require('../functions/readFromDb.js');
const addToDb = require('../functions/addToDb.js');

//var offences = []; // [ [user, lastOffence, numOffences] , [...] ]

  // function cleanOffences(mins) {
  //   var curTime = new Date().getTime();                  // Get current time
  //   var timeout = mins * 60000;
  //   for (var i = offences.length - 1; i >= 0; i--) {
  //    if ( (curTime - offences[i][1]) > timeout) {        // If time between offences is large enough
  //       offences.splice(i,1);                            // Remove the offender
  //    }
  //    }
  // }

  // function indexOfOffender(usr) {
  //   for (var i = 0; i < offences.length; i++) {  // Loop through the array
  //     if (offences[i][0] == usr) {               // If the username of the offender is the same as usr
  //       return i;                                // Return the index
  //     }
  //   }
  //   return -1;                                   // If not found, return -1
  // }

/**
* Reads from DB
* @param {string} usr userid
* @returns {any}
*/
module.exports = async usr => {
  var numOffences = await readFromDb(usr);
  //console.log(numOffences);
  numOffences++;
  var curTime = new Date().getTime();          // Get current time
  addToDb(usr, curTime, numOffences);
  return numOffences;
}

