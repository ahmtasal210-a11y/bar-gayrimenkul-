'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X, Phone, MessageCircle } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { siteConfig, buildWhatsAppLink } from '@/lib/config';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/Button';
import { LocaleSwitcher } from './LocaleSwitcher';
import type { NavItem } from '@/types';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  nav: NavItem[];
}

export function MobileMenu({ open, onClose, nav }: MobileMenuProps) {
  const t = useTranslations('nav');
  const tSell = useTranslations('sellCta');
  const tCommon = useTranslations('common');
  const pathname = usePathname();

  // Menü açıkken arka plan kaydırmasını kilitle ve ESC ile kapat.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink-950/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[70] flex w-[86%] max-w-sm flex-col border-l border-white/10 bg-ink-900 lg:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <Image
                src={siteConfig.logoHorizontal}
                alt={siteConfig.name}
                width={140}
                height={44}
                unoptimized
                className="h-14 w-auto brightness-0 invert"
              />
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-white"
                aria-label={tCommon('close')}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col gap-1">
                {nav.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                          active
                            ? 'bg-accent-500/10 text-accent-300'
                            : 'text-slate-200 hover:bg-white/5',
                        )}
                      >
                        {t(item.labelKey)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-3 border-t border-white/10 px-5 py-5">
              <LocaleSwitcher className="w-full justify-center" />
              <a
                href={buildWhatsAppLink(tSell('whatsappMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className={buttonVariants({ variant: 'whatsapp', size: 'md', className: 'w-full' })}
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {tCommon('whatsapp')}
              </a>
              <a
                href={siteConfig.phoneHref}
                className={buttonVariants({ variant: 'secondary', size: 'md', className: 'w-full' })}
              >
                <Phone className="h-4 w-4" aria-hidden />
                {tCommon('callNow')}
              </a>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
