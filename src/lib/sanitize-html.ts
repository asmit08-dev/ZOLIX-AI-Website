import "server-only";
import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = ["h1", "h2", "h3", "p", "br", "strong", "em", "b", "i", "ul", "ol", "li", "a", "img", "blockquote"];
const ALLOWED_ATTR = ["href", "src", "alt"];

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A") {
    node.setAttribute("rel", "noopener noreferrer");
    node.setAttribute("target", "_blank");
  }
});

export function sanitizeBlogContent(html: string) {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
}
