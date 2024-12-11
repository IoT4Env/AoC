const fs = require("fs"),
  path = require("path"),
  inputDay2 = fs.readFileSync(path.join(__dirname, "/inputDay2.txt"), "utf-8"),
  reports = inputDay2.split("\n").filter((report) => report.length > 0);

let safeReports = 0,
  difference = 0;

reports.forEach((report) => {
  const splittedReport = report.split(" ");

  // difference = splittedReport[0] - splittedReport[1]
  // let asc = difference < 0
  // let desc = difference > 0
  let asc = parseInt(splittedReport[0]) < parseInt(splittedReport[1]);

  for (let i = 0; i < splittedReport.length - 1; i++) {
    difference = splittedReport[i] - splittedReport[i + 1];
    // if(isAsc !== (difference < 0)
    //     || isDesc !== (difference > 0)){
    //     return
    // }

    if (asc !== parseInt(splittedReport[i]) < parseInt(splittedReport[i + 1]))
      return;

    if (splittedReport[i] === splittedReport[i + 1]) return;

    if (Math.abs(difference) > 3) return;
  }

  safeReports++;
});

console.log(safeReports);
