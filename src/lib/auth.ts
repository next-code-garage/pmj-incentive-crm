import "server-only";
import { createHash, randomBytes, scrypt as nodeScrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { query } from "@/lib/db";

const scrypt = promisify(nodeScrypt);
const SESSION_COOKIE = "pmj_admin_session";
const SESSION_DURATION_MS = 12 * 60 * 60 * 1000;
const LOCK_DURATION_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;

type AdminCredential = {
  id: string;
  username: string;
  password_hash: string;
  failed_login_attempts: number;
  locked_until: Date | null;
};

export type AdminUser = {
  id: string;
  username: string;
};

export type NewSession = {
  token: string;
  expiresAt: Date;
};

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function verifyPassword(password: string, storedHash: string) {
  const [algorithm, salt, hash] = storedHash.split("$");

  if (algorithm !== "scrypt" || !salt || !hash) {
    return false;
  }

  try {
    const expected = Buffer.from(hash, "base64url");
    const actual = (await scrypt(password, salt, expected.length)) as Buffer;

    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export async function authenticateAdmin(username: string, password: string) {
  const normalizedUsername = username.trim().toLowerCase();

  if (!normalizedUsername || !password) {
    return null;
  }

  const result = await query<AdminCredential>(
    `SELECT id, username, password_hash, failed_login_attempts, locked_until
       FROM admin_users
      WHERE username = $1`,
    [normalizedUsername],
  );
  const admin = result.rows[0];

  if (!admin || (admin.locked_until && admin.locked_until.getTime() > Date.now())) {
    return null;
  }

  if (!(await verifyPassword(password, admin.password_hash))) {
    await query(
      `UPDATE admin_users
          SET failed_login_attempts = failed_login_attempts + 1,
              locked_until = CASE
                WHEN failed_login_attempts + 1 >= $2
                  THEN NOW() + ($3 * INTERVAL '1 millisecond')
                ELSE NULL
              END,
              updated_at = NOW()
        WHERE id = $1`,
      [admin.id, MAX_FAILED_ATTEMPTS, LOCK_DURATION_MS],
    );
    return null;
  }

  await query(
    `UPDATE admin_users
        SET failed_login_attempts = 0, locked_until = NULL, updated_at = NOW()
      WHERE id = $1`,
    [admin.id],
  );

  return { id: admin.id, username: admin.username };
}

export async function issueAdminSession(adminUserId: string): Promise<NewSession> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await query("DELETE FROM admin_sessions WHERE expires_at <= NOW()");
  await query(
    `INSERT INTO admin_sessions (admin_user_id, token_hash, expires_at)
     VALUES ($1, $2, $3)`,
    [adminUserId, tokenHash(token), expiresAt],
  );

  return { token, expiresAt };
}

export function setAdminSessionCookie(response: NextResponse, session: NewSession) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: session.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: session.expiresAt,
  });
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const result = await query<AdminUser>(
    `SELECT admin_users.id, admin_users.username
       FROM admin_sessions
       JOIN admin_users ON admin_users.id = admin_sessions.admin_user_id
      WHERE admin_sessions.token_hash = $1
        AND admin_sessions.expires_at > NOW()`,
    [tokenHash(token)],
  );

  return result.rows[0] ?? null;
}

export async function revokeAdminSession(token: string | undefined) {
  if (token) {
    await query("DELETE FROM admin_sessions WHERE token_hash = $1", [tokenHash(token)]);
  }
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.delete(SESSION_COOKIE);
}

export { SESSION_COOKIE };
