const fs = require('fs')
const path = require('path')


const inputDay2 = fs.readFileSync(path.join(__dirname, '/inputDay2.txt'), 'utf-8')
const reports = inputDay2.split('\n').filter(report => report.length > 0)


//console.log(reports[reports.length - 1])


// let reports = [
//     '7 6 4 2 1',
//     '1 2 7 8 9',
//     '9 7 6 2 1',
//     '1 3 2 4 5',
//     '8 6 4 4 1',
//     '1 3 6 7 9'
// ]

//'12 13 18 17 19'

let safeReports = 0

//let initialBadReports = []


reports.forEach(report => {
    const splittedReport = report.split(' ')

    if(isSafeReport(splittedReport)){
        safeReports++
    }
    else{
        for(let i = 0; i < splittedReport.length; i++){
            let reportCopy = splittedReport
            reportCopy.splice(i, 1)
            if(isSafeReport(reportCopy)){
                safeReports++
                break
            }
        }
    }
})

console.log(safeReports)

function isSafeReport(report){
    let asc = parseInt(report[0]) < parseInt(report[1])
    for(let i = 0; i < report.length - 1; i++){
        let difference = parseInt(report[i]) - parseInt(report[i + 1])

        if(asc !== (parseInt(report[i]) < parseInt(report[i + 1]))){
            return false
        }

        if(parseInt(report[i]) === parseInt(report[i + 1])){
            return false
        }

        if(Math.abs(difference) > 3){
            return false
        }
    }
    return true
}




// reports.forEach(report => {
//     // tollerance = 1
//     // splitted = false
//     // const splittedReport = report.split(' ')
//     // for(let i = 0; i < splittedReport.length - 1; i++){
//     //     if(tollerance < 0)
//     //     {
//     //         return
//     //     }

//     //     if(tollerance === 0 && !splitted){
//     //         splittedReport.splice(i, 1)
//     //         splitted = true
//     //     }
//     //     let asc = parseInt(splittedReport[0]) < parseInt(splittedReport[1])

//     //     for(let j = 0; j < splittedReport.length - 1; j++){
//     //         if(asc !== (parseInt(splittedReport[j]) < parseInt(splittedReport[j + 1]))){
//     //             tollerance--
//     //             i = j - 2
//     //             break
//     //         }

//     //         if(parseInt(splittedReport[j]) === parseInt(splittedReport[j + 1])){
//     //             tollerance--
//     //             i = j - 2
//     //             break
//     //         }

//     //         if(Math.abs(difference) > 3){
//     //             tollerance--
//     //             i = j - 2
//     //             break
//     //         }
//     //     }
//     // }

//     safeReports++

//     // let asc = parseInt(splittedReport[0]) < parseInt(splittedReport[1])

//     // for(let i = 0; i < splittedReport.length - 1; i++){


//     //     difference = parseInt(splittedReport[i]) - parseInt(splittedReport[i + 1])
//     //     if(asc !== (parseInt(splittedReport[i]) < parseInt(splittedReport[i + 1]))){
//     //         splittedReport.splice(i, 1)
//     //         i -= 2
//     //         if(--tollerance < 0)
//     //         {
//     //             return
//     //         }
//     //         continue
//     //     }

//     //     if(parseInt(splittedReport[i]) === parseInt(splittedReport[i + 1])){
//     //         splittedReport.splice(i + 1, 1)
//     //         i -= 2
//     //         if(--tollerance < 0)
//     //         {
//     //             return
//     //         }
//     //         continue
//     //     }

//     //     if(Math.abs(difference) > 3){
//     //         splittedReport.splice(i + 1, 1)
//     //         i -= 2
//     //         if(--tollerance < 0)
//     //         {
//     //             return
//     //         }
//     //         continue
//     //     }
//     // }


// })

// console.log(safeReports);



