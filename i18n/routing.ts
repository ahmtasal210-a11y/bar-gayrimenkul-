import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

/**
 * Dil ve lokalize URL yapılandırması.
 * TR varsayılan ve öneksiz (/hakkimizda), EN /en öneki ile (/en/about).
 */
export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr',
  localePrefix: 'as-needed',
  // Her iç rota için dile göre URL karşılığı.
  pathnames: {
    '/': '/',
    '/about': { tr: '/hakkimizda', en: '/about' },
    '/services': { tr: '/hizmetler', en: '/services' },
    '/listings': { tr: '/ilanlar', en: '/listings' },
    '/listings/[slug]': { tr: '/ilanlar/[slug]', en: '/listings/[slug]' },
    '/contact': { tr: '/iletisim', en: '/contact' },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathnames = keyof typeof routing.pathnames;

// Lokale duyarlı navigasyon yardımcıları (Link, useRouter, redirect vb.)
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
