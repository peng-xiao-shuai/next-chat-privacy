import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { languages, FALLBACK_LNG } from '@/locales/i18n';
import { COOKIE_NAME } from './locales/settings';

acceptLanguage.languages(languages);

export const config = {
  matcher: '/',
};

export function middleware(req: NextRequest) {
  console.log(req.nextUrl.pathname, 'req.nextUrl.pathname');

  let lng;
  if (req.cookies.has(COOKIE_NAME))
    lng = acceptLanguage.get(req.cookies.get(COOKIE_NAME)?.value);
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = FALLBACK_LNG;

  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    console.log('重定向到', `/${lng}${req.nextUrl.pathname}`);

    return NextResponse.rewrite(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') || '');
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(COOKIE_NAME, lngInReferer);
    return response;
  }

  return NextResponse.rewrite(
    new URL(`/${lng || 'en-US'}${req.nextUrl.pathname}`, req.url)
  );
}
