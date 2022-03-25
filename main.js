const axios = require('axios');
const fs = require('fs');
require('dotenv').config()

apiKey = process.env.API_KEY    // https://developer.riotgames.com/
summonerName = 'Antriko'
region = 'euw1'
writeStream = fs.createWriteStream(`${summonerName}.txt`)


function getRequest(path) {
    return new Promise(function (resolve, reject) {
        axios.get(path)
        .then(e => resolve(e.data))
        .catch(e => {console.log(path);reject(e)})
    }
    )
}

(async () => {
    data = [];
    matchIDs = [];

    account = await getRequest('https://' + region + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName + '?api_key=' + apiKey)
        .catch(e => console.log("account"))

    loop = 0
    count = 100
    while(true) {
        matches = await getRequest(`https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${account.puuid}/ids?start=${loop*count}&count=${count}&api_key=${apiKey}`)
            .catch(e => console.log(e, "matches"))
        loop++
        matchIDs = matchIDs.concat(matches)
        if (matches.length < count) {
            break
        }
    }

    console.log("Account:", account)
    console.log("Amount of matches:", matchIDs.length)


    matchIDs.forEach( val => {
        writeStream.write(`${val}\n`)
    })
    writeStream.on("finish", () => {
        writeStream.end();
    })

    // RATE LIMITS
    // 20 requests every 1 seconds(s)
    // 100 requests every 2 minutes(s)
    
    // Better to compare matchIDs instead

    newestMatch = await getRequest(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchIDs[0]}?api_key=${apiKey}`)
        .catch(e => console.log(e, "matches"))
    oldestMatch = await getRequest(`https://europe.api.riotgames.com/lol/match/v5/matches/${matchIDs[matchIDs.length-1]}?api_key=${apiKey}`)
        .catch(e => console.log(e, "matches"))

    console.log(new Date(oldestMatch.info.gameCreation).toLocaleDateString("en-GB"), "to", new Date(newestMatch.info.gameCreation).toLocaleDateString("en-GB"))
})();