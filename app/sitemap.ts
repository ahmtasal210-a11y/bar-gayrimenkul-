import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { listings } from '@/data/listings';

/**
 * Çok dilli sitemap — her sayfa için TR/EN alternatif (hreflang) bağlantılarıyla.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;

  // Statik sayfa eşlemeleri: [tr yolu, en yolu]
  const staticPages: { tr: string; en: string; priority: number }[] = [
    { tr: '', en: '/en', priority: 1 },
    { tr: '/ilanlar', en: '/en/listings', priority: 0.9 },
    { tr: '/hizmetler', en: '/en/services', priority: 0.8 },
    { tr: '/hakkimizda', en: '/en/about', priority: 0.7 },
    { tr: '/iletisim', en: '/en/contact', priority: 0.7 },
  ];

  const lastModified = new Date('2026-10-21');

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((p) => ({
    url: `${base}${p.tr || '/'}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: p.priority,
    alternates: {
      languages: {
        tr: `${base}${p.tr || '/'}`,
        en: `${base}${p.en}`,
      },
    },
  }));

  const listingEntries: MetadataRoute.Sitemap = listings.map((l) => ({
    url: `${base}/ilanlar/${l.slug}`,
    lastModified: new Date(l.createdAt),
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: {
      languages: {
        tr: `${base}/ilanlar/${l.slug}`,
        en: `${base}/en/listings/${l.slug}`,
      },
    },
  }));

  return [...staticEntries, ...listingEntries];
}
