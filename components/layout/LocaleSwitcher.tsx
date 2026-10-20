'use client';

import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/** TR/EN dil değiştirici — mevcut sayfada kalır, sadece dili değiştirir. */
export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: 'tr' | 'en') {
    if (next === locale) return;
    startTransition(() => {
      // Aynı rotayı (dinamik parametrelerle birlikte) hedef dilde aç.
      // Pathname + params birleşimini next-intl'in beklediği tipe daraltıyoruz.
      router.replace(
        { pathname, params } as Parameters<typeof router.replace>[0],
        { locale: next },
      );
    });
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold',
        isPending && 'opacity-60',
        className,
      )}
    >
      <Globe className="ml-1.5 h-3.5 w-3.5 text-slate-400" aria-hidden />
      {(['tr', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-label={l === 'tr' ? 'Türkçe' : 'English'}
          aria-current={l === locale ? 'true' : undefined}
          className={cn(
            'rounded-full px-2.5 py-1 uppercase transition-colors',
            l === locale ? 'bg-accent-500 text-ink-950' : 'text-slate-300 hover:text-white',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
