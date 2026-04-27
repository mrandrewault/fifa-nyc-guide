'use client';

/**
 * SubmitVenueCTA — drop this at the bottom of any country page.
 *
 * Usage:
 *   <SubmitVenueCTA country="Brazil" />
 *
 * The country prop is optional. When provided, clicking the CTA opens the
 * Tally form with that country pre-selected in the dropdown — reducing
 * friction for users who are deep in a specific country's guide.
 */

interface SubmitVenueCTAProps {
  country?: string;
}

export default function SubmitVenueCTA({ country }: SubmitVenueCTAProps) {
  // Tally supports pre-filling fields via URL parameters. The parameter name
  // matches the form's question label (URL-encoded with underscores for spaces).
  // We pre-fill "Which country?" when a country is provided.
  const baseUrl = 'https://tally.so/r/ja0GOx';
  const url = country
    ? `${baseUrl}?Which_country=${encodeURIComponent(country)}`
    : baseUrl;

  return (
    <div className="my-8 rounded-lg border border-zinc-800 bg-zinc-950 px-6 py-6 sm:px-8 sm:py-8">
      <p className="text-[11px] tracking-[0.18em] text-zinc-500 uppercase mb-3">
        Help us build the guide
      </p>
      <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
        {country
          ? `Know a great ${country} spot we missed?`
          : 'Know a great spot we missed?'}
      </h3>
      <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-5">
        Tell us about it and we'll add it to the guide. Takes 60 seconds.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
      >
        Tell us a spot we missed
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
