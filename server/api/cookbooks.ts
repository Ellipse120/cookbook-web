import type { Cookbook } from '~~/shared/types/types'
import { useDb } from '~/utils/db'

export const mockData: Cookbook[] = new Array(10).fill(0).map((_, index) => ({
  id: `${index + 1}`,
  title: `测试菜${index + 1}`,
  content: '花菜，里脊肉',
  previewImg:
    index % 2 === 0
      ? '/uploads/排骨炖萝卜.jpg'
      : '/uploads/红糖糍粑——陶德砂锅.jpg',
  satisfaction: index % 6,
  difficulty: index % 6,
  deleted: false,
  consuming: '10min',
  comments: [],
  categories: ['菜', '热菜'],
  cookingDate: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
}))

export default defineEventHandler(async () => {
  const db = useDb()
  const result = await db.query.cookbooks.findMany({
    with: {
      comments: true,
    },
  })

  return result
})
