const fs = require("fs"),
  path = require("path"),
  inputDay2 = fs.readFileSync(path.join(__dirname, "/inputDay2.txt"), "utf-8")


const splittedReports = inputDay2.split('\n').filter(report => report !== '')

let safeReportsCount = 0;

splittedReports.forEach((report) => {
  const reportNumbers = report.split(' ')
  
  if(isSafeReport(reportNumbers))
  {
    safeReportsCount++
    return
  }

  for(let i = 0; i < reportNumbers.length; i++){
    const shrunkReport = removeSingleNumber(reportNumbers, i)
    
    if(isSafeReport(shrunkReport))
    {
      safeReportsCount++
      break
    }
  }
});

console.log(safeReportsCount);

function isSafeReport(report) {
  let order = parseInt(report[0]) < parseInt(report[1]);
  for (let i = 0; i < report.length - 1; i++) {
    let difference = Math.abs(parseInt(report[i]) - parseInt(report[i + 1]));

    if (order !== parseInt(report[i]) < parseInt(report[i + 1])) 
      return false;

    if (parseInt(report[i]) === parseInt(report[i + 1]))
      return false;

    if (difference > 3) 
      return false;
  }
  return true;
}

function removeSingleNumber(report, index){
  const shrunkReport = []
  for(let i = 0; i < report.length; i++){
    if(i === index){
      continue
    }
    shrunkReport.push(report[i])
  }
  return shrunkReport
}
