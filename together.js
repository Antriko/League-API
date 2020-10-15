const fs = require('fs')
const writeJsonFile = require('write-json-file');

// how many games two summoners have together

summonerOne = "Antriko"
summonerTwo = "Quataba" // make sure you have already gotten their data from main.js

One = JSON.parse(fs.readFileSync('summoners/' + summonerOne + '.json'))
Two = JSON.parse(fs.readFileSync('summoners/' + summonerTwo + '.json'))

together = [];
for (i = 0; i < One.length; i++) {
    for (j = 0; j < Two.length; j++) {
        if (One[i].gameId == Two[j].gameId) {
            together.push(One[i].gameId)
        }
    }
}

console.log("Amount of games played together: " + together.length);
(async () => {
    await writeJsonFile('together/' + summonerOne + '_' + summonerTwo + '.json', together);
})();   // all the gameIDs will be saved here