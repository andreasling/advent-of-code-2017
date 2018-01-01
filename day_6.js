const find_max = banks => {

  var max_count = -1;
  var max_index = 0;

  for (var i = 0; i < banks.length; i++) {
    var block_count = banks[i];

    if (block_count > max_count) {
      max_count = block_count;
      max_index = i;
    }
  }

  return max_index;

};

const cycle = banks => {

  var max_index = find_max(banks);

  var block_count = banks[max_index];
  banks[max_index] = 0;

  let i = max_index + 1;
  while (block_count > 0) {
    block_count--;
    banks[(i++)%banks.length]++;
  }

};

const compare_configurations = (c0, c1) => {

  for (var i = 0; i < c0.length; i++) {
    if (c0[i] != c1[i]) {
      return false;
    }
  }

  return true;

};

const count_cycles = banks => {

  var configurations = [];

  while (!configurations.some(c => compare_configurations(banks, c))) {

    configurations.push(Array.from(banks));

    cycle(banks);

  }

  // console.log(configurations);

  return configurations.length;
};

const part_1_test = () => {

  let banks = [0, 2, 7, 0];

  // console.log(find_max(banks));

  console.log("before: ", banks);

  /* console.log(compare_configurations([],[]));
  console.log(compare_configurations([0],[0]));
  console.log(compare_configurations([0],[1]));
  console.log(compare_configurations([0,1],[0,1]));
  console.log(compare_configurations([0,1],[0,2])); */
  //cycle(banks);
  console.log(count_cycles(banks));

  console.log("after: ", banks);
};

// part_1_test();

const run_part_1 = () => {

  var banks = [0, 5, 10, 0, 11, 14, 13, 4, 11, 8, 8, 7, 1, 4, 12, 11];

  console.log(count_cycles(banks));

};

// run_part_1();

// part 2

const count_cycles2 = banks => {

  var configurations = [];

  while (!configurations.some(c => compare_configurations(banks, c))) {

    configurations.push(Array.from(banks));

    cycle(banks);

  }

  // console.log(configurations);

  return configurations.length - configurations.findIndex(c => compare_configurations(banks, c));
};

const part_2_test = () => {

  let banks = [0, 2, 7, 0];

  console.log("before: ", banks);
  console.log(count_cycles2(banks));
  console.log("after: ", banks);
};

// part_2_test();

const run_part_2 = () => {

  var banks = [0, 5, 10, 0, 11, 14, 13, 4, 11, 8, 8, 7, 1, 4, 12, 11];

  console.log(count_cycles2(banks));

};

run_part_2();
