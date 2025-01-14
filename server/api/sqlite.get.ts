import { useDb } from '~/utils/db'
import { users } from '~~/server/database/schema'

export default eventHandler(async () => {
  const v = await useDb().select().from(users).catch((error) => {
    throw createError({
      message: error.message,
      statusCode: 500,
    })
  })

  return v
})
