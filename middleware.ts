import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Obtén las cookies
  const refresh = request.cookies.get('refresh');
  const access = request.cookies.get('access');

  // Si la ruta es protegida y no hay cookies, redirige al login
  if (!access || !refresh) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // try {
  //   jwt.verify(access);
  // } catch (err) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  // Permite el acceso si hay cookies o si la ruta no está protegida
  return NextResponse.next();
}

export const config = {
  matcher: [ '/dashboard/:path*', '/trade/:path*' ], 
}