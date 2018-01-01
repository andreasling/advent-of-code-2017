const parse_input = input =>
  input.replace(/\n$/, "").split("\n")
    .map(r => r.split(" "))
    .map(r => ({
      register: r[0],
      operator: r[1],
      amount: parseInt(r[2], 10),
      condition: {
        register: r[4],
        operator: r[5],
        value: parseInt(r[6], 10)
      }
    }));

const evaluate_condition = (operator, first_operand, second_operand) => {
  switch (operator) {
    case "==": return first_operand == second_operand;
    case "!=": return first_operand != second_operand;
    case "<": return first_operand < second_operand;
    case "<=": return first_operand <= second_operand;
    case ">": return first_operand > second_operand;
    case ">=": return first_operand >= second_operand;
    default: throw Error(`invalid operator '${operator}'`);
  }
};

const process = instructions => {
  let registers = {};
  let max_run = 0;

  for (instruction of instructions) {

    let condition = instruction.condition;
    let condition_register = condition.register;

    if (registers[condition_register] === undefined) {
      registers[condition_register] = 0;
    }

    if (evaluate_condition(condition.operator, registers[condition_register], condition.value)) {

      let register = instruction.register;
      let operator = instruction.operator;
      let amount = instruction.amount;

      if (registers[register] === undefined) {
        registers[register] = 0;
      }

      switch (operator) {
        case "inc":
          registers[register] += amount;
          break;
        case "dec":
          registers[register] -= amount;
          break;
        default:
          throw Error(`invalid operator '${operator}'`);
      }

      max_run = Math.max(max_run, ...Object.values(registers));
    }
  }

  // part 1: return registers;

  return {
    max_result: Math.max(...Object.values(registers)),
    max_run
  };
};

const test_part_1 = () => {

  const test_input =
`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
`;

  let instructions = parse_input(test_input)
  //console.log(instructions);

  let registers = process(instructions);

  console.log(registers);
  console.log(Math.max(...Object.values(registers)));
};

// test_part_1();

const run_part_1 = () => {

  let input = require("fs").readFileSync("day_8_input.txt", { encoding: "utf-8" });

  let instructions = parse_input(input)
  let registers = process(instructions);
  console.log(Math.max(...Object.values(registers)));

};
// run_part_1();

// part 2
const test_part_2 = () => {
  const test_input =
`b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
`;

  let instructions = parse_input(test_input)

  let results = process(instructions);

  console.log(results);

};
// test_part_2();

const run_part_2 = () => {

  let input = require("fs").readFileSync("day_8_input.txt", { encoding: "utf-8" });
  let instructions = parse_input(input)
  let results = process(instructions);

  console.log(results);
};

run_part_2();
