// Run with: node scripts/delete-templated-blogs.js
// Deletes every blog post except the one original, non-templated article.
// Only run this AFTER confirming the fixed code (no auto-reseed) is deployed —
// otherwise the next cold start on the old code will just recreate these rows again.
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");
for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

const { Pool } = require("../node_modules/pg");

const KEEP_SLUG = "bridging-the-gap-between-devops-and-finance";

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

  const { rows: before } = await pool.query("SELECT title, slug FROM blogs ORDER BY title");
  console.log(`Before: ${before.length} blogs`);

  const del = await pool.query("DELETE FROM blogs WHERE slug <> $1", [KEEP_SLUG]);
  console.log(`Deleted ${del.rowCount} rows.`);

  const { rows: after } = await pool.query("SELECT title, slug FROM blogs ORDER BY title");
  console.log(`Remaining (${after.length}):`);
  for (const r of after) console.log(` - ${r.title} (${r.slug})`);

  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
