/** Verified user-provided brand details; no invented office address or social accounts. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '') || 'http://localhost:3000';
export const siteConfig = {
  name: 'Barış Gayrimenkul',
  legalName: 'Barış Gayrimenkul',
  domain: new URL(siteUrl).host,
  url: siteUrl,
  isPublished: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  phone: '0534 647 42 70',
  phoneHref: 'tel:+905346474270',
  whatsappNumber: '905346474270',
  email: 'ahmetasal206@gmail.com',
  address: { street: 'Fenari Mahallesi, Şht. Zafer Ak Cd. 7/C', district: 'Merkez', city: 'Karaman', zip: '70100', country: 'TR', full: 'Fenari Mahallesi, Şht. Zafer Ak Cd. 7/C, 70100 Karaman Merkez / Karaman' },
  mapsUrl: 'https://www.google.com/maps/place//data=!4m2!3m1!1s0x14d98d581f1b18f3:0xb26413d7bedfd314',
  slogan: 'Emlakta güvenilir nokta',
  hours: { weekdays: '09:00–19:00', saturday: '09:00–18:35', sunday: 'Kapalı' },
  social: { instagram: '', facebook: '', linkedin: '', youtube: '', x: '' },
  ogImage: '/social/baris-monochrome.png',
  twitterImage: '/social/baris-monochrome.png',
  logo: '/logo/baris-original.png',
  logoHorizontal: '/logo/baris-original.png',
  logoIcon: '/logo/baris-original.png',
} as const;

export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
export type SiteConfig = typeof siteConfig;
