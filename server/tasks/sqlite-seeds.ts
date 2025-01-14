import { faker } from '@faker-js/faker'
import { users } from '~~/server/database/schema'
import { useDb } from '~/utils/db'

export default defineTask({
  meta: {
    name: 'db:seed',
    description: 'Seed sqlite data using faker.js data',
  },
  async run() {
    const mockUsers = Array.from({ length: 10 }).map(() => {
      return {
        name: faker.person.fullName(),
        age: faker.number.int({
          min: 3,
          max: 75,
        }),
        email: faker.internet.email(),
      }
    })

    const db = useDb()
    await db.insert(users).values(mockUsers)

    return {
      result: 'success',
      message: `Added ${mockUsers.length} users seeded`,
    }
  },
})
