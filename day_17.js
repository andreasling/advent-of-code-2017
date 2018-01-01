const spinlock = (count, steps) => {

  let buffer = [0];
  let current_position = 0;

  console.log("start", buffer.length, current_position);

  for (let i = 0; i < count; i++) {

    let next_position = (current_position + steps) % buffer.length + 1;
    buffer.splice(next_position, 0, i + 1);
    current_position = next_position;

    // console.log(buffer, current_position);

  }

  console.log("end", buffer.length, current_position);

  console.log("buffer[1]:", buffer[1]);

  return buffer[(current_position + 1) % buffer.length];

};

const test_part_1 = () => {

  console.log("** test part 1 **");

  let steps = 3;
  let count = 2017;

  console.log(spinlock(count, steps));

};

test_part_1();

const run_part_1 = () => {

  console.log("** run part 1 **");

  let steps = 349;
  let count = 2017;

  console.log(spinlock(count, steps));

};

run_part_1();


// part 2

const spinlock2 = (count, steps) => {

  let buffer_length = 1;
  let current_position = 0;
  let buffer_head = [0, null];

  console.log("start", buffer_length, current_position);

  for (let i = 0; i < count; i++) {

    let next_position = (current_position + steps) % buffer_length + 1;

    /* if (next_position === selected_position) {
      last_selected_position_value = i + 1;
    } */
    if (next_position === 0) {
      [buffer_head[0], buffer_head[1]] = [i + 1, buffer_head[0]];
    } else if (next_position === 1) {
      buffer_head[1] = i + 1;
    }

    buffer_length++;
    current_position = next_position;

  }

  console.log("end", buffer_length, current_position);

  return buffer_head[1];

};

const test_part_2 = () => {

  console.log("** test part 2 **");

  console.log(spinlock2(2017, 3));
  console.log(spinlock2(2017, 349));

};

test_part_2();


const run_part_2 = () => {

  console.log("** run part 2 **");

  let steps = 349;
  let count = 50000000;

  console.log(spinlock2(count, steps));

};

run_part_2();
