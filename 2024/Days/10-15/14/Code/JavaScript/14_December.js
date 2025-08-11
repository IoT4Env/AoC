// link consegna advent of code : https://adventofcode.com/2024/day/14

// Importa il modulo fs per leggere il file JSON
const fs = require("fs");

// Legge i dati da un file JSON
const data = JSON.parse(fs.readFileSync("../json/robots.json", "utf8"));

// Costanti per la dimensione dello spazio
const WIDTH = 101,
  HEIGHT = 103,
  SECONDS = 100;

// Funzione per aggiornare la posizione dei robot considerando il wrapping
function updatePosition(robot) {
  robot.px = (robot.px + robot.vx + WIDTH) % WIDTH;
  robot.py = (robot.py + robot.vy + HEIGHT) % HEIGHT;
}

// Funzione per inizializzare la griglia vuota
const createGrid = (width, height) =>
  Array.from({ length: height }, () => Array(width).fill(0));

// Funzione per simulare il movimento dei robot
function simulateRobots(robots, seconds) {
  for (let t = 0; t < seconds; t++) robots.forEach(updatePosition);
  return robots;
}

// Funzione per contare i robot in ogni quadrante
function countQuadrants(robots, width, height) {
  const midX = Math.floor(width / 2),
    midY = Math.floor(height / 2),
    quadrants = { q1: 0, q2: 0, q3: 0, q4: 0 };

  robots.forEach(({ px, py }) => {
    if (px === midX || py === midY) return; // Escludi robot sulla linea centrale

    if (px > midX && py < midY) quadrants.q1++;
    else if (px < midX && py < midY) quadrants.q2++;
    else if (px < midX && py > midY) quadrants.q3++;
    else if (px > midX && py > midY) quadrants.q4++;
  });

  return quadrants;
}

// Funzione principale
function main() {
  // Inizializza i robot dal file JSON
  const robots = data.map(({ p, v }) => ({
    px: p[0],
    py: p[1],
    vx: v[0],
    vy: v[1],
  }));

  console.log("Stato iniziale dei robot:", robots);

  // Simula il movimento dei robot per 100 secondi
  simulateRobots(robots, SECONDS);

  console.log("Stato finale dei robot:", robots);

  // Conta i robot in ogni quadrante
  const quadrants = countQuadrants(robots, WIDTH, HEIGHT);

  console.log("Robot per quadrante:", quadrants);

  // Calcola il fattore di sicurezza
  const safetyFactor =
    quadrants.q1 * quadrants.q2 * quadrants.q3 * quadrants.q4;

  console.log("Fattore di sicurezza:", safetyFactor);
}

// Esegui il programma
main();
