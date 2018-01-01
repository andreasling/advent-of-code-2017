const is_valid = passphrase => {
  var words = passphrase.split(" ").filter(w => w.length != 0);
  words.sort();

  var prev = null;
  for (word of words) {
    if (word == prev) {
      return false;
    }
    prev = word;
  }
  return true;
};

// console.log(is_valid("aa bb cc dd ee"));
// console.log(is_valid("aa bb cc dd aa"));
// console.log(is_valid("aa bb cc dd aaa"));

var input = require("fs").readFileSync("day 4 input.txt", { encoding: "utf-8"})
  .split("\n").filter(r => r.length != 0);

// part 1

// console.log(input.length);

// let valid_count = input.filter(is_valid).length;

// console.log(valid_count);

// part 2

// const reverse = s =>
//  s.split("").reverse().join("");

// console.log(reverse("hello"));

const is_valid2 = passphrase =>{
  var words = passphrase.split(" ").filter(w => w.length != 0);
  var terms = words.map(w => w.split("").sort().join(""));
  terms.sort();

  var prev = null;
  for (term of terms) {
    if (term == prev) {
      return false;
    }
    prev = term;
  }
  return true;
};

// console.log(is_valid2("abcde fghij"));
// console.log(is_valid2("abcde xyz ecdab"));
// console.log(is_valid2("a ab abc abd abf abj"));
// console.log(is_valid2("iiii oiii ooii oooi oooo"));
// console.log(is_valid2("oiii ioii iioi iiio"));

let valid_count = input.filter(is_valid2).length;
console.log(valid_count);
