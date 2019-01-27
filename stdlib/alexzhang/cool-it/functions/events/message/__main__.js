const lib = require('lib')({token: process.env.STDLIB_TOKEN});
const offences = require('../../../functions/offences.js')
const doggo = require('../../doggo.js')
const connDB = require('../../connectToDb.js')
const rq = require('request-promise-native')
/**
* message event
*
*   All events use this template, simply create additional files with different
*   names to add event responses
*
*   See https://api.slack.com/events-api for more details.
*
* @param {string} user The user id of the user that invoked this event (name is usable as well)
* @param {string} channel The channel id the event was executed in (name is usable as well)
* @param {string} text The text contents of the event
* @param {object} event The full Slack event object
* @param {string} botToken The bot token for the Slack bot you have activated
* @returns {object}
*/



module.exports = async (user, channel, text = '', event = {}, botToken = null) => {
  
   if (text.match(/test_dog/)) {
     let toxicity = 0.8;
     if (toxicity > 0.7) {
       let numTimes = await offences(user);
       if (numTimes > 5) {
        return {
        channel: channel,
        text: `<@${user}> has been banned`
        }
       }
       let attachment = await doggo(toxicity, numTimes);
        return {
        channel: channel,
        attachments: attachment,
        text: ``
         }
     }
  }
/*
  if (text.match(/connect/)) {
    connDB();
    return {
      text: `connected to db`,
      attachments: [
        // You can customize your messages with attachments.
        // See https://api.slack.com/docs/message-attachments for more info.
      ]
    }
  }
  
  // Only send a response to certain messages
  /*if (text.match(/hey|hello|hi|sup/i)) {
    return {
      text: `Hey there! <@${user}> said ${text}`,
      attachments: [
        // You can customize your messages with attachments.
        // See https://api.slack.com/docs/message-attachments for more info.
      ]
    }
    
  } else {
    return {
              text: `ayy lmao`,
              attachments: []
            }*/
    let options = {
        uri: 'http://40.85.200.221:5000/api',
        method: 'POST',
        body: {
            "text": text
        },
        json: true
    }   
    let toxic = 0
    try {
      let res = await rq(options)
      let ret = res.toxic
      if (ret > 0.5) {
      let numTimes = await offences(user);
       if (numTimes > 5) {
        return {
        channel: channel,
        text: `<@${user}> has been banned`
        }
       }
       let attachment = await doggo(ret, numTimes);
        return {
        channel: channel,
        attachments: attachment,
        text: `<@${user}> ${ret}`//`<@${user}>  ${numTimes} offences`
         }
      
      }
        
      return {
        text: ret,
        attachments: []
      }
    } catch(err) {
          return {
              text: JSON.stringify(err),
              attachments: []
            }
    }
}
