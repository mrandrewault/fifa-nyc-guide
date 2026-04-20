'use client';

import { useState } from 'react';

/**
 * EmailSignup.tsx — Beehiiv integration
 * 
 * SETUP (5 minutes):
 * 1. Go to beehiiv.com → sign up
 * 2. Create a publication (e.g. "Golazo NYC")
 * 3. Settings → API → create an API key
 * 4. Copy your Publication ID from Settings → General (looks like pub_xxxxxxxx)
 * 5. Paste both values below
 * 
 * NOTE: Beehiiv's API requires a server-side call (can't call from browser directly
 * due to CORS). This component calls a Next.js API route at /api/subscribe
 * which you also need to create — see the api-subscribe-route.ts file.
 */

export default function EmailSignup({ accent = '#E8C84A' }: { accent?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email.');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Try again?');
    }
  }

  if (status === 'success') {
    return (
      <div
        className="rounded p-5 text-center"
        style={{ background: `${accent}15`, border: `1px solid ${accent}44` }}
      >
        <div className="text-3xl mb-2">⚽</div>
        <div className="label text-sm mb-1" style={{ color: accent, letterSpacing: '0.05em' }}>
          You&apos;re in!
        </div>
        <p className="text-xs text-zinc-500">
          We&apos;ll send you World Cup NYC updates as the tournament gets close.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded p-5" style={{ background: '#0D0D0D', border: `1px solid ${accent}33` }}>
      <div className="mb-4">
        <div className="label text-[10px] mb-1" style={{ color: accent, letterSpacing: '0.2em' }}>
          Stay in the Loop
        </div>
        <p className="text-sm text-zinc-300 leading-relaxed">
          Get World Cup NYC updates — new venues, watch party announcements, match day guides.
        </p>
      </div>

      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrorMsg(''); }}
          placeholder="your@email.com"
          className="flex-1 rounded px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors"
          style={{
            background: '#161616',
            border: `1px solid ${email ? accent + '66' : '#333'}`,
          }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit(e as any)}
          disabled={status === 'loading'}
        />
        <button
          onClick={handleSubmit}
          disabled={status === 'loading'}
          className="label rounded px-4 py-2.5 text-xs transition-opacity"
          style={{
            background: accent,
            color: '#000',
            opacity: status === 'loading' ? 0.7 : 1,
            letterSpacing: '0.08em',
            flexShrink: 0,
          }}
        >
          {status === 'loading' ? '...' : 'Notify Me'}
        </button>
      </div>

      {errorMsg && <p className="mt-2 text-xs text-red-400">{errorMsg}</p>}
      <p className="mt-2.5 text-[10px] text-zinc-700">No spam. Unsubscribe anytime. Free forever.</p>
    </div>
  );
}
