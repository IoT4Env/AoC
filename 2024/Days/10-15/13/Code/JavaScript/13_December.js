// link consegna advent of code : https://adventofcode.com/2024/day/13

// Importa il modulo fs per leggere il file JSON
import fs from "fs";

// Funzione per calcolare se si possono trovare i moltiplicatori di A e B
// che soddisfano le coordinate del premio
function findSolution(buttonA, buttonB, prize, maxPresses) {
  const { x: ax, y: ay, cost: costA } = buttonA,
    { x: bx, y: by, cost: costB } = buttonB,
    { x: prizeX, y: prizeY } = prize;

  let bestCost = Infinity,
    bestCombination = null;

  // Ciclo sui possibili pressioni del bottone A
  for (let aPresses = 0; aPresses <= maxPresses; aPresses++) {
    for (let bPresses = 0; bPresses <= maxPresses; bPresses++) {
      const totalX = ax * aPresses + bx * bPresses,
        totalY = ay * aPresses + by * bPresses;

      if (totalX === prizeX && totalY === prizeY) {
        const totalCost = costA * aPresses + costB * bPresses;
        if (totalCost < bestCost) {
          bestCost = totalCost;
          bestCombination = { aPresses, bPresses, totalCost };
        }
      }
    }
  }

  return bestCombination;
}

// Funzione principale per trovare tutte le soluzioni
function solveClawMachines(clawMachines, maxPresses = 100) {
  let totalTokens = 0,
    totalPrizes = 0;

  clawMachines.forEach((machine, index) => {
    console.log(`\nAnalyzing machine ${index + 1}:`, machine);
    const solution = findSolution(
      machine.buttonA,
      machine.buttonB,
      machine.prize,
      maxPresses
    );

    if (solution) {
      console.log(`Solution found for machine ${index + 1}:`, solution);
      totalTokens += solution.totalCost;
      totalPrizes++;
    } else console.log(`No solution found for machine ${index + 1}.`);
  });

  console.log(`\nTotal prizes won: ${totalPrizes}`);
  console.log(`Total tokens spent: ${totalTokens}`);

  return { totalPrizes, totalTokens };
}

// Leggi i dati dal file JSON
const rawData = fs.readFileSync("../Json/clawMachines.json", "utf-8"),
  clawMachines = JSON.parse(rawData);

// Risolvi il problema
solveClawMachines(clawMachines);
