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
  distanceList = [],
  distance = 0;

for (let i = 0; i < orderedLeftList.length; i++) {
  distance = Math.abs(orderedLeftList[i] - orderedRightList[i]);
  if (isNaN(distance)) continue;
  distanceList.push(distance);
}

let sum = distanceList.reduce(
  (accumulativeSum, element) => accumulativeSum + element,
  0
); //0 is initial value

console.log(sum);
