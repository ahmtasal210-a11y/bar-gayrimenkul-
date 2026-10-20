import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

/** Bölüm başlığı bloğu — eyebrow + başlık + alt başlık, scroll reveal ile. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className,
      )}
    >
      {eyebrow && (
        <span className="eyebrow">
          <span className="h-px w-6 bg-accent-400" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="heading mt-4 text-3xl text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-slate-400">{subtitle}</p>}
    </Reveal>
  );
}
