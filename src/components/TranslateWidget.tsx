'use client';

import { useEffect, useState } from 'react';

const LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'ar', label: 'العربية', flag: '🇲🇦' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'no', label: 'Norsk', flag: '🇳🇴' },
];

declare global {
  interface Window { googleTranslateElementInit: () => void; }
}

export default function TranslateWidget() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
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

  function translate(langCode: string) {
    setActive(langCode);
    setOpen(false);
    setTimeout(() => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
      }
    }, 500);
  }

  function resetToEnglish() {
    setActive(null);
    setOpen(false);
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
    window.location.reload();
  }

  const activeLang = LANGUAGES.find(l => l.code === active);

  return (
    <>
      <div id="google_translate_element" style={{ display: 'none' }} />

      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-1.5 rounded px-2.5 py-1.5 transition-colors"
          style={{
            background: active ? '#E8C84A22' : '#161616',
            border: `1px solid ${active ? '#E8C84A55' : '#333'}`,
            color: active ? '#E8C84A' : '#888',
          }}
        >
          <span className="text-sm">{activeLang ? activeLang.flag : '🌐'}</span>
          <span className="label text-[10px]">{activeLang ? activeLang.label : 'Translate'}</span>
          <span className="text-[9px] text-zinc-600">▼</span>
        </button>

        {open && (
          <div
            className="absolute right-0 top-full mt-1 z-50 rounded border border-zinc-800 shadow-2xl overflow-hidden"
            style={{ background: '#161616', minWidth: '160px' }}
          >
            {active && (
              <button
                onClick={resetToEnglish}
                className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-zinc-800 border-b border-zinc-900"
              >
                <span>🇺🇸</span>
                <span className="label text-[11px] text-zinc-400">English (reset)</span>
              </button>
            )}
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => translate(lang.code)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-zinc-800 border-b border-zinc-900"
                style={{ background: active === lang.code ? '#E8C84A11' : 'transparent' }}
              >
                <span>{lang.flag}</span>
                <span className="label text-[11px]" style={{ color: active === lang.code ? '#E8C84A' : '#ccc' }}>
                  {lang.label}
                </span>
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
