// link consegna advent of code : https://adventofcode.com/2024/day/2

// Funzione per verificare se un report è sicuro
function isSafeReport(report) {
  const levels = report.split(" ").map(Number); // Converte in numeri
  let isIncreasing = true,
    isDecreasing = true;

  console.log(`Verifica del report: ${levels}`); // Stampa livelli

  for (let i = 1; i < levels.length; i++) {
    const diff = levels[i] - levels[i - 1];

    // Controlla la differenza in valore assoluto
    if (Math.abs(diff) < 1 || Math.abs(diff) > 3) {
      console.log(
        `Violazione: ${levels[i - 1]} -> ${levels[i]} (diff: ${diff})`
      );
      return false; // Violazione delle regole
    }

    diff > 0 ? (isDecreasing = false) : (isIncreasing = false); // Monotonicità
  }

  console.log(
    `Report "${report}" è ${
      isIncreasing || isDecreasing ? "sicuro" : "non sicuro"
    }`
  );
  return isIncreasing || isDecreasing; // Deve essere monotono
}

// Funzione principale per analizzare i report
function countSafeReports(data) {
  const reports = data
    .trim()
    .split("\n")
    .map((line) => line.trim()) // Rimuove spazi inizio/fine di ogni linea
    .filter((line) => line !== ""); // Elimina linee vuote

  console.log(`Tutti i report: ${reports}`);

  let safeCount = 0;

  for (const report of reports) {
    console.log(`Analizzando il report: "${report}"`);
    if (isSafeReport(report)) {
      console.log(`--> Report sicuro: "${report}"`);
      safeCount++;
    } else console.log(`--> Report non sicuro: "${report}"`);
  }

  return safeCount;
}

// Input dei report
const input = `
        7 6 4 2 1
        1 2 7 8 9
        9 7 6 2 1
        1 3 2 4 5
        8 6 4 4 1
        1 3 6 7 9
      `;

// Calcola e stampa il numero di report sicuri
const safeReports = countSafeReports(input);
console.log(`Numero di report sicuri: ${safeReports}`);
