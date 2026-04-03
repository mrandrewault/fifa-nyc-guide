'use client';

import { useState } from 'react';
import type { Country } from '@/types';
import { COUNTRIES } from '@/data/countries';
import { getDayPlans, getGenericDayPlan } from '@/data/dayPlans';
import type { DayPlan, DayPlanStop, PlanType } from '@/data/dayPlans';
import { safeAccent, textOn, mapsDirectionsUrl } from '@/lib/utils';

const TIME_OF_DAY_COLORS: Record<string, string> = {
  morning:   '#FECC02',
  afternoon: '#4AE8A0',
  evening:   '#4AB4E8',
  night:     '#E84A8C',
};

const TYPE_ICONS: Record<string, string> = {
  food:     '🍽',
  bar:      '🍺',
  watch:    '⚽',
  culture:  '🎭',
  transit:  '🚇',
  activity: '🗺',
};

function StopCard({ stop, accent, index }: { stop: DayPlanStop; accent: string; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const timeColor = TIME_OF_DAY_COLORS[stop.timeOfDay] || accent;
  const mapsUrl = mapsDirectionsUrl(stop.venueName, stop.address);

  return (
    <div className="relative pl-8 pb-6">
      {/* Timeline line */}
      <div
        className="absolute left-3 top-4 bottom-0 w-px"
        style={{ background: 'linear-gradient(to bottom, ' + timeColor + '66, transparent)' }}
      />

      {/* Timeline dot */}
      <div
        className="absolute left-1.5 top-3 w-3 h-3 rounded-full border-2 border-zinc-900"
        style={{ background: timeColor }}
      />

      {/* Card */}
      <div
        className="rounded overflow-hidden"
        style={{ background: '#111', border: '1px solid #222' }}
      >
        {/* Header */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="w-full text-left p-3"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0 leading-none mt-0.5">{stop.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span
                  className="label text-[9px] px-1.5 py-0.5 rounded"
                  style={{ background: timeColor + '22', color: timeColor }}
                >
                  {stop.time}
                </span>
                <span
                  className="label text-[9px] px-1.5 py-0.5 rounded"
                  style={{ background: '#ffffff0A', color: '#666' }}
                >
                  {TYPE_ICONS[stop.type]} {stop.type}
                </span>
              </div>
              <div className="label text-sm text-white leading-tight">{stop.venueName}</div>
              <div className="text-xs text-zinc-600 mt-0.5">📍 {stop.address}</div>
            </div>
            <span className="text-zinc-700 text-xs flex-shrink-0">{expanded ? '▲' : '▼'}</span>
          </div>
        </button>

        {/* Expanded */}
        {expanded && (
          <div
            className="px-3 pb-3 pt-1"
            style={{ borderTop: '1px solid #1E1E1E' }}
          >
            <p className="text-xs text-zinc-400 leading-relaxed mb-2">{stop.description}</p>

            {stop.tip && (
              <div
                className="flex gap-2 items-start rounded p-2 mb-3"
                style={{ background: accent + '15', border: '1px solid ' + accent + '33' }}
              >
                <span className="text-sm flex-shrink-0">🔑</span>
                <p className="text-xs text-zinc-300 leading-relaxed">{stop.tip}</p>
              </div>
            )}

            {stop.type !== 'transit' && stop.type !== 'activity' && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="label block text-center rounded py-1.5 text-[11px]"
                style={{
                  background: accent,
                  color: textOn(accent),
                }}
              >
                Get Directions ↗
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PlanView({ plan, accent }: { plan: DayPlan; accent: string }) {
  return (
    <div>
      {/* Plan header */}
      <div
        className="rounded p-4 mb-5"
        style={{
          background: 'linear-gradient(135deg, ' + accent + '15, ' + accent + '05)',
          border: '1px solid ' + accent + '33',
        }}
      >
        <div className="label text-xs mb-1" style={{ color: accent }}>
          {plan.planType === 'match_day' ? '⚽ Match Day Plan' : '📅 Day in NYC'}
        </div>
        <h3 className="heading text-lg text-white mb-1">{plan.title}</h3>
        <p className="text-xs text-zinc-500">{plan.subtitle}</p>
      </div>

      {/* Timeline stops */}
      <div>
        {plan.stops.map((stop, i) => (
          <StopCard key={i} stop={stop} accent={accent} index={i} />
        ))}
      </div>
    </div>
  );
}

// ─── COUNTRY SELECTOR INLINE ──────────────────────────────────────────────────

export default function DayPlannerTab() {
  const [selected, setSelected] = useState<Country | null>(null);
  const [activePlanType, setActivePlanType] = useState<PlanType>('free_day');
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const accent = safeAccent(selected?.colors ?? []);
  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const allPlans = selected ? getDayPlans(selected.name) : [];
  const matchDayPlan = allPlans.find(p => p.planType === 'match_day');
  const freeDayPlan  = allPlans.find(p => p.planType === 'free_day') ?? (selected ? getGenericDayPlan(selected.name) : null);
  const activePlan   = activePlanType === 'match_day' ? matchDayPlan : freeDayPlan;

  function pickCountry(c: Country) {
    setSelected(c);
    setSearch(c.name);
    setShowDropdown(false);
    // Default to free_day, switch to match_day if available
    const plans = getDayPlans(c.name);
    setActivePlanType(plans.some(p => p.planType === 'match_day') ? 'match_day' : 'free_day');
  }

  return (
    <div className="px-4 pb-6">

      {/* Header */}
      <div className="pt-8 pb-6">
        <p
          className="label text-[10px] mb-2"
          style={{ color: '#E8C84A', letterSpacing: '0.25em' }}
        >
          Your Complete NYC Visit
        </p>
        <h2
          className="heading mb-2"
          style={{ fontSize: 'clamp(28px, 6vw, 48px)', lineHeight: '0.9' }}
        >
          DAY{' '}
          <span style={{ color: '#E8C84A' }}>PLANNER</span>
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
          Not just the match — your full NYC day, curated for fans from your country.
          Match days, free days, morning coffee to post-match celebration.
        </p>
      </div>

      {/* Country selector */}
      <div className="relative mb-5">
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
            placeholder={selected ? selected.name : 'Select your country...'}
            className="label flex-1 bg-transparent outline-none text-white text-base placeholder-zinc-600"
          />
          <span className="text-zinc-600 text-xs">▼</span>
        </div>

        {showDropdown && (
          <div
            className="absolute left-0 right-0 z-50 mt-1 max-h-56 overflow-y-auto rounded border border-zinc-800 shadow-2xl"
            style={{ background: '#161616', top: '100%' }}
          >
            {filtered.length === 0
              ? <div className="px-4 py-3 text-sm text-zinc-600">No country found</div>
              : filtered.map(c => (
                <button
                  key={c.name}
                  onClick={() => pickCountry(c)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-zinc-800 border-b border-zinc-900"
                >
                  <span className="text-xl">{c.flag}</span>
                  <div className="flex-1">
                    <span className="label text-sm text-white">{c.name}</span>
                    {getDayPlans(c.name).length > 0 && (
                      <span
                        className="label text-[9px] ml-2 px-1.5 py-0.5 rounded"
                        style={{ background: '#4AE8A022', color: '#4AE8A0' }}
                      >
                        Full guide
                      </span>
                    )}
                  </div>
                </button>
              ))
            }
          </div>
        )}
      </div>

      {selected && (
        <div>
          {/* Plan type toggle */}
          <div className="flex gap-2 mb-5">
            <button
              onClick={() => setActivePlanType('match_day')}
              className="label flex-1 rounded py-2.5 text-xs transition-all"
              style={{
                background: activePlanType === 'match_day' ? accent : '#161616',
                color: activePlanType === 'match_day' ? textOn(accent) : '#666',
                border: `1px solid ${activePlanType === 'match_day' ? accent : '#2A2A2A'}`,
                opacity: matchDayPlan ? 1 : 0.4,
              }}
              disabled={!matchDayPlan}
            >
              ⚽ Match Day
              {!matchDayPlan && <span className="ml-1 text-[9px]">(coming soon)</span>}
            </button>
            <button
              onClick={() => setActivePlanType('free_day')}
              className="label flex-1 rounded py-2.5 text-xs transition-all"
              style={{
                background: activePlanType === 'free_day' ? accent : '#161616',
                color: activePlanType === 'free_day' ? textOn(accent) : '#666',
                border: `1px solid ${activePlanType === 'free_day' ? accent : '#2A2A2A'}`,
              }}
            >
              📅 Free Day
            </button>
          </div>

          {activePlan && <PlanView plan={activePlan} accent={accent} />}
        </div>
      )}

      {!selected && (
        <div className="pt-6 text-center border-t border-zinc-900">
          <div className="text-5xl mb-4">🗓️</div>
          <p className="label text-zinc-600" style={{ letterSpacing: '0.1em' }}>
            Select your country to see your day plan
          </p>
          <p className="text-xs text-zinc-700 mt-2 max-w-xs mx-auto">
            Morning coffee, match day prep, post-match celebration — curated for fans from your country.
          </p>
        </div>
      )}
    </div>
  );
}
