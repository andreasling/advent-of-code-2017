const remove_garbage = function* (stream) {

  let state = "stream";

  for (character of stream) {

    // console.log(character);
    //yield character;

    switch (state) {

      case "garbage":

        if (character === ">") {
          state = "stream";
        } else if (character === "!") {
          state = "cancel";
        }

        break;

      case "cancel":

        // ignore character

        state = "garbage";

        break;

      case "stream":

        if (character === "<") {
          state = "garbage";
          break;
        }

      default:
        yield character;
    }

  }

};

const count_groups = stream => {

  let count = 0;

  for (character of stream) {

    if (character === "{") {
      count++;
    }

  }

  return count;

};

const count_group_score = stream => {

  let current_score = 0;
  let total_score = 0;

  for (character of stream) {

    if (character === "{") {

      current_score++;

      total_score += current_score;

    } else if (character === "}") {

      current_score--;

    }

  }

  if (current_score !== 0) {

    console.error("ended on wrong level", current_score);

  }

  return total_score;

};

const to_stream = function* (string) {
  for (character of string) {
    yield character;
  }
};

const test_remove_garbage = () => {

  let test_input = "abc<def>ghi";

  /* console.log([...remove_garbage(to_stream("<>"))].join(""));
  console.log([...remove_garbage(to_stream("<random characters>"))].join(""));
  console.log([...remove_garbage(to_stream("<<<<>"))].join(""));
  console.log([...remove_garbage(to_stream("<{!>}>"))].join(""));
  console.log([...remove_garbage(to_stream("<!!>"))].join(""));
  console.log([...remove_garbage(to_stream("<!!!>>"))].join(""));
  console.log([...remove_garbage(to_stream("<{o\"i!a,<{i<a>"))].join("")); */

  /* console.log(count_groups(to_stream("")), 0);
  console.log(count_groups(to_stream("{}")), 1);
  console.log(count_groups(to_stream("{{{}}}")), 3);
  console.log(count_groups(to_stream("{{{},{},{{}}}}")), 6);
  console.log(count_groups(to_stream("{}")), 1);
  console.log(count_groups(to_stream("{,,,}")), 1);
  console.log(count_groups(to_stream("{{},{},{},{}}")), 5);
  console.log(count_groups(to_stream("{{}}")), 2); */

  /* console.log(count_groups(remove_garbage(to_stream(""))), 0);
  console.log(count_groups(remove_garbage(to_stream("{}"))), 1);
  console.log(count_groups(remove_garbage(to_stream("{{{}}}"))), 3);
  console.log(count_groups(remove_garbage(to_stream("{{{},{},{{}}}}"))), 6);
  console.log(count_groups(remove_garbage(to_stream("{<{},{},{{}}>}"))), 1);
  console.log(count_groups(remove_garbage(to_stream("{<a>,<a>,<a>,<a>}"))), 1);
  console.log(count_groups(remove_garbage(to_stream("{{<a>},{<a>},{<a>},{<a>}}"))), 5);
  console.log(count_groups(remove_garbage(to_stream("{{<!>},{<!>},{<!>},{<a>}}"))), 2); */

  /* console.log(count_group_score(remove_garbage(to_stream("{}"))), 1);
  console.log(count_group_score(remove_garbage(to_stream("{{{}}}"))), 6);
  console.log(count_group_score(remove_garbage(to_stream("{{},{}}"))), 5);
  console.log(count_group_score(remove_garbage(to_stream("{{{},{},{{}}}}"))), 16);
  console.log(count_group_score(remove_garbage(to_stream("{<a>,<a>,<a>,<a>}"))), 1);
  console.log(count_group_score(remove_garbage(to_stream("{{<ab>},{<ab>},{<ab>},{<ab>}}"))), 9);
  console.log(count_group_score(remove_garbage(to_stream("{{<!!>},{<!!>},{<!!>},{<!!>}}"))), 9);
  console.log(count_group_score(remove_garbage(to_stream("{{<a!>},{<a!>},{<a!>},{<ab>}}"))), 3); */

};

test_remove_garbage();

const run_part_1 = () => {

  let input = require("fs").readFileSync("day_9_input.txt", {encoding: "utf-8"});
  console.log(count_group_score(remove_garbage(to_stream(input))));

};
// run_part_1();

// part 2

const count_garbage = stream => {

  let state = "stream";
  let count = 0;

  for (character of stream) {


    switch (state) {

      case "garbage":

        if (character === ">") {
          state = "stream";
        } else if (character === "!") {
          state = "cancel";
        } else {
          count++;
        }

        break;

      case "cancel":

        // ignore character

        state = "garbage";

        break;

      case "stream":

        if (character === "<") {
          state = "garbage";
          break;
        }
    }

  }

  return count;

};

const test_count_garbage = () => {

  console.log(count_garbage(to_stream("<>")));
  console.log(count_garbage(to_stream("<random characters>")));
  console.log(count_garbage(to_stream("<<<<>")));
  console.log(count_garbage(to_stream("<{!>}>")));
  console.log(count_garbage(to_stream("<!!>")));
  console.log(count_garbage(to_stream("<!!!>>")));
  console.log(count_garbage(to_stream("<{o\"i!a,<{i<a>")));


};
// test_count_garbage();

const run_part_2 = () => {

  let input = require("fs").readFileSync("day_9_input.txt", {encoding: "utf-8"});
  console.log(count_garbage(to_stream(input)));

};
run_part_2();
