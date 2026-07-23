export type FaqItem = { q: string; a: string };

/**
 * Pulls a trailing "FAQs" section out of article HTML.
 *
 * Articles written in Google Docs end with a heading called FAQs followed by
 * numbered question headings and a paragraph of answer each. Those belong in the
 * structured `faqs` column so the page can render them as an accordion and emit
 * FAQPage structured data, rather than sitting in the body as ordinary prose.
 *
 * Deliberately dependency-free: the admin editor imports this in the browser and
 * the migration script requires it from Node.
 */

const BLOCK = /<(h[1-6]|p|ul|ol|table|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi;

const text = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/\s+/g, " ")
    .trim();

/** "1. What does FinOps stand for?" -> "What does FinOps stand for?" */
const unnumber = (value: string) => value.replace(/^\s*\d+[.)]\s*/, "").trim();

export function extractFaqs(html: string): { faqs: FaqItem[]; content: string } {
  const blocks: { tag: string; start: number; end: number; text: string }[] = [];
  BLOCK.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = BLOCK.exec(html))) {
    blocks.push({ tag: match[1].toLowerCase(), start: match.index, end: BLOCK.lastIndex, text: text(match[2]) });
  }

  // The FAQ label is usually a heading, but Word imports occasionally turn it
  // into a plain paragraph. Support both forms so a document's styling cannot
  // make its FAQ section fall back to ordinary article prose.
  const headingIndex = blocks.reduce(
    (found, block, i) =>
      ((/^h[1-6]$/.test(block.tag) || block.tag === "p") && /^faq'?s?$/i.test(block.text) ? i : found),
    -1
  );
  if (headingIndex === -1) return { faqs: [], content: html };

  const heading = blocks[headingIndex];
  // A paragraph FAQ marker is visually equivalent to a section heading. Its
  // questions are imported as h3s, so treating it as an h2 gives us the right
  // boundary when a following article section begins.
  const headingLevel = heading.tag === "p" ? 2 : Number(heading.tag[1]);
  const faqs: FaqItem[] = [];
  let question: string | null = null;
  let answer: string[] = [];
  let end = html.length;

  const flush = () => {
    if (question && answer.length) faqs.push({ q: question, a: answer.join(" ") });
    question = null;
    answer = [];
  };

  for (let i = headingIndex + 1; i < blocks.length; i++) {
    const block = blocks[i];
    if (/^h[1-6]$/.test(block.tag)) {
      // A heading at or above the FAQ heading's level ends the section.
      if (Number(block.tag[1]) <= headingLevel) {
        flush();
        end = block.start;
        break;
      }
      flush();
      question = unnumber(block.text);
    } else if (question && block.tag === "p" && block.text) {
      answer.push(block.text);
    }
  }
  flush();

  if (!faqs.length) return { faqs: [], content: html };
  return { faqs, content: (html.slice(0, heading.start) + html.slice(end)).trim() };
}
