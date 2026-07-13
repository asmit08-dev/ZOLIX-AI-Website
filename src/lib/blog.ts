import "server-only";
import { Pool } from "pg";
import { insightLinks } from "@/lib/insights-data";

export type BlogStatus = "draft" | "published";

export type Blog = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  excerpt: string;
  content: string;
  coverImage: { url: string; alt: string };
  category: string;
  tags: string[];
  status: BlogStatus;
  featured: boolean;
  seo: { title: string; description: string };
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type BlogInput = Pick<Blog, "title" | "subtitle" | "content" | "category" | "tags" | "status" | "featured"> & {
  coverImage?: { url?: string; alt?: string };
};

let pool: Pool | undefined;
let initialized: Promise<void> | undefined;

function database() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured. Add the Neon connection string to your deployment environment.");
  }
  pool ??= new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  return pool;
}

const initialPosts = insightLinks.filter((post) => post.category === "blog").map((post) => ({
  title: post.h1,
  slug: post.path.split("/").pop()!,
  subtitle: post.metaDesc,
  excerpt: post.metaDesc,
  content: `<p>${post.metaDesc}</p><h2>What this means for your team</h2><p>ZOLIX AI helps teams make practical, data-informed cloud financial decisions. Explore the guide to understand the approaches, trade-offs, and next steps.</p>`,
  category: "FinOps",
  tags: ["FinOps", "Cloud optimization"],
  seoTitle: post.metaTitle,
  seoDescription: post.metaDesc,
}));

async function initialize() {
  const db = database();
  await db.query(`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE TABLE IF NOT EXISTS blogs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      subtitle TEXT,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      cover_image_url TEXT NOT NULL DEFAULT '/assets/logo.webp',
      cover_image_alt TEXT NOT NULL DEFAULT 'ZOLIX AI',
      category TEXT NOT NULL,
      tags TEXT[] NOT NULL DEFAULT '{}',
      status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
      featured BOOLEAN NOT NULL DEFAULT false,
      likes INTEGER NOT NULL DEFAULT 0 CHECK (likes >= 0),
      seo_title TEXT NOT NULL,
      seo_description TEXT NOT NULL,
      published_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS blogs_public_index ON blogs (status, published_at DESC);
  `);
  for (const post of initialPosts) {
    await db.query(
      `INSERT INTO blogs (title, slug, subtitle, excerpt, content, category, tags, status, seo_title, seo_description, published_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,'published',$8,$9,NOW()) ON CONFLICT (slug) DO NOTHING`,
      [post.title, post.slug, post.subtitle, post.excerpt, post.content, post.category, post.tags, post.seoTitle, post.seoDescription],
    );
  }
}

async function ready() {
  initialized ??= initialize();
  await initialized;
  return database();
}

function mapBlog(row: Record<string, unknown>): Blog {
  return {
    id: row.id as string, title: row.title as string, slug: row.slug as string,
    subtitle: row.subtitle as string | null, excerpt: row.excerpt as string, content: row.content as string,
    coverImage: { url: row.cover_image_url as string, alt: row.cover_image_alt as string },
    category: row.category as string, tags: row.tags as string[], status: row.status as BlogStatus,
    featured: row.featured as boolean,
    seo: { title: row.seo_title as string, description: row.seo_description as string },
    publishedAt: row.published_at ? new Date(row.published_at as string).toISOString() : null,
    createdAt: new Date(row.created_at as string).toISOString(), updatedAt: new Date(row.updated_at as string).toISOString(),
  };
}

const fields = "id,title,slug,subtitle,excerpt,content,cover_image_url,cover_image_alt,category,tags,status,featured,seo_title,seo_description,published_at,created_at,updated_at";

export async function getBlogs(publicOnly = false) {
  const db = await ready();
  const result = await db.query(`SELECT ${fields} FROM blogs ${publicOnly ? "WHERE status = 'published'" : ""} ORDER BY featured DESC, COALESCE(published_at, created_at) DESC`);
  return result.rows.map(mapBlog);
}

export async function getBlogBySlug(slug: string, publicOnly = true) {
  const db = await ready();
  const result = await db.query(`SELECT ${fields} FROM blogs WHERE slug = $1 ${publicOnly ? "AND status = 'published'" : ""} LIMIT 1`, [slug]);
  return result.rows[0] ? mapBlog(result.rows[0]) : null;
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const toSlug = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
async function uniqueSlug(title: string, ignoreId?: string) {
  const db = await ready(); let slug = toSlug(title) || "untitled-post"; let number = 2;
  while ((await db.query("SELECT 1 FROM blogs WHERE slug = $1 AND ($2::uuid IS NULL OR id <> $2::uuid)", [slug, ignoreId ?? null])).rowCount) slug = `${toSlug(title)}-${number++}`;
  return slug;
}

function normalized(input: BlogInput) {
  const title = input.title.trim(); const content = input.content.trim(); const excerpt = stripHtml(content).slice(0, 200) || title;
  return { title, subtitle: input.subtitle?.trim() || null, content, excerpt, category: input.category.trim(), tags: input.tags.filter(Boolean), status: input.status, featured: input.featured, url: input.coverImage?.url?.trim() || "/assets/logo.webp", alt: input.coverImage?.alt?.trim() || title, seoTitle: title, seoDescription: excerpt };
}

export async function createBlog(input: BlogInput) {
  const value = normalized(input); const slug = await uniqueSlug(value.title); const db = await ready();
  const result = await db.query(`INSERT INTO blogs (title,slug,subtitle,excerpt,content,cover_image_url,cover_image_alt,category,tags,status,featured,seo_title,seo_description,published_at)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,CASE WHEN $10 = 'published' THEN NOW() ELSE NULL END) RETURNING ${fields}`,
    [value.title,slug,value.subtitle,value.excerpt,value.content,value.url,value.alt,value.category,value.tags,value.status,value.featured,value.seoTitle,value.seoDescription]);
  return mapBlog(result.rows[0]);
}

export async function updateBlog(id: string, input: BlogInput) {
  const value = normalized(input); const slug = await uniqueSlug(value.title, id); const db = await ready();
  const result = await db.query(`UPDATE blogs SET title=$2,slug=$3,subtitle=$4,excerpt=$5,content=$6,cover_image_url=$7,cover_image_alt=$8,category=$9,tags=$10,status=$11,featured=$12,seo_title=$13,seo_description=$14,published_at=CASE WHEN $11='published' THEN COALESCE(published_at,NOW()) ELSE NULL END,updated_at=NOW() WHERE id=$1 RETURNING ${fields}`,
    [id,value.title,slug,value.subtitle,value.excerpt,value.content,value.url,value.alt,value.category,value.tags,value.status,value.featured,value.seoTitle,value.seoDescription]);
  return result.rows[0] ? mapBlog(result.rows[0]) : null;
}

export async function deleteBlog(id: string) { const db = await ready(); return ((await db.query("DELETE FROM blogs WHERE id=$1", [id])).rowCount ?? 0) > 0; }
