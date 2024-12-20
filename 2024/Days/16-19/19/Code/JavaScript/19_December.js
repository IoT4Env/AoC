// link consegna advent of code : https://adventofcode.com/2024/day/19

const fs = require("fs"), path = require("path");

// Funzione per verificare se un design è costruibile con i pattern disponibili
function canBuildDesign(patterns, design) {
  const memo = {};

  function helper(remaining) {
    if (remaining === "") return true; // Design completato
    if (memo[remaining] !== undefined) return memo[remaining];

    for (const pattern of patterns) {
      if (remaining.startsWith(pattern)) {
        const next = remaining.slice(pattern.length);
        if (helper(next)) {
          memo[remaining] = true;
          return true;
        }
      }
    }

    memo[remaining] = false;
    return false;
  }

  return helper(design);
}

// Carica i dati dal file JSON e analizza i design
async function analyzeDesigns() {
  try {
    // Percorso al file JSON
    const jsonPath = path.join(__dirname, "../Json/data.json"), data = JSON.parse(fs.readFileSync(jsonPath, "utf8")), { patterns, designs } = data;

    console.log("Patterns disponibili:", patterns);
    console.log("Design richiesti:", designs);

    let possibleCount = 0;

    designs.forEach((design) => {
      const isPossible = canBuildDesign(patterns, design);
      console.log(`Il design "${design}" è ${isPossible ? "possibile" : "impossibile"}.`);
      if (isPossible) possibleCount++;
    });

    console.log(`Totale design possibili: ${possibleCount}`);
  } catch (error) {
    console.error("Errore durante il caricamento dei dati JSON:", error);
  }
}

// Avvia l'analisi
analyzeDesigns();
