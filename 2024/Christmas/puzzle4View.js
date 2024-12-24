//Prepare caos word serach
const fs = require("fs")
const path = require("path")

let inputDay4 = fs.readFileSync(path.join(__dirname, 'day4Input.txt'), 'utf-8')


String.prototype.replaceSingleAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + 1)
}

//ANSI colors
const _ESC = '\x1b'

const _RED = _ESC + '[31m'
const _GREEN = _ESC + '[32m'
const _YELLOW = _ESC + '[33m'
const _BLUE = _ESC + '[34m'
const _PURPLE = _ESC + '[35m'
const _WHITE = _ESC + '[37m'
const _RESET = _ESC + '[0m'
const _BLACK = _ESC + '[30m'



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
let isFirstXHalf = false
let xMasIndexList = []

for (let i = 0; i < inputDay4.length; i++) {
    if (inputDay4[i] !== 'A'){
        
        continue;
    }

    isFirstXHalf = false

    for (let j = 0; j < directions.length - 2; j++) {
        const diagonal =
            inputDay4[i + directions[j]] === 'M'
            && inputDay4[i + directions[j + 2]] === 'S'

        const diagonalReverse =
            inputDay4[i + directions[j]] === 'S'
            && inputDay4[i + directions[j + 2]] === 'M'

        if ((diagonal || diagonalReverse) && isFirstXHalf) {
            xMasIndexList.push(i)
            break;

        } else if (diagonal || diagonalReverse) {
            isFirstXHalf = true
            continue
        }
    }
}

xMasIndexList.forEach(index => {
    prepareColoredXMAS(index, 'G')
})

inputDay4 = inputDay4
    .replace(/G/gi, _RED + 'A' + _BLACK)
    .replace(/\(/g, _GREEN + 'M' + _BLACK)
    .replace(/\)/g, _GREEN + 'S' + _BLACK)


console.log(_BLACK + inputDay4);


function prepareColoredXMAS(index, colorEncode){
    inputDay4 = inputDay4.replaceSingleAt(index, colorEncode)

    for (let i = 0; i < directions.length; i++){
        if(inputDay4[index + directions[i]] === 'M'){
            inputDay4 = inputDay4.replaceSingleAt(index + directions[i], '(')
        }else if(inputDay4[index + directions[i]] === 'S'){
            inputDay4 = inputDay4.replaceSingleAt(index + directions[i], ')')
        }
    }
}
