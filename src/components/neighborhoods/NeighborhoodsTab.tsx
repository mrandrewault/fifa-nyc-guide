'use client';

import { useState } from 'react';
import { NEIGHBORHOODS } from '@/data/staticData';
import type { Neighborhood } from '@/types';

function NeighborhoodCard({ hood }: { hood: Neighborhood }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="rounded overflow-hidden transition-colors duration-300"
      style={{
        background: '#111',
        border: `1px solid ${isOpen ? `${hood.accent}55` : '#222'}`,
      }}
    >
      {/* Card header — always visible */}
      <button
        onClick={() => setIsOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
      >
        <span className="text-3xl flex-shrink-0">{hood.emoji}</span>
        <div className="flex-1 min-w-0">
          <div
            className="label text-sm leading-tight"
            style={{ color: hood.accent }}
          >
            {hood.name}
          </div>
          <div className="text-xs text-zinc-600 mt-0.5">
            {hood.borough} · {hood.tagline}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex gap-0.5">
            {hood.flags.slice(0, 3).map((f, i) => (
              <span key={i} className="text-sm">{f}</span>
            ))}
          </div>
          <span className="text-zinc-600 text-xs ml-1">
            {isOpen ? '▲' : '▼'}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div
          className="px-4 pb-4"
          style={{ borderTop: '1px solid #1E1E1E' }}
        >
          {/* Blurb */}
          <p className="text-xs text-zinc-400 leading-relaxed mt-3 mb-3">
            {hood.blurb}
          </p>

          {/* Communities */}
          <div
            className="rounded p-2.5 mb-3 text-xs text-zinc-500"
            style={{ background: '#0D0D0D' }}
          >
            <span style={{ color: hood.accent }}>Communities: </span>
            {hood.countries}
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="rounded p-2.5" style={{ background: '#0D0D0D' }}>
              <div
                className="label text-[9px] mb-1"
                style={{ color: hood.accent, letterSpacing: '0.15em' }}
              >
                🚇 Subway
              </div>
              <div className="text-xs text-zinc-400">{hood.subway}</div>
            </div>
            <div className="rounded p-2.5" style={{ background: '#0D0D0D' }}>
              <div
                className="label text-[9px] mb-1"
                style={{ color: hood.accent, letterSpacing: '0.15em' }}
              >
                🍽 Must Eat
              </div>
              <div className="text-xs text-zinc-400">{hood.mustEat}</div>
            </div>
          </div>

          {/* Must do */}
          <div className="rounded p-2.5 mb-3" style={{ background: '#0D0D0D' }}>
            <div
              className="label text-[9px] mb-1"
              style={{ color: hood.accent, letterSpacing: '0.15em' }}
            >
              ★ Must Do
            </div>
            <div className="text-xs text-zinc-400">{hood.mustDo}</div>
          </div>

          {/* Insider tip */}
          <div
            className="flex gap-2 items-start rounded p-3"
            style={{
              background: `${hood.accent}15`,
              border: `1px solid ${hood.accent}33`,
            }}
          >
            <span className="text-base flex-shrink-0">🔑</span>
            <p className="text-xs text-zinc-300 leading-relaxed">{hood.insider}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NeighborhoodsTab() {
  return (
    <div className="px-4 pb-6">

      {/* Header */}
      <div className="pt-8 pb-6">
        <p
          className="label text-[10px] mb-2"
          style={{ color: '#4AE8A0', letterSpacing: '0.25em' }}
        >
          All Five Boroughs · {NEIGHBORHOODS.length} Neighborhoods
        </p>
        <h2
          className="heading mb-2"
          style={{ fontSize: 'clamp(28px, 6vw, 48px)', lineHeight: '0.9' }}
        >
          REAL{' '}
          <span style={{ color: '#4AE8A0' }}>NYC</span>
        </h2>
        <p className="text-sm text-zinc-500 leading-relaxed">
          The ethnic neighborhoods that make this city unlike anywhere else on Earth
        </p>
      </div>

      {/* Neighborhood cards */}
      <div className="space-y-2">
        {NEIGHBORHOODS.map(hood => (
          <NeighborhoodCard key={hood.id} hood={hood} />
        ))}
      </div>

      {/* Footer note */}
      <div
        className="mt-4 rounded p-4"
        style={{ background: '#0D0D0D', border: '1px solid #2A2A2A' }}
      >
        <p className="text-xs text-zinc-600 leading-relaxed text-center">
          NYC has 160+ languages spoken. These 10 neighborhoods are the starting point —
          every block holds something new.
        </p>
      </div>
    </div>
  );
}
