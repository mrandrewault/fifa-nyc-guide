import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import AnnouncementBar from '@/components/AnnouncementBar';
import './globals.css';

// Google Analytics 4 Measurement ID for Golazo NYC.
// Hardcoded here because it's a public client-side identifier (visible in browser anyway)
// and putting it in env vars would just add deployment complexity for no security benefit.
const GA_MEASUREMENT_ID = 'G-VB9RCK0P8N';

export const metadata: Metadata = {
  title: 'Golazo NYC — The World\'s Guide to the World Cup in NYC',
  description: 'Find your fans, find your bars, find your way. Borough-by-borough guide to watching FIFA World Cup 2026 in New York City. For fans of every nation.',
  manifest: '/site.webmanifest',
  metadataBase: new URL('https://golazo.nyc'),
  alternates: {
    canonical: 'https://golazo.nyc',
  },
  keywords: ['World Cup 2026', 'FIFA NYC', 'New York City fan guide', 'MetLife Stadium', 'soccer bars NYC', 'World Cup New York'],
  authors: [{ name: 'Golazo NYC' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Golazo NYC',
  },
  openGraph: {
    title: 'The World\'s Guide to the World Cup in NYC',
    description: 'Find your fans, find your bars, find your way. Borough-by-borough guide for FIFA World Cup 2026.',
    type: 'website',
    url: 'https://golazo.nyc',
    siteName: 'Golazo NYC',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Golazo NYC — The World\'s Guide to the World Cup in NYC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The World\'s Guide to the World Cup in NYC',
    description: 'Find your fans, find your bars, find your way. Borough-by-borough guide for FIFA World Cup 2026.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* Structured data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Golazo NYC",
              "description": "The World's Guide to the World Cup in NYC — borough-by-borough fan guide for FIFA World Cup 2026",
              "url": "https://golazo.nyc",
              "applicationCategory": "TravelApplication",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
              "about": {
                "@type": "Event",
                "name": "FIFA World Cup 2026",
                "location": { "@type": "Place", "name": "MetLife Stadium, East Rutherford, NJ" },
                "startDate": "2026-06-13",
                "endDate": "2026-07-19"
              }
            })
          }}
        />
        {/* Footer hover state */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .golazo-footer-ig {
                transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
              }
              .golazo-footer-ig:hover {
                background: rgba(255,255,255,0.08);
                border-color: rgba(255,255,255,0.4);
                transform: translateY(-1px);
              }
              .golazo-footer-shop {
                transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
              }
              .golazo-footer-shop:hover {
                background: rgba(255,255,255,0.08);
                border-color: rgba(255,255,255,0.4);
                transform: translateY(-1px);
              }
            `,
          }}
        />
      </head>
      <body>
        {/* Sticky announcement bar at top of every page */}
        <AnnouncementBar />

        {children}

        {/* Site-wide footer */}
        <footer
          style={{
            background: '#0A0A0A',
            color: '#FFFFFF',
            padding: '48px 24px 36px',
            fontFamily: '"Barlow Condensed", system-ui, sans-serif',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            {/* Wordmark */}
            <div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                  lineHeight: 1,
                }}
              >
                Golazo NYC
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 300,
                  opacity: 0.7,
                  letterSpacing: '0.02em',
                  lineHeight: 1.4,
                }}
              >
                The World&apos;s Guide to the World Cup in NYC
              </div>
            </div>

            {/* Action buttons row: Instagram + Shop */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {/* Instagram button */}
              <a
                href="https://instagram.com/golazo_nyc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Golazo NYC on Instagram"
                className="golazo-footer-ig"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '999px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>@golazo_nyc</span>
              </a>

              {/* Shop button */}
              <a
                href="https://shop.golazo.nyc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shop Golazo NYC country tees"
                className="golazo-footer-shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '999px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span>Shop the collection</span>
              </a>
            </div>

            {/* Copyright line */}
            <div
              style={{
                fontSize: '11px',
                fontWeight: 400,
                opacity: 0.5,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}
            >
              © 2026 Golazo NYC · Made in New York
            </div>
          </div>
        </footer>

        {/* Google Analytics 4 — async loaded via Next.js Script for proper performance */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Vercel Web Analytics — page views, top countries, top referrers, UTM campaigns */}
        <Analytics />
        {/* Vercel Speed Insights — Core Web Vitals, page load performance per route */}
        <SpeedInsights />
      </body>
    </html>
  );
}
