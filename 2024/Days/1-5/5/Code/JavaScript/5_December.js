// link consegna advent of code : https://adventofcode.com/2024/day/5

const rules = [
    "47|53",
    "97|13",
    "97|61",
    "97|47",
    "75|29",
    "61|13",
    "75|53",
    "29|13",
    "97|29",
    "53|29",
    "61|53",
    "97|53",
    "61|29",
    "47|13",
    "75|47",
    "97|75",
    "47|61",
    "75|61",
    "47|29",
    "75|13",
    "53|13",
  ],
  pages = [
    "75,47,61,53,29",
    "97,61,53,29,13",
    "75,29,13",
    "75,97,47,61,53",
    "61,13,29",
    "97,13,75,29,47",
    "75,53,29,13",
  ];

// Funzione per verificare se una regola è rispettata in una pagina
function isRuleSatisfied(rule, pageArray) {
  const [x, y] = rule.split("|");
  console.log(`Verificando la regola ${rule} sulla pagina ${pageArray}`);
  if (pageArray.includes(x) && pageArray.includes(y)) {
    console.log(`La regola ${rule} richiede che ${x} preceda ${y}`);
    return pageArray.indexOf(x) < pageArray.indexOf(y);
  }
  console.log(`La regola ${rule} non si applica perchè una delle due pagine manca`);
  return true; // La regola non si applica se una delle due pagine manca
}

// Funzione per verificare se tutte le regole sono rispettate in una pagina
const isCorrectOrder = (page, rules) =>
  rules.every((rule) => isRuleSatisfied(rule, page.split(",")));

// Funzione per calcolare il numero centrale di una pagina
const getMiddlePage = (page) =>
  page.split(",").map(Number)[
    Math.floor(page.split(",").map(Number).length / 2)
  ];

// Funzione principale per calcolare la somma dei numeri centrali delle pagine corrette
function calculateSumOfMiddlePages(pages, rules) {
  console.log("Inizio calcolo della somma dei numeri centrali delle pagine corrette");
  let sumMiddlePages = 0;

  for (const page of pages) {
    console.log(`Verifico la pagina ${page}`);
    if (isCorrectOrder(page, rules)) {
      const middlePage = getMiddlePage(page);
      sumMiddlePages += middlePage;
      console.log(
        `Pagina ordinata correttamente: ${page}, numero centrale: ${middlePage}`
      );
    } else console.log(`Pagina non ordinata correttamente: ${page}`);
  }

  console.log("Fine calcolo della somma dei numeri centrali delle pagine corrette");
  return sumMiddlePages;
}

// Esegui il calcolo e stampa il risultato
const sumMiddlePages = calculateSumOfMiddlePages(pages, rules);
console.log(`Somma totale dei numeri centrali: ${sumMiddlePages}`);
