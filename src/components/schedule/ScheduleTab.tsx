'use client';

import WeatherWidget from '@/components/shared/WeatherWidget';
import { METLIFE_MATCHES } from '@/data/staticData';
import { daysUntil } from '@/lib/utils';

export default function ScheduleTab() {
  return (
    <div className="px-4 pb-6">

      {/* Header */}
      <div className="pt-8 pb-6">
        <p className="label text-[10px] text-[#E8C84A] mb-2" style={{ letterSpacing: '0.25em' }}>
          MetLife Stadium · East Rutherford, NJ
        </p>
        <h2
          className="heading mb-2"
          style={{ fontSize: 'clamp(28px, 6vw, 48px)', lineHeight: '0.9' }}
        >
          NYC&apos;S{' '}
          <span style={{ color: '#E8C84A' }}>8 MATCHES</span>
        </h2>
        <p className="text-sm text-zinc-500">
          Group stage through the Final · NJ Transit from Penn Station (~25 min)
        </p>
      </div>

      {/* Live weather widget */}
      <WeatherWidget />

      {/* Match cards */}
      <div className="space-y-3">
        {METLIFE_MATCHES.map(match => {
          const days = daysUntil(match.dateFull);
          const isFinal = match.stage === 'THE FINAL';
          const isPast = days < 0;
          const isToday = days === 0;

          return (
            <div
              key={match.id}
              className="rounded overflow-hidden transition-opacity"
              style={{
                background: isFinal
                  ? 'linear-gradient(135deg, #E8C84A15, #E8C84A05)'
                  : '#111',
                border: `1px solid ${isFinal ? '#E8C84A44' : '#222'}`,
                borderLeft: `4px solid ${isFinal ? '#E8C84A' : match.color1}`,
                opacity: isPast ? 0.5 : 1,
              }}
            >
              <div className="p-4">
                {/* Stage + date row */}
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <div
                      className="label text-[10px] mb-0.5"
                      style={{
                        color: isFinal ? '#E8C84A' : '#666',
                        letterSpacing: '0.15em',
                      }}
                    >
                      {match.stage}
                    </div>
                    <div className="text-xs text-zinc-500">
                      {match.date} · {match.time}
                    </div>
                  </div>

                  {/* Countdown badge */}
                  {!isPast && (
                    <div
                      className="label rounded px-2 py-1 text-[10px]"
                      style={{
                        background: isFinal ? '#E8C84A22' : '#ffffff0A',
                        color: isFinal ? '#E8C84A' : isToday ? '#4AE8A0' : '#888',
                      }}
                    >
                      {isToday ? 'TODAY' : `${days} days`}
                    </div>
                  )}
                  {isPast && (
                    <div className="label text-[10px] text-zinc-700">PLAYED</div>
                  )}
                </div>

                {/* Teams */}
                <div className="flex items-center gap-3">
                  {/* Team 1 */}
                  <div className="flex-1 text-right">
                    <div className="text-4xl leading-none mb-1">{match.flag1}</div>
                    <div className="label text-sm text-white leading-tight">
                      {match.team1}
                    </div>
                  </div>

                  <div className="label text-lg text-zinc-700 px-2">VS</div>

                  {/* Team 2 */}
                  <div className="flex-1 text-left">
                    <div className="text-4xl leading-none mb-1">{match.flag2}</div>
                    <div className="label text-sm text-white leading-tight">
                      {match.team2}
                    </div>
                  </div>
                </div>

                {/* Final special note */}
                {isFinal && (
                  <div
                    className="label mt-3 pt-3 text-[10px] text-center"
                    style={{
                      borderTop: '1px solid #E8C84A33',
                      color: '#E8C84A',
                      letterSpacing: '0.12em',
                    }}
                  >
                    HALFTIME SHOW · CHRIS MARTIN (COLDPLAY) · GLOBAL CITIZEN
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Transit reminder */}
      <div
        className="mt-4 rounded p-4"
        style={{ background: '#0D0D0D', border: '1px solid #2A2A2A' }}
      >
        <div
          className="label text-[9px] mb-2"
          style={{ color: '#666', letterSpacing: '0.2em' }}
        >
          Getting There
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          NJ Transit from Penn Station — ~25 min, ~$8.75 round trip.{' '}
          <strong className="text-zinc-300">Buy tickets before you go</strong> —
          machine lines at MetLife after a match are 45+ minutes.
          See the Transit tab for full routes from every borough.
        </p>
      </div>
    </div>
  );
}
