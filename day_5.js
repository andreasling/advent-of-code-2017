const count_steps = (jumps) => {
  let steps = 0;
  let i = 0;
  while (i >= 0 && i < jumps.length) {
    // console.log(i);
    let offset = jumps[i];
    jumps[i] = offset + 1;
    i += offset;
    steps++;
  }
  return steps;
}

const test = (f, i) =>
  console.log(i, f(i));

// test(count_steps, [0,3,0,1,-3]);

var input = require("fs").readFileSync("day 5 input.txt", { encoding: "utf-8" });

var parsed = input.replace(/\n$/).split("\n").filter(r => r.length >= 0).map(r => parseInt(r, 10));

/* for (jump of parsed) {
  console.log(jump);
} */

// console.log(count_steps(parsed));

// part 2

const count_steps2 = (jumps) => {
  let steps = 0;
  let i = 0;
  while (i >= 0 && i < jumps.length) {
    // console.log(i);
    let offset = jumps[i];
    if (offset >= 3) {
      jumps[i] = offset - 1;
    } else {
      jumps[i] = offset + 1;
    }
    i += offset;
    steps++;
  }
  return steps;
}

// test(count_steps2, [0,3,0,1,-3]);

console.log(count_steps2(parsed));
