// link consegna advent of code : https://adventofcode.com/2024/day/4

// Funzione per verificare se una parola esiste in una direzione specifica
function checkDirection(grid, word, startX, startY, deltaX, deltaY) {
    const wordLength = word.length, rows = grid.length,
     cols = grid[0].length;

    console.log(`Checking word "${word}" from start (${startX}, ${startY}) in direction (${deltaX}, ${deltaY})`);

    for (let i = 0; i < wordLength; i++) {
        const x = startX + i * deltaX, y = startY + i * deltaY;
        console.log(`Checking character at (${x}, ${y})`);

        if (x < 0 || x >= rows || y < 0 || y >= cols || grid[x][y] !== word[i]) {
            console.log(`Mismatch or out of bounds at (${x}, ${y}), expected "${word[i]}", found "${grid[x] ? grid[x][y] : undefined}"`);
            return false;
        }
    }
    console.log(`Word "${word}" found starting at (${startX}, ${startY}) in direction (${deltaX}, ${deltaY})`);
    return true;
}

// Funzione principale per trovare tutte le occorrenze di una parola
function countOccurrences(grid, word) {
    const rows = grid.length;
 cols = grid[0].length;
    const directions = [
        [0, 1],  // Destra
        [1, 0],  // Giù
        [1, 1],  // Diagonale in basso a destra
        [1, -1], // Diagonale in basso a sinistra
        [0, -1], // Sinistra
        [-1, 0], // Su
        [-1, -1], // Diagonale in alto a sinistra
        [-1, 1]  // Diagonale in alto a destra
    ];

    let count = 0;

    console.log(`Checking for occurrences of "${word}" in grid:`);
    console.log(grid.map(row => row.join('')).join('\n'));

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            console.log(`Checking cell (${x}, ${y})`)
            for (const [dx, dy] of directions) {
                if (checkDirection(grid, word, x, y, dx, dy)) {
                    console.log(`Found occurrence of "${word}" at (${x}, ${y}) in direction (${dx}, ${dy})`);
                    count++;
                }
            }
        }
    }

    return count;
}

// Input della matrice
const grid = [
    "MMMSXXMASM",
    "MSAMXMSMSA",
    "AMXSXMAAMM",
    "MSAMASMSMX",
    "XMASAMXAMM",
    "XXAMMXXAMA",
    "SMSMSASXSS",
    "SAXAMASAAA",
    "MAMMMXMMMM",
    "MXMXAXMASX"
];

// Parola da cercare
const word = "XMAS";

// Calcolo e output
const occurrences = countOccurrences(grid.map(row => row.split('')), word);
console.log("Occorrenze di XMAS:", occurrences);
