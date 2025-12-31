// link consegna advent of code : https://adventofcode.com/2024/day/25

const fs = require("fs");

// Read JSON file
const data = JSON.parse(fs.readFileSync("../Json/data.json", "utf8")),
  locks = data.locks.map(convertToHeights),
  keys = data.keys.map(convertToHeights);

console.log("Locks:", locks);
console.log("Keys:", keys);

const fittingPairs = findFittingPairs(locks, keys);
console.log("Number of unique lock/key pairs that fit:", fittingPairs);

function convertToHeights(schematic) {
  const rows = schematic.split("\n"),
    heights = [];

  for (let col = 0; col < rows[0].length; col++) {
    let height = 0;
    for (let row = 0; row < rows.length; row++) {
      if (rows[row][col] === "#") height++;
    }
    heights.push(height);
  }

  return heights;
}

function findFittingPairs(locks, keys) {
  let count = 0;

  for (const lock of locks) {
    for (const key of keys) {
      if (fits(lock, key)) count++;
    }
  }

  return count;
}

function fits(lock, key) {
  for (let i = 0; i < lock.length; i++) {
    if (lock[i] + key[i] > 6) return false;
  }
  return true;
}
