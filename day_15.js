const generator = function* (factor, first) {
  const mod = 2147483647;
  var previous = first;
  while (true) {
    yield (previous = (previous * factor) % mod)
  }
};

// var generator_a = generator(16807, 65);
// var generator_b = generator(48271, 8921);
/* for (var i = 0; i < 10; i++) {
  console.log(generator_a.next().value, generator_b.next().value);
} */

const judge = (generator_a, generator_b, count) => {
  /* (function* () {
    var next_a = generator_a.next().value;
    var next_b = generator_b.next().value;
    yield [next_a, next_b];
  }).map(ab => ); */

  count |= 40000000;
  var c = 0;
  for (var i = 0; i < count; i++) {
    var next_a = generator_a.next().value;
    var next_b = generator_b.next().value;

    if ((next_a % 65536) == (next_b % 65536)) {
      c++;
    }
  }

  console.log(c);
}
// test:
// judge(generator(16807, 65), generator(48271, 8921), 40000000);

// part 1 run:
// judge(generator(16807, 277), generator(48271, 349));

// part 2

const generator2 = function* (generator1, criteria) {

  // var g1 = generator(factor, start);
  while (true) {
    var next = generator1.next().value;
    if (next % criteria == 0) {
      yield next;
    }
  }
}

// test:
judge(generator2(generator(16807, 65), 4), generator2(generator(48271, 8921), 8), 5000000);
