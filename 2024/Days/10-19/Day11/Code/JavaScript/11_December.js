// link consegna advent of code : https://adventofcode.com/2024/day/11

// Funzione per gestire l'evoluzione di un singolo numero secondo le regole
function evolveStone(stone) {
  if (stone === 0) {
    console.log(`Stone ${stone} evolves to [1]`);
    return [1];
  } else if (stone.toString().length % 2 === 0) {
    const digits = stone.toString(),
      mid = digits.length / 2,
      left = parseInt(digits.slice(0, mid), 10),
      right = parseInt(digits.slice(mid), 10);
    console.log(`Stone ${stone} splits into [${left}, ${right}]`);
    return [left, right];
  } else {
    const newStone = stone * 2024;
    console.log(`Stone ${stone} evolves to [${newStone}]`);
    return [newStone];
  }
}

// Funzione per elaborare l'intera linea di pietre in un singolo "blink"
function blinkStones(stones) {
  let newStones = [];
  for (const stone of stones) newStones = newStones.concat(evolveStone(stone));
  console.log(`After blink: [${newStones.join(", ")}]`);
  return newStones;
}

// Funzione principale per simulare i "blink"
function simulateBlinks(initialStones, blinks) {
  let currentStones = initialStones;
  console.log(`Initial arrangement: [${currentStones.join(", ")}]`);

  for (let i = 1; i <= blinks; i++) {
    console.log(`\nBlink ${i}...`);
    currentStones = blinkStones(currentStones);
  }

  console.log(
    `\nFinal arrangement after ${blinks} blinks: [${currentStones.join(", ")}]`
  );
  console.log(`Total number of stones: ${currentStones.length}`);
  return currentStones.length;
}

// Input iniziale
const initialStones = [125, 17],
  numberOfBlinks = 25;

// Esegui la simulazione
simulateBlinks(initialStones, numberOfBlinks);
