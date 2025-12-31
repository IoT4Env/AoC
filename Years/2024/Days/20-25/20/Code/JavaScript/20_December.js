// link consegna advent of code : https://adventofcode.com/2024/day/20

const fs = require("fs");

// Legge i dati dal file JSON
function readTrackData(filePath) {
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData).track;
}

// Trova le coordinate di un carattere specifico nel labirinto
function findPosition(track, char) {
  for (let y = 0; y < track.length; y++) {
    const x = track[y].indexOf(char);
    if (x !== -1) return { x, y };
  }
  return null;
}

// Calcola il percorso più breve usando BFS
function bfs(track, start, end, allowCheating = false) {
  const directions = [
    { dx: 0, dy: -1 }, // Su
    { dx: 0, dy: 1 }, // Giù
    { dx: -1, dy: 0 }, // Sinistra
    { dx: 1, dy: 0 }, // Destra
  ], rows = track.length,
    cols = track[0].length,
    queue = [{ pos: start, steps: 0, cheats: allowCheating ? 2 : 0 }],
    visited = new Set();
  visited.add(`${start.x},${start.y},${allowCheating ? 2 : 0}`);

  while (queue.length > 0) {
    const { pos, steps, cheats } = queue.shift();

    if (pos.x === end.x && pos.y === end.y) return steps;

    for (const { dx, dy } of directions) {
      const nx = pos.x + dx;
      const ny = pos.y + dy;
      const withinBounds = nx >= 0 && ny >= 0 && nx < cols && ny < rows;

      if (!withinBounds) continue;
      const cell = track[ny][nx];
      const newKey = `${nx},${ny},${cheats}`;

      if (cell === "." || cell === "S" || cell === "E") {
        if (!visited.has(newKey)) {
          visited.add(newKey);
          queue.push({ pos: { x: nx, y: ny }, steps: steps + 1, cheats });
        }
      } else if (cheats > 0) {
        const cheatKey = `${nx},${ny},${cheats - 1}`;
        if (!visited.has(cheatKey)) {
          visited.add(cheatKey);
          queue.push({
            pos: { x: nx, y: ny },
            steps: steps + 1,
            cheats: cheats - 1,
          });
        }
      }
    }
  }

  return Infinity; // Nessun percorso trovato
}

// Calcola tutti i "cheat" e i relativi risparmi
function calculateCheats(track) {
  const start = findPosition(track, "S"),
    end = findPosition(track, "E"),
    normalPath = bfs(track, start, end, false);
  const cheatPath = bfs(track, start, end, true),
    cheatSavings = normalPath - cheatPath;
  return cheatSavings;
}

// Main
const track = readTrackData("../Json/Track.json"),
  savings = calculateCheats(track);

if (savings >= 100)
  console.log(
    `Puoi risparmiare almeno 100 picosecondi: ${savings} picosecondi risparmiati.`
  );
else console.log(`Non ci sono cheat che risparmiano almeno 100 picosecondi.`);
