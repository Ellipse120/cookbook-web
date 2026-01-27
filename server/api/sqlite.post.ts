import { useDb } from '~/utils/db'
import { users } from '~~/server/database/schema'
import type { MockUser } from '~~/shared/types/types'

export default eventHandler(async (event) => {
  const userData: MockUser = await readBody(event)

  const v = await useDb()
    .insert(users)
    .values(userData)
    .returning({
      id: users.id,
    }).catch((err) => {
      throw createError({
        status: 500,
        message: err.message,
      })
    })

  return {
    statusCode: 200,
    statusMessage: '成功',
    data: v,
  }
})
