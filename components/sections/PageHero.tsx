import type { ReactNode } from 'react';
import { SafeImage } from '@/components/ui/SafeImage';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

interface PageHeroProps {
  image: string;
  badge?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  children?: ReactNode;
}

/** İç sayfalar için ortak hero (Hakkımızda, Hizmetler, İlanlar, İletişim). */
export function PageHero({ image, badge, title, titleAccent, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[52vh] items-center overflow-hidden pt-20 sm:min-h-[58vh]">
      {/* Arka plan görseli + overlay */}
      <div className="absolute inset-0 -z-10">
        <SafeImage
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/80 via-ink-900/70 to-ink-900" />
        <div className="absolute inset-0 bg-ink-900/40" />
      </div>

      <Container className="py-16 sm:py-20">
        <Reveal className="max-w-3xl">
          {badge && (
            <span className="eyebrow mb-5">
              <span className="h-px w-6 bg-accent-400" aria-hidden />
              {badge}
            </span>
          )}
          <h1 className="heading text-4xl text-balance sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            {title}{' '}
            {titleAccent && <span className="text-accent-400">{titleAccent}</span>}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{subtitle}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
