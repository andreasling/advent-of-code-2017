const i2n = i => i >= 0 ? i * 2 : -1 - i * 2;
const n2i = n => ((n % 2 === 1) ? -1 - n : n) / 2;

class Tape {

  constructor(default_value) {
    this.storage = //[];
      new Array(25000000);
    this.storage.fill(0);
    this.storage
    this.default_value = default_value;
  }

  read(index) {
    let value = this.storage[i2n(index)];
    return value !== undefined ? value : this.default_value;
  }

  write(index, value) {
    this.storage[i2n(index)] = value;
  }

  range(first, last) {

    return /*[...*/ (
      function * (tape, first, last) {

      for (var i = first; i <= last; i++) {
        yield tape.read(i);
      }

    })(this, first, last)/*]*/;

  }

  bounds() {

    //let indicies = this.storage.map((e,i) => n2i(i)).filter(() => true);
    // let min = Math.min(0, ...indicies), max = Math.max(0, ...indicies);

    //let
    //  min = Number.POSITIVE_INFINITY,
    //  max = Number.NEGATIVE_INFINITY;

    /* for (let n = 0; n < this.storage.length; n++) {
      if (this.storage[n] !== undefined) {
        let i = n2i(n);
        min = Math.min(min, i);
        max = Math.max(max, i);
      }
    } */

    let [min, max] = this.storage.reduce(
      (a,e,i) => e === undefined ? a : [Math.min(a[0], n2i(i)), Math.max(a[1], n2i(i))],
      [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]);

    return [min, max];

  }

  checksum() {

    // return this.range(...this.bounds()).reduce((a,v) => a + v, 0);
    let sum = 0;
    let range = this.range(...this.bounds());
    for (let v of range) {
      sum += v;
    }

    return sum;

  }

  toString() {
    // let indicies = this.storage.map((e,i) => n2i(i)).filter(() => true);
    // let min = Math.min(0, ...indicies) - 2, max = Math.max(0, ...indicies) + 2;
    let [min, max] = this.bounds();
    // let values = [...Array(max - min + 1)].map((e,i) => n2i(i + min)).map(i => this.read(i));
    let values = this.range(min, max);
    return `... [${min} ... ${max}]: `  + values.join(" ") + ` ...`
  }
}

class Cursor {

  constructor(tape) {
    this.tape = tape;
    this.position = 0;
  }

  moveLeft() {
    this.position--;
  }

  moveRight() {
    this.position++;
  }

  read() {
    return this.tape.read(this.position);
  }

  write(value) {
    this.tape.write(this.position, value);
  }

  checksum() {
    return this.tape.checksum();
  }

  toString() {
    //return `@${this.position} | ${this.tape.toString()}`
    let [first, last] = this.tape.bounds();
    let from = Math.min(first, this.position), to = Math.max(last, this.position);
    let range = this.tape.range(from, to);
    return range.map((v,i) => (from + i == this.position) ? `[${v}]` : ` ${v} `).join("");
  }

}

const test_part_1 = () => {

  /*
  {
    let tape = new Tape(0);

    console.log(tape.read(0), tape.read(3), tape.read(-3));

    tape.write(0, 1);
    tape.write(3, 2);
    tape.write(-3, 3);

    console.log(tape.read(0), tape.read(3), tape.read(-3));
    console.log(tape.toString());

    let cursor = new Cursor(tape);

    console.log(cursor.read());
    cursor.moveRight();
    console.log(cursor.read());
    cursor.moveRight();
    console.log(cursor.read());
    cursor.moveRight();
    console.log(cursor.read());
  }
  //*/


  let cursor = new Cursor(new Tape(0));

  // let state = "A";

  let state = "A";

  let count = 12683008;

  //console.log(cursor.toString(), state);

  for (var step = 0; step < count; step++) {
    switch (state) {

      /* case "A": {
        if (cursor.read() === 0) {
          cursor.write(1);
          cursor.moveRight();
          state = "B";
        } else {
          cursor.write(0);
          cursor.moveLeft();
          state = "B";
        }
        break;
      }

      case "B": {
        if (cursor.read() === 0) {
          cursor.write(1);
          cursor.moveLeft();
          state = "A";
        } else {
          cursor.write(1);
          cursor.moveRight();
          state = "A";
        }
        break;
      }*/

      case "A": {
        if (cursor.read() === 0) {
          cursor.write(1);
          cursor.moveRight();
          state = "B";
        } else if (cursor.read() === 1) {
          cursor.write(0);
          cursor.moveLeft();
          state = "B";
        }
        break;
      }

      case "B": {
        if (cursor.read() === 0) {
          cursor.write(1);
          cursor.moveLeft();
          state = "C";
        } else if (cursor.read() === 1) {
          cursor.write(0);
          cursor.moveRight();
          state = "E";
        }
        break;
      }

      case "C": {
        if (cursor.read() === 0) {
          cursor.write(1);
          cursor.moveRight();
          state = "E";
        } else if (cursor.read() === 1) {
          cursor.write(0);
          cursor.moveLeft();
          state = "D";
        }
        break;
      }

      case "D": {
        if (cursor.read() === 0) {
          cursor.write(1);
          cursor.moveLeft();
          state = "A";
        } else if (cursor.read() === 1) {
          cursor.write(1);
          cursor.moveLeft();
          state = "A";
        }
        break;
      }

      case "E": {
        if (cursor.read() === 0) {
          cursor.write(0);
          cursor.moveRight();
          state = "A";
        } else if (cursor.read() === 1) {
          cursor.write(0);
          cursor.moveRight();
          state = "F";
        }
        break;
      }

      case "F": {
        if (cursor.read() === 0) {
          cursor.write(1);
          cursor.moveRight();
          state = "E";
        } else if (cursor.read() === 1) {
          cursor.write(1);
          cursor.moveRight();
          state = "A";
        }
        break;
      }

      default:

    }
    // console.log(cursor.toString(), state);
    if (step % 1021 == 0) { process.stdout.write(`${step}\r`); }
  }

  console.log(count);

  // console.log(cursor.toString());
  console.log(cursor.checksum());

};

test_part_1();
