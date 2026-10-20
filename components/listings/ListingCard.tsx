import { useLocale, useTranslations } from 'next-intl';
import { BedDouble, Bath, Maximize, MapPin } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { SafeImage } from '@/components/ui/SafeImage';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatArea } from '@/lib/utils';
import type { Listing } from '@/types';
import type { Locale } from '@/i18n/routing';

/** Tek ilan kartı — grid ve öne çıkanlarda kullanılır. */
export function ListingCard({ listing, priority = false }: { listing: Listing; priority?: boolean }) {
  const locale = useLocale() as Locale;
  const t = useTranslations();

  const isRent = listing.type === 'rent';

  return (
    <Link
      href={{ pathname: '/listings/[slug]', params: { slug: listing.slug } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-500/40 hover:shadow-glow"
    >
      {/* Görsel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <SafeImage
          src={listing.images[0]}
          alt={listing.title[locale]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />

        {/* Rozetler */}
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge tone={isRent ? 'rent' : 'sale'}>{t(`transaction.${listing.type}`)}</Badge>
          <Badge tone="neutral">{t(`propertyTypes.${listing.propertyType}`)}</Badge>
        </div>

        {/* Fiyat */}
        <div className="absolute bottom-3 left-3">
          <p className="font-display text-xl font-bold text-white drop-shadow">
            {formatPrice(listing.price, locale)}
            {isRent && <span className="ml-1 text-sm font-medium text-slate-300">{t('common.perMonth')}</span>}
          </p>
        </div>
      </div>

      {/* Gövde */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-display text-base font-semibold text-white transition-colors group-hover:text-accent-300">
          {listing.title[locale]}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">
          <MapPin className="h-4 w-4 text-accent-400" aria-hidden />
          {listing.location.district}, {listing.location.city}
        </p>

        {/* Özellik ikonları */}
        <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-4 text-sm text-slate-300">
          {listing.rooms !== '—' && (
            <span className="flex items-center gap-1.5" title={t('listingMeta.rooms')}>
              <BedDouble className="h-4 w-4 text-slate-500" aria-hidden />
              {listing.rooms}
            </span>
          )}
          {listing.bathrooms > 0 && (
            <span className="flex items-center gap-1.5" title={t('listingMeta.bathrooms')}>
              <Bath className="h-4 w-4 text-slate-500" aria-hidden />
              {listing.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1.5" title={t('listingMeta.area')}>
            <Maximize className="h-4 w-4 text-slate-500" aria-hidden />
            {formatArea(listing.area, locale)}
          </span>
        </div>
      </div>
    </Link>
  );
}
