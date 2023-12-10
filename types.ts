export interface Comment {
  id: string;
  message: string;
  createdAt: Date;
  cookbookId: string;
  deleted: true | false;
}

export interface Cookbook {
  id: string | number;
  title: string;
  content: string;
  previewImg: string;
  satisfaction: number;
  difficulty: number;
  consuming: string | number;
  categories: string[];
  comments: Comment[];
  deleted: true | false;
  cookingDate: Date | string | null | undefined;
  createdAt: Date | string;
  updatedAt: Date | string;
}
