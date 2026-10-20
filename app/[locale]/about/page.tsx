import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Target, Eye, ShieldCheck, GraduationCap, Zap, HeartHandshake } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { SafeImage } from '@/components/ui/SafeImage';
import { CtaBand } from '@/components/sections/CtaBand';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata(params.locale, 'about');
}

const VALUES = [
  { key: 'trust', Icon: ShieldCheck },
  { key: 'expertise', Icon: GraduationCap },
  { key: 'speed', Icon: Zap },
  { key: 'care', Icon: HeartHandshake },
] as const;


export default async function AboutPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('about');

  return (
    <>
      <PageHero
        image="/hero/modern-real-estate-office-interior.png"
        badge={t('hero.badge')}
        title={t('hero.title')}
        titleAccent={t('hero.titleAccent')}
        subtitle={t('hero.subtitle')}
      />

      {/* Hikaye */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-accent-400" aria-hidden />
              {t('story.eyebrow')}
            </span>
            <h2 className="heading mt-4 text-3xl sm:text-4xl">{t('story.title')}</h2>
            <p className="mt-6 leading-relaxed text-slate-400">{t('story.p1')}</p>
            <p className="mt-4 leading-relaxed text-slate-400">{t('story.p2')}</p>
          </Reveal>

          <Reveal direction="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <SafeImage
                src="/hero/luxury-residence-night-exterior.png"
                alt={t('story.title')}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Misyon / Vizyon */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal>
            <SpotlightCard className="h-full p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-500/10 text-accent-400 ring-1 ring-accent-500/20">
                <Target className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                {t('mission.title')}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-400">{t('mission.desc')}</p>
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.1}>
            <SpotlightCard className="h-full p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-500/10 text-accent-400 ring-1 ring-accent-500/20">
                <Eye className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-white">
                {t('vision.title')}
              </h3>
              <p className="mt-3 leading-relaxed text-slate-400">{t('vision.desc')}</p>
            </SpotlightCard>
          </Reveal>
        </div>
      </Section>

      {/* Değerler */}
      <Section className="bg-ink-950/40" glow>
        <SectionHeading eyebrow={t('values.eyebrow')} title={t('values.title')} />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(({ key, Icon }, i) => (
            <Reveal key={key} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-ink-800/60 p-7 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent-500/10 text-accent-400 ring-1 ring-accent-500/20">
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {t(`values.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {t(`values.items.${key}.desc`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* İstatistik bandı */}

      <CtaBand />
    </>
  );
}
