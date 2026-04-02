'use client';

import { TRANSIT_ROUTES } from '@/data/staticData';

const SUBWAY_TIPS = [
  {
    icon: '💳',
    title: 'Pay with OMNY',
    body: 'Tap your phone or contactless card directly on the turnstile reader. No MetroCard needed. $2.90 per ride. 7-Day unlimited pass: $34. Available at all stations.',
  },
  {
    icon: '🗺️',
    title: 'Key Lines for Fans',
    body: '7 train: Flushing/Jackson Heights → Times Square. A/C/E: Port Authority/Penn Station. 2/3: Brooklyn → Midtown. N/W/R: Astoria/Queens → Midtown.',
  },
  {
    icon: '📱',
    title: 'Get Citymapper',
    body: 'Best app for NYC transit. Works offline. Shows real-time subway delays. Far more reliable than Google Maps for the subway. Free download.',
  },
  {
    icon: '🚖',
    title: 'Cabs & Rideshare',
    body: 'Uber/Lyft work everywhere. Yellow cabs take cards. For MetLife: always take NJ Transit, NOT a car — post-match traffic from the stadium can be 2+ hours.',
  },
  {
    icon: '🚲',
    title: 'Citi Bike',
    body: 'Docking stations across Manhattan, Brooklyn, Queens, and the Bronx. $4.49 for a 30-min ride. Great for getting between neighborhoods when subway feels slow.',
  },
  {
    icon: '⛴️',
    title: 'Staten Island Ferry',
    body: 'Completely free. Runs 24/7. Best views of Lower Manhattan and the Statue of Liberty. 25-minute crossing. Worth doing even if you\'re not going to Staten Island.',
  },
];

export default function TransitTab() {
  return (
    <div className="px-4 pb-6">

      {/* Header */}
      <div className="pt-8 pb-6">
        <p
          className="label text-[10px] mb-2"
          style={{ color: '#E84A8C', letterSpacing: '0.25em' }}
        >
          All Boroughs · MetLife Stadium
        </p>
        <h2
          className="heading mb-2"
          style={{ fontSize: 'clamp(28px, 6vw, 48px)', lineHeight: '0.9' }}
        >
          GETTING{' '}
          <span style={{ color: '#E84A8C' }}>AROUND</span>
        </h2>
        <p className="text-sm text-zinc-500">
          Routes to MetLife + NYC subway essentials
        </p>
      </div>

      {/* Golden rule banner */}
      <div
        className="rounded p-4 mb-6"
        style={{
          background: '#E8C84A15',
          border: '1px solid #E8C84A44',
        }}
      >
        <div
          className="label text-[10px] mb-2"
          style={{ color: '#E8C84A', letterSpacing: '0.15em' }}
        >
          The Golden Rule
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Always buy your NJ Transit <strong className="text-white">round-trip ticket BEFORE you leave NYC</strong>.
          The machine lines at MetLife after a match are 45+ minutes.
          Buy at Penn Station before you go.
        </p>
      </div>

      {/* Routes to MetLife */}
      <div
        className="label text-[10px] mb-3"
        style={{ color: '#666', letterSpacing: '0.15em' }}
      >
        Routes to MetLife Stadium
      </div>

      <div className="space-y-3 mb-8">
        {TRANSIT_ROUTES.map((route, i) => (
          <div
            key={i}
            className="rounded p-4"
            style={{
              background: '#111',
              border: '1px solid #222',
              borderLeft: `3px solid ${route.color}`,
            }}
          >
            {/* From + timing */}
            <div className="flex items-start justify-between mb-2 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xl">{route.icon}</span>
                <div
                  className="label text-xs"
                  style={{ color: route.color }}
                >
                  {route.from}
                </div>
              </div>
              <div className="flex gap-2">
                <div
                  className="label rounded px-2 py-0.5 text-[10px] text-zinc-500"
                  style={{ background: '#1A1A1A' }}
                >
                  {route.time}
                </div>
                <div
                  className="label rounded px-2 py-0.5 text-[10px] text-zinc-500"
                  style={{ background: '#1A1A1A' }}
                >
                  {route.cost}
                </div>
              </div>
            </div>

            {/* Via */}
            <div className="text-xs text-zinc-500 mb-2">{route.via}</div>

            {/* Tip */}
            <div className="text-xs leading-relaxed" style={{ color: '#E8C84A' }}>
              ⚠ {route.tip}
            </div>
          </div>
        ))}
      </div>

      {/* NYC Subway essentials */}
      <div
        className="label text-[10px] mb-3"
        style={{ color: '#666', letterSpacing: '0.15em' }}
      >
        NYC Subway Essentials
      </div>

      <div className="space-y-2">
        {SUBWAY_TIPS.map((tip, i) => (
          <div
            key={i}
            className="flex gap-3 items-start rounded p-3"
            style={{ background: '#111', border: '1px solid #222' }}
          >
            <span className="text-lg flex-shrink-0">{tip.icon}</span>
            <div>
              <div
                className="label text-xs mb-1"
                style={{ color: '#E84A8C', letterSpacing: '0.04em' }}
              >
                {tip.title}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{tip.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency info */}
      <div
        className="mt-4 rounded p-4"
        style={{ background: '#0D0D0D', border: '1px solid #2A2A2A' }}
      >
        <div
          className="label text-[9px] mb-2"
          style={{ color: '#666', letterSpacing: '0.2em' }}
        >
          Emergency Numbers
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400">
          <div><span className="text-white">Emergency:</span> 911</div>
          <div><span className="text-white">Non-Emergency:</span> 311</div>
          <div><span className="text-white">NJ Transit:</span> 973-275-5555</div>
          <div><span className="text-white">MetLife Info:</span> metlifestadium.com</div>
        </div>
      </div>
    </div>
  );
}
