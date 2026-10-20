import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo';
import { siteConfig, buildWhatsAppLink } from '@/lib/config';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { buttonVariants } from '@/components/ui/Button';
import { ContactForm } from '@/components/contact/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildPageMetadata(params.locale, 'contact');
}

const SOCIALS = [
  { href: siteConfig.social.instagram, Icon: Instagram, label: 'Instagram' },
  { href: siteConfig.social.facebook, Icon: Facebook, label: 'Facebook' },
  { href: siteConfig.social.linkedin, Icon: Linkedin, label: 'LinkedIn' },
  { href: siteConfig.social.youtube, Icon: Youtube, label: 'YouTube' },
].filter((item) => Boolean(item.href));

export default async function ContactPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('contact');
  const tCommon = await getTranslations('common');


  return (
    <>
      <PageHero
        image="/hero/city-map-location-real-estate-contact.png"
        badge={t('hero.badge')}
        title={t('hero.title')}
        titleAccent={t('hero.titleAccent')}
        subtitle={t('hero.subtitle')}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          {/* İletişim bilgileri */}
          <Reveal className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-white">{t('info.title')}</h2>

            <ul className="mt-8 space-y-5">
              <li>
                <a href={siteConfig.phoneHref} className="flex items-start gap-4 group">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400 ring-1 ring-accent-500/20">
                    <Phone className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-slate-500">
                      {t('info.phone')}
                    </span>
                    <span className="text-white transition-colors group-hover:text-accent-300">
                      {siteConfig.phone}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-start gap-4 group">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400 ring-1 ring-accent-500/20">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-xs uppercase tracking-wide text-slate-500">
                      {t('info.email')}
                    </span>
                    <span className="text-white transition-colors group-hover:text-accent-300">
                      {siteConfig.email}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-400 ring-1 ring-accent-500/20">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wide text-slate-500">
                    {t('info.address')}
                  </span>
                  <span className="text-white">{siteConfig.address.full}</span>
                </span>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl border border-white/10 bg-ink-800/50 p-6">
              <h3 className="flex items-center gap-2 font-display font-semibold text-white">
                <Clock className="h-5 w-5 text-accent-400" aria-hidden />{t('info.hours')}
              </h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex flex-wrap justify-between gap-2"><dt className="text-slate-400">{t('info.weekdays')}</dt><dd>{siteConfig.hours.weekdays}</dd></div>
                <div className="flex flex-wrap justify-between gap-2"><dt className="text-slate-400">{t('info.saturday')}</dt><dd>{siteConfig.hours.saturday}</dd></div>
                <div className="flex flex-wrap justify-between gap-2"><dt className="text-slate-400">{t('info.sunday')}</dt><dd>{t('info.closed')}</dd></div>
              </dl>
            </div>
            {/* WhatsApp + sosyal */}
            <a
              href={buildWhatsAppLink(t('hero.badge'))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: 'whatsapp',
                size: 'lg',
                className: 'mt-6 w-full',
              })}
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              {tCommon('whatsapp')}
            </a>

            {SOCIALS.length > 0 && <div className="mt-6">
              <p className="mb-3 text-xs uppercase tracking-wide text-slate-500">
                {t('info.followUs')}
              </p>
              <div className="flex gap-2">
                {SOCIALS.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-accent-500/50 hover:bg-accent-500/10 hover:text-accent-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>}
          </Reveal>

          {/* Form */}
          <Reveal direction="left" className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-ink-800/50 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-white">{t('form.title')}</h2>
              <p className="mt-2 text-sm text-slate-400">{t('form.subtitle')}</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Harita placeholder */}
      <section className="pb-20">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex aspect-[16/6] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-ink-800/40 bg-grid-faint bg-[size:32px_32px] text-center transition-colors hover:border-accent-500/40"
          >
            <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-500/15 text-accent-400 transition-transform group-hover:scale-110">
              <MapPin className="h-6 w-6" aria-hidden />
            </span>
            <span className="font-medium text-white">{siteConfig.address.full}</span>
            <span className="text-xs text-slate-500">Google Maps</span>
          </a>
        </div>
      </section>
    </>
  );
}
