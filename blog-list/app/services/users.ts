import {db} from '../../db'
import {users} from '../../db/schema'
import { eq } from 'drizzle-orm'

export const getUsers = async() =>{
    return db.query.users.findMany()
}

export const addUser = async (username:string, name:string, passwordHash:string)=>{
    return db.insert(users).values({ username, name, passwordHash });
}

export const addToken = async(userId:number,token:string) => {
    return db
      .update(users)
      .set({ token: String(token) })
      .where(eq(users.id, userId));  
}

export const getUserWithBlogs = async(username:string) => {
    return db.query.users.findFirst({
        where : eq(users.username, username),
        with : {blogs:true}
    })
}

export const checkUsernameExist = async(username:string) => {
    return db.query.users.findFirst({
        where:eq(users.username, username)
    })
}
