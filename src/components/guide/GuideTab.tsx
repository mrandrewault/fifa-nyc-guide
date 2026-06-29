'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import type { Country } from '@/types';
import {
  COUNTRIES,
  GUIDE_TEXT,
  METLIFE_TEAMS,
  NOT_IN_2026,
  NOT_IN_2026_NEIGHBORHOODS,
  getGenericGuideText,
  getNotIn2026GenericGuideText,
} from '@/data/countries';
import { VENUES } from '@/data/venues';
import { safeAccent, textOn, sortVenues } from '@/lib/utils';
import VenueList from '@/components/shared/VenueList';
import EmailSignup from '@/components/shared/EmailSignup';
import MySpots from '@/components/shared/MySpots';
import SubmitVenueCTA from '@/components/SubmitVenueCTA';
import ShareButton from '@/components/ShareButton';
import ShopCallout from '@/components/ShopCallout';

const MapView = dynamic(() => import('@/components/shared/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full rounded flex items-center justify-center" style={{ height: '420px', background: '#111', border: '1px solid #222' }}>
      <p className="text-zinc-600 text-sm">Loading map...</p>
    </div>
  ),
});

const BOROUGHS = ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island'] as const;
const BOROUGH_EMOJI: Record<string, string> = {
  Manhattan: '🗽', Brooklyn: '🌉', Queens: '✈️', 'The Bronx': '🐆', 'Staten Island': '⛴️',
};
const FLOATING_FLAGS = ['🇧🇷', '🇲🇽', '🇩🇪', '🇫🇷', '🇦🇷', '🇯🇵'];
type ViewMode = 'list' | 'map';

// Split countries into three groups for the dropdown:
//   1. MetLife teams (playing AT MetLife specifically)
//   2. All other 2026 qualifiers
//   3. NYC communities not playing in 2026 (Italy, Nigeria, etc.)
const METLIFE_COUNTRIES = COUNTRIES.filter(c => METLIFE_TEAMS.includes(c.name));
const QUALIFIED_NON_METLIFE = COUNTRIES.filter(
  c => !METLIFE_TEAMS.includes(c.name) && !NOT_IN_2026.includes(c.name)
);
const NOT_IN_2026_COUNTRIES = COUNTRIES.filter(c => NOT_IN_2026.includes(c.name));

/**
 * Returns the best borough to display first when a user picks a country.
 * Counts ONLY country-specific venues (≤2 country associations) so catch-all
 * venues like Football Factory and FIFA Fan Villages don't skew the default
 * toward Manhattan for every country. Mirrors the specificity tier from
 * sortVenues() in src/lib/utils.ts.
 */
function getDefaultBorough(countryName: string): string {
  const SPECIFICITY_THRESHOLD = 2;
  const venuesForCountry = VENUES.filter(
    v =>
      v.isActive &&
      v.countryAssociations.includes(countryName) &&
      v.countryAssociations.length <= SPECIFICITY_THRESHOLD
  );

  if (venuesForCountry.length === 0) return 'Manhattan';

  const counts = BOROUGHS.map(b => ({
    borough: b as string,
    count: venuesForCountry.filter(v => v.borough === b).length,
  }));
  counts.sort((a, b) => b.count - a.count);
  return counts[0].borough;
}

export default function GuideTab() {
  const [selected, setSelected] = useState<Country | null>(null);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeBorough, setActiveBorough] = useState<string>('Manhattan');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const accent = safeAccent(selected?.colors ?? []);
  const isNotIn2026 = selected ? NOT_IN_2026.includes(selected.name) : false;

  // Pick the right guide-text source based on whether the country is qualified.
  // Order of preference:
  //   1. Rich GUIDE_TEXT entry (Italy, Nigeria, Brazil, etc. — works for both groups)
  //   2. getNotIn2026GenericGuideText() — for non-qualifiers without rich content
  //   3. getGenericGuideText() — for qualifiers without rich content (Panama, etc.)
  const guideText = selected
    ? (GUIDE_TEXT[selected.name] ??
        (isNotIn2026
          ? getNotIn2026GenericGuideText(selected.name)
          : getGenericGuideText(selected.name)))
    : null;

  const allVenues = selected ? sortVenues(VENUES.filter(v => v.isActive && v.countryAssociations.includes(selected.name))) : [];
  const boroughVenues = allVenues.filter(v => v.borough === activeBorough);

  // Filtered results for search across all three groups
  const searchLower = search.toLowerCase();
  const filteredMetLife = METLIFE_COUNTRIES.filter(c => c.name.toLowerCase().includes(searchLower));
  const filteredQualified = QUALIFIED_NON_METLIFE.filter(c => c.name.toLowerCase().includes(searchLower));
  const filteredNotIn2026 = NOT_IN_2026_COUNTRIES.filter(c => c.name.toLowerCase().includes(searchLower));

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        if (selected) setSearch(selected.name); else setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [selected]);

  function pickCountry(c: Country) {
    setSelected(c); setSearch(c.name); setShowDropdown(false);
    setActiveBorough(getDefaultBorough(c.name)); setViewMode('list');
  }

  // Build the "not in 2026" banner copy for the selected country.
  // Personalized neighborhood namedrops feel warmer than generic phrasing.
  const notIn2026BannerText = selected && isNotIn2026
    ? `${selected.name} didn't qualify for World Cup 2026 — but ${NOT_IN_2026_NEIGHBORHOODS[selected.name] ?? 'the NYC scene'} is here whenever you want it.`
    : '';

  return (
    <div className="px-4 pb-6">
      {/* Header */}
      <div className="pt-8 pb-6">
        <p className="label text-[10px] mb-2 transition-colors duration-500" style={{ color: accent, letterSpacing: '0.25em' }}>
          FIFA World Cup 2026 · New York City · Fan Guide
        </p>
        <h1 className="heading mb-3" style={{ fontSize: 'clamp(34px, 8vw, 58px)', lineHeight: '0.9' }}>
          YOUR NYC.{' '}
          <span className="transition-colors duration-500" style={{ color: accent }}>YOUR CITY.</span>
        </h1>
        <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
          Find your people. Your bars. Your food. Borough by borough, for fans of every nation.
        </p>
      </div>

      {/* Country selector */}
      <div ref={dropdownRef} className="relative mb-6">
        <div
          className="flex items-center gap-3 rounded px-4 py-3 transition-colors duration-300"
          style={{ background: '#161616', border: `1px solid ${showDropdown || selected ? accent : '#333'}` }}
        >
          {selected && !showDropdown && <span className="text-2xl leading-none flex-shrink-0">{selected.flag}</span>}
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setShowDropdown(true); }}
            onFocus={() => { setSearch(''); setShowDropdown(true); }}
            placeholder={selected ? selected.name : 'Search your country...'}
            className="label flex-1 bg-transparent outline-none text-white text-base placeholder-zinc-600"
          />
          <span className="text-zinc-600 text-xs">▼</span>
        </div>

        {showDropdown && (
          <div
            className="absolute left-0 right-0 z-50 mt-1 max-h-96 overflow-y-auto rounded border border-zinc-800 shadow-2xl"
            style={{ background: '#161616', top: '100%' }}
          >
            {/* MetLife section */}
            {filteredMetLife.length > 0 && (
              <>
                <div
                  className="px-4 py-2 label text-[9px] border-b border-zinc-900"
                  style={{ color: '#E8C84A', letterSpacing: '0.2em', background: '#E8C84A0A' }}
                >
                  🏟 Playing at MetLife Stadium
                </div>
                {filteredMetLife.map(c => (
                  <button
                    key={c.name}
                    onClick={() => pickCountry(c)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-zinc-800 border-b border-zinc-900"
                  >
                    <span className="text-xl">{c.flag}</span>
                    <span className="label text-sm text-white">{c.name}</span>
                    <span className="ml-auto label text-[9px] text-zinc-600">NYC match</span>
                  </button>
                ))}
              </>
            )}

            {/* Other 2026 qualifiers section */}
            {filteredQualified.length > 0 && (
              <>
                <div
                  className="px-4 py-2 label text-[9px] border-b border-zinc-900"
                  style={{ color: '#888', letterSpacing: '0.2em', background: '#111' }}
                >
                  🌍 Playing in World Cup 2026
                </div>
                {filteredQualified.map(c => (
                  <button
                    key={c.name}
                    onClick={() => pickCountry(c)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-zinc-800 border-b border-zinc-900"
                  >
                    <span className="text-xl">{c.flag}</span>
                    <span className="label text-sm text-white">{c.name}</span>
                  </button>
                ))}
              </>
            )}

            {/* Not in 2026 section — communities still worth visiting */}
            {filteredNotIn2026.length > 0 && (
              <>
                <div
                  className="px-4 py-2 label text-[9px] border-b border-zinc-900"
                  style={{ color: '#666', letterSpacing: '0.2em', background: '#0A0A0A' }}
                >
                  🌐 NYC communities — not in 2026
                </div>
                {filteredNotIn2026.map(c => (
                  <button
                    key={c.name}
                    onClick={() => pickCountry(c)}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-zinc-800 border-b border-zinc-900"
                  >
                    <span className="text-xl opacity-70">{c.flag}</span>
                    <span className="label text-sm text-zinc-400">{c.name}</span>
                    <span className="ml-auto label text-[9px] text-zinc-700">not in 2026</span>
                  </button>
                ))}
              </>
            )}

            {filteredMetLife.length === 0 && filteredQualified.length === 0 && filteredNotIn2026.length === 0 && (
              <div className="px-4 py-3 text-sm text-zinc-600">No country found</div>
            )}
          </div>
        )}
      </div>

      {/* Guide content */}
      {selected && guideText ? (
        <div>
          {/* Not-in-2026 banner — appears at the very top of non-qualifier pages */}
          {isNotIn2026 && (
            <div className="mb-4 rounded p-3 flex items-start gap-3" style={{ background: '#1A1A1A', border: '1px solid #2A2A2A' }}>
              <span className="text-base flex-shrink-0 leading-none mt-0.5">🌐</span>
              <p className="text-[12px] text-zinc-400 leading-relaxed italic">
                {notIn2026BannerText}
              </p>
            </div>
          )}

          {/* Hero */}
          <div className="rounded p-5 mb-5" style={{ background: `linear-gradient(135deg, ${accent}20, ${accent}08)`, border: `1px solid ${accent}44` }}>
            <div className="flex items-start gap-4 flex-wrap">
              <span className="text-5xl leading-none">{selected.flag}</span>
              <div className="flex-1 min-w-0">
                <h2 className="heading mb-2 leading-tight" style={{ fontSize: 'clamp(18px, 4vw, 28px)', color: accent }}>
                  {guideText.headline}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">{guideText.vibe}</p>
                {guideText.chant && (
                  <div className="label inline-flex items-center gap-2 rounded px-3 py-1.5 text-[11px]" style={{ background: '#ffffff10', color: accent }}>
                    🎤 {guideText.chant}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Shop callout — country-specific, links to that country's tee on shop.golazo.nyc */}
          <ShopCallout country={selected.name} />

          {/* What to say */}
          {guideText.phrases && guideText.phrases.length > 0 && (
            <div className="mb-5 rounded p-4" style={{ background: '#0D0D0D', border: '1px solid #222' }}>
              <div className="label text-[9px] mb-1" style={{ color: accent, letterSpacing: '0.2em' }}>
                💬 Useful English phrases
              </div>
              <p className="text-[10px] text-zinc-600 mb-3">Say these in NYC — translation in your language below each one</p>
              <div className="grid grid-cols-2 gap-2">
                {guideText.phrases.map((p, i) => (
                  <div key={i} className="rounded p-2.5" style={{ background: '#161616', border: '1px solid #2A2A2A' }}>
                    <div className="text-sm font-semibold text-white leading-tight mb-1">{p.say}</div>
                    <div className="text-[10px] text-zinc-500 leading-relaxed">{p.means}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MetLife badge if applicable — only shows for qualifiers */}
          {METLIFE_TEAMS.includes(selected.name) && (
            <div className="mb-4 flex items-center gap-2 rounded px-3 py-2" style={{ background: '#E8C84A11', border: '1px solid #E8C84A33' }}>
              <span>🏟️</span>
              <span className="label text-[10px]" style={{ color: '#E8C84A', letterSpacing: '0.1em' }}>
                {selected.name} plays at MetLife Stadium — see Matches tab for schedule
              </span>
            </div>
          )}

          {/* View toggle */}
          <div className="flex gap-2 mb-4">
            {(['list', 'map'] as ViewMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="label flex-1 rounded py-2.5 text-xs transition-all"
                style={{
                  background: viewMode === mode ? accent : '#161616',
                  color: viewMode === mode ? textOn(accent) : '#888',
                  border: `1px solid ${viewMode === mode ? accent : '#2A2A2A'}`,
                }}
              >
                {mode === 'list' ? '☰ List View' : '🗺 Map View'}
              </button>
            ))}
          </div>

          {/* MAP VIEW */}
          {viewMode === 'map' && (
            <div className="mb-5">
              <MapView venues={allVenues} countryFlag={selected.flag} countryName={selected.name} accent={accent} />
              <div className="mt-4 rounded p-3" style={{ background: '#0D0D0D', border: '1px solid #1E1E1E' }}>
                <div className="label text-[9px] mb-2" style={{ color: '#666', letterSpacing: '0.15em' }}>Switch to borough</div>
                <div className="flex flex-wrap gap-2">
                  {BOROUGHS.map(b => {
                    const count = allVenues.filter(v => v.borough === b).length;
                    if (!count) return null;
                    return (
                      <button key={b} onClick={() => { setViewMode('list'); setActiveBorough(b); }}
                        className="label rounded px-2 py-1 text-[10px]"
                        style={{ background: accent + '15', color: accent, border: `1px solid ${accent}33` }}>
                        {BOROUGH_EMOJI[b]} {b} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* LIST VIEW */}
          {viewMode === 'list' && (
            <div>
              <div className="flex gap-1 mb-4 overflow-x-auto scrollbar-hide pb-1">
                {BOROUGHS.map(b => {
                  const isActive = activeBorough === b;
                  const count = allVenues.filter(v => v.borough === b).length;
                  return (
                    <button key={b} onClick={() => setActiveBorough(b)}
                      className="label flex-shrink-0 rounded px-3 py-1.5 text-[11px] transition-all duration-200"
                      style={{
                        background: isActive ? accent : '#161616',
                        color: isActive ? textOn(accent) : count ? '#888' : '#444',
                        border: `1px solid ${isActive ? accent : '#2A2A2A'}`,
                        opacity: count ? 1 : 0.5,
                      }}>
                      {BOROUGH_EMOJI[b]} {b}
                      {count > 0 && !isActive && <span className="ml-1 text-[9px] opacity-60">{count}</span>}
                    </button>
                  );
                })}
              </div>

              {guideText.boroughHighlights[activeBorough] && (
                <div className="text-xs text-zinc-500 mb-4 pl-3 leading-relaxed" style={{ borderLeft: `3px solid ${accent}` }}>
                  {guideText.boroughHighlights[activeBorough]}
                </div>
              )}

              <VenueList
                venues={boroughVenues}
                accent={accent}
                emptyMessage={`We haven't mapped ${selected.name} venues in ${activeBorough} yet. Know a great spot we should add? Scroll down to tell us — every submission makes the guide better.`}
              />
            </div>
          )}

          {/* Insider tip */}
          {guideText.insider && (
            <div className="mt-5 flex gap-3 items-start rounded p-4" style={{ background: '#0D0D0D', border: `1px solid ${accent}33` }}>
              <span className="text-2xl flex-shrink-0">🔑</span>
              <div>
                <div className="label text-[9px] mb-1" style={{ color: accent, letterSpacing: '0.2em' }}>Insider Tip</div>
                <p className="text-xs text-zinc-400 leading-relaxed">{guideText.insider}</p>
              </div>
            </div>
          )}

          {/* Share CTA — country-specific, with native share + WhatsApp buttons */}
          <ShareButton country={selected.name} countryFlag={selected.flag} accent={accent} />

          {/* Submit a venue CTA — context-aware, pre-fills the country */}
          <SubmitVenueCTA country={selected.name} />

          {/* My Spots */}
          <MySpots accent={accent} filterCountry={selected.name} />

          <div className="mt-4 text-center">
            <p className="text-[10px] text-zinc-700">
              {allVenues.length} venues · {allVenues.filter(v => v.lat && v.lng).length} mapped
            </p>
          </div>
        </div>
      ) : (
        <div className="border-t border-zinc-900 pt-10 pb-6 text-center">
          <div className="flex justify-center gap-2 flex-wrap mb-4">
            {FLOATING_FLAGS.map((f, i) => (
              <span key={i} className="text-5xl inline-block" style={{ animation: `float ${1.5 + i * 0.2}s ease-in-out infinite alternate` }}>{f}</span>
            ))}
          </div>
          <p className="label text-zinc-600" style={{ letterSpacing: '0.1em' }}>Select your country to begin</p>

          {/* My Spots on home screen */}
          <div className="mt-6 text-left">
            <MySpots accent="#E8C84A" />
          </div>

          <div className="mt-8">
            <EmailSignup />
          </div>

          {/* Share CTA on home screen — generic, no country pre-fill */}
          <div className="mt-6 text-left">
            <ShareButton accent="#E8C84A" />
          </div>

          {/* Submit a venue CTA — generic, no country pre-fill on home screen */}
          <div className="mt-6 text-left">
            <SubmitVenueCTA />
          </div>

          <style>{`@keyframes float { from { transform: translateY(0); } to { transform: translateY(-8px); } }`}</style>
        </div>
      )}
    </div>
  );
}
