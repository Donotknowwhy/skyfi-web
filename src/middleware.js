import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // For SEO purposes, you might want to use the Accept-Language header
  localeDetection: true
});




export const config = {
  // Match all pathnames except for
  // - ... files in the public folder
  // - ... files with an extension (e.g. favicon.ico)
  // - /qr routes (global routes without locale)
  matcher: ['/((?!api|_next|_vercel|qr|qrcode|getapp|vikki|jitsi-meeting|monitoring|.*\\..*).*)']
};
