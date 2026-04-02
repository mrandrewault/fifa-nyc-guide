import { createClient } from '@supabase/supabase-js';
import type { DbVenue, Venue, Borough } from '@/types';
import { dbVenueToVenue } from '@/types';

// ─── Supabase Client ──────────────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Venue Queries ────────────────────────────────────────────────────────────

/**
 * Fetch all active venues for a given country, optionally filtered by borough.
 * Falls back to local hardcoded data if Supabase isn't configured.
 *
 * The `featured` flag sorts featured venues first.
 * Within a borough, venues are sorted: featured → type (watch party, bar, restaurant, cultural).
 */
export async function getVenuesForCountry(
  countryName: string,
  borough?: Borough
): Promise<Venue[]> {
  if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL') {
    // Supabase not yet configured — return empty (hardcoded data used as fallback)
    return [];
  }

  let query = supabase
    .from('venues')
    .select('*')
    .eq('is_active', true)
    .contains('country_associations', [countryName])
    .order('featured', { ascending: false })
    .order('name');

  if (borough) {
    query = query.eq('borough', borough);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase venue fetch error:', error);
    return [];
  }

  return (data as DbVenue[]).map(dbVenueToVenue);
}

/**
 * Fetch all venues for a specific borough (used in neighborhood guides).
 */
export async function getVenuesForBorough(borough: Borough): Promise<Venue[]> {
  if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL') return [];

  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .eq('is_active', true)
    .eq('borough', borough)
    .order('featured', { ascending: false });

  if (error) { console.error(error); return []; }
  return (data as DbVenue[]).map(dbVenueToVenue);
}

/**
 * Search venues by name (for a future search feature).
 */
export async function searchVenues(query: string): Promise<Venue[]> {
  if (!supabaseUrl || supabaseUrl === 'YOUR_SUPABASE_URL') return [];

  const { data, error } = await supabase
    .from('venues')
    .select('*')
    .eq('is_active', true)
    .ilike('name', `%${query}%`)
    .limit(20);

  if (error) { console.error(error); return []; }
  return (data as DbVenue[]).map(dbVenueToVenue);
}
