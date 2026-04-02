# FIFA NYC Fan Guide

> Your borough-by-borough guide to watching FIFA World Cup 2026 in New York City.
> Built as a mobile-first web app, deployable to iOS/Android via Capacitor.

---

## What This Is

A multi-section NYC travel companion for the 1.2M+ international fans expected for
FIFA World Cup 2026 at MetLife Stadium. Features:

- **Country Guide** — bars, restaurants, cultural spots for 43 nations (with diaspora community context)
- **Match Schedule** — all 8 MetLife Stadium matches with live countdowns
- **Stadium Guide** — MetLife info: transit, cashless policy, what to bring
- **Neighborhoods** — 10 NYC ethnic neighborhood deep-dives (Jackson Heights, Arthur Ave, Astoria, etc.)
- **Transit** — route guides from every borough to MetLife + NYC subway essentials

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router, static export) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (venues table, optional) |
| Mobile | Capacitor 6 (iOS + Android) |
| Animations | Framer Motion |
| Maps | Google Maps embed (no API key required for basic embed) |

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials (optional — app works without it)

# 3. Run development server
npm run dev
# → http://localhost:3000
```

---

## Environment Variables

Create `.env.local`:

```env
# Supabase (optional — app uses hardcoded data if not set)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

The app works fully without Supabase — it falls back to the hardcoded venue data
in `src/data/venues.ts`. Supabase lets you add/edit venues without redeploying.

---

## Database Setup (Supabase)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run:
   ```
   supabase/migrations/001_create_venues.sql
   ```
3. Import your venue data via the **Table Editor** or the Supabase CSV importer
4. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`

### Venue Data Model

The key design decision: **venues are associated with multiple countries**.

A venue like Football Factory at Legends appears in 15+ country guides because
`country_associations = ['Brazil', 'England', 'Germany', ...]`.

This means:
- One venue row, many guide appearances
- Update a venue once, updates everywhere
- Easy to add new countries without creating duplicate data

### How Many Venues Per Country?

This is a product/UX decision, not a technical one. Recommended targets:

| Community Size | Examples | Venues per borough |
|----------------|---------|-------------------|
| Large diaspora | Brazil, Mexico, Colombia, Ecuador | 4–8 |
| Major soccer nation | England, Germany, France, Italy | 3–5 |
| Mid-size community | Japan, South Korea, Nigeria, Morocco | 2–4 |
| Small community | Sweden, Norway, Croatia, Denmark | 1–3 |

The `featured: true` flag controls which venues show by default.
Users can tap "Show more →" to see the full list.

---

## iOS App (Capacitor)

### Prerequisites
- Apple Developer Account ($99/year) ✓ (you have this)
- Xcode 15+ installed on Mac
- Node.js 18+

### Build for iOS

```bash
# Step 1: Build Next.js as static export
npm run build
# → creates /out directory

# Step 2: Sync to Capacitor
npx cap sync ios

# Step 3: Open in Xcode
npx cap open ios
```

### In Xcode:
1. Select your Team (Apple Developer account)
2. Set Bundle Identifier: `com.yourcompany.fifanycguide`
   (must match `capacitor.config.ts` → `appId`)
3. Set Display Name: `FIFA NYC Guide`
4. Add app icons to `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
5. **Product → Archive** → Distribute App → App Store Connect

### Required Assets for App Store

| Asset | Size |
|-------|------|
| App Icon | 1024×1024 PNG (no transparency) |
| iPhone screenshots | 6.7" (1290×2796) + 5.5" (1242×2208) |
| iPad screenshots | 12.9" (2048×2732) — required even if iPhone-only |
| App Preview video | Optional but increases conversion |

### App Store Metadata to Prepare

- **App Name:** FIFA NYC Guide (or "NYC Fan Guide: World Cup 2026")
- **Subtitle:** Your borough-by-borough World Cup companion
- **Description:** Focus on "1.2M international fans," "find your community," "43 nations"
- **Keywords:** world cup 2026, nyc guide, metlife stadium, soccer bars nyc, fifa fan guide
- **Category:** Travel (primary), Sports (secondary)
- **Age Rating:** 4+ (or 17+ if you mention alcohol)

---

## Android App (Capacitor)

```bash
npx cap add android
npx cap open android
# → opens Android Studio
# Build → Generate Signed Bundle/APK → Google Play
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with PWA meta tags
│   ├── page.tsx            # Main app (tab router)
│   └── globals.css         # Global styles + CSS variables
│
├── components/
│   ├── BottomNav.tsx       # 5-tab bottom navigation
│   ├── guide/
│   │   └── GuideTab.tsx    # Country selector + venue guide
│   ├── schedule/
│   │   └── ScheduleTab.tsx # MetLife match schedule + countdowns
│   ├── stadium/
│   │   └── StadiumTab.tsx  # MetLife Stadium info cards
│   ├── neighborhoods/
│   │   └── NeighborhoodsTab.tsx  # Expandable neighborhood guides
│   ├── transit/
│   │   └── TransitTab.tsx  # Borough → MetLife route cards
│   └── shared/
│       └── VenueList.tsx   # Venue cards + "show more" pattern
│
├── data/
│   ├── venues.ts           # Hardcoded venue data (Supabase fallback)
│   ├── countries.ts        # Country list with flags + brand colors
│   ├── guides.ts           # Country-specific guide text + insider tips
│   ├── schedule.ts         # MetLife match schedule
│   ├── neighborhoods.ts    # Neighborhood deep-dive data
│   └── transit.ts          # Transit route data
│
├── lib/
│   ├── supabase.ts         # Supabase client + venue query functions
│   └── utils.ts            # Color helpers, date utils, maps URLs
│
└── types/
    └── index.ts            # All TypeScript types + Supabase mapper
```

---

## Expanding to a Broader Travel App

This World Cup guide is designed to be **version 1 of a larger platform**: a
community-curated travel app for NYC organized by cultural identity.

The core concept scales to:
- **Any major event** in NYC (US Open, Marathon, Pride, etc.)
- **Permanent neighborhood guides** organized by ethnicity/culture
- **User-submitted venues** (community knows their own spots better than we do)
- **Seasonal guides** ("Best spots to watch El Clásico in NYC")
- **Other cities** (same architecture, different data)

The Supabase `country_associations` pattern is the key architectural decision
that makes this scalable — venues belong to communities, not to a single country.

---

## Roadmap

- [ ] v1.0 — World Cup guide (what you have now)
- [ ] v1.1 — User "Save" venue feature (Supabase auth)
- [ ] v1.2 — Push notifications for match day reminders
- [ ] v1.3 — User-submitted venue suggestions (moderated)
- [ ] v1.4 — "Near me" venue finder (Capacitor Geolocation)
- [ ] v2.0 — Expand beyond World Cup to year-round NYC cultural guide
- [ ] v2.1 — Other World Cup host cities (LA, Dallas, Miami, Boston)

---

## Venue Verification Process

For production, run a verification pass every 30–60 days:

1. Pull all `is_verified = false` venues from Supabase
2. Cross-reference against Google Places API (`google_place_id` column)
3. Update `is_active = false` for permanently closed venues
4. Update `is_verified = true` and `verified_at = NOW()` for confirmed open venues

Google Places API "permanently_closed" field makes this automatable.
