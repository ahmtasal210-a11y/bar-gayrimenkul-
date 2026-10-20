'use client';

import { useTranslations } from 'next-intl';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { buttonVariants } from '@/components/ui/Button';
import { neighborhoods } from '@/data/neighborhoods';
import type { PropertyType } from '@/types';

export interface ListingFilters {
  transaction: 'all' | 'sale' | 'rent';
  propertyType: 'all' | PropertyType;
  city: string;
  neighborhood: string;
  rooms: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
}

export const emptyFilters: ListingFilters = {
  transaction: 'all',
  propertyType: 'all',
  city: 'all',
  neighborhood: 'all',
  rooms: 'all',
  minPrice: '',
  maxPrice: '',
  minArea: '',
};

const PROPERTY_TYPES: (PropertyType | 'all')[] = ['all', 'apartment', 'villa', 'office', 'land', 'shop'];

interface FilterBarProps {
  value: ListingFilters;
  onChange: (next: ListingFilters) => void;
  onClear: () => void;
  cities: string[];
  rooms: string[];
  resultCount: number;
}

const fieldClass =
  'h-11 w-full rounded-xl border border-white/10 bg-ink-900/80 px-3 text-sm text-white outline-none transition-colors focus:border-accent-500/60 focus:ring-1 focus:ring-accent-500/40 [color-scheme:dark]';
const labelClass = 'mb-1.5 block text-xs font-medium text-slate-400';

export function FilterBar({ value, onChange, onClear, cities, rooms, resultCount }: FilterBarProps) {
  const t = useTranslations();
  const set = (patch: Partial<ListingFilters>) => onChange({ ...value, ...patch });

  return (
    <div className="rounded-2xl border border-white/10 bg-ink-800/50 p-5 backdrop-blur-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2 text-white">
        <SlidersHorizontal className="h-5 w-5 text-accent-400" aria-hidden />
        <h2 className="font-display text-lg font-semibold">{t('listings.filters.title')}</h2>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {/* İşlem tipi */}
        <div>
          <label className={labelClass} htmlFor="f-transaction">
            {t('listings.filters.transaction')}
          </label>
          <select
            id="f-transaction"
            className={fieldClass}
            value={value.transaction}
            onChange={(e) => set({ transaction: e.target.value as ListingFilters['transaction'] })}
          >
            <option value="all">{t('transaction.all')}</option>
            <option value="sale">{t('transaction.sale')}</option>
            <option value="rent">{t('transaction.rent')}</option>
          </select>
        </div>

        {/* Mülk tipi */}
        <div>
          <label className={labelClass} htmlFor="f-type">
            {t('listings.filters.propertyType')}
          </label>
          <select
            id="f-type"
            className={fieldClass}
            value={value.propertyType}
            onChange={(e) => set({ propertyType: e.target.value as ListingFilters['propertyType'] })}
          >
            {PROPERTY_TYPES.map((pt) => (
              <option key={pt} value={pt}>
                {t(`propertyTypes.${pt}`)}
              </option>
            ))}
          </select>
        </div>

        {/* İl */}
        <div>
          <label className={labelClass} htmlFor="f-city">
            {t('listings.filters.city')}
          </label>
          <select
            id="f-city"
            className={fieldClass}
            value={value.city}
            onChange={(e) => set({ city: e.target.value })}
          >
            <option value="all">{t('listings.filters.allCities')}</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Oda sayısı */}
        <div>
          <label className={labelClass} htmlFor="f-rooms">
            {t('listings.filters.rooms')}
          </label>
          <select
            id="f-rooms"
            className={fieldClass}
            value={value.rooms}
            onChange={(e) => set({ rooms: e.target.value })}
          >
            <option value="all">{t('listings.filters.allRooms')}</option>
            {rooms.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="f-neighborhood">{t('listings.filters.neighborhood')}</label>
          <select id="f-neighborhood" className={fieldClass} value={value.neighborhood} onChange={(event) => set({ neighborhood: event.target.value })}>
            <option value="all">{t('listings.filters.allNeighborhoods')}</option>
            {neighborhoods.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>
        {/* Min fiyat */}
        <div>
          <label className={labelClass} htmlFor="f-minprice">
            {t('listings.filters.minPrice')}
          </label>
          <input
            id="f-minprice"
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="0"
            className={fieldClass}
            value={value.minPrice}
            onChange={(e) => set({ minPrice: e.target.value })}
          />
        </div>

        {/* Max fiyat */}
        <div>
          <label className={labelClass} htmlFor="f-maxprice">
            {t('listings.filters.maxPrice')}
          </label>
          <input
            id="f-maxprice"
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="∞"
            className={fieldClass}
            value={value.maxPrice}
            onChange={(e) => set({ maxPrice: e.target.value })}
          />
        </div>

        {/* Min m² */}
        <div>
          <label className={labelClass} htmlFor="f-minarea">
            {t('listings.filters.minArea')}
          </label>
          <input
            id="f-minarea"
            type="number"
            inputMode="numeric"
            min={0}
            placeholder="0"
            className={fieldClass}
            value={value.minArea}
            onChange={(e) => set({ minArea: e.target.value })}
          />
        </div>

        {/* Temizle */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={onClear}
            className={buttonVariants({ variant: 'secondary', size: 'md', className: 'w-full' })}
          >
            <X className="h-4 w-4" aria-hidden />
            {t('listings.filters.clear')}
          </button>
        </div>
      </div>

      {/* Sonuç sayısı */}
      <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
        <Search className="h-4 w-4 text-accent-400" aria-hidden />
        {t('listings.filters.resultsCount', { count: resultCount })}
      </div>
    </div>
  );
}
