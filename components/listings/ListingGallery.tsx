'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { SafeImage } from '@/components/ui/SafeImage';
import { cn } from '@/lib/utils';
import { ListingPhotoPlaceholder } from './ListingPhotoPlaceholder';

/** İlan detay galerisi — ana görsel + küçük resimler + lightbox. */
export function ListingGallery({ images, alt, captions }: { images: string[]; alt: string; captions?: string[] }) {
  const t = useTranslations('listingDetail');
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!lightbox) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setLightbox(false); }
      if (event.key === 'ArrowRight') { event.preventDefault(); setActive((value) => (value + 1) % images.length); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); setActive((value) => (value - 1 + images.length) % images.length); }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKey);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [lightbox, images.length]);

  const go = (dir: number) =>
    setActive((prev) => (prev + dir + images.length) % images.length);

  if (images.length === 0) {
    return <div className="aspect-[16/10] overflow-hidden rounded-2xl border border-white/10"><ListingPhotoPlaceholder /></div>;
  }

  return (
    <>
      <div className="space-y-3">
        {/* Ana görsel */}
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="group relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10"
          aria-label={t('galleryOpen')}
        >
          <SafeImage
            src={images[active]}
            alt={captions?.[active] ? `${alt} — ${captions[active]}` : alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="bg-ink-950 object-contain"
          />
          <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ink-950/60 text-white backdrop-blur transition-colors group-hover:bg-accent-500 group-hover:text-ink-950">
            <Expand className="h-4 w-4" aria-hidden />
          </span>
        </button>

        <p className="flex justify-between gap-4 text-sm text-slate-400" aria-live="polite">
          <span>{captions?.[active] || alt}</span><span className="shrink-0">{active + 1} / {images.length}</span>
        </p>

        {/* Küçük resimler */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  'relative aspect-square overflow-hidden rounded-xl border transition-all',
                  i === active
                    ? 'border-accent-500 ring-2 ring-accent-500/40'
                    : 'border-white/10 opacity-70 hover:opacity-100',
                )}
                aria-label={t('galleryThumbnail', { number: i + 1 })}
                aria-pressed={i === active}
              >
                <SafeImage src={img} alt={captions?.[i] || `${alt} ${i + 1}`} fill sizes="120px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-950/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label={t('gallery')}
          >
            <button
              type="button"
              ref={closeButton}
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={() => setLightbox(false)}
              aria-label={t('galleryClose')}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label={t('galleryPrevious')}
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden />
                </button>
                <button
                  type="button"
                  className="absolute right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label={t('galleryNext')}
                >
                  <ChevronRight className="h-6 w-6" aria-hidden />
                </button>
              </>
            )}

            <div
              className="relative h-[80vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage src={images[active]} alt={captions?.[active] || alt} fill className="object-contain" sizes="100vw" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
