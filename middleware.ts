import { NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
  const publicRoutes = ['/', '/sign-in', '/sign-up']
  const { pathname } = request.nextUrl
  const hasAccessToken = request.cookies.has('accessToken')

  const isPublicRoute = publicRoutes.includes(pathname)

  if (hasAccessToken && isPublicRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (!hasAccessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
