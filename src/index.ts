const { sum } = await import("./module1");
const { diff } = await import("./module2");
import defaults from "lodash/defaults";
// const { defaults } = await import("lodash");
console.log(defaults({ a: 1 }, { a: 3, b: 2 }));
console.log(sum(11, 22));
export {};
