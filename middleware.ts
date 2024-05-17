import { createI18nMiddleware } from 'next-international/middleware'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import * as jose from 'jose'
const secret = process.env.AUTH_SECRET

const varifyToken = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(
      token as any,
      new TextEncoder().encode(secret as any)
    )
    return payload
  } catch (error) {
    return null
  }
}

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'bn'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewriteDefault',
})

const protectedRouts = ['/checkout', '/account', '/wishlist']
const loginRouts = ['/login', '/register']

export default async function middleware(request: NextRequest) {
  const res = I18nMiddleware(request)
  const currentPath = request.nextUrl.pathname

  const isProtected = protectedRouts.find((r) => currentPath.includes(r))
  const isPublic = loginRouts.find((r) => currentPath.includes(r))

  const coockiss = cookies()
  const auth = coockiss.get('authjs.session-token') as any

  if (isPublic && auth) {
    return NextResponse.redirect(new URL('/account', request.url))
  }

  if (isProtected && !(await varifyToken(auth?.value as any))) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  res.headers.set('origin', request.nextUrl.origin)
  return res
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
}
