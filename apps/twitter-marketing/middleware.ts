// middleware.ts
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {parse} from 'cookie';
import { isProduction } from '@twihika/env';

export async function middleware(request: NextRequest) {
  if (
    request.headers.get('cookie') &&
    parse(request.headers.get('cookie')!)['__session']
  ) {
    return NextResponse.next();
  }
  const url = isProduction()
      ? `https://id.twi-hika.com/login?ref=${request.url.toString()}`
      : `http://localhost:4002/login?ref=${request.url.toString()}`;
      // apiには意味ないs
  return NextResponse.rewrite(url);
}
export const config = {
  matcher: ['/api/auth/:path*'],
};
