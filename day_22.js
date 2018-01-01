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

const grid_to_string = grid => grid.map(r => r.map(n => n ? "#" : ".").join(" ")).join("\n");
const virtual_grid_to_string = (grid,r,c,h,w) => {

  const row_to_string = (row, c, w) =>
    sparse_to_dense(row, c, w).map(n => n ? "#" : ".").join(" ");

  return sparse_to_dense(grid, r, h, []).map(row => row_to_string(row, c, w)).join("\n")
}

const parse_input = input => {
  let dense = input.replace(/\n$/).split("\n").map(r => r.split(""));
  let sparse = [];
  for (var r = 0; r < dense.length; r++) {
    let sparse_row = [];
    for (var c = 0; c < dense[r].length; c++) {
      if (dense[r][c] === "#") {
        sparse_row[i2n(c)] = true;
      }
    }
    if (sparse_row.length > 0) {
      sparse[i2n(r)] = sparse_row;
    }
  }
  return sparse;
};

const test_part_1 = () => {

  /* let grid = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,0,0,0],
    [0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
  ].map(r => r.map(n => !!n)); */

  /* let virtual_grid = [[
    ,,true
  ],[
    true,,
  ],[
    ,,,
  ]]; */

  const test_input =
  `..#
#..
...
`;

  let virtual_grid = //parse_input(test_input);
    parse_input(require("fs").readFileSync("day_22_input.txt", {encoding: "utf-8"}));

  //console.log(virtual_grid);
  // console.log(virtual_grid_to_string(virtual_grid, -5, -5, 25, 25));
  //return;

  const is_infected = (r,c) =>
    //grid[r][c];
    virtual_grid[i2n(r)] ? !!virtual_grid[i2n(r)][i2n(c)] : false;

  const set_infected = (r,c,v) =>
    //grid[r][c] = v;
    {
      virtual_grid[i2n(r)] = virtual_grid[i2n(r)] || [];
      virtual_grid[i2n(r)][i2n(c)] = v;
    }

  const directions = {
    up: 0,
    right: 1,
    down: 2,
    left: 3
  };

  let carrier = {
    r: 12,
    c: 12,
    d: directions.up
  };

  let r_min = carrier.r, r_max = r_min, c_min = carrier.c, c_max = c_min;

  let started_infections = 0;

  for (var i = 0; i < 10000; i++) {
    let {r,c} = carrier;
    let current_infected = is_infected(r, c); //grid[carrier.r][carrier.c];
    if (current_infected) {
      carrier.d = (carrier.d + 1)%4;
    } else {
      carrier.d = (carrier.d + 3)%4;
    }
    //grid[carrier.r][carrier.c] = !current_infected;
    if (!current_infected) {
      started_infections++;
    }
    set_infected(r, c, !current_infected);
    switch (carrier.d) {
      case directions.up:
        carrier.r--;
        break;
      case directions.right:
        carrier.c++;
        break;
      case directions.down:
        carrier.r++;
        break;
      case directions.left:
        carrier.c--;
        break;
      default:
        throw Error(`invalid direction ${carrier.d}`);
    }
    r_min = Math.min(r_min, r);
    r_max = Math.max(r_max, r);
    c_min = Math.min(c_min, c);
    c_max = Math.max(c_max, c);
    // console.log(grid_to_string(grid));
  }

  // console.log(grid_to_string(grid));
  console.log(r_min, c_min, r_max, c_max);
  // console.log(virtual_grid_to_string(virtual_grid, r_min, c_min, r_max - r_min + 1, c_max - c_min + 1));
  console.log(started_infections);
};

test_part_1();
