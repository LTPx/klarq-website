// The founders' portraits were uploaded to WordPress as 8 MB, ~5000x8000
// originals with no intermediate sizes, so the image optimizer spends ~2 s
// decoding them on every cold request. These web-sized copies are served
// from the site itself; any other filename (a future re-upload) falls
// through untouched.
const LIGHT_COPIES: Record<string, string> = {
  "LLUIS.jpg": "/images/founders/lluis.jpg",
  "KIM.jpg": "/images/founders/kim.jpg",
};

export function getFounderImageUrl(url: string): string {
  return LIGHT_COPIES[url.split("/").pop() || ""] || url;
}
