const part_1 = () => {

  console.log("**** part 1 ****");

  const run = (list, input, test) => {

    var current_position = 0,
        skip_size = 0,
        lengths = input || []; // input

    if (test) { console.log("start", list, lengths); }

    for (const length of lengths) {

      if (test) { console.log(list, length, current_position, skip_size); }

      list = reverse(list, current_position, length);

      current_position = (current_position + length + skip_size) % list.length;

      skip_size++;
    }

    if (test) { console.log(list, null, current_position, skip_size); }

    const [first, second] = list;
    return [first, second, first * second]; // list[0] * list[1];

  };

  const test_run = () => {

    var input = [3, 4, 1, 5];

    console.log("result", run(create_list(5), input, true));

  };

  console.log("** test **");

  test_run();

  console.log("** run **");
  // run:
  console.log(run(create_list(256), [94,84,0,79,2,27,81,1,123,93,218,23,103,255,254,243]));
};



const part_2 = () => {

  console.log("**** part 2 ****");

  const run = (list, input, test) => {

    var /* list = [0,1,2,3,4], */
        current_position = 0,
        skip_size = 0,
        lengths = parse_input(input) || []; // input

    if (test) { console.log("start", list, lengths); }

    for (var i = 0; i < 64; i++) {

      for (const length of lengths) {

        if (test) { console.log(list, length, current_position, skip_size); }

        list = reverse(list, current_position, length);

        current_position = (current_position + length + skip_size) % list.length;

        skip_size++;
      }

    }

    if (test) { console.log(list, null, current_position, skip_size); }

    // const [first, second] = list;
    // return [first, second, first * second]; // list[0] * list[1];

    var dense = to_dense(list);

    // return dense;

    return to_hexstring(dense);

  };

  const parse_input = input => {

    return [...(function* () {
      for (var i = 0; i < input.length; i++) {
        yield input.charCodeAt(i);
      }

      yield* [17, 31, 73, 47, 23];

    })()];

  };

  const test_parse_input = () => {
    console.log(parse_input("1,2,3"));
  };

  console.log("** test **");
  test_parse_input();

  console.log("empty", run(create_list(256), ""));
  console.log("AoC 2017", run(create_list(256), "AoC 2017"));
  console.log("1,2,3", run(create_list(256), "1,2,3"));
  console.log("1,2,4", run(create_list(256), "1,2,4"));

  console.log("** run **");
  // run:
  console.log(run(create_list(256), "94,84,0,79,2,27,81,1,123,93,218,23,103,255,254,243"));

};


const create_list = length => {

  return [...(function* () {
    for (var i = 0; i < length; i++) {
      yield i;
    }
  })()];

};

const reverse = (list, current_position, length) => {

  return [...(function* () {

    for (var i = 0; i < list.length; i++) {

      /* works when not wrapping
      if (i >= current_position && i < (current_position + length)) {
        yield list[current_position + length - i + current_position - 1];
      } else {
        yield list[i];
      }

      if (!(i >= current_position && i < (current_position + length))) {
        yield list[i];
      } else {
        yield list[current_position + length - i + current_position - 1];
      }
      */

      // todo: length = 0, 1, list.length

      if (length == 0 || length == 1) { yield list[i]; continue; }

      const last_position = (current_position + length - 1) % list.length;

      if ((
        last_position > current_position && (
          i < current_position || i > last_position)
        ) || (
        last_position < current_position && (
          i < current_position && i > last_position)
        )) {
        yield list[i];
      } else {
        yield list[(current_position + length - i + current_position - 1) % list.length];
      }

    }


  })()];

};

const to_dense = (list) => {

  return [...(function* () {

    var s = 0;
    for (var i = 0; i < list.length; i++) {
      const number = list[i];
      s ^= number;
      if ((i+1)%16 == 0) {
        yield s;
        s = 0;
      }
    }

  })()];

};

const to_hexstring = (numbers) => {

  return numbers.map(n => (n < 16 ? "0" : "") + n.toString(16)).join("");

};

const test_reverse = () => {

  var list = [0,1,2,3,4];
  console.log(list, reverse(list, 0, 3));
  console.log(list, reverse(list, 1, 3));
  console.log(list, reverse(list, 2, 3));
  console.log(list, reverse(list, 3, 3));
}

const test_create_list = () => {

  console.log(create_list(5));
  console.log(create_list(256));

};

const test_to_dense = () => {

  var list = [1, 2, 4, 8, 16, 32, 64, 128, 0, 1, 0, 2, 0, 4, 0, 255];
  console.log(list, to_dense(list));

  list = [65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22];
  console.log(list, to_dense(list));

};

const test_to_hex = () => {
  var numbers = [0,1,2,3,10,11,12,13, 255];
  console.log(numbers, to_hexstring(numbers));

  numbers = [64, 7, 255];
  console.log(numbers, to_hexstring(numbers));
};

// test_reverse();
// test_create_list();
// test_to_dense();
// test_to_hex();


// part_1();

part_2();
