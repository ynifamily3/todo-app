import("./module1")
  .then(({ sum }) => {
    console.log(sum(1, 2));
  })
  .catch((err) => {
    console.error(err);
  });

export {};
