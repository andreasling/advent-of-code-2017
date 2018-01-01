/*

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...

*/

const part_2 = () => {

  var spiral = [];

  const address_to_coords = address => {

    // the trivial case
    if (address == 1) return { x: 0, y: 0 };

    // n as in n:th layer, or "radius"
    let n = Math.ceil((Math.sqrt(address) - 1) / 2);

    // "full square" corner address
    let corner_address = Math.pow(2 * n + 1, 2);

    // "square-radial" offset from corner
    let offset = corner_address - address;

    // square side width
    let side_width = n * 2;

    // apply side offset on coordinate u (of yet undetermined axis - depends on side number below)
    let u = n - (offset % side_width);

    // find side number
    let side_number = Math.floor(offset / side_width);

    // "rotate"/apply corner coords depending on side number
    switch (side_number) {
      case 0: return { x: u, y: n };
      case 1: return { x: -n, y: u };
      case 2: return { x: -u, y: -n};
      case 3: return { x: n, y: -u};
      default:
        throw Error(`invalid side ${side_number}`);
    }
  };

  const coords_to_address = coords => {

    let {x,y} = coords;

    // trivial case
    if (x === 0 && y === 0) {
      return 1;
    }

    let n = Math.max(Math.abs(x), Math.abs(y));

    let side_width = n * 2;

    let side_number = 0;
    let side_offset = 0;
    if (y === n && x > -n) {
      side_number = 0;
      side_offset = n - x;
    } else if (x === -n && y > -n) {
      side_number = 1;
      side_offset = n - y;
    } else if (y === -n && x < n) {
      side_number = 2;
      side_offset = n + x;
    } else if (x === n && y < n) {
      side_number = 3;
      side_offset = n + y;
    } else {
      throw Error(`unexpected state for ${coords}`);
    }

    let corner_address = Math.pow(2 * n + 1, 2);

    let address = corner_address - (side_number * side_width) - side_offset;

    return address;
  };

  const get_adjecent_addresses = address => {

    let { x, y } = address_to_coords(address);
    var adjecent_addresses = [
      { x: x - 1, y: y - 1 },
      { x: x, y: y - 1 },
      { x: x + 1, y: y - 1 },
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x: x - 1, y: y + 1 },
      { x: x, y: y + 1 },
      { x: x + 1, y: y + 1 }
    ].map(coords_to_address);

    return adjecent_addresses;

  };

  const get_adjecent_earlier_addresses = address =>
    get_adjecent_addresses(address).filter(a => a < address);

  const find_limit_value = limit => {

    var buffer = [1];

    while (buffer[buffer.length - 1] < limit) {

        var next_address = buffer.length + 1;

        var adjecent_addresses = get_adjecent_earlier_addresses(next_address);

        var sum = adjecent_addresses
          .map(address => buffer[address - 1])
          .reduce((a,v) => a + v, 0);

        buffer.push(sum);
    }

    return buffer[buffer.length - 1];
  };

  const test_part_2 = () => {

    // console.log(1, address_to_coords(1), {x:0,y:0});
    // console.log(2, address_to_coords(2), {x:1,y:0});
    // console.log(3, address_to_coords(3), {x:1,y:-1});
    // console.log(5, address_to_coords(5), {x:-1,y:-1});
    // console.log(8, address_to_coords(8), {x:0,y:1});
    // console.log(24, address_to_coords(24), {x:1,y:2});
    // console.log(25, address_to_coords(25), {x:2,y:2});
    // console.log(26, address_to_coords(26), {x:3,y:2});

    // console.log({x:0,y:0}, coords_to_address({x:0,y:0}), 1);
    // console.log({x:1,y:0}, coords_to_address({x:1,y:0}), 2);
    // console.log({x:1,y:-1}, coords_to_address({x:1,y:-1}), 3);
    // console.log({x:-1,y:-1}, coords_to_address({x:-1,y:-1}), 5);
    // console.log({x:0,y:1}, coords_to_address({x:0,y:1}), 8);
    // console.log({x:1,y:2}, coords_to_address({x:1,y:2}), 24);
    // console.log({x:2,y:2}, coords_to_address({x:2,y:2}), 25);
    // console.log({x:3,y:2}, coords_to_address({x:3,y:2}), 26);

    // console.log(get_adjecent_addresses(1));
    // console.log(get_adjecent_addresses(4));
    // console.log(get_adjecent_addresses(6));
    // console.log(get_adjecent_addresses(9));

    // console.log(get_adjecent_earlier_addresses(1));
    // console.log(get_adjecent_earlier_addresses(2));
    // console.log(get_adjecent_earlier_addresses(3));
    // console.log(get_adjecent_earlier_addresses(4));
    // console.log(get_adjecent_earlier_addresses(6));
    // console.log(get_adjecent_earlier_addresses(9));

    console.log(find_limit_value(100));

  };
  // test_part_2();

  const run_part_2 = () => {

    console.log(find_limit_value(312051));

  };
  run_part_2();

};

part_2();
