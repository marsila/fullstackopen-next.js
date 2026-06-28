import { db } from '@/db'
import {blogs, users, readings} from '@/db/schema'
import { sql } from 'drizzle-orm'

export const resetDb = async() => {
    await db.batch([
        db.delete(readings),
        db.delete(blogs),
        db.delete(users),
     ])
}