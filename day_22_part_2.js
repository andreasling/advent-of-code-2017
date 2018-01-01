const i2n = i => i >= 0 ? i * 2 : -1 - i * 2;
const n2i = n => ((n % 2 === 1) ? -1 - n : n) / 2;

const sparse_to_dense_iterator = function* (sparse, start, count, default_value) {

  for (var i = start; i < count; i++) {
    let v = sparse[i2n(i)];
    yield v !== undefined ? v : default_value;
  }

};

const test_sparse_to_dense_iterator = () => {

  let sparse = [0,,null,,2,,3];

  sparse[i2n(6)] = 6;

  //console.log("expected:", [0,null,2,3,"?","?",6,"?","?","?"].join(","));
  //console.log("actual:  ", [...sparse_to_dense_iterator(sparse, 0, 10, "?")].join(","));

};

// test_sparse_to_dense_iterator(); return;

const sparse_to_dense = (sparse, start, count, default_value) =>
  [...sparse_to_dense_iterator(sparse, start, count, default_value)];

const test_sparse_to_dense = () => {
  let sparse = [0,,1,,2,,3]
  sparse[i2n(6)] = 6;
  console.log(sparse_to_dense(sparse, 0, 10, "?"));
};
// test_sparse_to_dense(); return;

const states = {
  clean: ".",
  infected: "#",
  weakened: "W",
  flagged: "F"
};

const directions = {
  up: 0,
  right: 1,
  down: 2,
  left: 3
};

// const grid_to_string = grid => grid.map(r => r.map(n => n ? "#" : ".").join(" ")).join("\n");
const virtual_grid_to_string = (grid, r, c, h, w, default_value) => {

  const row_to_string = (row, c, w) =>
    sparse_to_dense(row, c, w)/*.map(n => (n === states.infected) ? "#" : ".")*/
      .map(n => n !== undefined ? n : (default_value === undefined ? "○" : default_value))
      .join(" ");

  return sparse_to_dense(grid, r, h, []).map(row => row_to_string(row, c, w)).join("\n")
}

const parse_input = input => {
  let dense = input.replace(/\n$/, "").split("\n").map(r => r.split(""));
  let sparse = [];
  for (var r = 0; r < dense.length; r++) {
    let sparse_row = [];
    for (var c = 0; c < dense[r].length; c++) {
      /*if (dense[r][c] === "#") {
        sparse_row[i2n(c)] = states.infected;
      } else {
        sparse_row[i2n(c)] = states.clean;
      }*/
      let state = dense[r][c];
      if (state !== states.clean) {
        sparse_row[i2n(c)] = state;
      }
    }
    if (sparse_row.length > 0) {
      sparse[i2n(r)] = sparse_row;
    }
  }
  return sparse;
};

const test_parse_input = () => {

  const test_input =
`..#
#..
...
`;

  var grid = parse_input(test_input);
  console.log(virtual_grid_to_string(grid, -2, -2, 5, 5, "○"));


};
//test_parse_input();

const get_state = (grid,r,c) => {
  let row = grid[i2n(r)];
  if (row === undefined) { return states.clean; }
  let node = row[i2n(c)];
  return node !== undefined ? node : states.clean;
}

const set_state = (grid, r, c, state) => {
  grid[i2n(r)] = grid[i2n(r)] || [];
  grid[i2n(r)][i2n(c)] = state;
};

const get_next_position = (row, column, direction) => {

  let r = row, c = column;

  switch (direction) {
    case directions.up: r--; break;
    case directions.right: c++; break;
    case directions.down: r++; break;
    case directions.left: c--; break;
    default: throw Error(`invalid direction ${direction}`);
  }

  return { r, c };
};

const run_brusts = (grin, carrier, count, get_next_state, get_next_direction) => {

  let r_min = carrier.r, r_max = r_min, c_min = carrier.c, c_max = c_min;

  let started_infections = 0;

  for (var i = 0; i < count; i++) {
    let {r,c,d} = carrier;
    let current_state = get_state(grin, r, c);
    var next_direction = get_next_direction(d, current_state);
    carrier.d = next_direction;
    let next_state = get_next_state(current_state);

    //console.log(r,c,d,current_state, next_direction, next_state);

    if (next_state === states.infected) {
      started_infections++;
    }
    set_state(grin, r, c, next_state);
    let { r: next_r, c: next_c } = get_next_position(r, c, next_direction);
    carrier.r = next_r;
    carrier.c = next_c;
    r_min = Math.min(r_min, next_r);
    r_max = Math.max(r_max, next_r);
    c_min = Math.min(c_min, next_c);
    c_max = Math.max(c_max, next_c);
    // console.log(grid_to_string(grid));
  }

  // console.log(grid_to_string(grid));
  // console.log(r_min, c_min, r_max, c_max);
  // console.log(virtual_grid_to_string(grin, r_min, c_min, r_max - r_min + 1, c_max - c_min + 1));
  console.log(started_infections);
};

const test_input =
`..#
#..
...
`;

const test_part_1 = () => {

  console.log("**** part 1 ****");

  //let virtual_grid = parse_input(test_input);
    // parse_input(require("fs").readFileSync("day_22_input.txt", {encoding: "utf-8"}));

  //console.log(virtual_grid);
  //console.log(virtual_grid_to_string(virtual_grid, -2, -2, 5, 5));
  /* console.log(virtual_grid_to_string(virtual_grid, -2, -2, 27, 27));
  console.log(virtual_grid_to_string(virtual_grid, 23, 23, 27, 35));
  console.log(get_state(virtual_grid, 24, 24));
  console.log(get_state(virtual_grid, 24, 25));
  console.log(get_state(virtual_grid, 25, 24));
  return; */

  const get_next_direction = (direction, state) => {
    switch (state) {
      case states.infected: return (direction + 1)%4;
      case states.clean: return (direction + 3)%4;
      default: throw Error(`invalid state ${state} at ${r} ${c}`);
    }
  };

  const get_next_state = state => {
    switch (state) {
      case states.infected: return states.clean;
      case states.clean: return states.infected;
      default: throw Error("invalid state");
    }
  };

  console.log("**** test ****");
  console.log("expected:", 5, 41, 5587);
  run_brusts(parse_input(test_input), { r: 1, c: 1, d: directions.up }, 7, get_next_state, get_next_direction);
  run_brusts(parse_input(test_input), { r: 1, c: 1, d: directions.up }, 70, get_next_state, get_next_direction);
  run_brusts(parse_input(test_input), { r: 1, c: 1, d: directions.up }, 10000, get_next_state, get_next_direction);

  console.log("**** run ****");
  let input = require("fs").readFileSync("day_22_input.txt", {encoding: "utf-8"});
  run_brusts(parse_input(input), { r: 12, c: 12, d: directions.up }, 10000, get_next_state, get_next_direction);
};

test_part_1();

const test_part_2 = () => {

  console.log("**** part 2 ****");

  const get_next_direction = (direction, state) => {
    switch (state) {
      case states.clean: return (direction + 3)%4;
      case states.weakened: return direction;
      case states.infected: return (direction + 1)%4;
      case states.flagged: return (direction + 2)%4;
      default: throw Error(`invalid state ${state}`);
    }
  };

  const get_next_state = state => {
    switch (state) {
      case states.clean: return states.weakened;
      case states.weakened: return states.infected;
      case states.infected: return states.flagged;
      case states.flagged: return states.clean;
      default: throw Error("invalid state");
    }
  };

  console.log("**** test ****");
  //run_brusts(parse_input(test_input), { r: 1, c: 1, d: directions.up }, 7, get_next_state, get_next_direction);
  //run_brusts(parse_input(test_input), { r: 1, c: 1, d: directions.up }, 70, get_next_state, get_next_direction);
  run_brusts(parse_input(test_input), { r: 1, c: 1, d: directions.up }, 100, get_next_state, get_next_direction);
  run_brusts(parse_input(test_input), { r: 1, c: 1, d: directions.up }, 10000000, get_next_state, get_next_direction);

  console.log("**** run ****");
  let input = require("fs").readFileSync("day_22_input.txt", {encoding: "utf-8"});
  run_brusts(parse_input(input), { r: 12, c: 12, d: directions.up }, 10000000, get_next_state, get_next_direction);

};
test_part_2();
