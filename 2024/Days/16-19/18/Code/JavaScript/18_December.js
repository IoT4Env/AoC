// link consegna advent of code : https://adventofcode.com/2024/day/18

const fs = require("fs");

// Funzione per leggere il file JSON
function readBytesFromFile(filePath) {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data).bytes;
}

// Creazione della griglia della memoria
const createGrid = (size) =>
  Array.from({ length: size }, () => Array(size).fill("."));

// Aggiunta dei byte sulla griglia
function updateGrid(grid, bytes) {
  bytes.forEach(([x, y]) => {
    if (grid[y] && grid[y][x] !== undefined) {
      grid[y][x] = "#";
    }
  });
}

// Stampa della griglia
const printGrid = (grid) =>
  console.log(grid.map((row) => row.join("")).join("\n"));

// Implementazione dell'algoritmo A* per trovare il percorso più breve
function findShortestPath(grid, start, end) {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const queue = [{ pos: start, steps: 0 }], visited = new Set(), serialize = ([x, y]) => `${x},${y}`;
  visited.add(serialize(start));

  while (queue.length > 0) {
    const {
      pos: [x, y],
      steps,
    } = queue.shift();

    if (x === end[0] && y === end[1]) 
      return steps;

    for (const [dx, dy] of directions) {
      const [nx, ny] = [x + dx, y + dy];

      if (
        nx >= 0 &&
        nx < grid[0].length &&
        ny >= 0 &&
        ny < grid.length &&
        grid[ny][nx] === "." &&
        !visited.has(serialize([nx, ny]))
      ) {
        queue.push({ pos: [nx, ny], steps: steps + 1 });
        visited.add(serialize([nx, ny]));
      }
    }
  }

  return -1; // Nessun percorso trovato
}

// Main
const filePath = "../Json/bytes.json", gridSize = 7; // Usa 71 per la griglia completa

const bytes = readBytesFromFile(filePath), grid = createGrid(gridSize);

console.log("Griglia iniziale:");
printGrid(grid);

console.log("\nAggiorno la griglia con i primi 1024 byte:");
updateGrid(grid, bytes.slice(0, 1024));
printGrid(grid);

console.log("\nCalcolo il percorso più breve:");
const shortestPath = findShortestPath(
  grid,
  [0, 0],
  [gridSize - 1, gridSize - 1]
);

if (shortestPath !== -1) 
  console.log(`Percorso più breve trovato: ${shortestPath} passi.`);
else 
  console.log("Nessun percorso possibile.");
