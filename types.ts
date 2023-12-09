export interface Comment {
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
