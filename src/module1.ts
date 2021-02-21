const { common } = await import("./commonmodule");
const sum = (a: number, b: number): number => {
  common();
  return a + b;
};

export { sum };
