const states = {
  on: "#",
  off: "."
};

const parse_grid = input =>
  input.replace(/\n$/, "").split("\n").map(r => r.split(""))

const start_grid = parse_grid(
`.#.
..#
###
`);

const parse_rule = input => {
  let [input_pattern, output_pattern] = input.split(" => ").map(s => parse_rule_grid(s));
  return { input_pattern, output_pattern };
};

const parse_rules = input =>
  input.replace(/\n$/, "").split("\n").map(parse_rule);

const parse_rule_grid = input =>
  input.split("/").map(r => r.split(""));

const grid_to_string = grid =>
  grid.map(r => r.join("")).join("\n");

const rule_to_string = rule => `${grid_to_string(rule.input_pattern)}\n => \n${grid_to_string(rule.output_pattern)}`

const h_flip = grid => {

  let flipped = [];

  for (row of grid) {

    var flipped_row = [];
    flipped.push(flipped_row);

    for (var ci = 0; ci < row.length; ci++) {
      flipped_row[ci] = row[row.length - ci - 1];
    }

  }

  return flipped;

};

const v_flip = grid => {

  let flipped = [];

  for (var ri = 0; ri < grid.length; ri++) {

    flipped.push([...grid[grid.length - ri - 1]]);

  }

  return flipped;

};

const cw_rotate = grid => {

  /*

123    741
456 => 852
789    963

  */

  let rotated = [];

  for (var ri = 0; ri < grid.length; ri++) {
    var row = grid[ri];
    for (var ci = 0; ci < row.length; ci++) {
      let pixel = row[ci];
      let r_ri = ci;
      let r_ci = row.length - ri - 1;
      rotated[r_ri] = rotated[r_ri] || [];
      rotated[r_ri][r_ci] = pixel;
    }
  }

  return rotated;

};

const break_up_grid = grid => {

  let part_size = (grid.length % 2 == 0) ? 2 : 3;
  let part_count = grid.length / part_size;

  if(!Number.isInteger(part_size)) { throw Error("grid not even sized"); }

  let parts = [];

  for (let pri = 0; pri < part_count; pri++) {
    let parts_row = parts[pri] = [];
    for (let pci = 0; pci < part_count; pci++) {
      let part = parts_row[pci] = [];

      for (let ri = 0; ri < part_size; ri++) {
        let row = part[ri] = [];
        for (let ci = 0; ci < part_size; ci++) {
          part[ri][ci] = grid[pri * part_size + ri][pci * part_size + ci];
        }
      }
    }
  }

  return parts;

};

const merge_parts = parts => {
  // todo...
  //throw Error("not implemented");

  let part_count = parts.length;
  let part_size = parts[0][0].length;
  let size = part_count * part_size;

  let grid = [];

  for (var ri = 0; ri < size; ri++) {

    let row = grid[ri] = [];

    for (var ci = 0; ci < size; ci++) {

      let pri = (ri - ri % part_size) / part_size;
      let pci = (ci - ci % part_size) / part_size;

      row[ci] = parts[pri][pci][ri % part_size][ci % part_size];

    }
  }

  return grid;

};

const parts_to_string = parts => {

  let part_count = parts.length;
  let part_size = parts[0][0].length;

  let string = "";

  for (let ri = 0; ri < (part_count * part_size); ri++) {

    if (ri % part_size === 0) {
      for (let ci = 0; ci < (part_count * part_size); ci++) {
        if (ci % part_size === 0) {
          string += "+";
        }
        string += "-";
      }
      string += "+\n";
    }

    for (let ci = 0; ci < (part_count * part_size); ci++) {

      let pri = (ri - ri % part_size) / part_size;
      let pci = (ci - ci % part_size) / part_size;

      if (ci % part_size === 0) {
        string += "|";
      }

      string += parts[pri][pci][ri % part_size][ci % part_size];

    }

    string += "|\n";
  }

  for (let ci = 0; ci < (part_count * part_size); ci++) {
    if (ci % part_size === 0) {
      string += "+";
    }
    string += "-";
  }
  string += "+\n";

  return string;

};

const compare_grid = (grid0, grid1) => {

  // todo: mirroring, rotation

  let size = grid0.length;

  if (size === grid1.length) {
    for (var ri = 0; ri < size; ri++) {
      for (var ci = 0; ci < size; ci++) {
        if (grid0[ri][ci] !== grid1[ri][ci]) {
          return false;
        }
      }
    }
    return true;
  }

  return false;

};

const match_parts = (parts, rules) => {

  for (var pri = 0; pri < parts.length; pri++) {
    let parts_row = parts[pri];

    for (var pci = 0; pci < parts_row.length; pci++) {
      let grid = parts_row[pci]

      let was_matched = false;

      for (rule of rules) {

        if (compare_grid(grid, rule.input_pattern) ||
            compare_grid(grid, v_flip(rule.input_pattern)) ||
            compare_grid(grid, h_flip(rule.input_pattern)) ||
            compare_grid(grid, cw_rotate(rule.input_pattern)) ||
            compare_grid(grid, h_flip(v_flip(rule.input_pattern))) ||
            compare_grid(grid, v_flip(cw_rotate(rule.input_pattern))) ||
            compare_grid(grid, h_flip(cw_rotate(rule.input_pattern))) ||
            compare_grid(grid, h_flip(v_flip(cw_rotate(rule.input_pattern))))) {
          parts_row[pci] = rule.output_pattern;
          was_matched = true;
          break;
        }

      }

      if (!was_matched) {
        console.log("no match for:");
        console.log(grid_to_string(grid));
        throw Error("no match found!");
      }

    }
  }

  return parts;

}

const enhance = (grid, rules) => {

  /*
  todo:
  grid => parts
  match/enhance parts
  parts => grid
  */

  let parts = break_up_grid(grid);

  /* for (var pri = 0; pri < parts.length; pri++) {
    let parts_row = parts[pri];
    for (var pci = 0; pci < parts_row.length; pci++) {
      let grid = parts_row[pci];

    }
  }*/
  //let enhanced_parts = parts.map((parts_row, pri) => parts_row.map((grid, pci) => math));
  let enhanced_parts = match_parts(parts, rules);
  let enhanced_grid = merge_parts(enhanced_parts);

  return enhanced_grid;
};

const enhance_iterate = (grid, rules, count) => {

  let enhanced = grid;

  for (var i = 0; i < count; i++) {
    enhanced = enhance(enhanced, rules);
  }

  return enhanced;
};

const count_pixels_on = grid =>
  grid.reduce((agg, row) => agg + row.reduce((row_agg, pixel) => row_agg + (pixel === "#" ? 1 : 0), 0), 0);

const test_part_1 = () => {

  // let grid = start_grid.replace(/\n$/, "").split("\n").map(r => r.split(""));

  //*
  console.log("start grid");
  console.log(grid_to_string(start_grid));
  //*/

  /*
  console.log("rule grids");
  //console.log(grid_to_string(parse_rule_grid("../.#")));
  //console.log("-");
  //console.log(grid_to_string(parse_rule_grid(".#./..#/###")));
  //console.log("-");
  //console.log(grid_to_string(parse_rule_grid("#..#/..../#..#/.##.")));
  console.log(rule_to_string(parse_rule("../.# => ##./#../...")));
  console.log(rule_to_string(parse_rule(".#./..#/### => #..#/..../..../#..#")));
  //*/

  /*
  console.log("h flip");
  console.log(grid_to_string(h_flip(parse_rule_grid("../.#"))));
  console.log("-");
  console.log(grid_to_string(h_flip(parse_rule_grid(".#./..#/###"))));
  //*/

  /*
  console.log("v flip");
  console.log(grid_to_string(v_flip(parse_rule_grid("../.#"))));
  console.log("-");
  console.log(grid_to_string(v_flip(parse_rule_grid(".#./..#/###"))));
  //*/

  /*
  console.log("cw rotate");
  console.log(grid_to_string(cw_rotate(parse_rule_grid("../.#"))));
  console.log("-");
  console.log(grid_to_string(cw_rotate(parse_rule_grid(".#./..#/###"))));
  //*/

  /*

  console.log("break up grid");
  console.log(parts_to_string(break_up_grid(start_grid),null,2));
  console.log(parts_to_string(break_up_grid(parse_grid("....\n...#\n..#.\n..##\n")),null,2));
  console.log(parts_to_string(break_up_grid(parse_grid("......\n.....#\n....#.\n....##\n...#..\n...#.#\n")),null,2));
  console.log(parts_to_string(break_up_grid(parse_grid(".........\n........#\n.......#.\n.......##\n......#..\n......#.#\n......##.\n......###\n.....#...\n")),null,2));

  //*/

  let rules = /* [
    parse_rule("../.# => ##./#../..."),
    parse_rule(".#./..#/### => #..#/..../..../#..#")
  ]; */ parse_rules("../.# => ##./#../...\n.#./..#/### => #..#/..../..../#..#\n");

  /* console.log(grid_to_string(enhance(start_grid, rules)));
  console.log("-");
  console.log(grid_to_string(enhance(enhance(start_grid, rules), rules)));
  console.log("-");

  let enhanced = enhance_iterate(start_grid, rules, 2);
  console.log(grid_to_string(enhanced));
  console.log(count_pixels_on(enhanced));
  */

  /*
  // fixing rotate issue
  let input_pattern = parse_rule_grid("##./#.#/#..");
  let compare_pattern = v_flip(cw_rotate(input_pattern));
  console.log("- input_pattern");
  console.log(grid_to_string(compare_pattern));
  console.log("-");
  console.log(compare_grid(start_grid, compare_pattern));
  console.log(start_grid);
  console.log(compare_pattern);
  console.log(input_pattern);
  console.log("- rotated");
  console.log(cw_rotate(input_pattern));
  console.log("- v flipped");
  console.log(v_flip(input_pattern));

  //*/

};

// test_part_1();

const run_part_1 = () => {

  let grid = start_grid;
  let rules = parse_rules(require("fs").readFileSync("day_21_input.txt", { encoding: "utf-8" }));
  let enhanced = enhance_iterate(grid, rules, 5);
  console.log(count_pixels_on(enhanced));
};

// run_part_1();

const run_part_2 = () => {

  let grid = start_grid;
  let rules = parse_rules(require("fs").readFileSync("day_21_input.txt", { encoding: "utf-8" }));
  let enhanced = enhance_iterate(grid, rules, 18);
  console.log(count_pixels_on(enhanced));
};

run_part_2();
