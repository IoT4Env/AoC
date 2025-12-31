// link consegna advent of code : https://adventofcode.com/2024/day/3

function sumValidMultiplications(input) {
  // Regex per catturare i pattern validi di mul(X,Y)
  const regex = /mul\((\d+),(\d+)\)/g;
  let match,
    total = 0;

  // Itera su tutte le corrispondenze del regex nella stringa
  while ((match = regex.exec(input)) !== null) {
    // Estrai i numeri e calcola il prodotto
    const x = parseInt(match[1], 10),
      y = parseInt(match[2], 10);
    total += x * y;
  }

  return total;
}

// Esempio di utilizzo
const corruptedMemory =
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
  result = sumValidMultiplications(corruptedMemory);

console.log(`La somma totale è: ${result}`);
