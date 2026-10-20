import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp';
type Size = 'sm' | 'md' | 'lg';

/**
 * Buton stil sınıflarını üretir. Hem <button> hem <Link>/<a> üzerinde
 * yeniden kullanılabilmesi için ayrı bir fonksiyon olarak tutulur.
 */
export function buttonVariants({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}): string {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900 disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants: Record<Variant, string> = {
    primary:
      'bg-accent-500 text-ink-950 hover:bg-accent-400 hover:shadow-glow hover:-translate-y-0.5',
    secondary:
      'bg-white/5 text-white border border-white/15 backdrop-blur hover:bg-white/10 hover:border-white/25',
    outline:
      'border border-accent-500/60 text-accent-300 hover:bg-accent-500/10 hover:border-accent-400',
    ghost: 'text-slate-200 hover:bg-white/5 hover:text-white',
    whatsapp:
      'bg-[#25D366] text-ink-950 hover:bg-[#1ebe5b] hover:shadow-[0_18px_50px_-12px_rgba(37,211,102,0.5)] hover:-translate-y-0.5',
  };

  const sizes: Record<Size, string> = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-sm',
    lg: 'h-14 px-8 text-base',
  };

  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />;
}
