const fs = require("fs")
const path = require("path")

const inputDay5 = fs.readFileSync(path.join(__dirname, 'day5Input.txt'), 'utf-8')


//75|47|61|53|29
const rules_updates = inputDay5.split('\n\n')
const rules = rules_updates[0]
const updates = rules_updates[1]

const splittedRules = rules.split('\n')
const splittedUpdates = updates.split('\n').filter(update => update !== '')


let badUpdateList = []
let sum = 0


splittedUpdates.forEach(update => {
    const updateList = update.split(',')
    if (!isUpdateOrdered(updateList)) {
        badUpdateList.push(updateList)
    }
})

badUpdateList.forEach(update => {
    while (true) {
        if (isUpdateOrdered(update)) {
            sum += getHalfWayListNum(update)
            break
        }
        update = orderUpdate(update)
    }
})

console.log(sum);

function isUpdateOrdered(updateList) {
    for (let i = 0; i < updateList.length - 1; i++) {
        const rule = `${updateList[i]}|${updateList[i + 1]}`
        if (!splittedRules.includes(rule)) {
            return false
        }
    }
    return true
}

function orderUpdate(updateList){
    let updatedList = []
    for (let i = 0; i < updateList.length - 1; i++) {
        const rule = `${updateList[i]}|${updateList[i + 1]}`
        if (!splittedRules.includes(rule)) {
            [updateList[i], updateList[i + 1]] = [updateList[i + 1], updateList[i]]
            
            
        }
        updatedList.push(updateList[i])
    }
    updatedList.push(updateList[updateList.length - 1])
    return updatedList
}

function getHalfWayListNum(updateList){
    const halfNumberIndex = Math.floor(updateList.length/2)
    return parseInt(updateList[halfNumberIndex])
}
