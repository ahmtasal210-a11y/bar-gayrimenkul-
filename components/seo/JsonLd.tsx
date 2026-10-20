import { siteConfig } from '@/lib/config';
import type { Listing } from '@/types';

/** Güvenli JSON-LD script enjeksiyonu. */
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // İçerik geliştirici tarafından üretildiği için güvenlidir.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

/** RealEstateAgent schema — kurumsal kimlik (tüm sayfalarda). */
export function OrganizationJsonLd({ locale }: { locale: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    areaServed: { '@type': 'AdministrativeArea', name: 'Karaman Merkez' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      postalCode: siteConfig.address.zip,
      addressLocality: siteConfig.address.district,
      addressRegion: siteConfig.address.city,
      addressCountry: siteConfig.address.country,
    },
    hasMap: siteConfig.mapsUrl,
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '18:35' },
    ],
    sameAs: Object.values(siteConfig.social).filter(Boolean),
    inLanguage: locale,
  };

  return <JsonLdScript data={data} />;
}

/** Tek ilan için yapılandırılmış veri (ilan detay sayfası). */
export function ListingJsonLd({ listing, locale }: { listing: Listing; locale: 'tr' | 'en' }) {
  const url = `${siteConfig.url}${locale === 'tr' ? '/ilanlar' : '/en/listings'}/${listing.slug}`;

  const data = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Residence'],
    name: listing.title[locale],
    description: listing.description[locale],
    sku: listing.ref,
    url,
    image: listing.images.map((img) => `${siteConfig.url}${img}`),
    category: listing.propertyType,
    brand: { '@type': 'Brand', name: siteConfig.name },
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
      url,
      businessFunction:
        listing.type === 'rent'
          ? 'http://purl.org/goodrelations/v1#LeaseOut'
          : 'http://purl.org/goodrelations/v1#Sell',
      seller: { '@id': `${siteConfig.url}/#organization` },
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'area', value: listing.area, unitCode: 'MTK' },
      { '@type': 'PropertyValue', name: 'rooms', value: listing.rooms },
      { '@type': 'PropertyValue', name: 'bathrooms', value: listing.bathrooms },
    ],
  };

  return <JsonLdScript data={data} />;
}

/** Breadcrumb yapılandırılmış verisi. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLdScript data={data} />;
}
