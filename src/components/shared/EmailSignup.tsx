'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'golazo_subscribed';

export default function EmailSignup({ accent = '#E8C84A' }: { accent?: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  // Check on mount if they already subscribed on this device
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const subscribed = localStorage.getItem(STORAGE_KEY);
      if (subscribed === 'true') setAlreadySubscribed(true);
    }
  }, []);

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
        // Save to localStorage so we don't show the form again
        localStorage.setItem(STORAGE_KEY, 'true');
        setStatus('success');
      } else {
        throw new Error(data.error || 'Subscription failed');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Try again?');
    }
  }

  // Don't show anything if already subscribed
  if (alreadySubscribed) return null;

  if (status === 'success') {
    // Save and show thank you briefly
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
          Check your inbox — we sent you a welcome note. See you this summer.
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
