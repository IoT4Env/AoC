const fs = require("fs"),
  path = require("path"),
  inputDay3 = fs.readFileSync(path.join(__dirname, "/inputDay3.txt"), "utf-8");

let mulStart = "mul(",
  mulSeparator = ",",
  mulEnd = ")",
  multiplicatedList = [],
  mulIndex = inputDay3.indexOf(mulStart);

while (mulIndex !== -1) {
  let firstDigit = "",
    index = 0;
  while (!isNaN(parseInt(inputDay3[mulIndex + mulStart.length + index]))) {
    firstDigit += inputDay3[mulIndex + mulStart.length + index];
    index++;
  }

  let isSeparator =
    inputDay3[mulIndex + mulStart.length + firstDigit.length] === mulSeparator;

  if (!isSeparator) {
    mulIndex = inputDay3.indexOf(mulStart, mulIndex + 1);
    continue;
  }

  let secondDigit = "";
  index = 0;

  while (
    !isNaN(
      parseInt(
        inputDay3[mulIndex + mulStart.length + firstDigit.length + 1 + index]
      )
    )
  ) {
    secondDigit +=
      inputDay3[mulIndex + mulStart.length + firstDigit.length + 1 + index];
    index++;
  }

  let isEnd =
    inputDay3[
      mulIndex + mulStart.length + firstDigit.length + secondDigit.length + 1
    ] === mulEnd;
  if (!isEnd) {
    mulIndex = inputDay3.indexOf(mulStart, mulIndex + 1);
    continue;
  }

  multiplicatedList.push(parseInt(firstDigit) * parseInt(secondDigit));
  mulIndex = inputDay3.indexOf(mulStart, mulIndex + 1);
}

let sum = multiplicatedList.reduce(
  (accumulativeSum, element) => accumulativeSum + element,
  0
);

console.log(sum);
