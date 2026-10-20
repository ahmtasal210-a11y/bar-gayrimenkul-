import { useTranslations } from 'next-intl';
import { Search, Users, KeyRound } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

const STEPS = [
  { key: 'discover', Icon: Search },
  { key: 'tour', Icon: Users },
  { key: 'keys', Icon: KeyRound },
] as const;

export function ProcessSteps() {
  const t = useTranslations('home.process');

  return (
    <Section>
      <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <div className="relative mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Bağlantı çizgisi (masaüstü) */}
        <div
          className="absolute left-[16.6%] right-[16.6%] top-9 hidden h-px bg-gradient-to-r from-transparent via-accent-500/40 to-transparent md:block"
          aria-hidden
        />

        {STEPS.map(({ key, Icon }, i) => (
          <Reveal key={key} delay={i * 0.12} className="relative text-center">
            <div className="relative mx-auto grid h-20 w-20 place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-ink-800 text-accent-400 shadow-card">
                <Icon className="h-8 w-8" aria-hidden />
              </span>
              <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-accent-500 font-display text-sm font-bold text-ink-950">
                {i + 1}
              </span>
            </div>
            <h3 className="mt-6 font-display text-xl font-semibold text-white">
              {t(`steps.${key}.title`)}
            </h3>
            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-slate-400">
              {t(`steps.${key}.desc`)}
            </p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
