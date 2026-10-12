import { sqliteTable, uniqueIndex, integer, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	age: integer().notNull(),
	email: text().notNull(),
},
(table) => [uniqueIndex("users_email_unique").on(table.email),
]);

export const comments = sqliteTable("comments", {
	id: integer().primaryKey({ autoIncrement: true }),
	message: text().notNull(),
	createdAt: text().default(sql`CURRENT_DATE`),
	cookbookId: integer("cookbook_id"),
});

export const cookbooks = sqliteTable("cookbooks", {
	id: integer().primaryKey({ autoIncrement: true }),
	title: text().notNull(),
	content: text().notNull(),
	previewImg: text().notNull(),
	satisfaction: integer().notNull(),
	difficulty: integer().notNull(),
	consuming: text().notNull(),
	categories: text().notNull(),
	deleted: integer({"mode":"boolean"}).default(false),
	cookingDate: text().notNull(),
	createdAt: text().default(sql`CURRENT_DATE`),
	updatedAt: text().default(sql`CURRENT_DATE`),
});

