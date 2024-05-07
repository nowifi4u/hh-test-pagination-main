import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const integerQueryParams: string[] = ['page']

export function middleware(req: NextRequest) {
  const url = new URL(req.nextUrl);

  let needRedirect = false;

  for (const param of integerQueryParams) {
    const searchParam = url.searchParams.get(param);
    if (searchParam == null) continue;
    const value = Number.parseInt(searchParam);
    if (isNaN(value)) {
      url.searchParams.delete(param);
      needRedirect = true;
      continue;
    } 
    if (String(value) !== searchParam) {
      url.searchParams.set(param, String(value));
      needRedirect = true;
    }
  }

  const pageParam = url.searchParams.get('page');
  if (pageParam != null) {
    const value = Number(pageParam);
    if (value < 1) {
      url.searchParams.set('page', '1');
      needRedirect = true;
    }
  }

  if (needRedirect) return NextResponse.redirect(url);
  return NextResponse.next();
}
