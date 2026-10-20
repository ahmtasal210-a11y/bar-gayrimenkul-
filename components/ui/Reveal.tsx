'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Sıralı görünüm için gecikme (sn). */
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  once?: boolean;
}

/** Scroll'da görünür olunca yumuşak fade + kayma animasyonu uygular. */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
}: RevealProps) {
  const offset = 24;
  const initial = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
    none: {},
  }[direction];

  const variants: Variants = {
    hidden: { opacity: 0, ...initial },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}
