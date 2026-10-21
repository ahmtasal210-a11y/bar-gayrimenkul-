'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { SafeImage } from '@/components/ui/SafeImage';
import { cn } from '@/lib/utils';
import { ListingPhotoPlaceholder } from './ListingPhotoPlaceholder';

/** İlan detay galerisi — ana görsel + küçük resimler + lightbox. */
export function ListingGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

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
          aria-label="Galeriyi büyüt"
        >
          <SafeImage
            src={images[active]}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ink-950/60 text-white backdrop-blur transition-colors group-hover:bg-accent-500 group-hover:text-ink-950">
            <Expand className="h-4 w-4" aria-hidden />
          </span>
        </button>

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
                aria-label={`Görsel ${i + 1}`}
              >
                <SafeImage src={img} alt={`${alt} ${i + 1}`} fill sizes="120px" className="object-cover" />
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
          >
            <button
              type="button"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              onClick={() => setLightbox(false)}
              aria-label="Kapat"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  aria-label="Önceki"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden />
                </button>
                <button
                  type="button"
                  className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  aria-label="Sonraki"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden />
                </button>
              </>
            )}

            <div
              className="relative h-[80vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <SafeImage src={images[active]} alt={alt} fill className="object-contain" sizes="100vw" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
