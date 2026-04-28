'use client';

import { useState } from 'react';

/**
 * ShareButton — drop this at the bottom of country pages or the home screen.
 *
 * Usage:
 *   <ShareButton country="Brazil" countryFlag="🇧🇷" accent="#009C3B" />
 *   <ShareButton accent="#E8C84A" />
 *
 * Two buttons side-by-side:
 *  1. Native share button — opens iOS/Android share sheet on mobile,
 *     falls back to "copy link" on desktop.
 *  2. Dedicated WhatsApp button — opens WhatsApp directly with a
 *     pre-filled message. Critical for international fans who
 *     coordinate primarily via WhatsApp groups.
 *
 * Both buttons:
 *  - Pre-fill country-specific messaging when on a country page
 *  - Include UTM parameters so analytics can track which countries
 *    are driving the most shares
 */

interface ShareButtonProps {
  country?: string;
  countryFlag?: string;
  accent?: string;
}

export default function ShareButton({
  country,
  countryFlag,
  accent = '#E8C84A',
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  // Build the shareable URL with UTM tracking. The campaign parameter tells
  // us in analytics whether shares are coming from country pages or homepage.
  const baseUrl = 'https://golazo.nyc';
  const utmCampaign = country ? country.toLowerCase().replace(/\s+/g, '-') : 'home';
  const shareUrl = `${baseUrl}?utm_source=share&utm_medium=button&utm_campaign=${utmCampaign}`;

  // Pre-filled share text. Country-specific when context allows, generic on home.
  const shareTitle = country
    ? `Golazo NYC — ${country} fan guide for World Cup 2026`
    : 'Golazo NYC — The World\'s Guide to the World Cup in NYC';

  const shareText = country
    ? `${countryFlag ?? ''} Found a great NYC fan guide for World Cup 2026 — ${country} edition. Check it out:`
    : '🌎 Found a great NYC fan guide for World Cup 2026:';

  // Handler for the native share button. Uses Web Share API on mobile,
  // falls back to copy-to-clipboard on desktop.
  async function handleNativeShare() {
    const shareData = {
      title: shareTitle,
      text: shareText,
      url: shareUrl,
    };

    // navigator.share is supported on most modern mobile browsers and
    // Safari on macOS. Falls back gracefully on browsers without it.
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled the share sheet — not an error, just bail silently.
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
      return;
    }

    // Desktop fallback: copy URL to clipboard with brief confirmation.
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  }

  // Handler for the WhatsApp button. Opens WhatsApp directly with the
  // pre-filled message. Works on both mobile (opens app) and desktop
  // (opens WhatsApp Web). The wa.me URL is WhatsApp's official format.
  function handleWhatsAppShare() {
    const message = `${shareText} ${shareUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="my-6 rounded-lg border border-zinc-800 bg-zinc-950 px-6 py-6 sm:px-8 sm:py-7">
      <p className="text-[11px] tracking-[0.18em] text-zinc-500 uppercase mb-2">
        Help spread the word
      </p>
      <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-4 leading-snug">
        {country
          ? `Know a ${country} fan heading to NYC?`
          : 'Know fans heading to NYC for the World Cup?'}
      </h3>

      <div className="flex flex-wrap gap-3">
        {/* Native share button (opens iOS/Android share sheet) */}
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{
            background: accent,
            color: getReadableTextColor(accent),
          }}
          aria-label="Share this page"
        >
          {/* iOS-style share icon (arrow out of box) */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          {copied ? 'Link copied!' : 'Share'}
        </button>

        {/* Dedicated WhatsApp button (opens WhatsApp directly) */}
        <button
          onClick={handleWhatsAppShare}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
          style={{
            background: '#25D366',  // Official WhatsApp green
            color: '#FFFFFF',
          }}
          aria-label="Share via WhatsApp"
        >
          {/* WhatsApp icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.464 3.488" />
          </svg>
          WhatsApp
        </button>
      </div>

      <p className="text-[11px] text-zinc-600 mt-4 leading-relaxed">
        {country
          ? `Help your friends find their people in NYC for ${country}'s matches.`
          : 'Help international fans find their people in NYC for World Cup 2026.'}
      </p>
    </div>
  );
}

/**
 * Returns black or white text color depending on which is more readable
 * on the given background hex color. Mirrors the textOn() helper from
 * src/lib/utils.ts to avoid importing across the boundary unnecessarily.
 */
function getReadableTextColor(hex: string): string {
  const h = hex.replace('#', '');
  if (h.length !== 6) return '#000';
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 130 ? '#000' : '#fff';
}
