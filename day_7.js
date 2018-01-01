const test_input = `pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)
`;


const parse_input = input => input
  .replace(/\n$/, "")
  .split("\n")
  .map(r => r.split(" -> "))
  .map(p => ({ from: p[0].replace(/^(\w+) .+$/, "$1"), to: p[1] ? p[1].split(/, +/) : [] }));

const get_root = parsed => {
  let no_leafs = parsed.filter(n => n.to.length > 0);
  let [root] = no_leafs.filter(n => !no_leafs.some(o => o.to.some(t => t == n.from))).map(n => n.from);
  return root;
}

const test_part_1 = input => {

  const parsed = parse_input(test_input);
  //console.log(parsed);

  console.log(get_root(parsed));
};

// test_part_1();

const run_part_1 = () => {

  let input = require("fs").readFileSync("day_7_input.txt", {encoding: "utf-8"});
  let parsed = parse_input(input);
  let root = get_root(parsed);

  console.log(root);

};

// run_part_1();

// part 2
const parse_input2 = input => {

  var parsed = input
    .replace(/\n$/, "")
    .split("\n")
    .map(r => r.split(" -> "))
    .map(p => ({
      name: p[0].replace(/^(\w+) .+$/, "$1"),
      weight: parseInt(p[0].replace(/^\w+ \((\d+)\)$/, "$1"), 10),
      to: p[1] ? p[1].split(/, +/) : [] }));

  return parsed.reduce((a,e) => ({
    ...a,
    [e.name]: {
      weight: e.weight,
      children: e.to }
  }), {});

  /* console.log("fancy",
    );



  var nodes = parsed.map(p => ({ name: p.name, weight: p.weight }));
  var edges = parsed.reduce((a,e,l) => a.concat(e.to.map(f => ({ from: e.name, to: f}))), []);

  return { nodes, edges }; */
};

const find_imbalance = /* (nodes, edges) */ nodes => {

  /* const node_weight_map = nodes.reduce((a,e,l) => { a[e.name] = e.weight; return a; }, {});
  // console.log(node_weight_map);
  const edge_map = edges.reduce((a,e,l) => {
    a[e.from] = a[e.from] || [];
    a[e.from].push(e.to);
    return a;
  }, {});
  //console.log(edge_map); */
  const recurse = node_name => {

    // console.log("visiting:", node_name);

    let node = nodes[node_name];

    // console.log("weight:", node.weight);
    // console.log("children:", node.children);

    /* // var child_weights = (edge_map[node] || []).map(recurse);
    let children = node.children.map(c => nodes[c]);

    //console.log(node, child_weights);

    // let w = node_weight_map[node];
    // let cw = child_weights.reduce((a,e) => a + e, 0);
    let w = node.weight;
    let cw = children.map(recurse).reduce((a,e) => a + e, 0);

    //console.log(w,cw);
    return w + cw; */

    let children_names = node.children;

    let children_recurse_result = children_names.map(recurse);
    let children_weights = children_recurse_result.map(crr => crr.total_weight);
    let children_total_weight = children_weights.reduce((a,e) => a+e, 0);

    let imbalance = children_recurse_result.some(crr => crr.imbalance);
    let correct_weight = null;
    if (!imbalance) {
      imbalance = [...new Set(children_weights)].length > 1;

      if (imbalance) {
        //console.log("imbalance found in children of", node_name);

        let weight_counts = children_weights.reduce((a,e) => {
          a[e] = (a[e] || 0) + 1;
          return a;
        }, {});

        //let [imbalance_weight] = Object.keys(weight_counts).filter(w => weight_counts[w] == 1);
        let [imbalance_weight, balanced_weight] =
          Object.keys(weight_counts).sort((w,u) => weight_counts[w] - weight_counts[u]);

        let [imbalanced_child] = children_recurse_result.filter(crr => crr.total_weight == imbalance_weight);

        let weight_diff = imbalance_weight - balanced_weight;

        correct_weight = imbalanced_child.node_weight - weight_diff
        //console.log(imbalance_weight, balanced_weight, imbalanced_child, correct_weight);

      }
    } else {
      [correct_weight] = children_recurse_result.map(crr => crr.correct_weight).filter(cw => cw);
    }

    return {
      node_weight: node.weight,
      total_weight: node.weight + children_total_weight,
      imbalance,
      imbalance_in: node_name,
      correct_weight
    };
  };


  const get_root2 = nodes => {

    let node_names = Object.keys(nodes);
    let child_names = node_names
      .map(nn => nodes[nn].children)
      .reduce((a,e) => [...a, ...e], []);
    let [root] = node_names.filter(nn => !child_names.some(cn => cn == nn));

    return root;

  };


  var root = //get_root(parse_input(test_input));
    get_root2(nodes);

  //console.log(root);
  //console.log(edge_map[root]);

  var recurse_result = recurse(root);
  //console.log(recurse_result);

  return recurse_result.correct_weight;
};

const test_parse_input2 = () => {

  //var { nodes, edges } = parse_input2(test_input);
  //console.log(nodes, edges);
  //find_imbalance(nodes, edges);

  let parsed = parse_input2(test_input);
  //console.log(parsed);
  var correct_weight = find_imbalance(parsed);
  console.log(correct_weight);
};
//test_parse_input2();

const run_part_2 = () => {

  let input = require("fs").readFileSync("day_7_input.txt", {encoding: "utf-8"});

  var parsed = parse_input2(input);
  //console.log(parsed);
  var correct_weight = find_imbalance(parsed);
  console.log(correct_weight);
};
run_part_2();
