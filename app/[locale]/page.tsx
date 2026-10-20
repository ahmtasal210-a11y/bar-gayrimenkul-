import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { FeaturedListings } from '@/components/sections/FeaturedListings';
import { Hero } from '@/components/sections/Hero';
import { AdvisorProfile } from '@/components/sections/AdvisorProfile';
import { ListingsBrowser } from '@/components/listings/ListingsBrowser';
import { Container } from '@/components/ui/Container';
import { listings, getCities } from '@/data/listings';
import { ServicesSummary } from '@/components/sections/ServicesSummary';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { CtaBand } from '@/components/sections/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata(params.locale, 'home');
}

export default function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);

  return (
    <>
      <Hero />
      <section id="ilan-arama" className="py-16 sm:py-20">
        <Container>
          <ListingsBrowser listings={listings} cities={getCities()} />
        </Container>
      </section>
      <FeaturedListings />
      <FeaturedListings variant="opportunities" />
      <ServicesSummary />
      <AdvisorProfile />
      <ProcessSteps />
      <CtaBand />
    </>
  );
}
