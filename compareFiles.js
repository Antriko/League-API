var fs = require("fs");

nameOne = "Antriko"
nameTwo = "Quelly"
fileOne = fs.readFileSync(nameOne + ".txt").toString('utf-8');
fileTwo = fs.readFileSync(nameTwo + ".txt").toString('utf-8');

arrOne = fileOne.split("\n")
arrTwo = fileTwo.split("\n")

dupes = arrOne.filter(val => {
    return arrTwo.indexOf(val) == -1;
    // !arrTwo.includes(val)
})

console.log(`${nameOne}: ${arrOne.length}\n${nameTwo}: ${arrTwo.length}\nTotal games together: ${dupes.length}\n${(dupes.length/arrOne.length * 100).toFixed(2)}% ${(dupes.length/arrTwo.length * 100).toFixed(2)}%`)