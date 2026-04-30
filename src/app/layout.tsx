import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
      </head>
      <body>
        {children}

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
