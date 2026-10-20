import Link from 'next/link';

// Kök (dil dışı) 404 — html/body burada kurulur çünkü locale layout'un dışındadır.
export default function GlobalNotFound() {
  return (
    <html lang="tr" className="dark">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0f',
          color: '#e2e8f0',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '1.5rem',
        }}
      >
        <p style={{ fontSize: '4rem', fontWeight: 800, color: '#e5e7eb', margin: 0 }}>404</p>
        <h1 style={{ marginTop: '1rem', fontSize: '1.5rem' }}>Sayfa bulunamadı</h1>
        <Link
          href="/"
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            background: '#e5e7eb',
            color: '#06060a',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Ana Sayfa
        </Link>
      </body>
    </html>
  );
}
