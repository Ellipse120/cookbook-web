import { drizzle } from 'drizzle-orm/libsql'
import { relations } from '~~/server/database/relations'

export function useDb() {
  return drizzle(import.meta.env.DATABASE_URL!, {
    relations,
  })
}
