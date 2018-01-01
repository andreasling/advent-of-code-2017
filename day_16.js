const parse_moves = input =>
  input.split(",")
    .map(s => {

      var move = {
        operation: s[0]
      };

      let operands = s.slice(1).split("/");

      switch (move.operation) {
        case "s":
        case "x":
          return { ...move, operands: operands.map(o => parseInt(o, 10)) };
        case "p":
          return { ...move, operands };
        default: throw Error(`invalid move ${s}`);

      }

    });

const dance = (programs, moves) => {

  for (move of moves) {

    switch (move.operation) {

      case "s": {
        let [count] = move.operands;
        programs = [...programs.slice(-count), ...programs.slice(0, -count)];
        break;
      }

      case "x": {
        let [a,b] = move.operands;
        [ programs[a], programs[b] ] = [ programs[b], programs[a] ];
        break;
      }

      case "p": {
        let [a,b] = move.operands.map(n => programs.indexOf(n));
        [ programs[a], programs[b] ] = [ programs[b], programs[a] ];
        break;
      }

      default:
        throw Error(`invalid move ${JSON.stringify(move)}`);
    }

  }

  return programs;

};

const test_part_1 = () => {

  let programs = "abcde".split("");

  let moves = parse_moves("s1,x3/4,pe/b");

  console.log(programs);
  console.log(moves);

  console.log(dance(programs, moves).join(""));

};

// test_part_1();

const run_part_1 = () => {

  let programs = "abcdefghijklmnop".split("");

  let input = require("fs").readFileSync("day_16_input.txt", {encoding: "utf-8"});

  let moves = parse_moves(input);

  console.log(dance(programs, moves).join(""));

};
// run_part_1();

// part 2

const dance_optimized = (programs, moves, count) => {

  const init_state = [...programs];

  let programs_count = programs.length;
  let programs_offset = 0;

  let permutations = [];

  for (let i = 0; i < count; i++) {

    permutations.push([programs_offset, ...programs]);

    for (move of moves) {

      switch (move.operation) {

        case "s": {
          let [count] = move.operands;
          programs_offset = (programs_offset - count + programs_count) % programs_count;
          break;
        }

        case "x": {
          let a = (move.operands[0] + programs_offset + programs_count) % programs_count,
              b = (move.operands[1] + programs_offset + programs_count) % programs_count;
          [ programs[a], programs[b] ] = [ programs[b], programs[a] ];
          break;
        }

        case "p": {
          let a = programs.indexOf(move.operands[0])
              b = programs.indexOf(move.operands[1]);
          [ programs[a], programs[b] ] = [ programs[b], programs[a] ];
          break;
        }

        default:
          throw Error(`invalid move ${JSON.stringify(move)}`);
      }

    }

    if (programs_offset == 0 && programs.every((e,i) => e === init_state[i])) {
      //console.log("back to init state at", i);
      let [predicted_offset, ...predicted_programs] = permutations[count % (i + 1)];
      return [...predicted_programs.slice(predicted_offset), ...predicted_programs.slice(0, predicted_offset)];
    }

  }

  /* let [po, ...pp] = predicted_end_state;
  console.log("predicted:",
    [...pp.slice(po), ...pp.slice(0, po)].join(""),
    predicted_end_state); */

  return [...programs.slice(programs_offset), ...programs.slice(0, programs_offset)];
};

// testing predicting with naive dance algorithm after solving puzzle
const dance_predict = (programs, moves, count) => {

  const init_state = [...programs];

  let permutations = [];

  for (let i = 0; i < count; i++) {

    permutations.push([...programs]);

    programs = dance(programs, moves);

    if (programs.every((e,i) => e === init_state[i])) {
      let predicted_programs = permutations[count % (i + 1)];
      return predicted_programs;
    }

  }

  return programs;
};


const test_part_2 = () => {

  let programs = "abcde".split("");

  let moves = parse_moves("s1,x3/4,pe/b");

  console.log(programs);
  console.log(moves);

  programs = dance_optimized(programs, moves, 2);

  console.log(programs.join(""));

};
// test_part_2();

const test_performance = () => {

  const { performance } = require('perf_hooks');
  let input = require("fs").readFileSync("day_16_input.txt", {encoding: "utf-8"});
  let moves = parse_moves(input);

  {
    let programs = "abcdefghijklmnop".split("");

    performance.mark('naive start');
    for (var i = 0; i < 1000; i++) {
      programs = dance(programs, moves);
    }
    performance.mark('naive end');
    performance.measure('naive', 'naive start', 'naive end');
    const measure = performance.getEntriesByName('naive')[0];
    console.log("naive result:", programs.join(""));
    console.log("naive x 1000:", measure.duration);
  }

  {
    let programs = "abcdefghijklmnop".split("");

    performance.mark('optimized start');
    programs = dance_optimized(programs, moves, 1000);
    performance.mark('optimized end');
    performance.measure('optimized', 'optimized start', 'optimized end');
    const measure = performance.getEntriesByName('optimized')[0];
    console.log("optimized result:", programs.join(""));
    console.log("optimized x 1000:", measure.duration);
  }


    {
      let programs = "abcdefghijklmnop".split("");

      performance.mark('predict start');
      programs = dance_predict(programs, moves, 1000);
      performance.mark('predict end');
      performance.measure('predict', 'predict start', 'predict end');
      const measure = performance.getEntriesByName('predict')[0];
      console.log("predict result:", programs.join(""));
      console.log("predict x 1000:", measure.duration);
    }

};

// test_performance();

const run_part_2 = () => {

  let programs = "abcdefghijklmnop".split("");

  let input = require("fs").readFileSync("day_16_input.txt", {encoding: "utf-8"});

  let moves = parse_moves(input);

  let result = dance_optimized(programs, moves, 1000000000);

  console.log(result.join(""));

};

run_part_2();
