export interface Comment {
  id: string
  message: string
  createdAt: Date
  cookbookId: string
  deleted: true | false
}

export interface Cookbook {
  id: string | number
  title: string
  content: string
  previewImg: string
  satisfaction: number
  difficulty: number
  consuming: string | number
  categories: string[]
  comments: Comment[]
  deleted: true | false
  cookingDate: Date | string | null | undefined
  createdAt: Date | string
  updatedAt: Date | string
}

export type BlogT = {
  date: string
  title: string
  link: string
  views: string
}

export type BlogUpdateT = {
  data: BlogT[]
  updateDate: string
}

export type WombT = {
  id: string
  date: string | Date
  value: string
  /** 修正值 */
  fixedValue?: string
  unit: string
  womb: {
    position: string
    size: {
      /** 长 */
      long: number
      /** 宽 */
      width: number
      /** 厚 */
      thickness: number
      /** 内膜厚 */
      endometrium_thickness?: number
      /** 宫颈长 */
      cervical_length: number
    }
  }
  ovary: {
    leftSide: {
      long: number | null
      width: number | null
    }
    rightSide: {
      long: number | null
      width: number | null
    }
  }
}
