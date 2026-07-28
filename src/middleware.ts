import createMiddleware from "next-intl/middleware";
import { locales } from "./config";

export default createMiddleware({
  locales: ['en', 'es'],
  defaultLocale: 'es',
});

export const config = {
  // Was ['/', '/(es|en)/:path*'] — any bare, non-locale-prefixed path (old
  // WordPress permalinks, typos, etc.) fell through this matcher entirely
  // and hit Next's [locale] catch-all with an invalid locale value, which
  // crashed with a raw 500 instead of a clean redirect/404. Widening this to
  // next-intl's standard catch-all (everything except API routes, Next
  // internals, and static files) lets next-intl's own middleware redirect
  // them to a locale-prefixed URL — the same working path every real page
  // already goes through — before Next's routing ever sees them.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
