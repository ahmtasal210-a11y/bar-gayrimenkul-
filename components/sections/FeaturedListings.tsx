import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getFeaturedListings } from '@/data/listings';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ListingCard } from '@/components/listings/ListingCard';
import { buttonVariants } from '@/components/ui/Button';

export function FeaturedListings() {
  const t = useTranslations('home.featured');
  const tCommon = useTranslations('common');
  const featured = getFeaturedListings(6);

  return (
    <Section>
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      {featured.length === 0 && <p className="mx-auto mt-10 max-w-xl text-center leading-relaxed text-slate-400">{t('empty')}</p>}
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((listing, i) => (
          <Reveal key={listing.id} delay={(i % 3) * 0.1}>
            <ListingCard listing={listing} priority={i < 3} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12 flex justify-center">
        <Link href="/listings" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
          {tCommon('viewAllListings')}
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </Reveal>
    </Section>
  );
}
