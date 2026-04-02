import type { VenueType } from '@/types';

// ─── Color Utilities ──────────────────────────────────────────────────────────

/**
 * Returns the first color in a country's palette that is visible
 * on a dark (#0A0A0A) background — not too dark, not too light.
 */
export function safeAccent(colors: string[], fallback = '#E8C84A'): string {
  for (const c of colors) {
    const h = c.replace('#', '');
    if (h.length !== 6) continue;
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    if (brightness > 55 && brightness < 215) return c;
  }
  return fallback;
}

/**
 * Returns '#000' or '#fff' — whichever is more readable on top of `hex`.
 */
export function textOn(hex: string): '#000' | '#fff' {
  const h = hex.replace('#', '');
  if (h.length !== 6) return '#000';
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 130 ? '#000' : '#fff';
}

/** Color per venue type (used for card accent strips and tags). */
export function typeColor(type: VenueType): string {
  const map: Record<VenueType, string> = {
    bar: '#E8C84A',
    restaurant: '#4AE8A0',
    cultural: '#E84A8C',
    'watch party': '#4AB4E8',
  };
  return map[type] ?? '#888';
}

// ─── Date Utilities ───────────────────────────────────────────────────────────

/** Days from now until a match. Returns -1 if match has passed. */
export function daysUntil(isoDate: string): number {
  const now = new Date();
  const match = new Date(isoDate);
  const diff = match.getTime() - now.getTime();
  return diff < 0 ? -1 : Math.ceil(diff / 86_400_000);
}

// ─── Google Maps Utilities ────────────────────────────────────────────────────

/** URL-encoded query for Google Maps search */
export function mapsQuery(venueName: string, address: string): string {
  return encodeURIComponent(`${venueName} ${address} New York City`);
}

/** Google Maps embed src for iframe */
export function mapsEmbedUrl(venueName: string, address: string): string {
  return `https://maps.google.com/maps?q=${mapsQuery(venueName, address)}&output=embed&z=15`;
}

/** Google Maps directions URL */
export function mapsDirectionsUrl(venueName: string, address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${mapsQuery(venueName, address)}`;
}

// ─── Venue Data Helpers ───────────────────────────────────────────────────────

/** How many venues to show initially before "Show more" */
export const VENUES_INITIAL_LIMIT = 3;

/**
 * Priority sort: featured first, then by type importance for soccer watchers.
 */
export function sortVenues<T extends { featured?: boolean; type: VenueType }>(venues: T[]): T[] {
  const typeOrder: Record<VenueType, number> = {
    'watch party': 0,
    bar: 1,
    restaurant: 2,
    cultural: 3,
  };
  return [...venues].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (typeOrder[a.type] ?? 9) - (typeOrder[b.type] ?? 9);
  });
}
