import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from './config';

type SeoPage = 'home' | 'about' | 'services' | 'listings' | 'contact';

/** Bir sayfanın TR/EN lokalize URL yollarını döndürür (canonical + hreflang). */
const PATHS: Record<SeoPage, { tr: string; en: string }> = {
  home: { tr: '/', en: '/en' },
  about: { tr: '/hakkimizda', en: '/en/about' },
  services: { tr: '/hizmetler', en: '/en/services' },
  listings: { tr: '/ilanlar', en: '/en/listings' },
  contact: { tr: '/iletisim', en: '/en/contact' },
};

/**
 * Sayfa bazlı metadata üretir — title, description, canonical, hreflang ve OG.
 */
export async function buildPageMetadata(locale: string, page: SeoPage): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo' });
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const paths = PATHS[page];
  const canonical = locale === 'tr' ? paths.tr : paths.en;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        tr: paths.tr,
        en: paths.en,
        'x-default': paths.tr,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${canonical}`,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      images: [siteConfig.twitterImage],
    },
  };
}
