// link consegna advent of code : https://adventofcode.com/2024/day/24

const fs = require("fs"),
  andGate = (input1, input2) => input1 && input2,
  orGate = (input1, input2) => input1 || input2,
  xorGate = (input1, input2) => input1 ^ input2;

function simulateGates(initialValues, gateConnections) {
  let wireValues = { ...initialValues };

  gateConnections.forEach((connection) => {
    const [inputs, output] = connection.split(" -> "),
      [input1, gate, input2] = inputs.split(" ");

    switch (gate) {
      case "AND":
        wireValues[output] = andGate(wireValues[input1], wireValues[input2]);
        break;
      case "OR":
        wireValues[output] = orGate(wireValues[input1], wireValues[input2]);
        break;
      case "XOR":
        wireValues[output] = xorGate(wireValues[input1], wireValues[input2]);
        break;
    }
  });

  return wireValues;
}

fs.readFile("../Json/data.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const { initialValues, gateConnections } = JSON.parse(data),
    result = simulateGates(initialValues, gateConnections);

  console.log(result);
});
