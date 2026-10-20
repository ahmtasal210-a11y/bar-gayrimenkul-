'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { buildWhatsAppLink } from '@/lib/config';
import { SafeImage } from '@/components/ui/SafeImage';
import { Container } from '@/components/ui/Container';
import { buttonVariants } from '@/components/ui/Button';

/** Ana sayfa tam ekran hero — arka plan görsel, gradient hareketi, çift CTA. */
export function Hero() {
  const t = useTranslations('home.hero');

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] } },
  };

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden isolate">
      {/* Arka plan */}
      <div className="absolute inset-0 -z-20">
        <SafeImage
          src="/hero/luxury-city-skyline-real-estate.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/85 via-ink-900/75 to-ink-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 to-transparent" />
      </div>

      {/* Hareketli accent ışıması */}
      <motion.div
        aria-hidden
        className="absolute -top-1/4 right-0 -z-10 h-[60vh] w-[60vh] rounded-full bg-accent-500/20 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative pt-24">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-3xl">
          <motion.span variants={item} className="eyebrow mb-6">
            <span className="h-px w-8 bg-accent-400" aria-hidden />
            {t('badge')}
          </motion.span>

          <motion.h1
            variants={item}
            className="heading text-balance text-[clamp(1.65rem,7vw,3rem)] leading-[1.1] sm:text-6xl lg:text-7xl"
          >
            {t('title')}{' '}
            <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
              {t('titleAccent')}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href={{ pathname: '/', hash: 'ilan-arama' }} className={buttonVariants({ variant: 'primary', size: 'lg' })}>
              {t('primaryCta')}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <a
              href={buildWhatsAppLink(t('secondaryCta'))}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'secondary', size: 'lg' })}
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              {t('secondaryCta')}
            </a>
          </motion.div>

        </motion.div>
      </Container>

      {/* Aşağı kaydır göstergesi */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <ChevronDown className="h-6 w-6" />
      </motion.div>
    </section>
  );
}
