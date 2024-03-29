var fs = require("fs");

nameOne = "Antriko"
nameTwo = "Quelly"
fileOne = fs.readFileSync(nameOne + ".txt").toString('utf-8');
fileTwo = fs.readFileSync(nameTwo + ".txt").toString('utf-8');

arrOne = fileOne.split("\n")
arrTwo = fileTwo.split("\n")

// Remove empty \n line
arrOne.pop()
arrTwo.pop()

dupes = arrOne.filter(val => {
    return arrTwo.indexOf(val) == -1;
})

console.log(`${nameOne}: ${arrOne.length}
${nameTwo}: ${arrTwo.length}
Total games together: ${dupes.length}
${(dupes.length/arrOne.length * 100).toFixed(2)}%\t${(dupes.length/arrTwo.length * 100).toFixed(2)}%`)