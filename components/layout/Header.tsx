'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { siteConfig, buildWhatsAppLink } from '@/lib/config';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import { LocaleSwitcher } from './LocaleSwitcher';
import { MobileMenu } from './MobileMenu';
import type { NavItem } from '@/types';

const NAV: NavItem[] = [
  { href: '/', labelKey: 'home' },
  { href: '/listings', labelKey: 'listings' },
  { href: '/services', labelKey: 'services' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
];

export function Header() {
  const t = useTranslations('nav');
  const tSell = useTranslations('sellCta');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll'da arka planı katılaştır.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-ink-900/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:h-20 lg:px-8">
        {/* Logo — masaüstünde yatay logo, mobilde sade ikon */}
        <Link href="/" className="group flex items-center" aria-label={siteConfig.name}>
          <Image
            src={siteConfig.logoHorizontal}
            alt={siteConfig.name}
            width={150}
            height={47}
            priority
            unoptimized
            className="hidden h-14 w-auto brightness-0 invert transition-transform group-hover:scale-[1.03] sm:block lg:h-16"
          />
          <Image
            src={siteConfig.logoIcon}
            alt={siteConfig.name}
            width={40}
            height={40}
            priority
            unoptimized
            className="h-12 w-auto brightness-0 invert sm:hidden"
          />
        </Link>

        {/* Masaüstü menü */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    active ? 'text-white' : 'text-slate-300 hover:text-white',
                  )}
                >
                  {active && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-white/5" aria-hidden />
                  )}
                  {t(item.labelKey)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Sağ aksiyonlar */}
        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher />
          <a
            href={buildWhatsAppLink(tSell('whatsappMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'primary', size: 'sm' })}
          >
            {t('sellCta')}
          </a>
        </div>

        {/* Mobil menü tetikleyici */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden"
          aria-label="Menü"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} nav={NAV} />
    </header>
  );
}
