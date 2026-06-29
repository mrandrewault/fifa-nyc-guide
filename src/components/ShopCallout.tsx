'use client';

// Maps country display name → URL slug for shop.golazo.nyc product pages
// Pattern: i-⚽-ny-{slug}-team-colors-tee
const COUNTRY_SLUGS: Record<string, string> = {
  'Algeria': 'algeria',
  'Argentina': 'argentina',
  'Australia': 'australia',
  'Austria': 'austria',
  'Belgium': 'belgium',
  'Brazil': 'brazil',
  'Canada': 'canada',
  'Cape Verde': 'cape-verde',
  'Colombia': 'colombia',
  'Croatia': 'croatia',
  'Curaçao': 'curacao',
  'Czechia': 'czechia',
  'Denmark': 'denmark',
  'Ecuador': 'ecuador',
  'Egypt': 'egypt',
  'England': 'england',
  'France': 'france',
  'Germany': 'germany',
  'Ghana': 'ghana',
  'Haiti': 'haiti',
  'Iran': 'iran',
  'Italy': 'italy',
  'Ivory Coast': 'ivory-coast',
  'Japan': 'japan',
  'Jordan': 'jordan',
  'Mexico': 'mexico',
  'Morocco': 'morocco',
  'Netherlands': 'netherlands',
  'New Zealand': 'new-zealand',
  'Norway': 'norway',
  'Panama': 'panama',
  'Paraguay': 'paraguay',
  'Portugal': 'portugal',
  'Qatar': 'qatar',
  'Saudi Arabia': 'saudi-arabia',
  'Scotland': 'scotland',
  'Senegal': 'senegal',
  'South Africa': 'south-africa',
  'South Korea': 'south-korea',
  'Spain': 'spain',
  'Switzerland': 'switzerland',
  'Tunisia': 'tunisia',
  'Turkey': 'turkey',
  'United States': 'united-states',
  'USA': 'united-states',
  'Uruguay': 'uruguay',
  'Uzbekistan': 'uzbekistan',
  'Wales': 'wales',
};

interface ShopCalloutProps {
  country: string;
}

export default function ShopCallout({ country }: ShopCalloutProps) {
  const slug = COUNTRY_SLUGS[country];

  // If we don't have a slug for this country, fall back to the main shop URL
  const url = slug
    ? `https://shop.golazo.nyc/products/i-%E2%9A%BD-ny-${slug}-team-colors-tee`
    : 'https://shop.golazo.nyc';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '14px 18px',
        margin: '16px 0',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '8px',
        color: '#FFFFFF',
        textDecoration: 'none',
        transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
        fontFamily: '"Barlow Condensed", system-ui, sans-serif',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
        e.currentTarget.style.transform = 'translateY(-1px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div
          style={{
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.01em',
            lineHeight: 1.3,
          }}
        >
          Repping {country} tonight?
        </div>
        <div
          style={{
            fontSize: '13px',
            fontWeight: 400,
            opacity: 0.7,
            letterSpacing: '0.02em',
            lineHeight: 1.3,
          }}
        >
          Get the shirt → shop.golazo.nyc
        </div>
      </div>
      <div
        style={{
          fontSize: '20px',
          opacity: 0.6,
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        →
      </div>
    </a>
  );
}
