import { addUser } from "@/app/services/users";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }
  if (!process.env.DATABASE_URL) {
    console.error("CRITICAL: DATABASE_URL is missing in the test environment!");
    return new Response("Missing DB URL", { status: 500 });
  }
  const body = await request.json()
  const {username, name, password} = body

  if(!username || username.length< 4 ){
        return NextResponse.json({error: "username must be at least 4 characters"}, {status:400})
    }
    if(!name){
        return NextResponse.json({error: "must have a name"}, {status:400})
    }
    if(!password || password.length< 4 ){
        return NextResponse.json({error: "password must be at least 4 characters"}, {status:400})
    }

    const passwordHash = await bcrypt.hash(password,10)
    await addUser(username,name,passwordHash)

    return NextResponse.json({ message: "User created" }, { status: 201 })
}
