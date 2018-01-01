class Program {

  constructor(program_id, send_queue, receive_queue, instructions) {

    this.program_id = program_id;
    this.registers = { p: program_id };
    this.send_queue = send_queue;
    this.receive_queue = receive_queue;
    this.instructions = instructions;
    this.ip = 0;

    this.send_count = 0;

  }

  toString() {
    return `id: ${this.program_id}, registers: ${Object.entries(this.registers).map(p => p.join(":")).join(",")}, ip: ${this.ip}, sends: ${this.send_count}`;
  }

  evaluate(expression) {

    let v = parseInt(expression);

    if (!isNaN(v)) {
      return v;
    }

    if (!this.registers.hasOwnProperty(expression)) {
      this.registers[expression] = 0;
    }

    return this.registers[expression];
  }

  get_send_count() {
    return this.send_count;
  }

  run() {

    let c = 1000;
    // for (let i = 0; i < instructions.length; i++) {
    while (this.ip >= 0 && this.ip < this.instructions.length)
    {
      if (c-- <= 0) {
        return "running";
      }

      let instruction = this.instructions[this.ip];

      let {operation, operands} = instruction;

      // console.log(this.program_id, operation, operands);

      switch (operation) {

        case "snd": {
          //registers["snd"] = get_value(operands[0]);
          this.send_queue.push(this.evaluate(operands[0]));
          this.send_count++;
          this.ip++;
          break;
        }

        case "set": {
          this.registers[operands[0]] = this.evaluate(operands[1]);
          this.ip++;
          break;
        }

        case "add": {
          this.registers[operands[0]] = this.registers[operands[0]] + this.evaluate(operands[1]);
          this.ip++;
          break;
        }

        case "mul": {
          this.registers[operands[0]] = this.registers[operands[0]] * this.evaluate(operands[1]);
          this.ip++;
          break;
        }

        case "mod": {
          this.registers[operands[0]] = this.registers[operands[0]] % this.evaluate(operands[1]);
          this.ip++;
          break; }

        case "rcv": {
          /* if (get_value(registers[operands[0]]) !== 0) {
            let snd_value = registers["snd"];
            registers[operands[0]] = snd_value; //registers["snd"];

            /* // break
            console.log("snd value:", snd_value);
            return snd_value; * /

          }*/
          if (this.receive_queue.length === 0) {
            return "waiting";
          }

          this.registers[operands[0]] = this.receive_queue.shift();
          this.ip++;
          break;
        }

        case "jgz": {

          if (this.evaluate(operands[0]) > 0) {
            this.ip += this.evaluate(operands[1]);
          } else {
            this.ip++;
          }

          break;
        }

        default:
          console.log("not implemented:", instruction);
      }

      // console.log(this.registers);


    }

    return "ended";

  }

};


const test_part_2 = () => {

  let input =
`snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d
`;

  input = require("fs").readFileSync("day_18_input.txt", { encoding: "utf-8" });

  let instructions = input.replace(/\n$/, "").split("\n")
    .map(r => r.split(" "))
    .map(r => { let [operation, ...operands] = r; return { operation, operands }; });

  // console.log(instructions);

  // let registers = {};

  /* const get_value = expression => {
    let v = parseInt(expression);
    // return isNaN(v) ? registers[expression] : v;
    if (!isNaN(v)) {
      return v;
    }

    if (!registers.hasOwnProperty(expression)) {
      registers[expression] = 0;
    }

    return registers[expression];
  }; */

  /* for (let i = 0; i < instructions.length; i++) {

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

          /* // break
          console.log("snd value:", snd_value);
          return snd_value; * /

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

  } */

  //console.log(registers);

  let queue_0_to_1 = [], queue_1_to_0 = [];

  let program0 = new Program(0, queue_0_to_1, queue_1_to_0, instructions);
  let program1 = new Program(1, queue_1_to_0, queue_0_to_1, instructions);

  let state0 = "", state1 = "";

  while (state0 !== "ended" && state1 !== "ended") {
    state0 = program0.run();
    state1 = program1.run();

    // console.log(state0, state1, queue_0_to_1, queue_1_to_0);
    if (state0 !== "running" || state1 !== "running") {
      console.log(state0, state1, queue_0_to_1.length, queue_1_to_0.length, program0.get_send_count(), program1.get_send_count());
    }

    if (((state0 === "waiting" && queue_1_to_0.length === 0) || state0 === "ended") && //state1 === "waiting" && queue_1_to_0.length === 0) {
      ((state1 === "waiting" && queue_0_to_1.length === 0) || state1 === "ended")) {
      console.log("deadlocked or ended");
      break;
    } else if (state1 === "ended") {
      console.log("program1 ended");
      break;
    }
  }

  console.log(program0.toString());
  //console.log(program0.get_send_count())

  console.log(program1.toString());
  //console.log(program1.get_send_count());
};

test_part_2();
