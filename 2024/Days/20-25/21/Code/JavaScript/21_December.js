// link consegna advent of code : https://adventofcode.com/2024/day/21

const fs = require("fs");

// Legge il file JSON localmente
fs.readFile("../Json/labirinto.json", "utf8", (err, data) => {
  if (err) {
    console.error("Errore durante il caricamento del JSON:", err);
    return;
  }

  try {
    const { maze, start, end } = JSON.parse(data),
      path = findPath(maze, start, end);

    if (path) console.log("Percorso ottimale trovato:", path);
    else console.log("Nessun percorso trovato.");
  } catch (parseError) {
    console.error("Errore durante il parsing del JSON:", parseError);
  }
});

// Funzione per calcolare il percorso ottimale (identica a prima)
function findPath(maze, start, end) {
  const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0], // Destra, Giù, Sinistra, Su
    ],
    rows = maze.length,
    cols = maze[0].length,
    queue = [[...start, []]],
    visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  visited[start[0]][start[1]] = true;

  while (queue.length > 0) {
    const [x, y, path] = queue.shift();

    if (x === end[0] && y === end[1]) return [...path, [x, y]];

    for (const [dx, dy] of directions) {
      const nx = x + dx,
        ny = y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < rows &&
        ny < cols &&
        maze[nx][ny] === 0 &&
        !visited[nx][ny]
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny, [...path, [x, y]]]);
      }
    }
  }

  return null; // Nessun percorso trovato
}
