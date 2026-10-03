/** Minutes to read a case study's prose, ignoring inline SVG and HTML markup. */
export function readTime(body: string | undefined): number {
  const text = (body ?? '')
    .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*`|_>-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}
