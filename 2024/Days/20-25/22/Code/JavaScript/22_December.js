// link consegna advent of code : https://adventofcode.com/2024/day/22

const fs = require("fs");

// Funzione per mescolare un valore nel numero segreto
const mix = (secret, value) => secret ^ value,
  prune = (secret) => secret % 16777216;

// Funzione per generare il prossimo numero segreto
function generateNextSecret(secret) {
  secret = prune(mix(secret, secret * 64));
  secret = prune(mix(secret, Math.floor(secret / 32)));
  secret = prune(mix(secret, secret * 2048));
  return secret;
}

// Funzione per calcolare il 2000° numero segreto
function calculate2000thSecret(initialSecret) {
  let secret = initialSecret;
  for (let i = 0; i < 2000; i++) 
    secret = generateNextSecret(secret);
  return secret;
}

// Lettura del file JSON
fs.readFile("../Json/buyers.json", "utf-8", (err, data) => {
  if (err) {
    console.error("Errore durante la lettura del file JSON:", err);
    return;
  }

  const buyers = JSON.parse(data).buyers;
  let total = 0;

  console.log("Calcolo dei 2000° numeri segreti per ciascun compratore:");
  buyers.forEach((initialSecret, index) => {
    const result = calculate2000thSecret(initialSecret);
    console.log(
      `Compratore ${index + 1} (Iniziale: ${initialSecret}): ${result}`
    );
    total += result;
  });

  console.log("Somma totale dei 2000° numeri segreti:", total);
});
