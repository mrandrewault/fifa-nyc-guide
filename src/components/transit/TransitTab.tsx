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
    body: "Completely free. Runs 24/7. Best views of Lower Manhattan and the Statue of Liberty. 25-minute crossing. Worth doing even if you're not going to Staten Island.",
  },
];

const BEFORE_YOU_GO = [
  {
    icon: '💳',
    title: 'Set up OMNY (contactless transit)',
    body: 'Enable contactless payments on your phone or bring a Visa/Mastercard with tap-to-pay. Works on every subway and bus. No card to buy, no line to wait in.',
  },
  {
    icon: '🚂',
    title: 'Download the NJ Transit app',
    body: 'Buy your MetLife round-trip ticket IN ADVANCE on the app. The ticket lines at Penn Station on match days are 30+ minutes. This is the single most important tip on this list.',
  },
  {
    icon: '📱',
    title: 'Download Citymapper',
    body: 'Far better than Google Maps for NYC. Shows real subway delays, platform info, and walking directions. Works offline. Free.',
  },
  {
    icon: '💵',
    title: 'Bring cash for street food',
    body: "NYC's best food is from carts and trucks that are cash only. Especially in Queens and the Bronx — $10-20 in small bills will get you through the best match day meals in the city.",
  },
  {
    icon: '🗺️',
    title: 'Know your borough',
    body: "Use the Guide tab to find your country's community. Queens is the world's borough — Jackson Heights, Astoria, Corona, and Flushing are where most international communities are rooted.",
  },
  {
    icon: '📡',
    title: 'Get an eSIM or US SIM card',
    body: "International data roaming is expensive and slow. Grab a cheap US eSIM before you arrive (Airalo, T-Mobile) — you'll need navigation and translation constantly.",
  },
  {
    icon: '🌡️',
    title: 'Prepare for NYC June heat',
    body: "NYC in June is hot and humid — expect 80-90°F (27-32°C) with high humidity. Bring water, sunscreen, and breathable clothing. MetLife is an open-air stadium with no shade.",
  },
  {
    icon: '🎫',
    title: 'Screenshot your tickets',
    body: "Cell service at MetLife and Penn Station on match days is overloaded. Screenshot your NJ Transit tickets and match tickets before you leave your hotel. Don't rely on live loading.",
  },
];

const NYC_TIPS = [
  {
    icon: '💰',
    title: 'Tipping culture',
    body: "Tipping is not optional in NYC — it's essential. Restaurants: 20% minimum. Bars: $1-2 per drink. Taxis/Uber: 15-20%. Not tipping is considered genuinely rude. Most screens show suggested amounts — just pick one.",
  },
  {
    icon: '🚶',
    title: 'Walk on the right, pass on the left',
    body: "New Yorkers walk fast and with purpose. Keep right on sidewalks, don't stop abruptly in the middle of the pavement, and step to the side to look at your phone. You'll be fine — New Yorkers are friendly if you ask for help.",
  },
  {
    icon: '🍕',
    title: 'How to eat a slice',
    body: "Fold the slice lengthwise, tip slightly down to stop grease dripping, eat standing up. Never use a knife and fork. Get your slice at a busy place — turnover means it's fresh. $3-5 for a proper NYC slice.",
  },
  {
    icon: '🚇',
    title: 'The subway is safe',
    body: "Don't believe everything you've heard. NYC's subway is generally safe during the day and evening. Avoid empty cars at night, keep your phone in your pocket on platforms, and you'll be completely fine.",
  },
  {
    icon: '🕐',
    title: 'Everything runs late — except the subway',
    body: "Restaurants don't seat you until your full party arrives. Bars have a 'last call' around 3:30am. Subway runs 24/7 but gets slow after midnight. Plan accordingly.",
  },
  {
    icon: '🗣️',
    title: 'How to talk to New Yorkers',
    body: "Be direct, get to the point, and don't be offended by bluntness — it's a sign of respect here. 'Excuse me' gets you anything. New Yorkers love tourists who are genuinely curious about the city.",
  },
  {
    icon: '📍',
    title: 'Addresses are a grid',
    body: "Manhattan is a numbered grid. Streets run east-west, avenues run north-south. Numbers increase going uptown (north). The higher the street number, the further north you are. Cross streets tell you exactly where you are.",
  },
  {
    icon: '💊',
    title: 'Prices include tax',
    body: "Prices on menus and in stores don't include tax — add about 9% to everything. A $15 cocktail costs about $16.35 before tip. NYC is expensive; budget accordingly and don't be surprised at the final bill.",
  },
];

export default function TransitTab() {
  return (
    <div className="px-4 pb-6">

      {/* Header */}
      <div className="pt-8 pb-6">
        <p className="label text-[10px] mb-2" style={{ color: '#E84A8C', letterSpacing: '0.25em' }}>
          All Boroughs · MetLife Stadium
        </p>
        <h2 className="heading mb-2" style={{ fontSize: 'clamp(28px, 6vw, 48px)', lineHeight: '0.9' }}>
          GETTING{' '}
          <span style={{ color: '#E84A8C' }}>AROUND</span>
        </h2>
        <p className="text-sm text-zinc-500">
          Routes to MetLife + NYC survival guide for World Cup visitors
        </p>
      </div>

      {/* Before You Go Checklist */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="label text-[10px]" style={{ color: '#E8C84A', letterSpacing: '0.15em' }}>
            ✓ BEFORE YOU GO — 8 THINGS TO DO
          </div>
        </div>
        <div
          className="rounded p-4 mb-3"
          style={{ background: '#E8C84A15', border: '1px solid #E8C84A44' }}
        >
          <p className="text-xs text-zinc-400 leading-relaxed">
            Do these before you leave your hotel or the airport. They'll save you hours of frustration on match day.
          </p>
        </div>
        <div className="space-y-2">
          {BEFORE_YOU_GO.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 items-start rounded p-3"
              style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderLeft: '3px solid #E8C84A' }}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              <div>
                <div className="label text-xs mb-1" style={{ color: '#E8C84A', letterSpacing: '0.04em' }}>
                  {item.title}
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Golden rule banner */}
      <div className="rounded p-4 mb-6" style={{ background: '#E84A8C15', border: '1px solid #E84A8C44' }}>
        <div className="label text-[10px] mb-2" style={{ color: '#E84A8C', letterSpacing: '0.15em' }}>
          The Golden Rule
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Always buy your NJ Transit <strong className="text-white">round-trip ticket BEFORE you leave NYC</strong>.
          The machine lines at MetLife after a match are 45+ minutes.
          Buy at Penn Station before you go.
        </p>
      </div>

      {/* Routes to MetLife */}
      <div className="label text-[10px] mb-3" style={{ color: '#666', letterSpacing: '0.15em' }}>
        Routes to MetLife Stadium
      </div>

      <div className="space-y-3 mb-8">
        {TRANSIT_ROUTES.map((route, i) => (
          <div
            key={i}
            className="rounded p-4"
            style={{ background: '#111', border: '1px solid #222', borderLeft: `3px solid ${route.color}` }}
          >
            <div className="flex items-start justify-between mb-2 gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-xl">{route.icon}</span>
                <div className="label text-xs" style={{ color: route.color }}>
                  {route.from}
                </div>
              </div>
              <div className="flex gap-2">
                <div className="label rounded px-2 py-0.5 text-[10px] text-zinc-500" style={{ background: '#1A1A1A' }}>
                  {route.time}
                </div>
                <div className="label rounded px-2 py-0.5 text-[10px] text-zinc-500" style={{ background: '#1A1A1A' }}>
                  {route.cost}
                </div>
              </div>
            </div>
            <div className="text-xs text-zinc-500 mb-2">{route.via}</div>
            <div className="text-xs leading-relaxed" style={{ color: '#E8C84A' }}>
              ⚠ {route.tip}
            </div>
          </div>
        ))}
      </div>

      {/* NYC Subway essentials */}
      <div className="label text-[10px] mb-3" style={{ color: '#666', letterSpacing: '0.15em' }}>
        NYC Subway Essentials
      </div>
      <div className="space-y-2 mb-8">
        {SUBWAY_TIPS.map((tip, i) => (
          <div
            key={i}
            className="flex gap-3 items-start rounded p-3"
            style={{ background: '#111', border: '1px solid #222' }}
          >
            <span className="text-lg flex-shrink-0">{tip.icon}</span>
            <div>
              <div className="label text-xs mb-1" style={{ color: '#E84A8C', letterSpacing: '0.04em' }}>
                {tip.title}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{tip.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Practical NYC Tips */}
      <div className="label text-[10px] mb-3" style={{ color: '#666', letterSpacing: '0.15em' }}>
        Surviving NYC — Tips for First-Time Visitors
      </div>
      <div
        className="rounded p-3 mb-3"
        style={{ background: '#161616', border: '1px solid #2A2A2A' }}
      >
        <p className="text-xs text-zinc-500 leading-relaxed">
          The stuff no travel guide bothers to tell you — but you'll be glad you knew.
        </p>
      </div>
      <div className="space-y-2 mb-8">
        {NYC_TIPS.map((tip, i) => (
          <div
            key={i}
            className="flex gap-3 items-start rounded p-3"
            style={{ background: '#111', border: '1px solid #222' }}
          >
            <span className="text-lg flex-shrink-0">{tip.icon}</span>
            <div>
              <div className="label text-xs mb-1" style={{ color: '#E84A8C', letterSpacing: '0.04em' }}>
                {tip.title}
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{tip.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency info */}
      <div className="rounded p-4" style={{ background: '#0D0D0D', border: '1px solid #2A2A2A' }}>
        <div className="label text-[9px] mb-2" style={{ color: '#666', letterSpacing: '0.2em' }}>
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
