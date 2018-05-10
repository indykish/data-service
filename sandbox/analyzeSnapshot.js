const ss = require('./snapshot');

for (key in ss) console.log(key);

console.log(ss.edges.length/ss.nodes.length);