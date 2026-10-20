import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import localFont from 'next/font/local';

import { routing } from '@/i18n/routing';
import { siteConfig } from '@/lib/config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';

import '../globals.css';

// Gövde fontu — Inter, başlık fontu — Sora. display: swap ile CLS önlenir.
const inter = localFont({ src: [{ path: '../../public/fonts/DejaVuSans.ttf', weight: '400' }, { path: '../../public/fonts/DejaVuSans-Bold.ttf', weight: '700' }], variable: '--font-inter', display: 'swap' });

const sora = localFont({ src: '../../public/fonts/DejaVuSerif.ttf', variable: '--font-sora', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
};

// Statik üretim için desteklenen tüm diller.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Dil bazlı temel metadata (her sayfa kendi başlığını ezer).
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'seo' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('home.title'),
      template: `%s`,
    },
    description: t('home.description'),
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: { telephone: true, email: true, address: true },
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages: {
        tr: '/',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      url: siteConfig.url,
      images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      images: [siteConfig.twitterImage],
    },
    icons: { icon: '/logo/baris-favicon.svg', apple: '/logo/baris-original.png' },
    robots: {
      index: siteConfig.isPublished,
      follow: siteConfig.isPublished,
      googleBot: { index: siteConfig.isPublished, follow: siteConfig.isPublished, 'max-image-preview': 'large' },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Geçersiz dil -> 404
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Statik render için aktif dili sabitle.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${sora.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-ink-900 selection:bg-accent-500/30">
        <NextIntlClientProvider messages={messages}>
          {/* Klavye kullanıcıları için içeriğe atla bağlantısı */}
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-900"
          >
            İçeriğe geç
          </a>
          <OrganizationJsonLd locale={locale} />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
