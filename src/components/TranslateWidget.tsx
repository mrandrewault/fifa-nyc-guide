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

// Read the current language from the googtrans cookie that Google Translate sets.
// Cookie format looks like: googtrans=/en/es  (the second segment is the target language)
function getLanguageFromCookie(): string {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/googtrans=\/[^/]+\/([a-z-]+)/);
  return match ? match[1] : 'en';
}

export default function TranslateWidget() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('en');

  // Sync the active language from the cookie on mount, so the UI reflects
  // reality even after a page reload or when arriving via a translated link.
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

    // Selecting English = reset to original (clear cookies, reload).
    if (langCode === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
      window.location.reload();
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
    <>
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
    </>
  );
}
