import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin, issueAdminSession, setAdminSessionCookie } from "@/lib/auth";

export const preferredRegion = "sin1";

function loginRedirect(request: NextRequest, error: string) {
  return NextResponse.redirect(new URL(`/?error=${error}`, request.url), 303);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    return loginRedirect(request, "invalid");
  }

  try {
    const admin = await authenticateAdmin(username, password);

    if (!admin) {
      return loginRedirect(request, "invalid");
    }

    const session = await issueAdminSession(admin.id);
    const response = NextResponse.redirect(new URL("/admin", request.url), 303);
    setAdminSessionCookie(response, session);
    return response;
  } catch {
    return loginRedirect(request, "unavailable");
  }
}
