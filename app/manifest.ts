import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — Premium Gayrimenkul`,
    short_name: siteConfig.name,
    description: 'Karaman Merkez’de Barış Gayrimenkul.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0f',
    theme_color: '#0a0a0f',
    icons: [{ src: '/logo/baris-favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  };
}
