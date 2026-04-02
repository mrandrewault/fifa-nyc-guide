'use client';

import { useState } from 'react';
import type { Venue } from '@/types';
import { typeColor, mapsEmbedUrl, mapsDirectionsUrl } from '@/lib/utils';

// ─── Map Modal ────────────────────────────────────────────────────────────────

function MapModal({ venue, onClose }: { venue: Venue; onClose: () => void }) {
  const embedSrc = mapsEmbedUrl(venue.name, venue.address);
  const directionsUrl = mapsDirectionsUrl(venue.name, venue.address);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      style={{ background: 'rgba(0,0,0,0.9)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-zinc-800 px-4 py-3">
          <div className="min-w-0">
            <div className="label text-sm text-white truncate">{venue.name}</div>
            <div className="text-xs text-zinc-500 mt-0.5">📍 {venue.address}</div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-zinc-800 text-zinc-400"
          >
            ✕
          </button>
        </div>

        {/* Map */}
        <div className="h-64">
          <iframe
            title={venue.name}
            src={embedSrc}
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-800 p-3">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noreferrer"
            className="label block rounded bg-[#E8C84A] py-2 text-center text-xs text-black"
          >
            Open in Google Maps ↗
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Single Venue Card ────────────────────────────────────────────────────────

function VenueCard({ venue, accent }: { venue: Venue; accent: string }) {
  const [showMap, setShowMap] = useState(false);
  const tc = typeColor(venue.type);

  return (
    <>
      <div
        className="rounded overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
        style={{
          background: '#111',
          border: '1px solid #222',
          borderTop: `3px solid ${tc}`,
        }}
      >
        <div className="p-4">
          {/* Name + type badge */}
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="label text-sm text-white leading-tight flex-1">{venue.name}</h3>
            <span
              className="label flex-shrink-0 rounded px-1.5 py-0.5 text-[10px]"
              style={{ background: `${tc}22`, color: tc }}
            >
              {venue.type}
            </span>
          </div>

          {/* Address */}
          <div className="mb-2 text-xs text-zinc-600">📍 {venue.address}</div>

          {/* Why */}
          <p className="mb-3 text-xs leading-relaxed text-zinc-400">{venue.why}</p>

          {/* Footer: order + map */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-zinc-800 pt-2">
            <div className="text-xs text-zinc-500">
              <span style={{ color: '#E8C84A' }}>Order: </span>
              {venue.mustOrder}
            </div>
            <button
              onClick={() => setShowMap(true)}
              className="label rounded px-2 py-1 text-[10px] transition-colors"
              style={{
                border: `1px solid ${accent}55`,
                color: accent,
                background: 'transparent',
              }}
            >
              🗺 Map
            </button>
          </div>
        </div>
      </div>

      {showMap && <MapModal venue={venue} onClose={() => setShowMap(false)} />}
    </>
  );
}

// ─── Venue List with Show More ────────────────────────────────────────────────

const INITIAL_LIMIT = 3;

interface VenueListProps {
  venues: Venue[];
  accent: string;
  emptyMessage?: string;
}

export default function VenueList({ venues, accent, emptyMessage }: VenueListProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? venues : venues.slice(0, INITIAL_LIMIT);
  const hasMore = venues.length > INITIAL_LIMIT;

  if (venues.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-zinc-600">
        {emptyMessage ?? 'No venues found.'}
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        {visible.map((v) => (
          <VenueCard key={v.id} venue={v} accent={accent} />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setShowAll(s => !s)}
          className="label mt-3 w-full rounded border border-zinc-800 py-2 text-xs text-zinc-500 transition-colors hover:border-zinc-600 hover:text-zinc-300"
        >
          {showAll
            ? '↑ Show fewer'
            : `Show ${venues.length - INITIAL_LIMIT} more →`}
        </button>
      )}
    </div>
  );
}
