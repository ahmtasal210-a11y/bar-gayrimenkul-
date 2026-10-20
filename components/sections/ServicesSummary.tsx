import { useTranslations } from 'next-intl';
import { Home, KeyRound, LineChart, Handshake, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

const ITEMS = [
  { key: 'sales', Icon: Home },
  { key: 'rent', Icon: KeyRound },
  { key: 'buy', Icon: LineChart },
  { key: 'consulting', Icon: Handshake },
] as const;

export function ServicesSummary() {
  const t = useTranslations('home.services');

  return (
    <Section className="bg-ink-950/40" glow>
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ key, Icon }, i) => (
          <Reveal key={key} delay={i * 0.08}>
            <Link href="/services" className="block h-full">
              <SpotlightCard className="h-full p-7">
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-500/10 text-accent-400 ring-1 ring-accent-500/20">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-slate-600 transition-colors group-hover:text-accent-400" aria-hidden />
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-white">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {t(`items.${key}.desc`)}
                </p>
              </SpotlightCard>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
