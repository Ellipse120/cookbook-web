import { drizzle } from 'drizzle-orm/libsql'
// import { users } from '~~/server/database/schema'

export function useDb() {
  return drizzle(import.meta.env.DATABASE_URL!)
}
