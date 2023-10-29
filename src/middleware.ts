// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authRoutes = ['/acceso/inicio-de-sesion', '/acceso/crear-cuenta', '/acceso/recuperar-credenciales']

export default function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value
    let isLoggedInCookie = req.cookies.get('isLoggedIn')?.value || 'false'
    let isLoggedIn = isLoggedInCookie === 'false' ? false : true

    if (!token) {
        req.cookies.set('isLoggedIn', 'false')
        isLoggedInCookie = 'false'
        isLoggedIn = false
    }

    if (!isLoggedIn && !authRoutes.includes(req.nextUrl.pathname) || !token && !authRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/acceso/inicio-de-sesion', req.url))
    } else if (isLoggedIn && authRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
        * Match all request paths except for the ones starting with:
        * - api (API routes)
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico (favicon file)
        */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}