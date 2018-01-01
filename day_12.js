const fs = require('fs');

var input = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

input = fs.readFileSync("day 12 input.txt", { encoding: "utf-8"}).replace(/\n$/,"");

// console.log(input);

const parse_input = input => input.split("\n").map(r => r.split(" <-> ")).map(r => ({ from: r[0], to: r[1].split(", ") }));

//console.log(parse_input(input));

//return;

var graph = parse_input(input);

// console.log(graph);

var found_nodes = [];
const recurse = nodes => {

  // console.log(nodes);
  for (let node of nodes) {
    var gn = graph[node];
    if (!gn.visited) {
      found_nodes.push(gn.from);
      gn.visited = true;
      recurse(gn.to);
    }
  }
};
recurse([0]);
console.log(/* found_nodes.length */ graph.filter(n => n.visited).length);

// console.log(graph.length);
// console.log(graph.filter(n => n.visited).length);
// console.log(graph.filter(n => !n.visited).length);

var c = 1;

/* while (graph.filter(n => !n.visited).length > 0) {
  recurse([graph.filter(n => !n.visited)[0]]);
  c++;
}
console.log(c); */

var unvisited = graph.filter(n => !n.visited);
while (unvisited.length >=1 ) {

  c++;

  // console.log(unvisited);

  recurse([unvisited[0].from]);

  unvisited = graph.filter(n => !n.visited);

}


console.log(c);
