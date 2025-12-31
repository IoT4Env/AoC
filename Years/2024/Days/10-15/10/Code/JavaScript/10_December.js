// link consegna advent of code : https://adventofcode.com/2024/day/10

// Funzione per trovare tutte le posizioni dei trailhead (altezza 0)
function findTrailheads(map) {
  const trailheads = [];
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] === 0) trailheads.push([row, col]);
    }
  }
  console.log("Trailheads trovati:", trailheads);
  return trailheads;
}

// Funzione per verificare se una posizione è valida e incrementale
const isValidStep = (map, row, col, prevHeight) =>
  row >= 0 &&
  row < map.length &&
  col >= 0 &&
  col < map[row].length &&
  map[row][col] === prevHeight + 1;

// Funzione per calcolare tutti i percorsi validi fino a 9
function calculateTrailScore(map, start) {
  const queue = [start],
    visited = new Set();
  let score = 0;

  while (queue.length > 0) {
    const [row, col] = queue.shift(),
      key = `${row},${col}`;

    if (visited.has(key)) continue;
    visited.add(key);

    if (map[row][col] === 9) {
      score++;
      continue; // Non serve continuare oltre 9
    }

    // Aggiunge i passi validi alla coda
    const currentHeight = map[row][col],
      directions = [
        [1, 0], // Giù
        [-1, 0], // Su
        [0, 1], // Destra
        [0, -1], // Sinistra
      ];

    for (const [dr, dc] of directions) {
      const newRow = row + dr,
        newCol = col + dc;
      if (isValidStep(map, newRow, newCol, currentHeight))
        queue.push([newRow, newCol]);
    }
  }

  console.log(`Score per il trailhead ${start}:`, score);
  return score;
}

// Funzione principale per calcolare il punteggio totale
function calculateTotalScore(map) {
  const trailheads = findTrailheads(map);
  let totalScore = 0;

  for (const trailhead of trailheads) {
    totalScore += calculateTrailScore(map, trailhead);
  }

  console.log("Punteggio totale:", totalScore);
  return totalScore;
}

// Esempio di input
const map = [
  [8, 9, 0, 1, 0, 1, 2, 3],
  [7, 8, 1, 2, 1, 8, 7, 4],
  [8, 7, 4, 3, 0, 9, 6, 5],
  [9, 6, 5, 4, 9, 8, 7, 4],
  [4, 5, 6, 7, 8, 9, 0, 3],
  [3, 2, 0, 1, 9, 0, 1, 2],
  [0, 1, 3, 2, 9, 8, 0, 1],
  [1, 0, 4, 5, 6, 7, 3, 2],
];

// Calcolo del punteggio totale
calculateTotalScore(map);
