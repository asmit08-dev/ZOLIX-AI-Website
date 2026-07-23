// Run with: node scripts/import-really-blogs.js [--dry]
//
// Imports the finished articles in "Zolix.ai_Webpage Content /Really_Blogs" into the
// blogs table, converting each .docx straight to HTML. Nothing is authored here: the
// title, body, meta title, meta description and slug all come from the document itself.
// Matching is by slug, so re-running updates the existing row instead of duplicating it.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.join(__dirname, "..");
const SOURCE_DIR = path.join(ROOT, "Zolix.ai_Webpage Content ", "Really_Blogs");
const WORK_DIR = path.join(require("os").tmpdir(), "really-blogs-docx");
const CATEGORY = "FinOps & Cloud Cost Optimization";
const DRY_RUN = process.argv.includes("--dry");

for (const line of fs.readFileSync(path.join(ROOT, ".env"), "utf8").split("\n")) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}

/* ------------------------------------------------------------------ docx -> html */

const dec = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Direct children matching a tag, tracking depth so nested elements (a table inside a
// table cell, for example) do not terminate the match early.
function children(xml, tag) {
  const out = [];
  const rx = new RegExp(`<${tag}(?:\\s[^>]*)?>|</${tag}>`, "g");
  let depth = 0, start = -1, m;
  while ((m = rx.exec(xml))) {
    if (m[0][1] !== "/") { if (depth === 0) start = m.index; depth++; }
    else { depth--; if (depth === 0) out.push(xml.slice(start, m.index + m[0].length)); }
  }
  return out;
}

function runText(run) {
  let out = "";
  const rx = /<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>|<w:br(?:\s[^>]*)?\/>|<w:tab(?:\s[^>]*)?\/>/g;
  let m;
  while ((m = rx.exec(run))) {
    if (m[1] !== undefined) out += esc(dec(m[1]));
    else if (m[0].startsWith("<w:br")) out += "<br/>";
    else out += " ";
  }
  return out;
}

function inline(container, relMap) {
  let html = "";
  const rx = /<w:hyperlink(?:\s[^>]*)?>[\s\S]*?<\/w:hyperlink>|<w:r(?:\s[^>]*)?>[\s\S]*?<\/w:r>/g;
  let m;
  while ((m = rx.exec(container))) {
    const chunk = m[0];
    if (chunk.startsWith("<w:hyperlink")) {
      const rid = (chunk.match(/r:id="([^"]+)"/) || [])[1];
      const anchor = (chunk.match(/w:anchor="([^"]+)"/) || [])[1];
      const href = rid && relMap[rid] ? relMap[rid] : anchor ? `#${anchor}` : null;
      const inner = inline(chunk.replace(/^<w:hyperlink(?:\s[^>]*)?>/, "").replace(/<\/w:hyperlink>$/, ""), relMap);
      html += href ? `<a href="${esc(href)}">${inner}</a>` : inner;
    } else {
      const props = (chunk.match(/<w:rPr>[\s\S]*?<\/w:rPr>/) || [""])[0];
      let text = runText(chunk);
      if (!text) continue;
      if (/<w:i(?:\s+w:val="(?:1|true|on)")?\s*\/>/.test(props)) text = `<em>${text}</em>`;
      if (/<w:b(?:\s+w:val="(?:1|true|on)")?\s*\/>/.test(props)) text = `<strong>${text}</strong>`;
      html += text;
    }
  }
  return html;
}

// numId -> level -> numbering format, so ordered lists stay ordered.
function parseNumbering(xml) {
  const abstract = {};
  for (const a of children(xml, "w:abstractNum")) {
    const id = (a.match(/w:abstractNumId="([^"]+)"/) || [])[1];
    abstract[id] = {};
    for (const l of children(a, "w:lvl")) {
      const ilvl = (l.match(/w:ilvl="([^"]+)"/) || [])[1];
      abstract[id][ilvl] = (l.match(/<w:numFmt w:val="([^"]+)"/) || [])[1] || "bullet";
    }
  }
  const map = {};
  for (const n of children(xml, "w:num")) {
    const id = (n.match(/w:numId="([^"]+)"/) || [])[1];
    map[id] = abstract[(n.match(/<w:abstractNumId w:val="([^"]+)"/) || [])[1]] || {};
  }
  return map;
}

function closingIndex(body, from, open, close) {
  const rx = new RegExp(`${open}|${close}`, "g");
  rx.lastIndex = from;
  let depth = 0, m;
  while ((m = rx.exec(body))) {
    depth += m[0].startsWith("</") ? -1 : 1;
    if (depth === 0) return m.index + m[0].length;
  }
  return body.length;
}

function readDocx(docxPath) {
  fs.rmSync(WORK_DIR, { recursive: true, force: true });
  fs.mkdirSync(WORK_DIR, { recursive: true });
  execFileSync("unzip", ["-o", "-q", docxPath, "-d", WORK_DIR]);

  const xml = fs.readFileSync(path.join(WORK_DIR, "word/document.xml"), "utf8");
  const numberingPath = path.join(WORK_DIR, "word/numbering.xml");
  const numbering = fs.existsSync(numberingPath) ? parseNumbering(fs.readFileSync(numberingPath, "utf8")) : {};

  const relMap = {};
  const relsPath = path.join(WORK_DIR, "word/_rels/document.xml.rels");
  if (fs.existsSync(relsPath)) {
    for (const m of fs.readFileSync(relsPath, "utf8").matchAll(/Id="([^"]+)"[^>]*Target="([^"]+)"/g)) relMap[m[1]] = dec(m[2]);
  }

  const body = xml.slice(xml.indexOf("<w:body>") + 8, xml.lastIndexOf("</w:body>"));
  const blocks = [];
  const rx = /<w:tbl>|<w:p(?:\s[^>]*)?>|<w:p(?:\s[^>]*)?\/>/g;
  let m;
  while ((m = rx.exec(body))) {
    if (m[0] === "<w:tbl>") {
      const end = closingIndex(body, m.index, "<w:tbl>", "</w:tbl>");
      const rows = children(body.slice(m.index, end), "w:tr").map((tr) =>
        children(tr, "w:tc").map((tc) => children(tc, "w:p").map((p) => inline(p, relMap)).filter(Boolean).join("<br/>"))
      );
      blocks.push({ kind: "table", rows });
      rx.lastIndex = end;
      continue;
    }
    const end = m[0].endsWith("/>") ? m.index + m[0].length : closingIndex(body, m.index, "<w:p(?:\\s[^>]*)?>", "</w:p>");
    const chunk = body.slice(m.index, end);
    const props = (chunk.match(/<w:pPr>[\s\S]*?<\/w:pPr>/) || [""])[0];
    const html = inline(chunk, relMap);
    blocks.push({
      kind: "p",
      style: (props.match(/<w:pStyle w:val="([^"]+)"/) || [])[1] || null,
      numId: (props.match(/<w:numId w:val="([^"]+)"/) || [])[1] || null,
      ilvl: (props.match(/<w:ilvl w:val="([^"]+)"/) || [])[1] || "0",
      html,
      text: html.replace(/<[^>]+>/g, ""),
    });
    rx.lastIndex = end;
  }
  return { blocks, numbering };
}

function toHtml(blocks, numbering) {
  const out = [];
  let list = null;
  const closeList = () => {
    if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${i}</li>`).join("")}</${list.tag}>`);
    list = null;
  };

  for (const block of blocks) {
    if (block.kind === "table") {
      closeList();
      if (!block.rows.length) continue;
      const [head, ...rest] = block.rows;
      out.push(
        `<table><thead><tr>${head.map((c) => `<th>${c.replace(/<\/?strong>/g, "")}</th>`).join("")}</tr></thead>` +
        `<tbody>${rest.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`
      );
      continue;
    }

    const html = block.html.trim();
    if (block.numId) {
      if (!html) continue;
      const tag = ((numbering[block.numId] || {})[block.ilvl] || "bullet") === "bullet" ? "ul" : "ol";
      if (!list || list.tag !== tag) { closeList(); list = { tag, items: [] }; }
      list.items.push(html);
      continue;
    }

    closeList();
    if (!html) continue;
    const heading = /^Heading([1-9])$/.exec(block.style || "");
    if (heading) {
      // Word marks heading runs bold; the heading tag already carries that weight.
      const tag = `h${Math.min(Number(heading[1]), 3)}`;
      out.push(`<${tag}>${html.replace(/<\/?strong>/g, "")}</${tag}>`);
    } else {
      out.push(`<p>${html}</p>`);
    }
  }
  closeList();
  return out.join("");
}

// Title, excerpt and the SEO columns are stored as plain text, so the HTML
// escaping applied to the body has to be undone for them.
const plain = (html) => dec(html.replace(/<[^>]+>/g, "")).trim();

// Keep FAQ content out of the article body so the site can render it through
// its accessible accordion. This mirrors src/lib/faq-extract.ts but stays in
// plain JavaScript because this importer runs directly in Node.
function extractFaqs(html) {
  const blocks = [];
  const rx = /<(h[1-6]|p|ul|ol|table|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = rx.exec(html))) {
    blocks.push({ tag: match[1].toLowerCase(), start: match.index, end: rx.lastIndex, text: plain(match[2]) });
  }

  const markerIndex = blocks.reduce(
    (found, block, index) => ((/^h[1-6]$/.test(block.tag) || block.tag === "p") && /^faq'?s?$/i.test(block.text) ? index : found),
    -1
  );
  if (markerIndex === -1) return { content: html, faqs: [] };

  const marker = blocks[markerIndex];
  const markerLevel = marker.tag === "p" ? 2 : Number(marker.tag[1]);
  const faqs = [];
  let question = null;
  let answer = [];
  let end = html.length;
  const flush = () => {
    if (question && answer.length) faqs.push({ q: question, a: answer.join(" ") });
    question = null;
    answer = [];
  };

  for (let index = markerIndex + 1; index < blocks.length; index++) {
    const block = blocks[index];
    if (/^h[1-6]$/.test(block.tag)) {
      if (Number(block.tag[1]) <= markerLevel) {
        flush();
        end = block.start;
        break;
      }
      flush();
      question = block.text.replace(/^\s*\d+[.)]\s*/, "").trim();
    } else if (question && block.tag === "p" && block.text) {
      answer.push(block.text);
    }
  }
  flush();

  return faqs.length ? { content: (html.slice(0, marker.start) + html.slice(end)).trim(), faqs } : { content: html, faqs: [] };
}

function articleFrom(file) {
  const { blocks, numbering } = readDocx(path.join(SOURCE_DIR, file));

  // Every document opens with an SEO table, then the H1, then the article itself.
  const meta = {};
  const front = blocks.find((b) => b.kind === "table" && b.rows.some((r) => /Meta Title/i.test(r[0] || "")));
  if (front) for (const row of front.rows) {
    const label = plain(row[0] || "");
    if (label) meta[label] = plain(row[1] || "");
  }

  const start = blocks.findIndex((b) => b.kind === "p" && b.style === "Heading1");
  if (start === -1) throw new Error(`No Heading 1 found in ${file}`);
  // The article ends at the rule that separates it from the trailing FAQ JSON-LD block.
  let end = blocks.findIndex((b, i) => i > start && b.kind === "p" && /^[—–-]{2,}[\s—–-]*$/.test((b.text || "").trim()));
  if (end === -1) end = blocks.length;

  const title = plain(blocks[start].html);
  const description = meta["Meta Description"] || "";
  const slug = (meta["Suggested Slug"] || "").replace(/^\/+|\/+$/g, "").trim();
  if (!slug) throw new Error(`No suggested slug in ${file}`);

  const { content, faqs } = extractFaqs(toHtml(blocks.slice(start + 1, end), numbering));
  return {
    file,
    title,
    slug,
    excerpt: description,
    content,
    faqs,
    seoTitle: meta["Meta Title"] || title,
    seoDescription: description,
  };
}

/* ---------------------------------------------------------------------- import */

async function main() {
  const files = fs.readdirSync(SOURCE_DIR).filter((f) => f.endsWith(".docx") && !f.startsWith("~$")).sort();
  const articles = files.map(articleFrom);

  for (const a of articles) {
    console.log(`${a.file}\n  title:   ${a.title}\n  slug:    ${a.slug}\n  content: ${a.content.length} chars\n`);
  }
  if (DRY_RUN) return console.log("Dry run — nothing written.");

  const { Pool } = require(path.join(ROOT, "node_modules", "pg"));
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

  // The importer can run before a page request has had a chance to execute the
  // application's lazy schema migration.
  await pool.query("ALTER TABLE blogs ADD COLUMN IF NOT EXISTS faqs JSONB NOT NULL DEFAULT '[]'::jsonb");

  for (const a of articles) {
    const { rows } = await pool.query(
      `INSERT INTO blogs (title, slug, excerpt, content, category, tags, faqs, status, featured, seo_title, seo_description, published_at)
       VALUES ($1, $2, $3, $4, $5, '{}', $6, 'published', false, $7, $8, NOW())
       ON CONFLICT (slug) DO UPDATE SET
         title = EXCLUDED.title, excerpt = EXCLUDED.excerpt, content = EXCLUDED.content,
         category = EXCLUDED.category, faqs = EXCLUDED.faqs, status = EXCLUDED.status,
         seo_title = EXCLUDED.seo_title, seo_description = EXCLUDED.seo_description,
         published_at = COALESCE(blogs.published_at, NOW()), updated_at = NOW()
       RETURNING id, slug, (xmax = 0) AS inserted`,
      [a.title, a.slug, a.excerpt, a.content, CATEGORY, JSON.stringify(a.faqs), a.seoTitle, a.seoDescription]
    );
    console.log(`${rows[0].inserted ? "inserted" : "updated "}  ${rows[0].slug}`);
  }

  const { rows: all } = await pool.query("SELECT title, slug, status FROM blogs ORDER BY created_at");
  console.log(`\nblogs table now holds ${all.length} rows:`);
  for (const r of all) console.log(` - [${r.status}] ${r.title} (${r.slug})`);

  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
