export const useCategoriesInitData = () => {
  return useState("cookbook-categories", () => [
    "素菜",
    "肉菜",
    "汤",
    "凉菜",
    "热菜",
    "火锅",
    "面食",
    "豆制品",
    "水产",
  ]);
};
