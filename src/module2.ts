const { common } = await import("./commonmodule");

function diff(a: number, b: number): number {
  common();
  return a - b;
}

export { diff };
