// link consegna advent of code : https://adventofcode.com/2024/day/15

const fs = require("fs");

// Funzione per calcolare il valore GPS di una scatola
const calculateGPS = (row, col) => 100 * row + col;

// Funzione principale per simulare i movimenti del robot
function simulateWarehouse(map, moves, directionsPath) {
  let robotPosition = null; // Correzione del typo "Position"
  const logs = [];

  console.log("Caricamento del file JSON con le direzioni...");
  const directions = JSON.parse(fs.readFileSync(directionsPath, "utf-8"));
  console.log("Direzioni caricate:", directions);

  // Troviamo la posizione iniziale del robot
  for (let i = 0; i < map.length; i++) {
    const robotIndex = map[i].indexOf("@");
    if (robotIndex !== -1) {
      robotPosition = { row: i, col: robotIndex };
      logs.push(`Posizione iniziale robot: ${JSON.stringify(robotPosition)}`);
      console.log(
        `Posizione iniziale del robot trovata: (${robotPosition.row}, ${robotPosition.col})`
      );
      break;
    }
  }

  // Eseguiamo tutte le mosse
  for (const move of moves) {
    console.log(`Esecuzione della mossa: ${move}`);
    const direction = directions[move];
    if (!direction) {
      console.log(`Mossa non valida: ${move}, ignorata.`);
      continue;
    }

    const nextRow = robotPosition.row + direction.dRow,
      nextCol = robotPosition.col + direction.dCol;

    console.log(`Nuova posizione prevista: (${nextRow}, ${nextCol})`);

    if (map[nextRow][nextCol] === "O") {
      console.log("Scatola rilevata nella nuova posizione.");
      const boxNextRow = nextRow + direction.dRow,
        boxNextCol = nextCol + direction.dCol;

      if (map[boxNextRow][boxNextCol] === ".") {
        console.log(
          `La scatola verrà spostata in: (${boxNextRow}, ${boxNextCol})`
        );
        map[boxNextRow] =
          map[boxNextRow].substring(0, boxNextCol) +
          "O" +
          map[boxNextRow].substring(boxNextCol + 1);

        map[nextRow] =
          map[nextRow].substring(0, nextCol) +
          "." +
          map[nextRow].substring(nextCol + 1);

        robotPosition = { row: nextRow, col: nextCol };
        logs.push(`Scatola spostata in: (${boxNextRow}, ${boxNextCol})`);
      }
    } else if (map[nextRow][nextCol] === ".") {
      console.log("Posizione libera, il robot si muove.");
      map[robotPosition.row] =
        map[robotPosition.row].substring(0, robotPosition.col) +
        "." +
        map[robotPosition.row].substring(robotPosition.col + 1);

      map[nextRow] =
        map[nextRow].substring(0, nextCol) +
        "@" +
        map[nextRow].substring(nextCol + 1);

      robotPosition = { row: nextRow, col: nextCol };
    }
  }

  console.log("Calcolo del valore GPS totale delle scatole...");
  let totalGPS = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "O") {
        const gpsValue = calculateGPS(i, j);
        totalGPS += gpsValue;
        console.log(`Scatola trovata in (${i}, ${j}), valore GPS: ${gpsValue}`);
      }
    }
  }

  console.log("Valore GPS totale delle scatole:", totalGPS);
  logs.push(`Somma GPS totale delle scatole: ${totalGPS}`);

  console.log("Scrittura dei log su file...");
  fs.writeFileSync(
    "../File_Input/warehouse_logs.txt",
    logs.join("\n"),
    "utf-8"
  );
  console.log("Log scritti con successo.");

  return totalGPS;
}

const inputPath = "../File_Input/warehouse_input.txt"; // Aggiorna il percorso corretto
console.log("Caricamento del file di input...");
const input = fs.readFileSync(inputPath, "utf-8").trim().split("\n");
console.log("File di input caricato con successo.");

const map = input.slice(
    0,
    input.findIndex((line) => line.startsWith("<"))
  ),
  moves = input.slice(input.findIndex((line) => line.startsWith("<"))).join(""),
  directionsPath = "../Json/directions.json";

console.log("Simulazione del magazzino in corso...");
const result = simulateWarehouse(map, moves, directionsPath);
console.log("Somma GPS totale delle scatole:", result);
