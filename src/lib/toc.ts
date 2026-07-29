export type TocItem = { id: string; text: string; level: 2 | 3 };

const HEADING_RE = /<(h[23])((?:\s+[^>]*)?)>([\s\S]*?)<\/\1>/gi;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "section";

export function extractToc(html: string): { html: string; items: TocItem[] } {
  const items: TocItem[] = [];
  const seen = new Map<string, number>();

  const outputHtml = html.replace(HEADING_RE, (match, tag: string, attrs: string, inner: string) => {
    const text = inner.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    if (!text) return match;

    const base = slugify(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;

    items.push({ id, text, level: tag.toLowerCase() === "h2" ? 2 : 3 });

    const cleanedAttrs = attrs.replace(/\s+id=(["']).*?\1/i, "");
    return `<${tag}${cleanedAttrs} id="${id}">${inner}</${tag}>`;
  });

  return { html: outputHtml, items };
}
