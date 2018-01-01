

const test_part_1 = () => {

  let registers = {
    a: 1,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
    g: 0,
    h: 0,
  };

  const value_of = expression =>
    /^-?\d+$/.test(expression) ? parseInt(expression, 10) : registers[expression];

  let instructions = /* [
    { operation: "set", operands: ["a", 1] },
    { operation: "set", operands: ["b", "a"] },
    { operation: "sub", operands: ["b", -1] },
    { operation: "mul", operands: ["a", "b"] }
  ]; */
    require("fs").readFileSync("day_23_input.txt", { encoding: "utf-8" }).replace(/\n$/, "")
      .split("\n").map(r => r.split(" ")).map(t => { let [operation, ...operands] = t; return { operation, operands }; });

  let ic = 0;
  let ip = 0;
  let mul_count = 0;

  while (ip >= 0 && ip < instructions.length) {

    process.stdout.write((ic++).toString().padStart(3) + ip.toString().padStart(3) + registers["h"].toString().padStart(3) + "\r");

    let instruction = instructions[ip];

    // console.log(instruction, ip);

    switch (instruction.operation) {
      case "set": {
        registers[instruction.operands[0]] = value_of(instruction.operands[1]);
        ip++;
        break;
      }
      case "sub": {
        registers[instruction.operands[0]] -= value_of(instruction.operands[1]);
        ip++;
        break;
      }
      case "mul": {
        mul_count++;
        registers[instruction.operands[0]] *= value_of(instruction.operands[1]);
        ip++;
        break;
      }
      case "jnz": {
        if (value_of(instruction.operands[0]) !== 0) {
          ip += value_of(instruction.operands[1]);
        } else {
          ip++;
        }
        break;
      }

      default:
        throw Error(`invalid instruction ${instruction.operation}`);
    }

  }

  console.log("execution ended");
  console.log("registers", registers);
  console.log("mul count", mul_count);
};

test_part_1();
