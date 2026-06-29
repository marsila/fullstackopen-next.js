import { resetDb } from "@/app/services/dbReset";
import { NextResponse } from "next/server";

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_APP_ENV !== "test") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    );
  }
  try {
    await resetDb()
    return NextResponse.json({ message: "Database reset successfully" })
  } catch (error) {
    console.error("Database reset error:", error); 
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
  
}
