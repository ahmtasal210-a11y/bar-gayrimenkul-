import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  className?: string;
  /** Satılık (sale) yeşil-teal, kiralık (rent) amber tonunda. */
  tone?: 'sale' | 'rent' | 'neutral';
}

export function Badge({ children, className, tone = 'neutral' }: BadgeProps) {
  const tones = {
    sale: 'bg-accent-500/90 text-ink-950',
    rent: 'bg-slate-300/90 text-ink-950',
    neutral: 'bg-white/10 text-white border border-white/15',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
