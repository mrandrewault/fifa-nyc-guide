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
 * Determines a venue's specificity tier based on how many countries it serves.
 * Lower tier number = more specialized to a single community = ranks higher.
 *
 * Tier 0: Specialist  (1-2 countries) — the country-specific gems
 * Tier 1: Regional    (3-5 countries) — venues serving a tight cluster
 * Tier 2: Catch-all   (6+ countries)  — universal soccer bars, FIFA fan zones
 */
function specificityTier(countryAssociations?: string[]): number {
  const count = countryAssociations?.length ?? 0;
  if (count <= 2) return 0; // specialist
  if (count <= 5) return 1; // regional
  return 2;                  // catch-all
}

/**
 * Priority sort for venues displayed on a country page.
 *
 * Ordering rules, in priority order:
 * 1. SPECIFICITY: country-specific venues (1-2 countries) rank highest,
 *    then regional venues (3-5 countries), then catch-all venues (6+).
 *    This ensures the Brazilian fan sees Bar Goyana before Football Factory.
 * 2. FEATURED: within each tier, featured venues rank above non-featured.
 * 3. TYPE: within each tier+featured group, sort by relevance for soccer:
 *    watch party → bar → restaurant → cultural.
 */
export function sortVenues<
  T extends {
    featured?: boolean;
    type: VenueType;
    countryAssociations?: string[];
  }
>(venues: T[]): T[] {
  const typeOrder: Record<VenueType, number> = {
    'watch party': 0,
    bar: 1,
    restaurant: 2,
    cultural: 3,
  };

  return [...venues].sort((a, b) => {
    // 1. Specificity tier (lower = more specialized = ranks first)
    const tierDiff = specificityTier(a.countryAssociations) - specificityTier(b.countryAssociations);
    if (tierDiff !== 0) return tierDiff;

    // 2. Featured flag (true ranks first)
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // 3. Type order (watch party first, etc.)
    return (typeOrder[a.type] ?? 9) - (typeOrder[b.type] ?? 9);
  });
}
