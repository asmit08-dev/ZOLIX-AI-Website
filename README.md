ZOLIX AI marketing site built with Next.js (App Router). See `docs/superpowers/specs/2026-07-06-nextjs-migration-design.md` for the migration design.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Builds the Next.js application for a server-capable host such as Netlify. This is required for the database-backed blog and API routes.

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- `next/font/google` for Poppins
- Per-page Metadata API (`generateMetadata`) for SEO — titles, descriptions, canonical/hreflang
- Programmatic SEO pages (`/industries/*`, `/technologies/*`, `/resources/*`) driven by `src/lib/insights-data.ts` via `app/[...slug]/page.tsx` + `generateStaticParams`
- `app/sitemap.ts` generates a complete sitemap from the same data
# ZOLIX AI website

## Blog configuration

The blog is served by the Next.js application (not a separate backend). Configure these environment variables in local development and Netlify:

- `DATABASE_URL`: Neon PostgreSQL connection string.
- `BLOG_ADMIN_TOKEN`: a long private token used to access `/admin/blog` and write posts.

The first successful database request creates the `blogs` table, indexes, and imports the former blog catalogue as published records. Visit `/admin/blog`, enter `BLOG_ADMIN_TOKEN`, then create, edit, publish, or delete posts. Public `/blog` only reads published records.
