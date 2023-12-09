interface Comment {
  id: number;
  message: string;
  createdAt: Date;
}

export interface Cookbook {
  id: string | number;
  title: string;
  content: string;
  previewImg?: string;
  satisfaction?: number;
  difficulty?: number;
  consuming: string | number;
  comments?: Comment[];
  deleted?: true | false;
  cookingDate?: Date | string | null | undefined;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export const mockData: Cookbook[] = new Array(10).fill(0).map((_, index) => ({
  id: `${index + 1}`,
  title: `测试菜${index + 1}`,
  content: "花菜，里脊肉",
  previewImg:
    index % 2 === 0
      ? "/uploads/排骨炖萝卜.jpg"
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
