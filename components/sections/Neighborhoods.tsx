 'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, ArrowUpRight, Search } from 'lucide-react';
import { neighborhoods, normalizeNeighborhood } from '@/data/neighborhoods';
import { buildWhatsAppLink } from '@/lib/config';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Neighborhoods() {
  const t = useTranslations('neighborhoods');
  const [query, setQuery] = useState('');
  const filtered = neighborhoods.filter((name) => normalizeNeighborhood(name).includes(normalizeNeighborhood(query.trim())));
  return (
    <Section className="border-y border-white/10 bg-ink-950/50">
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      <div className="mx-auto mt-10 max-w-xl">
        <label htmlFor="neighborhood-search" className="mb-2 block text-sm text-slate-300">{t('search')}</label>
        <div className="relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-accent-400" aria-hidden />
          <input id="neighborhood-search" value={query} onChange={(event) => setQuery(event.target.value)} type="search" className="h-12 w-full rounded-xl border border-white/15 bg-ink-800 pl-12 pr-4 text-white" />
        </div>
        <p role="status" className="mt-3 text-sm text-slate-400">{t('count', { count: filtered.length })}</p>
      </div>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((name) => <li key={name}>
          <a href={buildWhatsAppLink(t('message', { neighborhood: name }))} target="_blank" rel="noopener noreferrer" className="group flex h-full items-center gap-3 rounded-xl border border-white/10 bg-ink-800/60 px-4 py-4 text-sm text-slate-200 transition-colors hover:border-accent-500/50 hover:text-accent-300">
            <MapPin className="h-4 w-4 shrink-0 text-accent-400" aria-hidden />
            <span>{name}</span><ArrowUpRight className="ml-auto h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" aria-hidden />
          </a>
        </li>)}
      </ul>
      {filtered.length === 0 && <p className="py-8 text-center text-slate-400">{t('noResults')}</p>}
    </Section>
  );
}
