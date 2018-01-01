var input = "flqrgnkx";
/*for (var i = 0; i < 8; i++) {
  var key_string = input + "-" + i;

  console.log(key_string);
}*/

/* var key_strings = (function* (input) {
  for (var i = 0; i < 8; i++) {
    yield input + "-" + i;
  }
} )(input);

console.log(key_strings);
*/

var hash = "a0c2017";


const hex_to_bin = digit => {

  var bins = [];
  for (var i = 0; i < 4; i++) {
    bins.push((digit >> (3 - i)) % 2);
  }

  return bins.join("");

};

const hash_to_bin = hash => hash.split("").map(s => parseInt(s, 16)).map(hex_to_bin).join("");

var bin = hash_to_bin(hash); // hash.split("").map(s => parseInt(s, 16)).map(hex_to_bin).join("");
console.log("act: ", bin);
console.log("exp: ", "10100000110000100000000101110000");

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


  // console.log(run(create_list(256), "94,84,0,79,2,27,81,1,123,93,218,23,103,255,254,243"));

  return (input) => run(create_list(256), input);

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


var hasher = part_2();

// console.log(hash_to_bin(hasher("flqrgnkx-0")));

const get_range = n => [...(function* () { for (var i = 0; i < n; i++) { yield i; } })()];

// console.log(get_range(10));

//var key_strings = get_range(128).map(i => "flqrgnkx-" + i);
 var key_strings = get_range(128).map(i => "xlqgujun-" + i);
//xlqgujun
// console.log(key_strings);

var rows = key_strings.map(hasher).map(hash_to_bin);

// console.log(rows);

// var count = rows.map(r => r.split("").filter(d => d == 1).length).reduce((a,e) => a + e, 0);

// console.log(count);

// part 2


var grid = rows.map(r => r.split(""));

const clear_clique = (x,y) => {
  if (x < 0 || x >= 128 || y < 0 || y >= 128) return;
  if (grid[y][x] == 1) {
    grid[y][x] = null;

    /*
    // clear_clique((x-1+128)%128,(y-1+128)%128);
    clear_clique(x,(y-1+128)%128);
    // clear_clique((x+1)%128,(y-1+128)%128);
    clear_clique((x-1+128)%128,y%128);
    clear_clique((x+1)%128,y%128);
    // clear_clique((x-1+128)%128,(y+1)%128);
    clear_clique(x%128,(y+1)%128);
    // clear_clique((x+1)%128,(y+1)%128);
    //*/

    //*
    //clear_clique((x-1),(y-1));
    clear_clique(x,(y-1));
    //clear_clique((x+1),(y-1));
    clear_clique((x-1),y);
    clear_clique((x+1),y);
    //clear_clique((x-1),(y+1));
    clear_clique(x,(y+1));
    //clear_clique((x+1),(y+1));
    //*/
  }
};

let count = 0;
for (var y = 0; y < 128; y++) {
  for (var x = 0; x < 128; x++) {
    let square = grid[y][x];
    if (square == 1) {
      count++;
      clear_clique(x,y);
    }
  }
}
console.log(count);
