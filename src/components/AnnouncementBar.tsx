'use client';

import { useState, useEffect } from 'react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  // Check localStorage on mount to see if user has previously dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('golazo-shop-banner-dismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('golazo-shop-banner-dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: '#FFFFFF',
        color: '#0A0A0A',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        fontFamily: '"Barlow Condensed", system-ui, sans-serif',
      }}
    >
      {/* Logo */}
      <img
        src="/golazo-shop-logo.png"
        alt="I soccer NY"
        style={{
          height: '28px',
          width: 'auto',
          flexShrink: 0,
        }}
      />

      {/* Message + link */}
      <a
        href="https://shop.golazo.nyc"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#0A0A0A',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontWeight: 700 }}>The Golazo NYC shop is live</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span>
          Find your country&apos;s tee at{' '}
          <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
            shop.golazo.nyc
          </span>
        </span>
      </a>

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#0A0A0A',
          opacity: 0.5,
          cursor: 'pointer',
          padding: '4px 8px',
          fontSize: '18px',
          lineHeight: 1,
          marginLeft: 'auto',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
      >
        ×
      </button>
    </div>
  );
}

