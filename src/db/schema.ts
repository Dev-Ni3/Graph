import { bigint } from 'drizzle-orm/pg-core';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  created_at: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const todos = pgTable('todos', {
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  user_id: bigint('user_id', { mode: 'number' })
    .notNull()
    .references(() => users.id),
  created_at: timestamp('created_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});
