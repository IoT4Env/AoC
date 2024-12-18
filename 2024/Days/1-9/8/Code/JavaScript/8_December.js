// link consegna advent of code : https://adventofcode.com/2024/day/8

// Mappa di esempio fornita nel problema
const map = [
  "............",
  "........0...",
  ".....0......",
  ".......0....",
  "....0.......",
  "......A.....",
  "............",
  "............",
  "........A...",
  ".........A..",
  "............",
  "............",
];

// Funzione per trovare tutte le posizioni delle antenne sulla mappa
function findAntennas(map) {
  const antennas = [];
  for (let y = 0; y < map.length; y++) {
    console.log(`Riga ${y}:`, map[y]);
    for (let x = 0; x < map[y].length; x++) {
      const char = map[y][x];
      console.log(`Esaminando posizione (${x}, ${y}): carattere = '${char}'`);
      if (char !== ".") {
        console.log(`Antenna trovata a (${x}, ${y}) con frequenza '${char}'`);
        antennas.push({ x, y, freq: char });
      }
    }
  }
  console.log("Antenne trovate:", antennas);
  return antennas;
}

// Funzione per calcolare tutti i possibili antinodi
function calculateAntinodes(map, antennas) {
  const antinodes = new Set(); // Usare un Set per evitare duplicati

  console.log("Inizio calcolo antinodi");
  antennas.forEach((a1, i) => {
    console.log(`Esaminando antenna ${i} con frequenza '${a1.freq}'`);
    antennas.forEach((a2, j) => {
      if (i >= j || a1.freq !== a2.freq) return;

      console.log(`  Esaminando antenna ${j} con frequenza '${a2.freq}'`);

      // Calcola le distanze tra le antenne
      const dx = a2.x - a1.x,
        dy = a2.y - a1.y;

      console.log(`  Distanze: dx = ${dx}, dy = ${dy}`);

      // Calcola i punti antinodi
      const xAntinode1 = a1.x - dx,
        yAntinode1 = a1.y - dy,
        xAntinode2 = a2.x + dx;
      yAntinode2 = a2.y + dy;

      console.log(
        `  Punti antinodi: (${xAntinode1}, ${yAntinode1}), (${xAntinode2}, ${yAntinode2})`
      );

      // Aggiunge solo i punti validi (dentro la mappa)
      if (
        xAntinode1 >= 0 &&
        xAntinode1 < map[0].length &&
        yAntinode1 >= 0 &&
        yAntinode1 < map.length
      )
        antinodes.add(`${xAntinode1},${yAntinode1}`);

      if (
        xAntinode2 >= 0 &&
        xAntinode2 < map[0].length &&
        yAntinode2 >= 0 &&
        yAntinode2 < map.length
      )
        antinodes.add(`${xAntinode2},${yAntinode2}`);
    });
  });

  console.log("Antinodi calcolati:", antinodes);
  return antinodes;
}

// Funzione principale per contare i punti unici con antinodi
function countUniqueAntinodes(map) {
  console.log("Inizio conto antinodi");
  const antennas = findAntennas(map),
    antinodes = calculateAntinodes(map, antennas);

  // Conta le posizioni che contengono antenne e antinodi
  console.log("Aggiungo antenne ai punti antinodi");
  antennas.forEach(({ x, y }) => antinodes.add(`${x},${y}`));
  console.log(
    "Antinodi finali (inclusi quelli sovrapposti alle antenne):",
    antinodes
  );

  console.log("Fine conto antinodi");
  return antinodes.size;
}

// Esegui il calcolo
const result = countUniqueAntinodes(map);
console.log("Numero totale di posizioni con antinodi:", result);
