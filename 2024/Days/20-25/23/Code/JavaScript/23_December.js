// link consegna advent of code : https://adventofcode.com/2024/day/23

const fs = require("fs").promises,
  path = require("path");

// Funzione per leggere il JSON e analizzare i dati
async function findConnectedSets() {
  try {
    // Legge i dati dal file JSON
    const filePath = path.join(__dirname, "../Json/Data.json"),
      jsonData = await fs.readFile(filePath, "utf8"),
      data = JSON.parse(jsonData),
      connections = data.connections;

    // Costruisce una mappa dei nodi e delle loro connessioni
    const graph = {};
    connections.forEach(([a, b]) => {
      if (!graph[a]) graph[a] = new Set();
      if (!graph[b]) graph[b] = new Set();
      graph[a].add(b);
      graph[b].add(a);
    });

    // Trova tutti i set di tre nodi inter-connessi
    const setsOfThree = new Set();
    Object.keys(graph).forEach((node1) => {
      graph[node1].forEach((node2) => {
        graph[node2].forEach((node3) => {
          if (node3 !== node1 && graph[node3].has(node1)) {
            const sortedSet = [node1, node2, node3].sort().join(",");
            setsOfThree.add(sortedSet);
          }
        });
      });
    });

    // Filtra i set con almeno un nodo che inizia con "t"
    const setsWithT = [...setsOfThree].filter((set) =>
      set.split(",").some((node) => node.startsWith("t"))
    );

    // Stampa i risultati
    console.log(`Tutti i set di tre nodi inter-connessi:`, [...setsOfThree]);
    console.log(`Set con almeno un nodo che inizia con "t":`, setsWithT);
    console.log(`Numero di set con almeno un nodo "t":`, setsWithT.length);
  } catch (error) {
    console.error("Errore durante l'elaborazione:", error);
  }
}

// Esegui il programma
findConnectedSets();
