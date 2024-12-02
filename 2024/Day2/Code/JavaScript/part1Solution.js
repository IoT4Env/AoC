const fs = require('fs')
const path = require('path')


const inputDay2 = fs.readFileSync(path.join(__dirname, '/inputDay2.txt'), 'utf-8')
const reports = inputDay2.split('\n').filter(report => report.length > 0)


let safeReports = 0
let difference = 0


reports.forEach(report => {
    const splittedReport = report.split(' ')
    difference = splittedReport[0] - splittedReport[1]
    const isAsc = difference < 0
    const isDesc = difference > 0

    for(let i = 0; i < splittedReport.length - 1; i++){
        difference = splittedReport[i] - splittedReport[i + 1]
        if(isAsc !== (difference < 0)
            || isDesc !== (difference > 0)){
            return
        }

        if(splittedReport[i] === splittedReport[i + 1]){
            return
        }

        if(Math.abs(difference) > 3){
            return
        }
    }
    
    safeReports++
})

console.log(safeReports);



