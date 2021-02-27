const cloneComponent = (root: HTMLElement) => {
  return root.cloneNode(true) as HTMLElement;
};

export { cloneComponent };
