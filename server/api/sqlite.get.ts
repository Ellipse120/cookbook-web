import { desc } from 'drizzle-orm'
import { useDb } from '~/utils/db'
import { users } from '~~/server/database/schema'

export default eventHandler(async () => {
  return useDb()
    .select()
    .from(users)
    .orderBy(desc(users.id))
    .catch((error) => {
      throw createError({
        message: error.message,
        status: 500,
      })
    })
})
