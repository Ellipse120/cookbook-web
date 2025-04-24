import { useDb } from '~/utils/db'

export default defineEventHandler(async () => {
  const db = useDb()
  const result = await db.query.cookbooks.findMany({
    with: {
      comments: true,
    },
  })

  return result
})
