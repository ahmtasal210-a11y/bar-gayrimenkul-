import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Layers,
  CalendarClock,
  Hash,
  Phone,
  MessageCircle,
  Check,
  Map as MapIcon,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { listings, getListingBySlug } from '@/data/listings';
import { siteConfig, buildWhatsAppLink } from '@/lib/config';
import { formatPrice, formatArea } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import { ListingGallery } from '@/components/listings/ListingGallery';
import { ListingCard } from '@/components/listings/ListingCard';
import { ListingJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import type { Locale } from '@/i18n/routing';

// Tüm dil + slug kombinasyonları için statik üretim.
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    listings.map((l) => ({ locale, slug: l.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const listing = getListingBySlug(params.slug);
  if (!listing) return {};
  const locale = params.locale as Locale;
  const title = `${listing.title[locale]} | ${siteConfig.name}`;
  const description = listing.description[locale].slice(0, 160);
  const path =
    locale === 'tr' ? `/ilanlar/${listing.slug}` : `/en/listings/${listing.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        tr: `/ilanlar/${listing.slug}`,
        en: `/en/listings/${listing.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${path}`,
      images: listing.images.map((img) => ({ url: img, width: 1200, height: 800 })),
    },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(params.locale);
  const locale = params.locale as Locale;
  const listing = getListingBySlug(params.slug);

  if (!listing) notFound();

  const t = await getTranslations();
  const isRent = listing.type === 'rent';

  // Özellik özet satırları.
  const specs = [
    listing.rooms !== '—' && { Icon: BedDouble, label: t('listingMeta.rooms'), value: listing.rooms },
    (listing.bathrooms ?? 0) > 0 && {
      Icon: Bath,
      label: t('listingMeta.bathrooms'),
      value: String(listing.bathrooms),
    },
    { Icon: Maximize, label: t(listing.areaType === 'net' ? 'listingMeta.netArea' : 'listingMeta.area'), value: formatArea(listing.area, locale) },
    listing.floor && { Icon: Layers, label: t('listingMeta.floor'), value: listing.floor },
    listing.buildingAge !== undefined && {
      Icon: CalendarClock,
      label: t('listingMeta.buildingAge'),
      value:
        listing.buildingAge === 0
          ? t('listingMeta.ageNew')
          : `${listing.buildingAge} ${t('listingMeta.yearsOld')}`,
    },
    { Icon: Hash, label: t('common.reference'), value: listing.ref },
  ].filter(Boolean) as { Icon: typeof Hash; label: string; value: string }[];

  // İlana özel WhatsApp mesajı.
  const waMessage = t('listingDetail.whatsappMessage', {
    title: listing.title[locale],
    ref: listing.ref,
  });

  // Benzer ilanlar (aynı işlem tipi, kendisi hariç).
  const related = listings.filter((l) => l.id !== listing.id && l.type === listing.type).slice(0, 3);

  const mapsQuery = encodeURIComponent(
    [listing.location.neighborhood, listing.location.district, listing.location.city, 'Türkiye'].filter(Boolean).join(', '),
  );

  return (
    <>
      <ListingJsonLd listing={listing} locale={locale} />
      <BreadcrumbJsonLd
        items={[
          { name: siteConfig.name, url: siteConfig.url },
          { name: t('nav.listings'), url: `${siteConfig.url}/ilanlar` },
          { name: listing.title[locale], url: `${siteConfig.url}/ilanlar/${listing.slug}` },
        ]}
      />

      <div className="pt-24 sm:pt-28">
        <Container>
          {/* Geri dön */}
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-accent-300"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            {t('common.backToListings')}
          </Link>

          {/* Başlık */}
          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge tone={isRent ? 'rent' : 'sale'}>{t(`transaction.${listing.type}`)}</Badge>
                <Badge tone="neutral">{t(`propertyTypes.${listing.propertyType}`)}</Badge>
              </div>
              <h1 className="heading mt-4 text-3xl text-balance sm:text-4xl">
                {listing.title[locale]}
              </h1>
              <p className="mt-3 flex items-center gap-1.5 text-slate-400">
                <MapPin className="h-4 w-4 text-accent-400" aria-hidden />
                {[listing.location.neighborhood, listing.location.district, listing.location.city].filter(Boolean).join(', ')}
              </p>
            </div>
            <div className="shrink-0">
              <p className="font-display text-3xl font-bold text-accent-400 sm:text-4xl">
                {formatPrice(listing.price, locale)}
                {isRent && (
                  <span className="ml-1 text-base font-medium text-slate-400">
                    {t('common.perMonth')}
                  </span>
                )}
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* İçerik */}
      <Container className="mt-10 grid gap-10 pb-20 lg:grid-cols-3 lg:gap-12">
        {/* Sol kolon */}
        <div className="space-y-12 lg:col-span-2">
          <ListingGallery images={listing.images} alt={listing.title[locale]} />

          {/* Genel bilgiler */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white">
              {t('listingDetail.overview')}
            </h2>
            <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {specs.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-ink-800/50 p-4"
                >
                  <dt className="flex items-center gap-2 text-xs text-slate-500">
                    <Icon className="h-4 w-4 text-accent-400" aria-hidden />
                    {label}
                  </dt>
                  <dd className="mt-1.5 font-display text-base font-semibold text-white">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Açıklama */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white">
              {t('listingDetail.description')}
            </h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-slate-400">
              {listing.description[locale]}
            </p>
          </section>

          {/* Özellikler */}
          {listing.features.length > 0 && (
            <section>
              <h2 className="font-display text-xl font-semibold text-white">
                {t('listingDetail.features')}
              </h2>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {listing.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-ink-800/50 px-4 py-3 text-sm text-slate-300"
                  >
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500/15 text-accent-400">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    {t(`listingFeatures.${f}`)}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Konum / harita placeholder */}
          <section>
            <h2 className="font-display text-xl font-semibold text-white">
              {t('listingDetail.location')}
            </h2>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 flex aspect-[16/7] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-ink-800/40 bg-grid-faint bg-[size:32px_32px] text-center transition-colors hover:border-accent-500/40"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-500/15 text-accent-400 transition-transform group-hover:scale-110">
                <MapIcon className="h-6 w-6" aria-hidden />
              </span>
              <span className="font-medium text-white">
                {listing.location.district}, {listing.location.city}
              </span>
              <span className="max-w-xs px-4 text-xs text-slate-500">
                {t('listingDetail.mapPlaceholder')}
              </span>
            </a>
          </section>
        </div>

        {/* Sağ kolon — yapışkan iletişim kartı */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-white/10 bg-ink-800/60 p-6 shadow-card">
              <h2 className="font-display text-lg font-semibold text-white">
                {t('listingDetail.interestedTitle')}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {t('listingDetail.interestedSubtitle')}
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href={buildWhatsAppLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: 'whatsapp', size: 'lg', className: 'w-full' })}
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  {t('listingDetail.askWhatsapp')}
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className={buttonVariants({ variant: 'secondary', size: 'lg', className: 'w-full' })}
                >
                  <Phone className="h-5 w-5" aria-hidden />
                  {t('listingDetail.callAgent')}
                </a>
              </div>

              {/* Mini iletişim bilgisi */}
              <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm text-slate-400">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent-400" aria-hidden />
                  {siteConfig.phone}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-accent-400" aria-hidden />
                  {siteConfig.address.full}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </Container>

      {/* Benzer ilanlar */}
      {related.length > 0 && (
        <section className="border-t border-white/10 bg-ink-950/40 py-20">
          <Container>
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {t('listingDetail.relatedTitle')}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
