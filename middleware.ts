import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// next-intl middleware — dil tespiti, yönlendirme ve lokalize URL eşlemesi.
export default createMiddleware(routing);

export const config = {
  // API, _next, statik dosyalar ve dosya uzantılı yolları hariç tut.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
