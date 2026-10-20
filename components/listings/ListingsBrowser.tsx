'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchX, MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/lib/config';
import { buttonVariants } from '@/components/ui/Button';
import { ListingCard } from './ListingCard';
import { FilterBar, emptyFilters, type ListingFilters } from './FilterBar';
import type { Listing } from '@/types';

/** İstemci tarafı filtreleme + animasyonlu ilan grid'i. */
export function ListingsBrowser({
  listings,
  cities,
}: {
  listings: Listing[];
  cities: string[];
}) {
  const t = useTranslations();
  const [filters, setFilters] = useState<ListingFilters>(emptyFilters);

  // Oda seçenekleri veriden türetilir (— hariç).
  const roomOptions = useMemo(
    () => Array.from(new Set(listings.map((l) => l.rooms).filter((r) => r !== '—'))),
    [listings],
  );

  const filtered = useMemo(() => {
    const min = filters.minPrice ? Number(filters.minPrice) : 0;
    const max = filters.maxPrice ? Number(filters.maxPrice) : Infinity;
    const minArea = filters.minArea ? Number(filters.minArea) : 0;

    return listings.filter((l) => {
      if (filters.transaction !== 'all' && l.type !== filters.transaction) return false;
      if (filters.propertyType !== 'all' && l.propertyType !== filters.propertyType) return false;
      if (filters.city !== 'all' && l.location.city !== filters.city) return false;
      if (filters.neighborhood !== 'all' && l.location.neighborhood !== filters.neighborhood) return false;
      if (filters.rooms !== 'all' && l.rooms !== filters.rooms) return false;
      if (l.price < min || l.price > max) return false;
      if (l.area < minArea) return false;
      return true;
    });
  }, [listings, filters]);

  return (
    <div className="space-y-10">
      <FilterBar
        value={filters}
        onChange={setFilters}
        onClear={() => setFilters(emptyFilters)}
        cities={cities}
        rooms={roomOptions}
        resultCount={filtered.length}
      />

      {filtered.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((listing, i) => (
              <motion.div
                key={listing.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
              >
                <ListingCard listing={listing} priority={i < 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-ink-800/40 py-20 text-center">
          <SearchX className="h-12 w-12 text-slate-600" aria-hidden />
          <p className="mt-4 font-display text-lg font-semibold text-white">
            {t(listings.length === 0 ? 'listings.filters.emptyPortfolio' : 'listings.filters.noResults')}
          </p>
          <p className="mt-2 max-w-sm text-sm text-slate-400">
            {t('listings.filters.noResultsHint')}
          </p>
          <a
            href={buildWhatsAppLink(filters.neighborhood !== 'all' ? t('neighborhoods.message', { neighborhood: filters.neighborhood }) : t('whatsappFloat.defaultMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'whatsapp', size: 'md', className: 'mt-6' })}
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            {t('common.whatsapp')}
          </a>
        </div>
      )}
    </div>
  );
}
