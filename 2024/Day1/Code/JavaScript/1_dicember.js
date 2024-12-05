// link consegna advent of code : https://adventofcode.com/2024/day/1

// Funzione per calcolare la distanza totale tra due liste
function calculateTotalDistance(leftList, rightList) {
  // Ordina entrambe le liste in ordine crescente
  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  // Calcola la distanza tra ogni coppia di numeri corrispondenti
  let totalDistance = 0;
  for (let i = 0; i < leftList.length; i++)
    totalDistance += Math.abs(leftList[i] - rightList[i]);

  return totalDistance;
}

// Input: liste di esempio
const leftList = [3, 4, 2, 1, 3, 3],
  rightList = [4, 3, 5, 3, 9, 3];

// Calcolo della distanza totale
const totalDistance = calculateTotalDistance(leftList, rightList);

// Stampa il risultatoP
console.log(`La distanza totale tra le liste è: ${totalDistance}`);
