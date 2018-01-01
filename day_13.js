const fs = require('fs');

var input = `0: 3
1: 2
4: 4
6: 4
`;

// input = fs.readFileSync("day 13 input.txt", { encoding: "utf-8"}).replace(/\n$/,"");


var parsed = input.replace(/\n$/, "").split("\n").map(r => r.split(": ").map(n => parseInt(n, 10))).map(r => ({depth:r[0],range:r[1]}));

// console.log(parsed);

//var caught = parsed.filter(l => ((l.range * 2 - 1)%(l.depth + 1)) == 0);
var caught = parsed.filter(l => ((((l.range - 1) * 2))%(l.depth)) == 0);

console.log(caught);

var severity = caught.map(l => l.depth * l.range).reduce((a,e,l)=>a+e,0);
var result = severity;

console.log(result);
