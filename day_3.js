/*

17  16  15  14  13   .
18   5   4   3  12   .
19   6   1   2  11   .
20   7   8   9  10  27
21  22  23  24  25  26

*/

const test = (func, input, expected) => {
  var actual = func(input);
  console.log(input, actual, expected);
};

const address_to_radius = address =>
  Math.ceil((Math.sqrt(address) - 1)/2);
/*
test(address_to_radius, 1, 0);
test(address_to_radius, 2, 0);
test(address_to_radius, 9, 1);
test(address_to_radius, 10, 2);
test(address_to_radius, 25, 2);
*/

const radius_to_width = radius =>
  radius * 2;
/*
test(radius_to_width, 0, 0);
test(radius_to_width, 1, 2);
test(radius_to_width, 2, 4);
*/

const address_to_corner = address =>
  Math.pow((address_to_radius(address) * 2) + 1, 2);
/* test corner
test(address_to_corner, 1, 1);
test(address_to_corner, 2, 9);
test(address_to_corner, 9, 9);
test(address_to_corner, 10, 25);
test(address_to_corner, 24, 25);
test(address_to_corner, 25, 25);
// */

const address_to_arc = address =>
  address_to_corner(address) - address;
/* test arc
test(address_to_arc, 1, 1);
test(address_to_arc, 2, 9);
test(address_to_arc, 9, 9);
test(address_to_arc, 10, 25);
test(address_to_arc, 24, 25);
test(address_to_arc, 25, 25);
//*/

const address_to_width = address =>
  (address_to_radius(address) * 2);
/* test width
test(address_to_width, 1, 1);
test(address_to_width, 2, 9);
test(address_to_width, 9, 9);
test(address_to_width, 10, 25);
test(address_to_width, 24, 25);
test(address_to_width, 25, 25);
//*/

const xy_to_distance = (x, y) => Math.abs(x) + Math.abs(y);
//console.log(xy_to_distance(0, 0), 0);
//console.log(xy_to_distance(1, 0), 1);
//console.log(xy_to_distance(1, 1), 2);

const address_to_distance = address => {

  var corner = address_to_corner(address);
  var width = address_to_width(address);
  var arc = address_to_arc(address);
  var radius = address_to_radius(address);

  var x = radius - (arc % width);
  var y = radius;

  //return [corner, width, arc, x, y, xy_to_distance(x,y)];
  return xy_to_distance(x,y);

};
/* test distance
test(address_to_distance, 1, 0);
test(address_to_distance, 12, 3);
test(address_to_distance, 23, 2);
test(address_to_distance, 1024, 31);
//*/

// part 1
// console.log(address_to_distance(312051));

/* part 2
calculate sums until larger than input
store in array, index as spiral address..
need address => xy, xy => address
walk spiral addresses and calculate sums until answer found
algorithm for finding neighbours

array[1] = 1
address = 1
while sum < input
  increase address
  get neighbours for address
    all existing (or assume 0 for not assigned addresses?) of [x+-1, y+-1]?
  sum values for neighbours

*/

const address_xy_map =
  [
    [0,0],[1,0],[1,1],
    [0,1],[-1,1],[-1,0],
    [-1,-1],[0,-1],[1,-1],
    [2,-1],[2,0],[2,1],[2,2],
    [1,2],[0,2]].map(a => ({x:a[0],y:a[1]}));

const address_to_xy = address =>
  //address_xy_map[address];
{
  // find corner address
  var corner_address = address_to_corner(address);
  // find corner coords
  var radius = address_to_radius(address);
  var corner_xy = {x:radius,y:radius};
  // find width
  // find arc
  // find side number
  // rotate corner coords to side
  // find side offset
  // add side offset to coords
  return {x:0,y:0};
};

const xy_to_address = xy =>
  address_xy_map.findIndex(m => m.x == xy.x && m.y == xy.y);

var buffer = [1];

while (buffer[buffer.length - 1] < 100 && buffer.length <= address_xy_map.length) {
  var next_address = buffer.length;
  console.log("next_address", next_address);
  var xy = address_to_xy(next_address);
  console.log("xy", xy);
  var neighbours_xy = [
    {x:xy.x-1,y:xy.y-1},
    {x:xy.x,y:xy.y-1},
    {x:xy.x+1,y:xy.y-1},
    {x:xy.x-1,y:xy.y},
    {x:xy.x,y:xy.y},
    {x:xy.x+1,y:xy.y},
    {x:xy.x-1,y:xy.y+1},
    {x:xy.x,y:xy.y+1},
    {x:xy.x+1,y:xy.y+1},
  ];
  console.log("neighbours_xy", neighbours_xy);
  var neighbours = neighbours_xy.map(xy_to_address).filter(a => a >= 0);
  console.log("neighbours", neighbours);
  var filled = neighbours.filter(a => a < next_address);
  console.log("filled", filled);
  var values = filled.map(a => buffer[a]);
  console.log("values", values);
  var sum = values.reduce((a,e,l) => a + e);
  console.log("sum", sum);
  buffer.push(sum);
  console.log(buffer);
}
