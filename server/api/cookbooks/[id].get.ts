import { mockData } from '../cookbooks'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 422,
      message: 'id不能为空'
    })
  }

  const targetItem = mockData.find(o => o.id === id)

  return {
    statusCode: 200,
    statusMessage: '成功',
    data: targetItem
  }
})
