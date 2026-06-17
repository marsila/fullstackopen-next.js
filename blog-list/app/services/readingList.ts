import { db } from "@/db";
import { readings } from "@/db/schema";
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