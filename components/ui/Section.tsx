import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  /** Üst arka plan vurgu degradesi ekler. */
  glow?: boolean;
}

/** Dikey boşluk + opsiyonel container ile standart bölüm sarmalayıcı. */
export function Section({ children, className, containerClassName, id, glow }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('relative py-20 sm:py-24 lg:py-28', glow && 'bg-radial-accent', className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
