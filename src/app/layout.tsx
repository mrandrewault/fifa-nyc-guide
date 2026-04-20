import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Golazo NYC — World Cup 2026 Fan Guide',
  description: 'Your borough-by-borough guide to watching FIFA World Cup 2026 in New York City. Find your people, your bars, your food. For fans of every nation.',
  manifest: '/manifest.json',
  metadataBase: new URL('https://golazo.nyc'),
  alternates: {
    canonical: 'https://golazo.nyc',
  },
  keywords: ['World Cup 2026', 'FIFA NYC', 'New York City fan guide', 'MetLife Stadium', 'soccer bars NYC', 'World Cup New York'],
  authors: [{ name: 'Golazo NYC' }],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Golazo NYC',
  },
  openGraph: {
    title: 'Golazo NYC — World Cup 2026 Fan Guide',
    description: 'Find your people in NYC for the 2026 World Cup. Borough by borough guides for every nation — bars, food, transit, and match day plans.',
    type: 'website',
    url: 'https://golazo.nyc',
    siteName: 'Golazo NYC',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Golazo NYC — Your World Cup 2026 Fan Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Golazo NYC — World Cup 2026 Fan Guide',
    description: 'Find your people in NYC for the 2026 World Cup. Borough by borough guides for every nation.',
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* Structured data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Golazo NYC",
              "description": "Borough-by-borough fan guide for FIFA World Cup 2026 in New York City",
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
      <body>{children}</body>
    </html>
  );
}
