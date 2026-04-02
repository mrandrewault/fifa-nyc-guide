/**
 * venues.ts — Hardcoded venue data (fallback when Supabase isn't configured).
 *
 * IMPORTANT: This is a STARTER DATASET, not a complete list.
 *
 * ON VENUE COUNT:
 * The artifact prototype shows 2 venues per borough per country by design —
 * mobile screens are small and a curated short list beats a long uncurated one.
 * But the data model supports unlimited venues.
 *
 * RECOMMENDATION:
 * - 3–5 featured venues per borough for large diaspora countries (Brazil, Mexico, Colombia, etc.)
 * - 2–3 for mid-size communities (England, Germany, Japan, etc.)
 * - 1–2 general soccer bars for countries with small NYC communities
 * - Use the `featured: true` flag for the top picks shown by default
 * - Additional venues appear under "Show more →"
 *
 * HOW TO EXPAND:
 * Option A (easy): Add entries to the VENUES array below.
 * Option B (recommended for production): Import into Supabase and use
 *   the getVenuesForCountry() function from lib/supabase.ts.
 *   Supabase lets you add/update venues without redeploying the app.
 *
 * SUPABASE SCHEMA (run in the SQL editor):
 * See /supabase/migrations/001_create_venues.sql
 */

import type { Venue } from '@/types';

export const VENUES: Venue[] = [

  // ─── BRAZIL ──────────────────────────────────────────────────────────────

  {
    id: 'brazil-smithfield-hall',
    name: "Smithfield Hall",
    type: 'bar',
    address: "435 W 15th St, Chelsea, Manhattan",
    borough: 'Manhattan',
    neighborhood: 'Chelsea',
    why: "One of NYC's best soccer bars — packed for every Seleção match, Brazilian flags everywhere on game days.",
    mustOrder: "Caipirinha (they make them)",
    atmosphere: "Electric",
    countryAssociations: ['Brazil', 'United States', 'England', 'Mexico'],
    isVerified: true,
    verifiedAt: '2026-03-01',
    isActive: true,
    featured: true,
  },
  {
    id: 'brazil-football-factory',
    name: "Football Factory at Legends",
    type: 'watch party',
    address: "6 W 33rd St, Midtown, Manhattan",
    borough: 'Manhattan',
    neighborhood: 'Midtown',
    why: "NYC's premier dedicated soccer bar — 20+ screens, 30+ supporter clubs, official World Cup 2026 HQ.",
    mustOrder: "Craft beer",
    atmosphere: "Stadium",
    countryAssociations: ['Brazil', 'United States', 'England', 'Germany', 'France', 'Netherlands', 'Colombia', 'Argentina'],
    isVerified: true,
    verifiedAt: '2026-03-01',
    isActive: true,
    featured: true,
  },
  {
    id: 'brazil-slainte',
    name: "Sláinte Bar & Lounge",
    type: 'bar',
    address: "304 Bowery, Nolita, Manhattan",
    borough: 'Manhattan',
    neighborhood: 'Nolita',
    why: "International soccer hub with multiple screens — Brazilian fans pack this Nolita bar for every Seleção match.",
    mustOrder: "Guinness or caipirinha",
    atmosphere: "International",
    countryAssociations: ['Brazil', 'Colombia', 'France', 'Ireland'],
    isVerified: true,
    verifiedAt: '2026-02-15',
    isActive: true,
    featured: false,
  },
  {
    id: 'brazil-brazil-brazil-brooklyn',
    name: "Brazil Brazil Restaurant",
    type: 'restaurant',
    address: "4th Ave, Bay Ridge, Brooklyn",
    borough: 'Brooklyn',
    neighborhood: 'Bay Ridge',
    why: "Packed with the Brooklyn Brazilian diaspora on match days, rodízio all night, community atmosphere.",
    mustOrder: "Picanha",
    atmosphere: "Festive",
    countryAssociations: ['Brazil'],
    isVerified: false,
    isActive: true,
    featured: true,
  },
  {
    id: 'brazil-boteco-brooklyn',
    name: "Boteco Brooklyn",
    type: 'bar',
    address: "Atlantic Ave, Boerum Hill, Brooklyn",
    borough: 'Brooklyn',
    neighborhood: 'Boerum Hill',
    why: "Casual Brazilian bar, caipirinhas flowing, soccer always on the screen, neighborhood feel.",
    mustOrder: "Pastel de queijo",
    atmosphere: "Neighborhood",
    countryAssociations: ['Brazil'],
    isVerified: false,
    isActive: true,
    featured: false,
  },
  {
    id: 'brazil-banter-bar',
    name: "Banter Bar",
    type: 'bar',
    address: "132 Havemeyer St, Williamsburg, Brooklyn",
    borough: 'Brooklyn',
    neighborhood: 'Williamsburg',
    why: "Named one of best 10 soccer bars in America by CNN — international crowd, Brazilian fans welcome.",
    mustOrder: "Craft beer",
    atmosphere: "Soccer-first",
    countryAssociations: ['Brazil', 'England', 'United States'],
    isVerified: true,
    verifiedAt: '2026-02-15',
    isActive: true,
    featured: false,
  },
  {
    id: 'brazil-sabor-tropical',
    name: "Sabor Tropical",
    type: 'restaurant',
    address: "36th Ave, Astoria, Queens",
    borough: 'Queens',
    neighborhood: 'Astoria',
    why: "The community gathers here — owners hang Brazil flags on match day, samba on the speakers.",
    mustOrder: "Feijoada",
    atmosphere: "Authentic",
    countryAssociations: ['Brazil'],
    isVerified: false,
    isActive: true,
    featured: true,
  },
  {
    id: 'brazil-green-field',
    name: "Green Field Churrascaria",
    type: 'restaurant',
    address: "108-01 Northern Blvd, Corona, Queens",
    borough: 'Queens',
    neighborhood: 'Corona',
    why: "NYC's legendary all-you-can-eat Brazilian BBQ — a post-victory tradition for the Queens community.",
    mustOrder: "All the meat (rodízio)",
    atmosphere: "Abundant",
    countryAssociations: ['Brazil'],
    isVerified: true,
    verifiedAt: '2026-01-10',
    isActive: true,
    featured: true,
  },
  {
    id: 'brazil-soccer-republic-queens',
    name: "Soccer Republic at Bar 43",
    type: 'bar',
    address: "43-02 Queens Blvd, Sunnyside, Queens",
    borough: 'Queens',
    neighborhood: 'Sunnyside',
    why: "Queens' dedicated soccer bar, named one of the best in the country — Brazilian fans found here for every match.",
    mustOrder: "Wings + draft beer",
    atmosphere: "Soccer-first",
    countryAssociations: ['Brazil', 'Colombia', 'Mexico', 'United States'],
    isVerified: true,
    verifiedAt: '2026-02-01',
    isActive: true,
    featured: false,
  },
  {
    id: 'brazil-brasilia-bronx',
    name: "Brasília Grill",
    type: 'restaurant',
    address: "Arthur Avenue area, The Bronx",
    borough: 'The Bronx',
    neighborhood: 'Belmont',
    why: "Local Brazilian expats' favorite in the Bronx — unpretentious, loud TV, full bleacher energy.",
    mustOrder: "Churrasco misto",
    atmosphere: "Loud",
    countryAssociations: ['Brazil'],
    isVerified: false,
    isActive: true,
    featured: true,
  },
  {
    id: 'brazil-rio-staten-island',
    name: "Rio Restaurant",
    type: 'restaurant',
    address: "Victory Blvd, Staten Island",
    borough: 'Staten Island',
    neighborhood: 'Tompkinsville',
    why: "Staten Island Brazilians' home base — cookouts on the sidewalk on match days.",
    mustOrder: "Coxinha",
    atmosphere: "Homey",
    countryAssociations: ['Brazil'],
    isVerified: false,
    isActive: true,
    featured: true,
  },

  // ─── ENGLAND ─────────────────────────────────────────────────────────────
  // (showing that a major soccer country also gets more venues)

  {
    id: 'england-football-factory',
    name: "Football Factory at Legends",
    type: 'watch party',
    address: "6 W 33rd St, Midtown, Manhattan",
    borough: 'Manhattan',
    neighborhood: 'Midtown',
    why: "NYC's dedicated soccer bar with 30+ supporter clubs — England fans have a permanent home section here for 2026.",
    mustOrder: "Guinness",
    atmosphere: "Legendary",
    countryAssociations: ['England', 'Brazil', 'United States', 'Germany'],
    isVerified: true,
    verifiedAt: '2026-03-01',
    isActive: true,
    featured: true,
  },
  {
    id: 'england-smithfield',
    name: "Smithfield Hall",
    type: 'bar',
    address: "435 W 15th St, Chelsea, Manhattan",
    borough: 'Manhattan',
    neighborhood: 'Chelsea',
    why: "One of NYC's best soccer bars — home to Manchester United and West Ham fans, England matches fill every corner.",
    mustOrder: "Stella Artois",
    atmosphere: "Pub perfect",
    countryAssociations: ['England', 'Brazil'],
    isVerified: true,
    verifiedAt: '2026-03-01',
    isActive: true,
    featured: true,
  },
  {
    id: 'england-pony-bar',
    name: "The Pony Bar",
    type: 'bar',
    address: "637 10th Ave, Hell's Kitchen, Manhattan",
    borough: 'Manhattan',
    neighborhood: "Hell's Kitchen",
    why: "English pub feel, screens everywhere, opens at 6am for European kickoffs.",
    mustOrder: "Craft ale",
    atmosphere: "Reliable",
    countryAssociations: ['England'],
    isVerified: false,
    isActive: true,
    featured: false,
  },
  {
    id: 'england-banter-bar',
    name: "Banter Bar",
    type: 'bar',
    address: "132 Havemeyer St, Williamsburg, Brooklyn",
    borough: 'Brooklyn',
    neighborhood: 'Williamsburg',
    why: "CNN's top 10 soccer bars in America — Williamsburg English expats' hub for Three Lions matches.",
    mustOrder: "Whisky",
    atmosphere: "Indie",
    countryAssociations: ['England', 'United States'],
    isVerified: true,
    verifiedAt: '2026-02-15',
    isActive: true,
    featured: true,
  },
  {
    id: 'england-pacific-standard',
    name: "Pacific Standard",
    type: 'bar',
    address: "82 4th Ave, Park Slope, Brooklyn",
    borough: 'Brooklyn',
    neighborhood: 'Park Slope',
    why: "Brooklyn's reliable soccer pub — England Supporters Club NYC meets here for every match.",
    mustOrder: "IPA",
    atmosphere: "Reliable",
    countryAssociations: ['England'],
    isVerified: false,
    isActive: true,
    featured: false,
  },

  // ─── GERMANY ─────────────────────────────────────────────────────────────

  {
    id: 'germany-smithfield',
    name: "Smithfield Hall",
    type: 'bar',
    address: "435 W 15th St, Chelsea, Manhattan",
    borough: 'Manhattan',
    neighborhood: 'Chelsea',
    why: "NYC's top soccer bar with a dedicated Germany section — World Cup 2026 is reserved for DFB matches.",
    mustOrder: "Pilsner",
    atmosphere: "Match-day",
    countryAssociations: ['Germany', 'Brazil', 'England'],
    isVerified: true,
    verifiedAt: '2026-03-01',
    isActive: true,
    featured: true,
  },
  {
    id: 'germany-mchalles',
    name: "McHale's Bar & Grill",
    type: 'bar',
    address: "251 W 51st St, Midtown, Manhattan",
    borough: 'Manhattan',
    neighborhood: 'Midtown',
    why: "Midtown's dedicated German soccer pub — home to Borussia Dortmund NYC supporters, Die Mannschaft matches fill it.",
    mustOrder: "Currywurst",
    atmosphere: "German-Irish",
    countryAssociations: ['Germany'],
    isVerified: true,
    verifiedAt: '2026-02-01',
    isActive: true,
    featured: true,
  },
  {
    id: 'germany-radegast',
    name: "Radegast Hall & Biergarten",
    type: 'bar',
    address: "113 N 3rd St, Williamsburg, Brooklyn",
    borough: 'Brooklyn',
    neighborhood: 'Williamsburg',
    why: "Massive beer hall with Bavarian character — Germany matches here feel like Munich.",
    mustOrder: "Dunkel",
    atmosphere: "Bierhalle",
    countryAssociations: ['Germany', 'Netherlands'],
    isVerified: true,
    verifiedAt: '2026-03-01',
    isActive: true,
    featured: true,
  },

  // ─── Add more countries following the same pattern ────────────────────────
  // Each venue needs: countryAssociations array (can be multiple countries),
  // isVerified flag, and featured: true/false for display priority.
  //
  // Total venues to aim for (production target):
  // Large diaspora countries: 8–12 venues each (Brazil, Mexico, Colombia, etc.)
  // Major soccer nations: 5–8 venues each (England, Germany, France, Italy, etc.)
  // Smaller communities: 3–5 venues each (everyone else)
  //
  // A venue like Football Factory at Legends should appear in ALL country guides
  // since it hosts every country's supporters groups.
];

/**
 * Get venues for a given country from the hardcoded data.
 * Returns venues sorted by: featured first, then type priority.
 */
export function getHardcodedVenuesForCountry(
  countryName: string,
  borough?: string
): Venue[] {
  const venues = VENUES.filter(v =>
    v.isActive &&
    v.countryAssociations.includes(countryName) &&
    (!borough || v.borough === borough)
  );

  // Sort: featured first, then by type
  const typeOrder: Record<string, number> = {
    'watch party': 0, bar: 1, restaurant: 2, cultural: 3,
  };

  return venues.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (typeOrder[a.type] ?? 9) - (typeOrder[b.type] ?? 9);
  });
}
