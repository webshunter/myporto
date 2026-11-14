import { NextResponse } from 'next/server'

const PUBLIC_ADMIN_PATHS = ['/admin/login']

export function middleware(request) {
  const { pathname } = request.nextUrl

  if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
    return NextResponse.next()
  }

  const hasSession = Boolean(request.cookies.get('porto_admin')?.value)

  if (!hasSession) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
