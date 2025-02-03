import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const protectedRoutes = ['/profile', '/deposit']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)

  const cookieStore = await cookies()
  const hasAccessToken = cookieStore.has('AccessToken')
  const hasRefreshToken = cookieStore.has('RefreshToken')

  cookieStore.set('hasAccessToken', hasAccessToken ? '1' : '0')
  cookieStore.set('hasRefreshToken', hasRefreshToken ? '1' : '0')

  // redirect from protected routes if haven't accessToken
  if (isProtectedRoute && !hasAccessToken) {
    return NextResponse.redirect(new URL(`/auth-required?redirect_url=${path}`, req.nextUrl))
  }

  // redirect from /auth-required if have accessToken
  if (path === '/auth-required' && hasAccessToken) {
    const redirectURL = req.nextUrl.searchParams.get('redirect_url')

    if (redirectURL) {
      return NextResponse.redirect(new URL(redirectURL, req.nextUrl))
    } else {
      return NextResponse.redirect(new URL('/', req.nextUrl))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/auth-required', '/profile', '/deposit']
}
