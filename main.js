const axios = require('axios');
const writeJsonFile = require('write-json-file');
require('dotenv').config()

apiKey = process.env.API_KEY    // https://developer.riotgames.com/
summonerName = 'Antriko'
region = 'euw1'


function getRequest(path) {
    return new Promise(function (resolve, reject) {
        axios.get(path)
        .then(e => resolve(e.data))
        .catch(e => {console.log(path);reject(e)})
    }
    )
}

async function main() {
    data = [];
    promises = [];
    account = await getRequest('https://' + region + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName + '?api_key=' + apiKey)
    loopAmount = await getRequest('https://' + region + '.api.riotgames.com/lol/match/v4/matchlists/by-account/' + account.accountId + '?api_key=' + apiKey + '&beginIndex=100')    // limited to 100 entries per query so loop through total games/100 then round up
    console.log("Total games found: " + loopAmount.totalGames, Math.ceil(loopAmount.totalGames/100)) 
    for (var i = 0; i < Math.ceil(loopAmount.totalGames/100); i++) {    // there is probably a more efficient way to loop through but it works
        console.log(i);
        promises.push(
            await getRequest('https://' + region + '.api.riotgames.com/lol/match/v4/matchlists/by-account/' + account.accountId + '?api_key=' + apiKey + '&beginIndex=' + 100*i)
            .catch(e => console.log('error in promise', e))
        )
    }

    Promise.all(promises)
    .then(function (results) {
        results.forEach(function (response) {
            data = data.concat(response.matches)
        })
    })
    .then(() => {
        (async () => {
            await writeJsonFile('summoners/' + summonerName + '.json', data);
        })();
    })
    .catch(e => console.log('error in promiseall ', e))
}

main();