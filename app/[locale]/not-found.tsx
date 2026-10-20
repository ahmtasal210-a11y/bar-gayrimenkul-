import { useTranslations } from 'next-intl';
import { Home } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { buttonVariants } from '@/components/ui/Button';

export default function NotFound() {
  const t = useTranslations('nav');

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-bold text-accent-500 sm:text-8xl">404</p>
      <h1 className="heading mt-6 text-2xl sm:text-3xl">Sayfa bulunamadı</h1>
      <p className="mt-3 max-w-md text-slate-400">
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
      </p>
      <Link href="/" className={buttonVariants({ variant: 'primary', size: 'lg', className: 'mt-8' })}>
        <Home className="h-5 w-5" aria-hidden />
        {t('home')}
      </Link>
    </Container>
  );
}
