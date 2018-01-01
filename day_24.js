const test_input = `0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10
`;

const parse_input = input =>
  input.replace(/\n$/, "").split("\n").map(r => r.split("/").map(s => parseInt(s)));

const test_part_1 = () => {

  let ports = //test_input.replace(/\n$/, "").split("\n").map(r => r.split("/").map(s => parseInt(s))
    /* .sort((a,b) => a - b)).sort((a,b) => (a[0] - b[0]) || (a[1] - b[1])) *///);
    //parse_input(test_input);
    parse_input(require("fs").readFileSync("day_24_input.txt", { encoding: "utf-8" }));


  // console.log(ports);

  const recurse = (ports, pins, used, bridge) => {

    // console.log(bridge.reduce((a, e) => a + e[0] + e[1], 0), bridge);

    let fitting_ports = ports
      .map((p,i) => ({p,i}))
      .filter(pi => pi.p[0] === pins || pi.p[1] === pins);

    if (fitting_ports.length > 0) {

      let strengths = fitting_ports.map(pi => {

        let {p:port,i} = pi;

        if (port[0] === pins) {
          return recurse(ports.filter((p,j) => j !== i ), port[1], used, [...bridge, port]);
        } else if (port[1] === pins) {
          return recurse(ports.filter((p,j) => j !== i ), port[0], used, [...bridge, port]);
        }

      });

      return Math.max(...strengths);

    } else {

      // console.log(bridge.reduce((a, e) => a + e[0] + e[1], 0), bridge);
      return bridge.reduce((a, e) => a + e[0] + e[1], 0);

    }

    // console.log(bridge.reduce((a, e) => a + e[0] + e[1], 0), bridge);

  };

  console.log(recurse(ports, 0, [], []));

};

// test_part_1();

const test_part_2 = () => {

  let ports =
    //parse_input(test_input);
    parse_input(require("fs").readFileSync("day_24_input.txt", { encoding: "utf-8" }));


  // console.log(ports);

  const recurse = (ports, pins, used, bridge) => {

    // console.log(bridge.reduce((a, e) => a + e[0] + e[1], 0), bridge);

    let fitting_ports = ports
      .map((p,i) => ({p,i}))
      .filter(pi => pi.p[0] === pins || pi.p[1] === pins);

    if (fitting_ports.length > 0) {

      let lengths = fitting_ports.map(pi => {

        let {p:port,i} = pi;

        if (port[0] === pins) {
          return recurse(ports.filter((p,j) => j !== i ), port[1], used, [...bridge, port]);
        } else if (port[1] === pins) {
          return recurse(ports.filter((p,j) => j !== i ), port[0], used, [...bridge, port]);
        }

      });

      return lengths.reduce((a, e) => {
        if (e[0] > a[0]) {
          return e;
        } else if (e[0] === a[0] && e[1] > a[1]) {
          return e;
        } else {
          return a;
        }
      }, [0,0]);

    } else {

      // console.log(bridge.reduce((a, e) => a + e[0] + e[1], 0), bridge);
      return [bridge.length, bridge.reduce((a, e) => a + e[0] + e[1], 0)];

    }

    // console.log(bridge.reduce((a, e) => a + e[0] + e[1], 0), bridge);

  };

  console.log(...recurse(ports, 0, [], []));


};

test_part_2();
