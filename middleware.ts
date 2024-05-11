import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest } from 'next/server'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'bn'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewriteDefault',
})

export default function middleware(request: NextRequest) {
  const res = I18nMiddleware(request)
  res.headers.set('origin', request.nextUrl.origin)
  return res
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}
