// ─── Core Types ──────────────────────────────────────────────────────────────

export type Borough = 'Manhattan' | 'Brooklyn' | 'Queens' | 'The Bronx' | 'Staten Island';
export type VenueType = 'bar' | 'restaurant' | 'cultural' | 'watch party';
export type AppTab = 'guide' | 'schedule' | 'stadium' | 'neighborhoods' | 'transit';

// ─── Venue ────────────────────────────────────────────────────────────────────

/**
 * A venue is a bar, restaurant, cultural space, or watch party location.
 *
 * When pulling from Supabase, `country_associations` is a string[]
 * of country names (e.g. ["Brazil", "Colombia"]) — one venue can be
 * associated with multiple countries. The `why` and `mustOrder` fields
 * can optionally be country-specific via the `countryContext` override.
 */
export interface Venue {
  id: string;                       // UUID from Supabase (or local slug)
  name: string;
  type: VenueType;
  address: string;
  borough: Borough;
  neighborhood?: string;            // e.g. "Astoria", "Jackson Heights"
  lat?: number;
  lng?: number;
  googlePlaceId?: string;           // for Maps embed + verification
  why: string;                      // why this venue for this community
  mustOrder: string;
  atmosphere: string;               // single evocative word
  countryAssociations: string[];    // which country guides feature this venue
  isVerified: boolean;              // has been manually verified as open
  verifiedAt?: string;              // ISO date string
  isActive: boolean;                // soft delete / temp closure
  featured?: boolean;               // show first in list
  website?: string;
  phone?: string;
  openingHours?: string;
}

// ─── Country Guide ────────────────────────────────────────────────────────────

export interface BoroughGuide {
  highlight: string;
  venues: Venue[];
}

export interface Guide {
  headline: string;
  vibe: string;
  boroughs: Record<Borough, BoroughGuide>;
  insider: string;
  chant: string;
}

export interface Country {
  name: string;
  flag: string;           // emoji
  colors: string[];       // hex colors for theming — first usable one = accent
}

// ─── Schedule ─────────────────────────────────────────────────────────────────

export interface Match {
  id: number;
  date: string;           // "Sat Jun 13"
  dateFull: string;       // ISO datetime string for countdown
  time: string;           // "6:00 PM ET"
  team1: string;
  team2: string;
  flag1: string;
  flag2: string;
  stage: string;          // "Group C", "Round of 32", "THE FINAL"
  color1: string;
  color2: string;
}

// ─── Neighborhood ─────────────────────────────────────────────────────────────

export interface Neighborhood {
  id: string;
  name: string;
  borough: Borough;
  emoji: string;
  tagline: string;
  accent: string;
  flags: string[];
  countries: string;
  subway: string;
  mustEat: string;
  mustDo: string;
  insider: string;
  blurb: string;
}

// ─── Transit ──────────────────────────────────────────────────────────────────

export interface TransitRoute {
  from: string;
  via: string;
  icon: string;
  time: string;
  cost: string;
  tip: string;
  color: string;
}

// ─── Supabase DB Types (mirrors your table schema) ────────────────────────────

export interface DbVenue {
  id: string;
  name: string;
  type: VenueType;
  address: string;
  borough: Borough;
  neighborhood: string | null;
  lat: number | null;
  lng: number | null;
  google_place_id: string | null;
  why: string;
  must_order: string;
  atmosphere: string;
  country_associations: string[];
  is_verified: boolean;
  verified_at: string | null;
  is_active: boolean;
  featured: boolean;
  website: string | null;
  phone: string | null;
  opening_hours: string | null;
  created_at: string;
  updated_at: string;
}

// Helper to map DB row → app type
export function dbVenueToVenue(row: DbVenue): Venue {
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    address: row.address,
    borough: row.borough,
    neighborhood: row.neighborhood ?? undefined,
    lat: row.lat ?? undefined,
    lng: row.lng ?? undefined,
    googlePlaceId: row.google_place_id ?? undefined,
    why: row.why,
    mustOrder: row.must_order,
    atmosphere: row.atmosphere,
    countryAssociations: row.country_associations,
    isVerified: row.is_verified,
    verifiedAt: row.verified_at ?? undefined,
    isActive: row.is_active,
    featured: row.featured,
    website: row.website ?? undefined,
    phone: row.phone ?? undefined,
    openingHours: row.opening_hours ?? undefined,
  };
}
