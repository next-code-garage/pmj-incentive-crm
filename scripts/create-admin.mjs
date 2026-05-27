import { randomBytes, scrypt as nodeScrypt } from "node:crypto";
import { promisify } from "node:util";
import { Client } from "pg";

const scrypt = promisify(nodeScrypt);
const connectionString = process.env.DATABASE_URL;
const username = (process.argv[2] ?? process.env.ADMIN_USERNAME ?? "").trim().toLowerCase();
const password = process.argv[3] ?? process.env.ADMIN_PASSWORD ?? "";

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

if (!/^[a-z0-9._-]{3,80}$/.test(username)) {
  throw new Error("Admin username must be 3-80 lowercase letters, numbers, dots, hyphens, or underscores.");
}

if (password.length < 12) {
  throw new Error("Admin password must be at least 12 characters.");
}

const salt = randomBytes(16).toString("base64url");
const derivedKey = await scrypt(password, salt, 64);
const passwordHash = `scrypt$${salt}$${derivedKey.toString("base64url")}`;
const client = new Client({ connectionString });

try {
  await client.connect();
  await client.query(
    `INSERT INTO admin_users (username, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (username) DO UPDATE
       SET password_hash = EXCLUDED.password_hash,
           failed_login_attempts = 0,
           locked_until = NULL,
           updated_at = NOW()`,
    [username, passwordHash],
  );
  console.log(`Admin account "${username}" created or updated.`);
} finally {
  await client.end();
}
