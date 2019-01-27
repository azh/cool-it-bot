function populateIndices(num, max) {
  var indices = [];
  while(indices.length < num){
    var r = Math.floor(Math.random()*max);
    if(indices.indexOf(r) === -1) indices.push(r);
  }
  return indices;
}

async function addImages(num, imageArr, name) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(
       {
         "fallback": "Something went wrong, but there should theoretically be a dog here",
         "image_url": `http://michaelxian.github.io/assets/nwhacks/${name}${imageArr[i]}.jpg`,
       }
    ); 
  }
  return arr;
}

/**
* Posts dogs appropriately
* @param {float} toxicity toxicity score
* @param {integer} numTimes times to post dog
* @returns {array}
*/
module.exports = async (toxicity, numTimes) => {
    var maxDogsHappy = 20;
    var maxDogsAngry = 10;
    var angryDogs = Math.max(0, numTimes - 3);
    var happyDogs = Math.min(numTimes, 3);
    if (toxicity > 0.84) {
      angryDogs = numTimes;
      happyDogs = 0;
    }
    var dogNums = populateIndices(happyDogs, maxDogsHappy);
    var angryNums = populateIndices(angryDogs, maxDogsAngry);
    let attachments = [];
    for (let i = 0; i < happyDogs; i++) {
    attachments.push(
       {
         "fallback": "Something went wrong, but there should theoretically be a dog here",
         "image_url": `http://michaelxian.github.io/assets/nwhacks/dog${dogNums[i]}.jpg`,
       }
    ); 
  }  
     for (let i = 0; i < angryDogs; i++) {
    attachments.push(
       {
         "fallback": "Something went wrong, but there should theoretically be a dog here",
         "image_url": `http://michaelxian.github.io/assets/nwhacks/angry${angryNums[i]}.jpg`,
       }
    ); 
  }      
    return attachments;
  }
