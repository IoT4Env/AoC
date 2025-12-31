const fs = require("fs")
const path = require("path")

const inputDay5 = fs.readFileSync(path.join(__dirname, 'day5Input.txt'), 'utf-8')


//75|47|61|53|29
const rules_updates = inputDay5.split('\n\n')
const rules = rules_updates[0]
const updates = rules_updates[1]

const splittedRules = rules.split('\n')
const splittedUpdates = updates.split('\n').filter(update => update !== '')


let sum = 0

splittedUpdates.forEach(update => {
    const updateList = update.split(',')
    for(let i = 0; i < updateList.length - 1; i++){
        const rule = `${updateList[i]}|${updateList[i + 1]}`
        if(!splittedRules.includes(rule))
            return
    }
    const halfNumberIndex = Math.floor(updateList.length/2)

    sum += parseInt(updateList[halfNumberIndex])
    
})

console.log(sum);
