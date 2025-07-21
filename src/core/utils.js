export const getPlurality = (num) => {
  return num == 1 ? "" : "s";
};
export const createArray = (allCategory) => {
  const totalPage = allCategory && Math.ceil(allCategory?.count / 10);

  return [...Array(totalPage).keys()]?.map((i) => i + 1);
};


