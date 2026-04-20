'use client';

import { useFavorites } from '@/lib/useFavorites';

const typeColor = (type: string) => {
  switch (type) {
    case 'watch party': return '#60A5FA';
    case 'bar': return '#FBBF24';
    case 'restaurant': return '#34D399';
    case 'cultural': return '#C084FC';
    default: return '#888';
  }
};

interface MySpotsProps {
  accent?: string;
  filterCountry?: string; // if set, only show venues for this country
}

export default function MySpots({ accent = '#E8C84A', filterCountry }: MySpotsProps) {
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();

  // Filter by country if specified
  const visible = filterCountry
    ? favorites.filter(f => f.countryAssociations.includes(filterCountry))
    : favorites;

  if (visible.length === 0) return null;

  const byBorough = visible.reduce((acc, venue) => {
    if (!acc[venue.borough]) acc[venue.borough] = [];
    acc[venue.borough].push(venue);
    return acc;
  }, {} as Record<string, typeof visible>);

  function shareAll() {
    const text = `My World Cup NYC spots 🗽⚽\n\n${visible.map(v => `• ${v.name} — ${v.address}`).join('\n')}\n\nvia golazo.nyc`;
    if (navigator.share) {
      navigator.share({ title: 'My Golazo NYC Spots', text });
    } else {
      navigator.clipboard.writeText(text).then(() => alert('Copied to clipboard!'));
    }
  }

  return (
    <div className="mt-6 mb-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div>
          <div className="label text-[10px] text-zinc-500" style={{ letterSpacing: '0.2em' }}>
            ❤️ MY SPOTS
          </div>
          <div className="text-sm text-zinc-300 font-medium">
            {visible.length} saved venue{visible.length !== 1 ? 's' : ''}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={shareAll}
            className="label text-[10px] px-3 py-1.5 rounded transition-colors"
            style={{ background: '#1A1A1A', border: '1px solid #333', color: '#888', letterSpacing: '0.1em' }}
          >
            Share ↗
          </button>
          {!filterCountry && (
            <button
              onClick={() => { if (confirm('Clear all saved spots?')) clearFavorites(); }}
              className="label text-[10px] px-3 py-1.5 rounded transition-colors"
              style={{ background: '#1A1A1A', border: '1px solid #333', color: '#666', letterSpacing: '0.1em' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Venues by borough */}
      {Object.entries(byBorough).map(([borough, venues]) => (
        <div key={borough} className="mb-4">
          <div className="label text-[9px] mb-2 px-1" style={{ color: accent, letterSpacing: '0.2em' }}>
            {borough.toUpperCase()}
          </div>
          <div className="flex flex-col gap-2">
            {venues.map(venue => {
              const tc = typeColor(venue.type);
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.address)}`;
              return (
                <div
                  key={venue.id}
                  className="flex items-start gap-3 rounded p-3"
                  style={{ background: '#0D0D0D', border: '1px solid #222' }}
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: tc }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium text-white leading-tight">{venue.name}</div>
                        <div className="text-[11px] text-zinc-600 mt-0.5">{venue.neighborhood || venue.borough}</div>
                      </div>
                      <div className="flex gap-1.5 flex-shrink-0">
                        <a
                          href={mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="label text-[9px] px-2 py-1 rounded"
                          style={{ background: '#E8C84A22', color: '#E8C84A', border: '1px solid #E8C84A44', letterSpacing: '0.1em' }}
                        >
                          MAP
                        </a>
                        <button
                          onClick={() => toggleFavorite(venue)}
                          className="text-base leading-none"
                          title="Remove from saved"
                        >
                          ❤️
                        </button>
                      </div>
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-1 leading-relaxed line-clamp-2">{venue.why}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
