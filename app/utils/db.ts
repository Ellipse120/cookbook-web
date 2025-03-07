import { drizzle } from 'drizzle-orm/libsql'
import * as schema from '~~/server/database/schema'

export function useDb() {
  return drizzle(import.meta.env.DATABASE_URL!, {
    schema,
  })
}
