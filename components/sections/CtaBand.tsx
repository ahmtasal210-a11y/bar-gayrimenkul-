import { useTranslations } from 'next-intl';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { buildWhatsAppLink } from '@/lib/config';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { buttonVariants } from '@/components/ui/Button';

/** Dönüşüm odaklı kapanış bandı — "Mülkünüzü mü satmak istiyorsunuz?" */
export function CtaBand() {
  const t = useTranslations('home.cta');
  const tSell = useTranslations('sellCta');

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-accent-500/20 bg-gradient-to-br from-ink-800 via-ink-800 to-ink-900 px-6 py-14 text-center sm:px-12 sm:py-20">
            {/* Dekoratif ışıma */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent-500/20 blur-[100px]" aria-hidden />
            <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent-500/10 blur-[100px]" aria-hidden />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="heading text-3xl text-balance sm:text-4xl lg:text-5xl">
                {t('title')}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {t('subtitle')}
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/contact" className={buttonVariants({ variant: 'primary', size: 'lg' })}>
                  {t('primary')}
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
                <a
                  href={buildWhatsAppLink(tSell('whatsappMessage'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: 'whatsapp', size: 'lg' })}
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  {t('secondary')}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
