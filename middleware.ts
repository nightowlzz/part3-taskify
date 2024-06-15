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

// protect route

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export const middleware = (request: NextRequest) => {
//   const protectedRoutes = ['/dashboard', '/profile', '/settings']

//   const { pathname } = request.nextUrl

//   const isProtectedRoute = protectedRoutes.includes(pathname)

//   if (isProtectedRoute && !request.cookies.has('accessToken')) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }

//   const cookie = request.cookies.get('accessToken')
//   console.log(cookie)

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     '/dashboard',
//     '/profile',
//     '/settings',
//   ],
// }
