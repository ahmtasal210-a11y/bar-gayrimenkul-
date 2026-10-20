import { useTranslations } from 'next-intl';
import { ArrowRight, Building2, BadgePercent } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getFeaturedListings, getOpportunityListings } from '@/data/listings';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ListingCard } from '@/components/listings/ListingCard';
import { buttonVariants } from '@/components/ui/Button';

export function FeaturedListings({ variant = 'featured' }: { variant?: 'featured' | 'opportunities' }) {
  const t = useTranslations(variant === 'featured' ? 'home.featured' : 'home.opportunities');
  const tCommon = useTranslations('common');
  const selected = variant === 'featured' ? getFeaturedListings(6) : getOpportunityListings(6);
  const Icon = variant === 'featured' ? Building2 : BadgePercent;

  return (
    <Section id={variant === 'featured' ? 'one-cikanlar' : 'firsat-yerler'} className={variant === 'opportunities' ? 'border-y border-white/10 bg-ink-950/50' : undefined}>
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      {selected.length === 0 ? (
        <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center rounded-2xl border border-dashed border-white/15 bg-ink-800/40 px-6 py-12 text-center">
          <Icon className="h-10 w-10 text-slate-400" aria-hidden />
          <p className="mt-5 max-w-xl leading-relaxed text-slate-400">{t('empty')}</p>
        </div>
      ) : <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {selected.map((listing, i) => (
          <Reveal key={listing.id} delay={(i % 3) * 0.1}>
            <ListingCard listing={listing} priority={i < 3} />
          </Reveal>
        ))}
      </div>}

      <Reveal className="mt-12 flex justify-center">
        <Link href="/listings" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
          {tCommon('viewAllListings')}
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </Reveal>
    </Section>
  );
}
