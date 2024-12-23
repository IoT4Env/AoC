//Prepare caos word serach
const fs = require("fs")
const path = require("path")

const inputDay4 = fs.readFileSync(path.join(__dirname, 'day4Input.txt'), 'utf-8')


//Preparation
const inputDay4Row = inputDay4.split('\n').filter(row => row !== '')[0].trim()
const inputDay4RowLength = inputDay4Row.length + 1


//Define directions
const directions = [
    - inputDay4RowLength - 1,
    - inputDay4RowLength + 1,
    inputDay4RowLength + 1,
    inputDay4RowLength - 1
]



//Loop on the entire input
let searchIndex = 0
let count = 0
let isFirstXHalf = false

for (let i = 0; i < inputDay4.length; i++) {
    if (inputDay4[i] !== 'A')
        continue;

    isFirstXHalf = false

    for (let j = 0; j < directions.length - 2; j++) {
        const diagonal =
            inputDay4[i + directions[j]] === 'M'
            && inputDay4[i + directions[j + 2]] === 'S'

        const diagonalReverse =
            inputDay4[i + directions[j]] === 'S'
            && inputDay4[i + directions[j + 2]] === 'M'

        if ((diagonal || diagonalReverse) && isFirstXHalf) {
            count++
            break;
        } else if (diagonal || diagonalReverse) {
            isFirstXHalf = true
            continue
        }
    }
}


console.log(count);
