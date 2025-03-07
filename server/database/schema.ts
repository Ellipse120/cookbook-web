import { sqliteTable, integer, text, int } from 'drizzle-orm/sqlite-core'
import { sql, relations } from 'drizzle-orm'

export const users = sqliteTable('users', {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
})

export const comments = sqliteTable('comments', {
  id: int().primaryKey({ autoIncrement: true }),
  message: text().notNull(),
  createdAt: text().default(sql`(CURRENT_DATE)`),
  cookbookId: integer('cookbook_id'),
})

export const commentsRelations = relations(comments, ({ one }) => ({
  cookbook: one(cookbooks, {
    fields: [comments.cookbookId],
    references: [cookbooks.id],
  }),
}))

export const cookbooks = sqliteTable('cookbooks', {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  content: text().notNull(),
  previewImg: text().notNull(),
  satisfaction: int().notNull(),
  difficulty: int().notNull(),
  consuming: text().notNull(),
  categories: text().notNull(),
  deleted: integer({ mode: 'boolean' }).default(false),
  cookingDate: text().notNull(),
  created: text().default(sql`(CURRENT_DATE)`),
  updated: text().default(sql`(CURRENT_DATE)`),
})

export const cookbooksRelations = relations(cookbooks, ({ many }) => ({
  comments: many(comments),
}))
