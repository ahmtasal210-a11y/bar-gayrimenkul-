import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { listings, getCities } from '@/data/listings';
import { PageHero } from '@/components/sections/PageHero';
import { Container } from '@/components/ui/Container';
import { ListingsBrowser } from '@/components/listings/ListingsBrowser';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata(params.locale, 'listings');
}

export default async function ListingsPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('listings');
  const cities = getCities();

  return (
    <>
      <PageHero
        image="/hero/luxury-residence-night-exterior.png"
        badge={t('hero.badge')}
        title={t('hero.title')}
        titleAccent={t('hero.titleAccent')}
        subtitle={t('hero.subtitle')}
      />

      <section className="py-16 sm:py-20">
        <Container>
          <ListingsBrowser listings={listings} cities={cities} />
        </Container>
      </section>
    </>
  );
}
