/* let test_input =
"     |          \n" +
"     |  +--+    \n" +
"     A  |  C    \n" +
" F---|----E|--+ \n" +
"     |  |  |  D \n" +
"     +B-+  +--+ \n";

console.log(test_input); */

const test_part_1 = () => {

  let input = // test_input;
    require("fs").readFileSync("day_19_input.txt", { encoding: "utf-8" });

  let diagram = input.split("\n").map(r => r.split(""));

  const trace_diagram = diagram => {

    let r = 0, c = 0, d = "south", h = diagram.length, w = diagram[0].length;

    let letters = [];

    // find start
    c = diagram[0].indexOf("|");

    let n = 0;
    // trace
    while (n < 1000000) {

      let s = (r < 0 || r >= h || c < 0 || c >= w) ? null : diagram[r][c];
      // console.log(r, c, d, s);

      if (s === " " || s === null) {
        // throw Error(`out of track ${c} ${r} ${s}`);
        console.log("stop");
        //return;
        break;
      } else if (/[A-Z|-]/.test(s)) {
        // console.log("walk");
        if (/[A-Z]/.test(s)) {
          // console.log(s);
          letters.push(s);
        }

        if (d === "south")  {
          r++;
        } else if (d === "east") {
          c++;
        } else if (d === "north")  {
          r--;
        } else if (d === "west") {
          c--;
        }
      } else if (s === "+") {
        // console.log("turn");
        if (d === "south" || d === "north") {
          if (diagram[r][c-1] !== " ") {
            d = "west";
            c--;
          } else if (diagram[r][c+1] !== " ") {
            d = "east";
            c++;
          } else {
            throw Error(`lost track at ${r} ${c}`);
          }
        } else if (d === "east" || d === "west") {
          // console.log("todo: turn");
          if (diagram[r-1][c] !== " ") {
            d = "north";
            r--;
          } else if (diagram[r+1][c] !== " ") {
            d = "south";
            r++;
          } else {
            throw Error(`lost track at ${r} ${c}`);
          }
          //break;
        }
      } /* else if (d === "south") {
        r++;
        letters.push(s);
      } else if (d === "east") {
        c++;
        letters.push(s);
      } */ else {
        break;
      }


      n++;
    }

    // console.log(letters, r, c, d);

    // part 1
    console.log(letters.join(""));

    // part 2
    console.log(n);
  };

  trace_diagram(diagram);

};

test_part_1();
