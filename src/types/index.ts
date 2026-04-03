// ─── Core Types ──────────────────────────────────────────────────────────────
 
export type Borough = 'Manhattan' | 'Brooklyn' | 'Queens' | 'The Bronx' | 'Staten Island';
export type VenueType = 'bar' | 'restaurant' | 'cultural' | 'watch party';
export type AppTab = 'guide' | 'schedule' | 'stadium' | 'neighborhoods' | 'transit' | 'planner';
 
// ─── Venue ────────────────────────────────────────────────────────────────────
 
export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  address: string;
  borough: Borough;
  neighborhood?: string;
  lat?: number;
  lng?: number;
  googlePlaceId?: string;
  why: string;
  mustOrder: string;
  atmosphere: string;
  countryAssociations: string[];
  isVerified: boolean;
  verifiedAt?: string;
  isActive: boolean;
  featured?: boolean;
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
  flag: string;
  colors: string[];
}
 
// ─── Schedule ─────────────────────────────────────────────────────────────────
 
export interface Match {
  id: number;
  date: string;
  dateFull: string;
  time: string;
  team1: string;
  team2: string;
  flag1: string;
  flag2: string;
  stage: string;
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
 
// ─── Supabase DB Types ────────────────────────────────────────────────────────
 
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
 
