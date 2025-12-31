//Prepare caos word serach
const fs = require("fs")
const path = require("path")

const inputDay4 = fs.readFileSync(path.join(__dirname, 'day4Input.txt'), 'utf-8')


//Preparation
const inputDay4Row = inputDay4.split('\n').filter(row => row !== '')[0].trim()
const inputDay4RowLength = inputDay4Row.length + 1


//Get x indexes
let xIndexList = []
let xIndex = 0

do{
    xIndex = inputDay4.indexOf('X', xIndex + 1)
    xIndexList.push(xIndex)
}
while(xIndex !== -1)


//Define directions
const directions = [
    - inputDay4RowLength - 1,
    - inputDay4RowLength,
    - inputDay4RowLength + 1,
    -1,
    1,
    inputDay4RowLength - 1,
    inputDay4RowLength,
    inputDay4RowLength + 1
]


//Loop on every x indexes
let searchIndex = 0
let count = 0
const wantedWords = 'MAS'
xIndexList.forEach(xIndex => {   
    //console.log(newInputDay4[xIndex]);

    for(let i = 0; i < directions.length; i++){
        searchIndex = xIndex + directions[i]
        for(let j = 0; j < wantedWords.length; j++){
            

            if(inputDay4[searchIndex] !== wantedWords[j] || inputDay4[searchIndex] === '\n'){
                break
            }
            searchIndex += directions[i]
                
            if(j === wantedWords.length - 1){
                count++
                break
            }
        }   
    }
})

console.log(count);
