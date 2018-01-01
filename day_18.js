const test_part_1 = () => {

  let input =
`set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2
`;

  input = require("fs").readFileSync("day_18_input.txt", { encoding: "utf-8" });

  let instructions = input.replace(/\n$/, "").split("\n")
    .map(r => r.split(" "))
    .map(r => { let [operation, ...operands] = r; return { operation, operands }; });

  // console.log(instructions);

  let registers = {};

  const get_value = expression => {
    let v = parseInt(expression);
    return isNaN(v) ? registers[expression] : v;
  };

  for (var i = 0; i < instructions.length; i++) {

    let instruction = instructions[i];

    let {operation, operands} = instruction;

    // console.log(operation, operands);

    switch (operation) {

      case "snd":
        registers["snd"] = get_value(operands[0]);
        break;

      case "set":
        registers[operands[0]] = get_value(operands[1]);
        break;

      case "add":
        registers[operands[0]] = registers[operands[0]] + get_value(operands[1]);
        break;

      case "mul":
        registers[operands[0]] = registers[operands[0]] * get_value(operands[1]);
        break;

      case "mod":
        registers[operands[0]] = registers[operands[0]] % get_value(operands[1]);
        break;

      case "rcv":
        if (get_value(registers[operands[0]]) !== 0) {
          let snd_value = registers["snd"];
          registers[operands[0]] = snd_value; //registers["snd"];

          // break
          console.log("snd value:", snd_value);
          return snd_value;

        }
        break;

      case "jgz":

        if (get_value(operands[0])) {
          i += get_value(operands[1] - 1);
        }

        break;


      default:
        console.log("not implemented:", instruction);
    }

    console.log(registers);

  }

    console.log(registers);
};

test_part_1();
