# Blog table of contents (left index)

Date: 2026-07-29

## Problem

Blog post pages (`/blog/[slug]`) render long-form HTML content with no way to jump
between sections. We want a table-of-contents ("index") on the left of each blog
post, generated from the post's own headings, that lets readers jump to a section
and see which section they're currently reading.

Scope: only `src/app/blog/[slug]/page.tsx` (the single dynamic blog-detail route).
The blog listing page (`src/app/blog/page.tsx`) and the legacy catch-all route
(`src/app/[...slug]/page.tsx`) are unaffected — blog articles are exclusively
served by the dynamic route (confirmed: the catch-all explicitly filters out
`category !== "blog"`).

## Decisions (confirmed with user)

- Heading depth: **H2 + H3**, nested (H3 indented under its parent H2).
- Mobile/narrow screens: **collapsible drawer** ("On this page" toggle, collapsed
  by default) above the article body, instead of hiding the index entirely.
- Scroll position tracking: **yes** — the currently-visible section is
  highlighted in the index as the reader scrolls (scroll-spy).

## Architecture

### 1. `src/lib/toc.ts` (new)

```ts
export type TocItem = { id: string; text: string; level: 2 | 3 };
export function extractToc(html: string): { html: string; items: TocItem[] };
```

- Scans the blog's stored content HTML (already sanitized at write-time by
  `src/lib/sanitize-html.ts` — that sanitizer is a separate, write-time step and
  is not touched by this feature) for `<h2>`/`<h3>` tags.
- For each heading: strips inner tags to get plain text, slugifies it into an id
  using the same lowercase/hyphenate approach as the existing `toSlug` helper in
  `src/lib/blog.ts`, and injects `id="..."` into the heading's opening tag.
- Duplicate headings (e.g. two "Overview" sections) get `-2`, `-3`, ... suffixes,
  mirroring the uniqueness pattern already used for blog slugs.
- Returns the modified HTML (with ids) and an ordered list of `{ id, text, level }`
  for every H2/H3 found, in document order.
- This is a pure function (no I/O), run at render time inside the page component
  — never persisted back to the database.

### 2. `src/components/blog/TableOfContents.tsx` (new)

- Shared client-side hook `useActiveHeading(ids: string[])`: sets up an
  `IntersectionObserver` over the heading elements (looked up by id after mount)
  and returns the id of the section currently in view.
- `TocSidebar({ items })`: desktop-only (`hidden lg:block`), `lg:sticky
  lg:top-28` (clearing the fixed navbar, which is ~96px tall per
  `src/components/Navbar.tsx`), nested `<ul>` with H3s indented under their H2.
  The active item is styled with the existing `zolix-orange` accent color.
- `TocMobile({ items })`: visible below `lg`, a collapsible "On this page"
  toggle (collapsed by default, chevron icon) placed directly above the article
  body. Expands to the same nested list; selecting a link collapses the drawer.
- If `items.length < 2`, both components render `null` — a single-heading post
  doesn't need a jump index.

### 3. `src/app/blog/[slug]/page.tsx` (modified)

- Call `const { html, items } = extractToc(blog.content)` after fetching the
  blog, and render `html` (not `blog.content`) in the existing
  `dangerouslySetInnerHTML`.
- Layout: the outer article wrapper changes from a flat `mx-auto max-w-4xl` to
  responsive grid: unchanged (`max-w-4xl`, single column) below `lg`, and
  `lg:grid lg:grid-cols-[15rem_56rem] lg:gap-10` at `lg` and above, with
  `TocSidebar` as the first grid column. Everything currently in the article
  (back link, category, title, subtitle, meta row, cover image, `TocMobile`,
  content div) becomes the second column, with an explicit `lg:col-start-2` on
  that wrapper — this is required regardless of whether `TocSidebar` renders
  anything: CSS grid auto-placement would otherwise drop the lone remaining
  child into column 1 (the narrow track) whenever `TocSidebar` returns `null`
  (i.e. posts with fewer than 2 headings), so the placement can't be left
  implicit. This preserves the article's current width/appearance exactly — the
  sidebar occupies existing page margin on wide viewports rather than shrinking
  the content column.
- The FAQ section below the article is unaffected (stays outside the grid, same
  as today).

### 4. `src/app/globals.css` (modified)

- Add `scroll-margin-top` to `.blog-content h2, .blog-content h3` (~96–112px,
  matching the fixed navbar height) so clicking an index entry doesn't land the
  heading underneath the sticky nav.

## Data flow

DB row → `getBlogBySlug` → `extractToc(blog.content)` in the page component →
`{ html, items }` → `items` feeds `TocSidebar` / `TocMobile`; `html` replaces
`blog.content` in the article body's `dangerouslySetInnerHTML`.

## Error handling / edge cases

- No H2/H3 headings in a post → `items` is `[]` → both TOC components render
  `null`, layout falls back to the original single-column look (grid column for
  the sidebar simply has nothing in it, no visual gap since `hidden`/`null`
  collapses).
- Duplicate heading text → suffixed ids, as described above.
- Only H3s with no parent H2 → rendered as top-level (un-indented) entries;
  there's no requirement that H2 precede H3 for this to work.

## Out of scope

- No changes to the blog listing page or catch-all route.
- No changes to how content is authored/sanitized in the admin editor.
- No persistence of heading ids back to the database — they're derived fresh on
  every render (cheap, deterministic, and avoids a migration).
