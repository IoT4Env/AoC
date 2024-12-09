// link consegna advent of code : https://adventofcode.com/2024/day/9

function expandDiskMap(diskMap) {
  let expanded = [];
  for (let i = 0; i < diskMap.length; i += 2) {
    const fileLength = parseInt(diskMap[i], 10),
      freeLength = parseInt(diskMap[i + 1], 10);
    if (isNaN(fileLength) || isNaN(freeLength)) {
      console.error(`Errore nei dati: ${diskMap[i]}, ${diskMap[i + 1]}`);
      return;
    }
    expanded.push(
      ...Array(fileLength).fill(i / 2),
      ...Array(freeLength).fill(".")
    );
  }
  console.log("Espansione del disco iniziale:", expanded.join(""));
  return expanded;
}

function compactDisk(expandedDisk) {
  let step = 0;
  while (true) {
    let moved = false;
    for (let i = expandedDisk.length - 1; i > 0; i--) {
      if (expandedDisk[i] !== "." && expandedDisk[i - 1] === ".") {
        [expandedDisk[i - 1], expandedDisk[i]] = [expandedDisk[i], "."];
        moved = true;
        break;
      }
    }
    step++;
    console.log(`Step ${step}:`, expandedDisk.join(""));
    if (!moved) break;
  }
  return expandedDisk;
}

function calculateChecksum(compactedDisk) {
  let checksum = 0;
  for (let i = 0; i < compactedDisk.length; i++) {
    if (compactedDisk[i] !== ".")
      checksum += i * parseInt(compactedDisk[i], 10);
  }
  console.log("Checksum finale:", checksum);
  return checksum;
}

function processDisk(diskMap) {
  console.log("Disk map iniziale:", diskMap);
  if (diskMap.length % 2 !== 0) {
    console.error("Errore: la lunghezza del disk map deve essere pari.");
    return;
  }
  const expandedDisk = expandDiskMap(diskMap);
  if (!expandedDisk) return; // Gestisce errori durante l'espansione
  const compactedDisk = compactDisk(expandedDisk);
  return calculateChecksum(compactedDisk);
}

// Esempio di utilizzo
const diskMap = "2333133121414131402",
  checksum = processDisk(diskMap);
console.log("Checksum risultante:", checksum);
