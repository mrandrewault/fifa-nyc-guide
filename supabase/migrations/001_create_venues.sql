-- FIFA NYC Guide: Venues table
-- Run this in the Supabase SQL editor to set up your database.
--
-- After running, you can:
-- 1. Import venue data via the Supabase Table Editor (paste CSV)
-- 2. Use the Supabase dashboard to add/edit venues without redeploying
-- 3. Enable Row Level Security if you want public read, admin write

CREATE TABLE IF NOT EXISTS venues (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  type                TEXT NOT NULL CHECK (type IN ('bar', 'restaurant', 'cultural', 'watch party')),
  address             TEXT NOT NULL,
  borough             TEXT NOT NULL CHECK (borough IN ('Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island')),
  neighborhood        TEXT,
  lat                 DECIMAL(9, 6),
  lng                 DECIMAL(9, 6),
  google_place_id     TEXT,             -- from Google Places API for map embed + verification
  why                 TEXT NOT NULL,    -- why this venue for this community
  must_order          TEXT NOT NULL,
  atmosphere          TEXT NOT NULL,    -- single word
  country_associations TEXT[] NOT NULL DEFAULT '{}',  -- e.g. '{Brazil,Colombia}'
  is_verified         BOOLEAN NOT NULL DEFAULT false,
  verified_at         TIMESTAMPTZ,
  is_active           BOOLEAN NOT NULL DEFAULT true,
  featured            BOOLEAN NOT NULL DEFAULT false,
  website             TEXT,
  phone               TEXT,
  opening_hours       TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for the primary query pattern: "venues for country X in borough Y"
CREATE INDEX IF NOT EXISTS idx_venues_country_assoc
  ON venues USING GIN (country_associations);

CREATE INDEX IF NOT EXISTS idx_venues_borough
  ON venues (borough);

CREATE INDEX IF NOT EXISTS idx_venues_active
  ON venues (is_active);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER venues_updated_at
  BEFORE UPDATE ON venues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security: public read, only authenticated admins can write
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access"
  ON venues FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated write access"
  ON venues FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Sample data: Football Factory at Legends (appears in many country guides)
INSERT INTO venues (
  name, type, address, borough, neighborhood,
  why, must_order, atmosphere,
  country_associations, is_verified, verified_at, is_active, featured
) VALUES (
  'Football Factory at Legends',
  'watch party',
  '6 W 33rd St, Midtown, Manhattan',
  'Manhattan',
  'Midtown',
  'NYC''s premier dedicated soccer bar — 20+ screens, 30+ supporter clubs, official World Cup 2026 HQ.',
  'Craft beer',
  'Stadium',
  ARRAY['Brazil','Mexico','Colombia','Argentina','England','Germany','France','Italy',
        'Spain','Portugal','Netherlands','Japan','South Korea','United States',
        'Nigeria','Morocco','Senegal','Norway','Ecuador'],
  true,
  NOW(),
  true,
  true
);

INSERT INTO venues (
  name, type, address, borough, neighborhood,
  why, must_order, atmosphere,
  country_associations, is_verified, verified_at, is_active, featured
) VALUES (
  'Smithfield Hall',
  'bar',
  '435 W 15th St, Chelsea, Manhattan',
  'Manhattan',
  'Chelsea',
  'One of NYC''s best soccer bars — welcoming to fans of every nation, multiple screens, strong soccer culture.',
  'Ale on tap',
  'Electric',
  ARRAY['Brazil','England','Germany','United States','France','Colombia','Argentina'],
  true,
  NOW(),
  true,
  true
);
