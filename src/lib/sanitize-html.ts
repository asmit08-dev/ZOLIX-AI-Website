import "server-only";
import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = ["h1", "h2", "h3", "p", "br", "strong", "em", "b", "i", "ul", "ol", "li", "a", "img", "blockquote"];
const ALLOWED_ATTR = ["href", "src", "alt"];

export function sanitizeBlogContent(html: string) {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { a: ALLOWED_ATTR, img: ALLOWED_ATTR },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
    },
  });
}
