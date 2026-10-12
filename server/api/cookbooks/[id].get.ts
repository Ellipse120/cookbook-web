import { useDb } from '~/utils/db'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const db = useDb()

  if (!id) {
    throw createError({
      status: 422,
      message: 'id不能为空',
    })
  }

  const targetItem = await db.query.cookbooks.findFirst({
    where: {
      id: Number(id),
    },
    with: {
      comments: true,
    },
  })

  return {
    statusCode: 200,
    statusMessage: '成功',
    data: targetItem,
  }
})
