import { pgTable, serial,text, integer,boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const blogs = pgTable("blogs",{
    id:serial('id').primaryKey(),
    title:text('title').notNull(),
    author:text('author').notNull(),
    url:text('url').notNull(),
    likes: integer('likes').notNull().default(0),
    userId:integer('user_id').notNull().references(()=> users.id)
})

export const users = pgTable('users',{
    id:serial('id').primaryKey(),
    name:text('name').notNull(),
    username:text('username').notNull().unique(),
    passwordHash:text('password_hash').notNull().default(''),
    token:text('token'),
})

export const usersRelations = relations(users,({many})=>({
    blogs : many(blogs),
    readings :many(readings)
}))

export const blogsRelations = relations(blogs,({one, many})=>({
    user : one(users, {
        fields :[blogs.userId],
        references :[users.id]
    }),
    readings : many(readings)
}))

export const readings = pgTable('readings',{
    id: serial('id').primaryKey(),
    userId : integer('user_id').notNull().references(()=> users.id),
    blogId : integer('blog_id').notNull().references(()=>blogs.id),
    read: boolean('read').notNull().default(false),
})

export const readingsRelations = relations(readings,({one}) => ({
    users : one(users,{
        fields:[readings.userId],
        references: [users.id],
    }),
    blogs : one(blogs,{
        fields : [readings.blogId],
        references: [blogs.id]
    })
}))

