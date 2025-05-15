import sanitizeHtml from "sanitize-html";

export function sanitizeDescription(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ["b", "i", "em", "strong", "p", "ul", "li", "ol", "br"],
    allowedAttributes: {},
  });
}
