import { readFile } from "node:fs/promises";
import { Client } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured.");
}

const schema = await readFile(new URL("../database/schema.sql", import.meta.url), "utf8");
const client = new Client({ connectionString });

try {
  await client.connect();
  await client.query(schema);
  console.log("CRM database schema initialized.");
} finally {
  await client.end();
}
