import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { blogs, users } from "@/db/schema";

export const GET = async (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "the authorization header is missing" },
      { status: 401 },
    );
  }
  const currentToken = authHeader.split(" ")[1];

  const result = await db
    .select()
    .from(users)
    .where(eq(users.token, currentToken));
  const user = result[0];
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userInfo = await db
    .select({
      id: users.id,
      name: users.name,
      username: users.username,
      blogs: blogs,
    })
    .from(users)
    .leftJoin(blogs, eq(blogs.userId, users.id))
    .where(eq(users.id, user.id));
    const responseData = {
        id:userInfo[0].id,
        name :userInfo[0].name,
        username : userInfo[0].username,
        blogs: userInfo.map(item => item.blogs)
    }
 return NextResponse.json(responseData)
};
