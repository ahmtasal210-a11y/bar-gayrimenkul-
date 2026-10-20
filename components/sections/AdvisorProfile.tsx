import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { siteConfig, buildWhatsAppLink } from '@/lib/config';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { buttonVariants } from '@/components/ui/Button';

export function AdvisorProfile() {
  const t = useTranslations('advisor');

  return (
    <Section id="danisman" className="border-y border-white/10 bg-ink-950/50">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-white/15 bg-ink-800">
            <Image
              src={siteConfig.advisor.photo}
              alt={t('photoAlt', { name: siteConfig.advisor.name })}
              fill
              sizes="(max-width: 768px) 90vw, 384px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-950/70 to-transparent" aria-hidden />
          </div>
        </Reveal>

        <Reveal className="min-w-0">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h2 className="heading mt-4 text-4xl sm:text-5xl">{siteConfig.advisor.name}</h2>
          <p className="mt-3 text-lg font-medium text-white">{t('role')}</p>
          <p className="mt-4 flex items-center gap-2 text-sm text-slate-400">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden />Karaman Merkez
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-slate-400">{t('description')}</p>
          <p className="mt-5 font-display text-xl text-slate-200">{t('slogan')}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={buildWhatsAppLink(t('message'))} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              <MessageCircle className="h-5 w-5" aria-hidden />{t('whatsapp')}<ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a href={siteConfig.phoneHref} className={buttonVariants({ variant: 'outline', size: 'lg' })}>
              <Phone className="h-4 w-4" aria-hidden />{siteConfig.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
