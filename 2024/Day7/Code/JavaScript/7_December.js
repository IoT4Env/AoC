// link consegna advent of code : https://adventofcode.com/2024/day/7

function canMatchTarget(numbers, target) {
  console.log(
    `canMatchTarget called with numbers: ${numbers.join(
      ","
    )} and target: ${target}`
  );
  function evaluate(ops, nums) {
    console.log(
      `Evaluating operators: ${ops.join(",")} and numbers: ${nums.join(",")}`
    );
    let result = nums[0];
    for (let i = 0; i < ops.length; i++) {
      console.log(`Processing operator: ${ops[i]} and number: ${nums[i + 1]}`);
      if (ops[i] === "+") result += nums[i + 1];
      else if (ops[i] === "*") result *= nums[i + 1];
    }
    console.log(`Result: ${result}`);
    return result;
  }

  function generateOperators(length) {
    console.log(`Generating operators for length: ${length}`);
    if (length === 0) {
      console.log("Base case reached, returning [[]]");
      return [[]];
    }
    console.log("Recursively generating subOperators");
    const subOperators = generateOperators(length - 1);
    console.log(
      `SubOperators for length ${length - 1}: ${subOperators
        .map((ops) => ops.join(","))
        .join(" | ")}`
    );
    const result = subOperators.flatMap((ops) => [
      ["+"].concat(ops),
      ["*"].concat(ops),
    ]);
    console.log(
      `Generated operators for length ${length}: ${result
        .map((ops) => ops.join(","))
        .join(" | ")}`
    );
    return result;
  }

  const operatorsCombinations = generateOperators(numbers.length - 1);
  console.log(
    `Operators combinations: ${operatorsCombinations
      .map((ops) => ops.join(","))
      .join("\n")}`
  );

  return operatorsCombinations.some((ops) => evaluate(ops, numbers) === target);
}

function calculateTotalCalibration(input) {
  console.log("calculateTotalCalibration called with input:\n", input);
  const lines = input.split("\n").filter((line) => line.trim().length > 0); // Filtra righe vuote
  let totalCalibrationResult = 0;

  lines.forEach((line) => {
    console.log(`Processing line: ${line}`);
    const [testValue, numbersStr] = line.split(":");
    if (!testValue || !numbersStr) {
      console.log(`Skipping invalid line: ${line}`);
      return;
    }

    const target = parseInt(testValue.trim(), 10),
      numbers = numbersStr.trim().split(" ").map(Number);

    console.log(`Target: ${target}, numbers: ${numbers.join(",")}`);
    if (canMatchTarget(numbers, target)) {
      console.log(
        `canMatchTarget returned true, adding ${target} to totalCalibrationResult`
      );
      totalCalibrationResult += target;
    } else {
      console.log(`canMatchTarget returned false, skipping ${target}`);
    }
  });

  console.log(`Returning totalCalibrationResult: ${totalCalibrationResult}`);
  return totalCalibrationResult;
}

// Esempio di input
const input = `
  190: 10 19
  3267: 81 40 27
  83: 17 5
  156: 15 6
  7290: 6 8 6 15
  161011: 16 10 13
  192: 17 8 14
  21037: 9 7 18 13
  292: 11 6 16 20
  `,
  totalCalibration = calculateTotalCalibration(input);
console.log("Total Calibration Result:", totalCalibration);
