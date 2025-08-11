// link consegna advent of code : https://adventofcode.com/2024/day/12

// Funzione per analizzare la mappa e calcolare il prezzo totale delle recinzioni
function calculateTotalFencingPrice(map) {
  const rows = map.length,
    cols = map[0].length,
    visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  // Funzione per esplorare una regione utilizzando DFS
  function exploreRegion(r, c, plantType) {
    const stack = [[r, c]];
    let area = 0,
      perimeter = 0;

    while (stack.length > 0) {
      const [row, col] = stack.pop();

      if (visited[row][col]) continue;
      visited[row][col] = true;
      area++;

      // Calcolo del perimetro
      let localPerimeter = 0;
      const directions = [
        [0, 1], // Destra
        [1, 0], // Sotto
        [0, -1], // Sinistra
        [-1, 0], // Sopra
      ];

      for (const [dr, dc] of directions) {
        const newRow = row + dr,
          newCol = col + dc;

        if (
          newRow < 0 ||
          newRow >= rows ||
          newCol < 0 ||
          newCol >= cols ||
          map[newRow][newCol] !== plantType
        ) {
          localPerimeter++;
        } else if (!visited[newRow][newCol]) stack.push([newRow, newCol]);
      }

      perimeter += localPerimeter;
    }

    return { area, perimeter };
  }

  let totalPrice = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!visited[r][c]) {
        const plantType = map[r][c],
          { area, perimeter } = exploreRegion(r, c, plantType),
          price = area * perimeter;
        console.log(
          `Region with plant '${plantType}' has area: ${area}, perimeter: ${perimeter}, price: ${price}`
        );
        totalPrice += price;
      }
    }
  }

  return totalPrice;
}

// Esempio di mappa
const exampleMap = [
  ["R", "R", "R", "R", "I", "I", "C", "C", "F", "F"],
  ["R", "R", "R", "R", "I", "I", "C", "C", "C", "F"],
  ["V", "V", "R", "R", "R", "C", "C", "F", "F", "F"],
  ["V", "V", "R", "C", "C", "C", "J", "F", "F", "F"],
  ["V", "V", "V", "V", "C", "J", "J", "C", "F", "E"],
  ["V", "V", "I", "V", "C", "C", "J", "J", "E", "E"],
  ["V", "V", "I", "I", "I", "C", "J", "J", "E", "E"],
  ["M", "I", "I", "I", "I", "I", "J", "J", "E", "E"],
  ["M", "I", "I", "S", "S", "I", "J", "E", "E", "E"],
  ["M", "M", "M", "I", "S", "S", "J", "E", "E", "E"],
];

// Calcolo del prezzo totale
const totalPrice = calculateTotalFencingPrice(exampleMap);
console.log(`Total price of fencing all regions: ${totalPrice}`);
