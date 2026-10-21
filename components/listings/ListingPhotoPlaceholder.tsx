import { useTranslations } from 'next-intl';
import { ImageOff } from 'lucide-react';

export function ListingPhotoPlaceholder() {
  const t = useTranslations('listingDetail');
  return (
    <div className="flex h-full min-h-48 w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink-700 to-ink-900 px-6 pb-12 text-center">
      <ImageOff className="h-9 w-9 text-slate-500" aria-hidden />
      <p className="text-sm text-slate-400">{t('photosPending')}</p>
    </div>
  );
}
