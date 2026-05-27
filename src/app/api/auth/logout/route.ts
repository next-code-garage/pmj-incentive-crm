import { NextRequest, NextResponse } from "next/server";
import { clearAdminSessionCookie, revokeAdminSession, SESSION_COOKIE } from "@/lib/auth";

export const preferredRegion = "sin1";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/", request.url), 303);
  const token = request.cookies.get(SESSION_COOKIE)?.value;

  try {
    await revokeAdminSession(token);
  } finally {
    clearAdminSessionCookie(response);
  }

  return response;
}
