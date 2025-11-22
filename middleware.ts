import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const authCookie = request.cookies.get('void-auth-storage');
  
  let isAuthenticated = false;
  
  if (authCookie?.value) {
    try {
      const authData = JSON.parse(decodeURIComponent(authCookie.value));
      isAuthenticated = authData.state?.isAuthenticated === true;
    } catch (e) {
      console.error('Failed to parse auth cookie:', e);
      isAuthenticated = false;
    }
  }

  const protectedPaths = ['/home', '/statistic', '/wallet', '/categories'];
  const isProtectedPath = protectedPaths.some(p => path.startsWith(p));

  const publicPaths = ['/login', '/signup'];
  const isPublicPath = publicPaths.some(p => path.startsWith(p));

  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icons).*)',
  ],
};