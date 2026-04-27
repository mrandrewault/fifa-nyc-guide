'use client';

import { useEffect } from 'react';

export default function SubmitPage() {
  // Load Tally's embed script so the iframe auto-resizes to fit form content.
  useEffect(() => {
    const existing = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
    if (existing) return;

    const script = document.createElement('script');
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header band */}
      <div className="border-b border-zinc-900 px-6 py-8 sm:py-12">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-[11px] tracking-[0.18em] text-zinc-500 uppercase">
            Golazo.nyc · Help us build the guide
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
            Tell us a spot we missed.
          </h1>
          <p className="mt-4 text-zinc-400 text-base leading-relaxed">
            Know a great spot for fans in NYC? An Argentine bar in Brooklyn,
            a Senegalese restaurant in Harlem, an Italian club in the Bronx?
            Help us add it to the guide. Takes 60 seconds.
          </p>
        </div>
      </div>

      {/* Embedded Tally form */}
      <div className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-2xl rounded-lg bg-white overflow-hidden">
          <iframe
            data-tally-src="https://tally.so/embed/ja0GOx?alignLeft=1&hideTitle=1&transparentBackground=0&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="800"
            frameBorder={0}
            title="Tell us a spot we missed"
            style={{ border: 0, display: 'block' }}
          />
        </div>
      </div>

      {/* Small footer message */}
      <div className="px-6 py-12 text-center">
        <p className="text-xs text-zinc-600">
          Questions? Email{' '}
          <a
            href="mailto:hello@golazo.nyc"
            className="text-zinc-400 underline hover:text-white"
          >
            hello@golazo.nyc
          </a>
        </p>
      </div>
    </main>
  );
}
