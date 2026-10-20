'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { ImageIcon } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

type SafeImageProps = Omit<ImageProps, 'onError'> & {
  /** Görsel yoksa gösterilecek alanın ek sınıfı. */
  wrapperClassName?: string;
};

/**
 * next/image sarmalayıcı — görsel henüz eklenmemişse (404) kırılmak yerine
 * şık bir degrade placeholder gösterir. Görseller sonradan eklenince
 * otomatik çalışır.
 */
export function SafeImage({ className, wrapperClassName, alt, ...props }: SafeImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={cn(
          'flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900',
          wrapperClassName,
        )}
        aria-label={alt}
        role="img"
      >
        <div className="flex flex-col items-center gap-2 text-ink-600">
          <ImageIcon className="h-10 w-10 text-accent-500/40" aria-hidden />
          <span className="text-xs font-medium text-slate-500">{siteConfig.name}</span>
        </div>
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
      {...props}
    />
  );
}
