let
  a = 0,
  b = 0,
  c = 0,
  d = 0,
  e = 0,
  f = 0,
  g = 0,
  h = 0;

b = 93 * 100 + 100000;
c = b + 17000;

do {

  f = 1;
  d = 2;

  do {

    e = 2;

    /* do {

      if (d * e == b) {
        f = 0;
      }

      e++;

    } while (e != b); */
    // e = 2 ... b - 1, (b)
    // d * e == b => e == b / d
    // b / d == 2 ... b - 1
    // b / d >= 2 && b / d < b && b % d == 0
    // optimizing:
    if (b % d == 0 && b / d >= 2) {
      f = 0;
    }

    d++;

  } while (d != b);
  // d = 2 ... b - 1, (b)

  if (f == 0) {
    h++;
  }

  if (b == c) {
    break;
  }

  b += 17;

} while (true);

console.log(h);
