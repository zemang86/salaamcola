import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    // Match root path
    '/',
    // Match all pathnames except for
    // - API routes
    // - _next (Next.js internals)
    // - _vercel (Vercel internals)
    // - Static files (images, fonts, etc.)
    '/(en|ms|ar)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
}
