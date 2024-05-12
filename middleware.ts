import { createI18nMiddleware } from 'next-international/middleware'
import { NextRequest } from 'next/server'
import { auth } from './src/lib/auth'
import { cookies } from 'next/headers'

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'bn'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewriteDefault',
})

export default async function middleware(request: NextRequest) {
  const res = I18nMiddleware(request)
  const currentPath = request.nextUrl.pathname
 
  const coockiss = cookies()
  const auth =  coockiss.get('authjs.session-token')
  
  res.headers.set('origin', request.nextUrl.origin)
  return res
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}
