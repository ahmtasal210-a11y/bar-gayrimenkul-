import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
} from 'lucide-react';
import { Link } from '@/i18n/routing';
import { siteConfig } from '@/lib/config';
import { Container } from '@/components/ui/Container';
import type { NavItem } from '@/types';

const QUICK: NavItem[] = [
  { href: '/', labelKey: 'home' },
  { href: '/listings', labelKey: 'listings' },
  { href: '/services', labelKey: 'services' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
];

// X (Twitter) için inline ikon.
function XGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS = [
  { href: siteConfig.social.instagram, Icon: Instagram, label: 'Instagram' },
  { href: siteConfig.social.facebook, Icon: Facebook, label: 'Facebook' },
  { href: siteConfig.social.linkedin, Icon: Linkedin, label: 'LinkedIn' },
  { href: siteConfig.social.youtube, Icon: Youtube, label: 'YouTube' },
  { href: siteConfig.social.x, Icon: XGlyph, label: 'X' },
].filter((item) => Boolean(item.href));

export function Footer() {
  const t = useTranslations();
  const year = 2026; // Telif yılı — build sırasında sabit (Date kullanılmaz).

  return (
    <footer className="relative border-t border-white/10 bg-ink-950">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Marka + açıklama + sosyal */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex" aria-label={siteConfig.name}>
              <Image
                src={siteConfig.logoHorizontal}
                alt={siteConfig.name}
                width={170}
                height={53}
                unoptimized
                className="h-20 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {t('footer.about')}
            </p>
            <div className="mt-6 flex items-center gap-2">
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
          </div>

          {/* Hızlı erişim */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.quickLinks')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {QUICK.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 transition-colors hover:text-accent-300"
                  >
                    {t(`nav.${item.labelKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hizmetler */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.servicesTitle')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="text-slate-400">{t('services.items.residentialSale.title')}</li>
              <li className="text-slate-400">{t('services.items.rental.title')}</li>
              <li className="text-slate-400">{t('services.items.buy.title')}</li>
              <li className="text-slate-400">{t('services.items.consulting.title')}</li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.contactTitle')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={siteConfig.phoneHref}
                  className="flex items-start gap-3 text-slate-400 transition-colors hover:text-accent-300"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-start gap-3 text-slate-400 transition-colors hover:text-accent-300"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-400" aria-hidden />
                {siteConfig.address.full}
              </li>
            </ul>
          </div>
        </div>

        {/* Alt bant */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. {t('footer.rights')}
          </p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </Container>
    </footer>
  );
}
