const { common } = await import("./commonmodule");
import defaults from "lodash/defaults";

const sum = (a: number, b: number): number => {
  common();
  console.log(defaults({ a: 1 }, { a: 3, b: 2 }));

  return a + b;
};

export { sum };
