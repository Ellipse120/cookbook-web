import { useDb } from '~/utils/db'
import { cookbooks } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const db = useDb()

  const newItem = {
    ...body,
    deleted: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const v = await db
    .insert(cookbooks)
    .values(newItem)
    .onConflictDoNothing()
    .returning()

  return {
    statusCode: 200,
    statusMessage: '成功',
    data: v,
  }
})
