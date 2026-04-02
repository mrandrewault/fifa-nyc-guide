'use client';

import { STADIUM_CARDS } from '@/data/staticData';

export default function StadiumTab() {
  return (
    <div className="px-4 pb-6">

      {/* Header */}
      <div className="pt-8 pb-6">
        <p
          className="label text-[10px] mb-2"
          style={{ color: '#4AB4E8', letterSpacing: '0.25em' }}
        >
          East Rutherford, NJ · 82,500 Capacity
        </p>
        <h2
          className="heading mb-2"
          style={{ fontSize: 'clamp(28px, 6vw, 48px)', lineHeight: '0.9' }}
        >
          METLIFE{' '}
          <span style={{ color: '#4AB4E8' }}>GUIDE</span>
        </h2>
        <p className="text-sm text-zinc-500">
          Everything you need to know before match day
        </p>
      </div>

      {/* Info cards grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {STADIUM_CARDS.map((card, i) => (
          <div
            key={i}
            className="rounded p-4"
            style={{
              background: '#111',
              border: '1px solid #222',
              borderLeft: '3px solid #4AB4E8',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{card.icon}</span>
              <div
                className="label text-xs"
                style={{ color: '#4AB4E8', letterSpacing: '0.06em' }}
              >
                {card.title}
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">{card.body}</p>
          </div>
        ))}
      </div>

      {/* Final highlight */}
      <div
        className="mt-4 rounded p-5 text-center"
        style={{
          background: '#E8C84A15',
          border: '1px solid #E8C84A44',
        }}
      >
        <div className="text-4xl mb-3">🏆</div>
        <div
          className="label text-sm mb-1"
          style={{ color: '#E8C84A', letterSpacing: '0.08em' }}
        >
          The 2026 Final is here
        </div>
        <div className="text-sm text-zinc-400 mb-1">
          Sunday, July 19 · 3:00 PM ET · MetLife Stadium
        </div>
        <div className="text-xs text-zinc-600">
          The biggest sporting event in US history
        </div>
      </div>

      {/* Official links */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <a
          href="https://nynjfwc26.com"
          target="_blank"
          rel="noreferrer"
          className="label rounded border border-zinc-800 py-3 text-center text-[11px] text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white block"
        >
          nynjfwc26.com ↗
        </a>
        <a
          href="https://www.metlifestadium.com/events/fifa-world-cup-2026"
          target="_blank"
          rel="noreferrer"
          className="label rounded border border-zinc-800 py-3 text-center text-[11px] text-zinc-400 transition-colors hover:border-zinc-600 hover:text-white block"
        >
          MetLife Stadium ↗
        </a>
      </div>
    </div>
  );
}
