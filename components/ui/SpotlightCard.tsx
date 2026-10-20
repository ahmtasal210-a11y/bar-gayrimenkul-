'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * İmleci takip eden yumuşak ışık (spotlight) efektli kart.
 * CSS değişkenleri ile radial gradient konumu güncellenir.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800/60 transition-colors duration-300 hover:border-accent-500/40',
        className,
      )}
    >
      {/* Spotlight katmanı */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx) var(--my), rgba(255,255,255,0.12), transparent 60%)',
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
