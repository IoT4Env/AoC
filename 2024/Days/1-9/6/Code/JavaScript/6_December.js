// link consegna advent of code : https://adventofcode.com/2024/day/6

const input = [
    "....#.....",
    ".........#",
    "..........",
    "..#.......",
    ".......#..",
    "..........",
    ".#..^.....",
    "........#.",
    "#.........",
    "......#...",
  ];
  
  // Direzioni: [dx, dy] per ogni orientamento (su, destra, giù, sinistra)
  const directions = [
    [-1, 0], // Su
    [0, 1],  // Destra
    [1, 0],  // Giù
    [0, -1], // Sinistra
  ];
  
  // Trova la posizione iniziale della guardia e la sua direzione
  function findGuardPositionAndDirection(map) {
    for (let i = 0; i < map.length; i++) {
      const row = map[i],
        pos = row.indexOf("^");
      if (pos !== -1) {
        console.log(`Guardia trovata: x=${i}, y=${pos}, direzione iniziale=Su`);
        return { x: i, y: pos, direction: 0 }; // Direzione iniziale: Su
      }
    }
    throw new Error("Guard not found in the map!");
  }
  
  // Controlla se una cella è un ostacolo o fuori mappa
  const isObstacle = (map, x, y) => {
    const obstacle =
      x < 0 || y < 0 || x >= map.length || y >= map[0].length || map[x][y] === "#";
    console.log(`Controllo ostacolo: x=${x}, y=${y}, ostacolo=${obstacle}`);
    return obstacle;
  };
  
  // Simula il movimento della guardia
  function simulateGuardPath(map) {
    const visited = new Set(),
      {
        x: startX,
        y: startY,
        direction: startDirection,
      } = findGuardPositionAndDirection(map);
    let guardX = startX,
      guardY = startY,
      direction = startDirection;
  
    console.log(`Partenza guardia: x=${guardX}, y=${guardY}, direzione=0 (Su)`);
  
    visited.add(`${guardX},${guardY}`);
  
    while (true) {
      const [dx, dy] = directions[direction],
        nextX = guardX + dx,
        nextY = guardY + dy;
  
      console.log(`Prossimo passo: x=${nextX}, y=${nextY}, direzione=${direction}`);
  
      if (isObstacle(map, nextX, nextY)) {
        // Gira a destra se c'è un ostacolo
        direction = (direction + 1) % 4;
        console.log(`Ostacolo trovato! Cambio direzione a: ${direction}`);
      } else {
        // Altrimenti, fai un passo avanti
        guardX = nextX;
        guardY = nextY;
        const positionKey = `${guardX},${guardY}`;
        visited.add(positionKey);
        console.log(`Mossa valida: x=${guardX}, y=${guardY}, posizioni visitate=${visited.size}`);
      }
  
      // Esce se la guardia lascia l'area mappata
      if (
        guardX < 0 ||
        guardY < 0 ||
        guardX >= map.length ||
        guardY >= map[0].length
      ) {
        console.log(`Guardia uscita dalla mappa: x=${guardX}, y=${guardY}`);
        break;
      }
    }
  
    console.log(`Posizioni finali visitate: ${[...visited]}`);
    return visited.size;
  }
  
  // Avvio della simulazione
  const visitedPositions = simulateGuardPath(input);
  console.log("Posizioni distinte visitate:", visitedPositions);
  