import { eq } from 'drizzle-orm'
import { useDb } from '~/utils/db'
import { cookbooks } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = useDb()

  if (!body.id) {
    throw createError({
      statusCode: 422,
      message: 'id不能为空',
    })
  }

  const newItem = {
    ...body,
    updatedAt: new Date(),
  }

  const v = await db
    .update(cookbooks)
    .set(newItem)
    .where(eq(cookbooks.id, body.id))
    .returning()

  return {
    statusCode: 200,
    statusMessage: '成功',
    data: v,
  }
})
