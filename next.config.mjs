import createNextIntlPlugin from 'next-intl/plugin';

// next-intl yapılandırma dosyasının yolunu plugin'e bildiriyoruz.
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Yerel görseller webp/avif olarak optimize edilir.
    // (Marka SVG logoları next/image'de `unoptimized` ile statik sunulur.)
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      // İleride harici (CDN) görsel kullanılırsa buraya eklenir.
    ],
  },
  // Güvenlik başlıkları — production'da temel sertleştirme.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
