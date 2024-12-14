const fs = require('fs')
const path = require('path')


const inputDay3 = fs.readFileSync(path.join(__dirname, '/inputDay3.txt'), 'utf-8')


let mulStart = 'mul('
let mulSeparator = ','
let mulEnd = ')'



let doMul = "do()"
let doNotMul = "don't()"


let doMulIndex = inputDay3.indexOf(doMul)
let doNotMulIndex = inputDay3.indexOf(doNotMul)


let interestedMemoryChunks = []
interestedMemoryChunks.push(inputDay3.slice(0, doNotMulIndex))


while(true){
    doMulIndex = inputDay3.indexOf(doMul, doNotMulIndex)
    doNotMulIndex = inputDay3.indexOf(doNotMul, doMulIndex)
    if(doNotMulIndex === -1 && doMulIndex !== -1){
        interestedMemoryChunks.push(inputDay3.slice(doMulIndex, inputDay3.length))
        break;
    }
    interestedMemoryChunks.push(inputDay3.slice(doMulIndex, doNotMulIndex))
}

let multiplicatedList = []
interestedMemoryChunks.forEach(memoryChunk => mul(memoryChunk))

function mul(memoryChunk) {
    let mulIndex = memoryChunk.indexOf(mulStart)

    while (mulIndex !== -1) {

        let firstDigit = ''
        let index = 0
        while (!isNaN(parseInt(memoryChunk[mulIndex + mulStart.length + index]))) {
            firstDigit += memoryChunk[mulIndex + mulStart.length + index]
            index++
        }

        let isSeparator = memoryChunk[mulIndex + mulStart.length + firstDigit.length] === mulSeparator

        if (!isSeparator) {
            mulIndex = memoryChunk.indexOf(mulStart, mulIndex + 1)
            continue
        }

        let secondDigit = ''
        index = 0

        while (!isNaN(parseInt(memoryChunk[mulIndex + mulStart.length + firstDigit.length + 1 + index]))) {
            secondDigit += memoryChunk[mulIndex + mulStart.length + firstDigit.length + 1 + index]
            index++
        }


        let isEnd = memoryChunk[mulIndex + mulStart.length + firstDigit.length + secondDigit.length + 1] === mulEnd
        if (!isEnd) {
            mulIndex = memoryChunk.indexOf(mulStart, mulIndex + 1)
            continue
        }

        multiplicatedList.push(parseInt(firstDigit) * parseInt(secondDigit))
        mulIndex = memoryChunk.indexOf(mulStart, mulIndex + 1)
    }
}

let sum = multiplicatedList.reduce(
    (accumulativeSum, element) => accumulativeSum + element,
    0
);

console.log(sum)
