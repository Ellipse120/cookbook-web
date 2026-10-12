import { defineRelations } from 'drizzle-orm'
import { cookbooks, comments } from './schema'

export const relations = defineRelations({ cookbooks, comments }, r => ({
  comments: {
    cookbook: r.one.cookbooks({
      from: r.comments.cookbookId,
      to: r.cookbooks.id,
    }),
  },
  cookbooks: {
    comments: r.many.comments(),
  },
}))
