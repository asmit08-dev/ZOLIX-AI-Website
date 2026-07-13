import "server-only";
import { Pool } from "pg";

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 5 * 1024 * 1024;

let pool: Pool | undefined;
let initialized: Promise<void> | undefined;

function database() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured. Add the Neon connection string to your deployment environment.");
  }
  pool ??= new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  return pool;
}

async function initialize() {
  const db = database();
  await db.query(`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE TABLE IF NOT EXISTS blog_images (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      mime_type TEXT NOT NULL,
      data BYTEA NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

async function ready() {
  initialized ??= initialize();
  await initialized;
  return database();
}

export function isAllowedImageType(mimeType: string) {
  return ALLOWED_MIME_TYPES.has(mimeType);
}

export function exceedsMaxImageSize(byteLength: number) {
  return byteLength > MAX_BYTES;
}

export async function saveBlogImage(mimeType: string, data: Buffer) {
  const db = await ready();
  const result = await db.query<{ id: string }>(
    "INSERT INTO blog_images (mime_type, data) VALUES ($1, $2) RETURNING id",
    [mimeType, data],
  );
  return result.rows[0].id;
}

export async function getBlogImage(id: string) {
  const db = await ready();
  const result = await db.query<{ mime_type: string; data: Buffer }>(
    "SELECT mime_type, data FROM blog_images WHERE id = $1",
    [id],
  );
  return result.rows[0] ? { mimeType: result.rows[0].mime_type, data: result.rows[0].data } : null;
}
