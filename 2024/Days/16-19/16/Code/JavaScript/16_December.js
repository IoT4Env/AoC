// link consegna advent of code : https://adventofcode.com/2024/day/16

// Importazione dei moduli richiesti
const fs = require("fs");

// Funzione per leggere i file JSON
function readJSON(filePath) {
  try {
    console.log(`Leggendo il file: ${filePath}`);
    const data = fs.readFileSync(filePath, "utf8");
    console.log(`File letto con successo: ${filePath}`);
    return JSON.parse(data);
  } catch (err) {
    console.error(`Errore durante la lettura del file ${filePath}:`, err);
    return null;
  }
}

// Caricamento dei dati del labirinto e della configurazione
console.log("Caricamento dei dati del labirinto e della configurazione...");
const mazeData = readJSON("../Json/maze.json"),
  config = readJSON("../Json/config.json");

if (!mazeData || !config) {
  console.error("Errore nel caricamento dei dati o della configurazione.");
  process.exit(1);
}
console.log("Dati caricati correttamente.");

// Configurazioni iniziali
const start = config.start; // Posizione di partenza es. { x: 13, y: 1 }
const end = config.end; // Posizione di arrivo es. { x: 1, y: 12 }
const directions = [
  // Direzioni cardinali: [dx, dy]
  { dx: 0, dy: 1, name: "E" }, // Est
  { dx: 1, dy: 0, name: "S" }, // Sud
  { dx: 0, dy: -1, name: "W" }, // Ovest
  { dx: -1, dy: 0, name: "N" }, // Nord
];

console.log("Configurazioni iniziali:");
console.log(`Posizione di partenza: ${JSON.stringify(start)}`);
console.log(`Posizione di arrivo: ${JSON.stringify(end)}`);
console.log("Direzioni disponibili:", directions);

// Funzione per calcolare il percorso ottimale
function findLowestScore(maze, start, end) {
  const rows = maze.length,
    cols = maze[0].length;

  console.log(`Dimensioni del labirinto: ${rows}x${cols}`);

  const queue = [{ x: start.x, y: start.y, score: 0, dir: 0 }]; // Direzione iniziale: Est
  const visited = new Set();
  visited.add(`${start.x},${start.y},0`);

  while (queue.length > 0) {
    const current = queue.shift(),
      { x, y, score, dir } = current;

    console.log(
      `Analizzando nodo: posizione=(${x},${y}), punteggio=${score}, direzione=${dir}`
    );

    // Verifica se siamo arrivati
    if (x === end.x && y === end.y) {
      console.log("Percorso trovato!");
      return score;
    }

    // Prova tutte le direzioni
    for (let i = 0; i < directions.length; i++) {
      const newDir = i,
        { dx, dy, name } = directions[i],
        newX = x + dx,
        newY = y + dy;

      // Calcola il nuovo punteggio
      const rotationCost = newDir !== dir ? 1000 : 0,
        movementCost = 1,
        newScore = score + rotationCost + movementCost;

      console.log(
        `  Tentando direzione: ${name}, nuova posizione=(${newX},${newY}), nuovo punteggio=${newScore}`
      );

      if (
        newX >= 0 &&
        newX < rows &&
        newY >= 0 &&
        newY < cols &&
        maze[newX][newY] !== "#" &&
        !visited.has(`${newX},${newY},${newDir}`)
      ) {
        queue.push({ x: newX, y: newY, score: newScore, dir: newDir });
        visited.add(`${newX},${newY},${newDir}`);
        console.log(
          `    Nodo aggiunto alla coda: posizione=(${newX},${newY}), punteggio=${newScore}, direzione=${newDir}`
        );
      } else
        console.log(
          `    Nodo scartato: posizione=(${newX},${newY}), direzione=${newDir}`
        );
    }
  }

  console.log("Nessun percorso trovato.");
  return Infinity; // Nessun percorso trovato
}

// Avvio del calcolo
console.log("Avvio del calcolo del percorso ottimale...");
const lowestScore = findLowestScore(mazeData, start, end);
console.log(`Il punteggio più basso possibile è: ${lowestScore}`);
