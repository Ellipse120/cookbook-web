import { inArray } from 'drizzle-orm'
import { useDb } from '~/utils/db'
import { cookbooks } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const ids = await readBody(event)
  const db = useDb()

  if (!Array.isArray(ids)) {
    throw createError({
      statusCode: 400,
      message: '参数`ids`类型为数组',
    })
  }

  // Physical deletion
  // const v = await db
  //   .delete(cookbooks)
  //   .where(inArray(cookbooks.id, ids))
  //   .returning({ deletedId: cookbooks.id })

  // Logical deletion
  const v2 = await db
    .update(cookbooks)
    .set({ deleted: true })
    .where(inArray(cookbooks.id, ids))
    .returning({ deletedId: cookbooks.id })

  return {
    statusCode: 200,
    statusMessage: '删除成功',
    data: v2,
  }
})
