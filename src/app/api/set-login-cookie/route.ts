import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  cookies().set("loggedIn", "true", {
    httpOnly: true,
    path: "/",
  })

  return NextResponse.json({ success: true })
}