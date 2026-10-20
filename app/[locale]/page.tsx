import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import { Neighborhoods } from '@/components/sections/Neighborhoods';
import { Hero } from '@/components/sections/Hero';
import { FeaturedListings } from '@/components/sections/FeaturedListings';
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
      <FeaturedListings />
      <Neighborhoods />
      <ServicesSummary />
      <ProcessSteps />
      <CtaBand />
    </>
  );
}
