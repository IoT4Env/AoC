const fs = require("fs"),
  path = require("path");

//Input file has to be created first
const inputDay1 = fs.readFileSync(
    path.join(__dirname + "/inputDay1.txt"),
    "utf-8"
  ),
  spllittedInput = inputDay1.split("\n"),
  rawRow = spllittedInput[0].split(" ");

let lastElement = rawRow.length - 1,
  leftList = [],
  rightList = [];

spllittedInput.forEach((element) => {
  let rawRow = element.split(" ");
  leftList.push(parseInt(rawRow[0]));
  rightList.push(parseInt(rawRow[lastElement]));
});

let orderedLeftList = leftList.sort(),
  orderedRightList = rightList.sort(),
  occurences = 0,
  similarityScoreList = [];

orderedLeftList.forEach((leftElement) => {
  if (isNaN(leftElement)) return;
  orderedRightList.some((rightElement) => {
    if (leftElement === rightElement) occurences++;

    if (leftElement > rightElement) return;
  });
  similarityScoreList.push(leftElement * occurences);
  occurences = 0;
});

let sum = similarityScoreList.reduce(
  (accumulativeSum, element) => accumulativeSum + element,
  0
); //0 is initial value

console.log(sum);
