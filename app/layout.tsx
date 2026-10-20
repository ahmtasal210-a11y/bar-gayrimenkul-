import type { ReactNode } from 'react';

// Kök layout — gerçek <html>/<body> ve sağlayıcılar [locale] layout'unda kurulur.
// Next.js App Router kök bir layout gerektirir; burada sadece children geçilir.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
