import { db } from "@/db";
import {  readings } from "@/db/schema";
import { eq ,and} from "drizzle-orm";

export const addToReadBlog = async (userId:number, blogId:number)=>{
    await db.insert(readings).values({userId,blogId})
}

export const isInReadingList = async(userId: number, blogId: number) => {
  const entry = await db.query.readings.findFirst({
    where: and(
      eq(readings.userId, userId),
      eq(readings.blogId, blogId)
    )
  });
  return !!entry;
}

export const getReadingListByStatus = async(userId:number, status:boolean)=> {
  const userReadings = await db.query.readings.findMany({
    where:and(
      eq(readings.userId, userId),
      eq(readings.read, status)
    ),
    with:{
      blogs:true
    }
  })  
  return userReadings
}

export const markAsRead = async(readId:number) => {
  const isRead = await db.update(readings).set({read:true}).where(eq(readings.id, readId))
  return isRead
}

