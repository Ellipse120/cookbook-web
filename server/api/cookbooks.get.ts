import { Cookbook } from "~/types";

export const mockData: Cookbook[] = new Array(10).fill(0).map((_, index) => ({
  id: `${index + 1}`,
  title: `测试菜${index + 1}`,
  content: "花菜，里脊肉",
  previewImg:
    index % 2 === 0
      ? "/uploads/1702111266981_96345_IMG_8552.JPG"
      : "/uploads/红糖糍粑——陶德砂锅.jpg",
  satisfaction: index % 6,
  difficulty: index % 6,
  deleted: false,
  consuming: "10min",
  comments: [],
  cookingDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export default defineEventHandler((event) => {
  return mockData;
});
