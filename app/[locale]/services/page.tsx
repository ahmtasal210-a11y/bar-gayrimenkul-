import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Home,
  KeyRound,
  LineChart,
  Handshake,
  CheckCircle2,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { CtaBand } from '@/components/sections/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata(params.locale, 'services');
}

const SERVICES = [
  { key: 'residentialSale', Icon: Home },
  { key: 'rental', Icon: KeyRound },
  { key: 'buy', Icon: LineChart },
  { key: 'consulting', Icon: Handshake },
] as const;

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('services');

  return (
    <>
      <PageHero
        image="/hero/premium-architecture-detail-services.png"
        badge={t('hero.badge')}
        title={t('hero.title')}
        titleAccent={t('hero.titleAccent')}
        subtitle={t('hero.subtitle')}
      />

      <Section>
        <SectionHeading eyebrow={t('intro.eyebrow')} title={t('intro.title')} />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={(i % 3) * 0.1}>
              <SpotlightCard className="flex h-full flex-col p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-500/10 text-accent-400 ring-1 ring-accent-500/20">
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-white">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-slate-400">
                  {t(`items.${key}.desc`)}
                </p>
                <p className="mt-5 flex items-start gap-2 rounded-xl border border-accent-500/15 bg-accent-500/5 p-4 text-sm leading-relaxed text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                  {t(`items.${key}.why`)}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
