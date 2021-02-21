const { sum } = await import("./module1");
const { diff } = await import("./module2");

console.log(sum(10, 20));
console.log(diff(444, 44));
export {};
