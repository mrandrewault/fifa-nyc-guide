'use client';

import { useEffect, useState } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'English',    flag: '🇺🇸' },
  { code: 'es', label: 'Español',    flag: '🇪🇸' },
  { code: 'pt', label: 'Português',  flag: '🇧🇷' },
  { code: 'fr', label: 'Français',   flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch',    flag: '🇩🇪' },
  { code: 'ja', label: '日本語',      flag: '🇯🇵' },
  { code: 'ko', label: '한국어',      flag: '🇰🇷' },
  { code: 'ar', label: 'العربية',    flag: '🇲🇦' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'it', label: 'Italiano',   flag: '🇮🇹' },
  { code: 'no', label: 'Norsk',      flag: '🇳🇴' },
];

declare global {
  interface Window { googleTranslateElementInit: () => void; }
}

// Read the current target language from the googtrans cookie that Google Translate sets.
// Cookie format: googtrans=/en/es  → second segment is the target language.
function getLanguageFromCookie(): string {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/googtrans=\/[^/]+\/([a-z-]+)/);
  return match ? match[1] : 'en';
}

// Nuke the googtrans cookie on every domain variant Google might have set it on.
// Google sets this cookie on multiple domains (e.g. "golazo.nyc" AND ".golazo.nyc"),
// and missing any one of them means the cookie survives the reload and re-translates the page.
function clearAllTranslateCookies() {
  if (typeof document === 'undefined') return;

  const hostname = window.location.hostname;
  const expired = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';

  // Build every plausible domain variant.
  const domains = new Set<string>();
  domains.add(hostname);                  // e.g. "golazo.nyc"
  domains.add('.' + hostname);            // e.g. ".golazo.nyc"

  // Also handle subdomains like "www.golazo.nyc" by stripping back to root.
  const parts = hostname.split('.');
  if (parts.length > 2) {
    const root = parts.slice(-2).join('.');
    domains.add(root);
    domains.add('.' + root);
  }

  // Clear with no domain specified (covers the variant set on the exact host).
  document.cookie = `googtrans=; ${expired}; path=/`;

  // Clear on every domain variant.
  domains.forEach(domain => {
    document.cookie = `googtrans=; ${expired}; path=/; domain=${domain}`;
  });
}

export default function TranslateWidget() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('en');

  useEffect(() => {
    setActive(getLanguageFromCookie());

    if (!document.getElementById('google-translate-script')) {
      window.googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          'google_translate_element'
        );
      };
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.head.appendChild(script);
    }
  }, []);

  function selectLanguage(langCode: string) {
    setOpen(false);

    // Selecting English = full reset to original page language.
    if (langCode === 'en') {
      clearAllTranslateCookies();
      // Force a hard navigation rather than a reload so any in-memory translation
      // state from the Google script is also discarded.
      window.location.href = window.location.pathname + window.location.search;
      return;
    }

    // Selecting any other language = trigger Google Translate.
    setActive(langCode);
    setTimeout(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
      }
    }, 500);
  }

  const activeLang = LANGUAGES.find(l => l.code === active) ?? LANGUAGES[0];

  return (
    // The "notranslate" class tells Google Translate to leave this entire widget alone.
    // Without it, Google translates our own dropdown labels (e.g. "English" → "Inglês").
    <div className="notranslate" translate="no">
      <div id="google_translate_element" style={{ display: 'none' }} />

      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-2 rounded-full transition-all duration-200"
          style={{
            background: active !== 'en' ? '#E8C84A' : '#1E1E1E',
            border: `1px solid ${active !== 'en' ? '#E8C84A' : '#3A3A3A'}`,
            color: active !== 'en' ? '#000' : '#ccc',
            padding: '7px 14px',
          }}
        >
          <span style={{ fontSize: '15px', lineHeight: 1 }}>
            {activeLang.flag}
          </span>
          <span
            className="label"
            style={{
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: active !== 'en' ? '#000' : '#ccc',
            }}
          >
            {activeLang.label}
          </span>
          <span style={{ fontSize: '8px', opacity: 0.6 }}>▼</span>
        </button>

        {open && (
          <div
            className="absolute right-0 top-full mt-2 z-50 rounded-lg border border-zinc-800 shadow-2xl overflow-hidden"
            style={{ background: '#161616', minWidth: '170px' }}
          >
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang.code)}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-zinc-800 border-b border-zinc-900 transition-colors"
                style={{ background: active === lang.code ? '#E8C84A11' : 'transparent' }}
              >
                <span style={{ fontSize: '15px' }}>{lang.flag}</span>
                <span
                  className="label text-[11px]"
                  style={{ color: active === lang.code ? '#E8C84A' : '#ccc' }}
                >
                  {lang.label}
                </span>
                {active === lang.code && (
                  <span style={{ marginLeft: 'auto', color: '#E8C84A', fontSize: '10px' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        body { top: 0 !important; }
        .goog-te-banner-frame { display: none !important; }
        .skiptranslate { display: none !important; }
        #goog-gt-tt { display: none !important; }
      `}</style>
    </div>
  );
}
