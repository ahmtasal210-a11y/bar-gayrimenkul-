'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, animate } from 'framer-motion';
import { useLocale } from 'next-intl';
import { formatNumber } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

/** Görünür olunca 0'dan hedef değere sayan animasyonlu sayaç. */
export function AnimatedCounter({ value, suffix = '+', duration = 2 }: AnimatedCounterProps) {
  const locale = useLocale() as Locale;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(formatNumber(Math.round(latest), locale)),
    });
    return () => controls.stop();
  }, [inView, value, duration, motionValue, locale]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
