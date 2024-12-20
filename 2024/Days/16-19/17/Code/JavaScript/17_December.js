// link consegna advent of code : https://adventofcode.com/2024/day/17

// Definizione delle funzioni per l'interpretazione
function getComboValue(operand, registers) {
  if (operand <= 3) return operand;
  if (operand === 4) return registers.A;
  if (operand === 5) return registers.B;
  if (operand === 6) return registers.C;
  throw new Error("Operando Combo non valido: " + operand);
}

// Funzione ADV: divide A per 2^(value of combo operand)
function adv(registers, operand) {
  const denominator = Math.pow(2, getComboValue(operand, registers));
  console.log(
    `ADV: A=${registers.A}, operand=${operand}, denominator=2^${getComboValue(
      operand,
      registers
    )} = ${denominator}`
  );
  registers.A = Math.trunc(registers.A / denominator);
  console.log(`Risultato ADV: A=${registers.A}`);
}

// Funzione BXL: operazione XOR con B e l'operando
const bxl = (registers, operand) => {
  console.log(`BXL: B=${registers.B}, operand=${operand}`);
  registers.B = registers.B ^ operand;
  console.log(`Risultato BXL: B=${registers.B}`);
};

// Funzione BST: assegna il valore % 8 alla B
const bst = (registers, operand) => {
  console.log(`BST: operand=${operand}`);
  registers.B = getComboValue(operand, registers) % 8;
  console.log(`Risultato BST: B=${registers.B}`);
};

// Funzione JNZ: salto condizionato
function jnz(registers, operand, instructionPointer) {
  console.log(`JNZ: A=${registers.A}, operand=${operand}`);
  if (registers.A !== 0) {
    console.log(`JNZ salto a: ${operand}`);
    return operand;
  }
  console.log("JNZ: Nessun salto effettuato.");
  return instructionPointer + 2;
}

// Funzione BXC: XOR tra B e C
const bxc = (registers) => {
  console.log(`BXC: B=${registers.B}, C=${registers.C}`);
  registers.B = registers.B ^ registers.C;
  console.log(`Risultato BXC: B=${registers.B}`);
};

// Funzione OUT: genera output
const out = (registers, operand, output) => {
  const value = getComboValue(operand, registers) % 8;
  console.log(`OUT: operand=${operand}, output=${value}`);
  output.push(value);
};

// Funzione BDV: divisione simile a ADV, ma salva in B
function bdv(registers, operand) {
  const denominator = Math.pow(2, getComboValue(operand, registers));
  console.log(
    `BDV: A=${registers.A}, operand=${operand}, denominator=2^${getComboValue(
      operand,
      registers
    )} = ${denominator}`
  );
  registers.B = Math.trunc(registers.A / denominator);
  console.log(`Risultato BDV: B=${registers.B}`);
}

// Funzione CDV: divisione simile a ADV, ma salva in C
function cdv(registers, operand) {
  const denominator = Math.pow(2, getComboValue(operand, registers));
  console.log(
    `CDV: A=${registers.A}, operand=${operand}, denominator=2^${getComboValue(
      operand,
      registers
    )} = ${denominator}`
  );
  registers.C = Math.trunc(registers.A / denominator);
  console.log(`Risultato CDV: C=${registers.C}`);
}

// Funzione principale che esegue il programma
function runProgram(registers, program) {
  let instructionPointer = 0;
  const output = [];

  while (instructionPointer < program.length) {
    const opcode = program[instructionPointer];
    const operand = program[instructionPointer + 1];
    console.log(
      `\nIstruzione corrente: opcode=${opcode}, operand=${operand}, IP=${instructionPointer}`
    );
    console.log(
      `Registri: A=${registers.A}, B=${registers.B}, C=${registers.C}`
    );

    instructionPointer += 2; // Avanza di default di 2 posizioni

    switch (opcode) {
      case 0:
        adv(registers, operand);
        break;
      case 1:
        bxl(registers, operand);
        break;
      case 2:
        bst(registers, operand);
        break;
      case 3:
        instructionPointer = jnz(registers, operand, instructionPointer - 2);
        break;
      case 4:
        bxc(registers);
        break;
      case 5:
        out(registers, operand, output);
        break;
      case 6:
        bdv(registers, operand);
        break;
      case 7:
        cdv(registers, operand);
        break;
      default:
        throw new Error("Opcode non valido: " + opcode);
    }

    console.log(
      `Stato finale istruzione: A=${registers.A}, B=${registers.B}, C=${registers.C}`
    );
  }

  return output.join(",");
}

// Input fornito
const registers = { A: 729, B: 0, C: 0 },
  program = [0, 1, 5, 4, 3, 0];

// Esecuzione del programma
console.log("=== Inizio esecuzione programma ===");
const result = runProgram(registers, program);
console.log("=== Fine esecuzione programma ===");

// Output del risultato finale
console.log("Output del programma:", result);
