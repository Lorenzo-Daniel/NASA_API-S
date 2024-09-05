export const splitByDots = (str) => {
  if (str) {
    return str
      .split(".")
      .map((fragment, index, arr) =>
        index < arr.length - 1 ? fragment + "." : fragment
      )
      .filter(Boolean);
  }
};
