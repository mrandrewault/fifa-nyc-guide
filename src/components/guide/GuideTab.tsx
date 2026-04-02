'use client';

import { useState, useEffect, useRef } from 'react';
import type { Country } from '@/types';
import { COUNTRIES, GUIDE_TEXT, getGenericGuideText } from '@/data/countries';
import { VENUES } from '@/data/venues';
import { safeAccent, textOn, sortVenues } from '@/lib/utils';
import VenueList from '@/components/shared/VenueList';

const BOROUGHS = ['Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island'] as const;
const BOROUGH_EMOJI: Record<string, string> = {
  Manhattan: '🗽', Brooklyn: '🌉', Queens: '✈️', 'The Bronx': '🐆', 'Staten Island': '⛴️',
};

const FLOATING_FLAGS = ['🇧🇷', '🇲🇽', '🇩🇪', '🇫🇷', '🇦🇷', '🇯🇵'];

export default function GuideTab() {
  const [selected, setSelected] = useState<Country | null>(null);
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeBorough, setActiveBorough] = useState<string>('Manhattan');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const accent = safeAccent(selected?.colors ?? []);
  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  // Get guide text
  const guideText = selected
    ? (GUIDE_TEXT[selected.name] ?? getGenericGuideText(selected.name))
    : null;

  // Get venues for active borough
  const boroughVenues = selected
    ? sortVenues(
        VENUES.filter(v =>
          v.isActive &&
          v.countryAssociations.includes(selected.name) &&
          v.borough === activeBorough
        )
      )
    : [];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        if (selected) setSearch(selected.name);
        else setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [selected]);

  function pickCountry(c: Country) {
    setSelected(c);
    setSearch(c.name);
    setShowDropdown(false);
    setActiveBorough('Manhattan');
  }

  return (
    <div className="px-4 pb-6">

      {/* Header */}
      <div className="pt-8 pb-6">
        <p
          className="label text-[10px] mb-2 transition-colors duration-500"
          style={{ color: accent, letterSpacing: '0.25em' }}
        >
          FIFA World Cup 2026 · New York City · Fan Guide
        </p>
        <h1
          className="heading mb-3"
          style={{ fontSize: 'clamp(34px, 8vw, 58px)', lineHeight: '0.9' }}
        >
          YOUR NYC.{' '}
          <span className="transition-colors duration-500" style={{ color: accent }}>
            YOUR CITY.
          </span>
        </h1>
        <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
          Find your people. Your bars. Your food. Borough by borough, for fans of every nation.
        </p>
      </div>

      {/* Country selector */}
      <div ref={dropdownRef} className="relative mb-6">
        <div
          className="flex items-center gap-3 rounded px-4 py-3 transition-colors duration-300"
          style={{
            background: '#161616',
            border: `1px solid ${showDropdown || selected ? accent : '#333'}`,
          }}
        >
          {selected && !showDropdown && (
            <span className="text-2xl leading-none flex-shrink-0">{selected.flag}</span>
          )}
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setShowDropdown(true); }}
            onFocus={() => { setSearch(''); setShowDropdown(true); }}
            placeholder={selected ? selected.name : 'Search your country...'}
            className="label flex-1 bg-transparent outline-none text-white text-base placeholder-zinc-600"
          />
          <span className="text-zinc-600 text-xs">▼</span>
        </div>

        {/* Dropdown */}
        {showDropdown && (
          <div
            className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-y-auto rounded border border-zinc-800 shadow-2xl"
            style={{ background: '#161616', top: '100%' }}
          >
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-zinc-600">No country found</div>
            ) : (
              filtered.map(c => (
                <button
                  key={c.name}
                  onClick={() => pickCountry(c)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-zinc-800 border-b border-zinc-900"
                >
                  <span className="text-xl">{c.flag}</span>
                  <span className="label text-sm text-white">{c.name}</span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Guide content */}
      {selected && guideText ? (
        <div>
          {/* Hero banner */}
          <div
            className="rounded p-5 mb-5"
            style={{
              background: `linear-gradient(135deg, ${accent}20, ${accent}08)`,
              border: `1px solid ${accent}44`,
            }}
          >
            <div className="flex items-start gap-4 flex-wrap">
              <span className="text-5xl leading-none">{selected.flag}</span>
              <div className="flex-1 min-w-0">
                <h2
                  className="heading mb-2 leading-tight"
                  style={{ fontSize: 'clamp(18px, 4vw, 28px)', color: accent }}
                >
                  {guideText.headline}
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                  {guideText.vibe}
                </p>
                {guideText.chant && (
                  <div
                    className="label inline-flex items-center gap-2 rounded px-3 py-1.5 text-[11px]"
                    style={{ background: '#ffffff10', color: accent }}
                  >
                    🎤 {guideText.chant}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Borough tabs */}
          <div className="flex gap-1 mb-4 overflow-x-auto scrollbar-hide pb-1">
            {BOROUGHS.map(b => {
              const isActive = activeBorough === b;
              return (
                <button
                  key={b}
                  onClick={() => setActiveBorough(b)}
                  className="label flex-shrink-0 rounded px-3 py-1.5 text-[11px] transition-all duration-200"
                  style={{
                    background: isActive ? accent : '#161616',
                    color: isActive ? textOn(accent) : '#888',
                    border: `1px solid ${isActive ? accent : '#2A2A2A'}`,
                  }}
                >
                  {BOROUGH_EMOJI[b]} {b}
                </button>
              );
            })}
          </div>

          {/* Borough highlight */}
          {guideText.boroughHighlights[activeBorough] && (
            <div
              className="text-xs text-zinc-500 mb-4 pl-3 leading-relaxed"
              style={{ borderLeft: `3px solid ${accent}` }}
            >
              {guideText.boroughHighlights[activeBorough]}
            </div>
          )}

          {/* Venues */}
          <VenueList
            venues={boroughVenues}
            accent={accent}
            emptyMessage={`No venues listed yet for ${selected.name} fans in ${activeBorough}. Football Factory at Legends (6 W 33rd St, Manhattan) is always a safe bet for any country.`}
          />

          {/* Insider tip */}
          {guideText.insider && (
            <div
              className="mt-5 flex gap-3 items-start rounded p-4"
              style={{
                background: '#0D0D0D',
                border: `1px solid ${accent}33`,
              }}
            >
              <span className="text-2xl flex-shrink-0">🔑</span>
              <div>
                <div
                  className="label text-[9px] mb-1"
                  style={{ color: accent, letterSpacing: '0.2em' }}
                >
                  Insider Tip
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{guideText.insider}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty state */
        <div className="border-t border-zinc-900 pt-10 pb-6 text-center">
          <div className="flex justify-center gap-2 flex-wrap mb-4">
            {FLOATING_FLAGS.map((f, i) => (
              <span
                key={i}
                className="text-5xl inline-block"
                style={{ animation: `float ${1.5 + i * 0.2}s ease-in-out infinite alternate` }}
              >
                {f}
              </span>
            ))}
          </div>
          <p className="label text-zinc-600" style={{ letterSpacing: '0.1em' }}>
            Select your country to begin
          </p>
        </div>
      )}
    </div>
  );
}
