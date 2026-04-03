'use client';

import { useEffect, useRef, useState } from 'react';
import type { Venue } from '@/types';
import { typeColor } from '@/lib/utils';

// Leaflet must be imported dynamically (SSR-safe)
let L: typeof import('leaflet') | null = null;

// NYC center — shows all 5 boroughs at zoom 11
const NYC_CENTER: [number, number] = [40.7350, -73.9800];
const NYC_ZOOM = 11;
const METLIFE: [number, number] = [40.8135, -74.0745];

interface MapViewProps {
  venues: Venue[];
  countryFlag: string;
  countryName: string;
  accent: string;
}

function createFlagIcon(flag: string, type: string, lf: typeof import('leaflet')) {
  const tc = typeColor(type as any);
  return lf.divIcon({
    html: `<div style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;background:#111;border:2.5px solid ${tc};font-size:18px;box-shadow:0 2px 8px rgba(0,0,0,0.6);cursor:pointer;">${flag}</div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
}

function createMetLifeIcon(lf: typeof import('leaflet')) {
  return lf.divIcon({
    html: `<div style="display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:6px;background:#E8C84A;font-size:20px;box-shadow:0 2px 10px rgba(232,200,74,0.4);cursor:pointer;">🏟️</div>`,
    className: '',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -22],
  });
}

export default function MapView({ venues, countryFlag, countryName, accent }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<import('leaflet').Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const mappableVenues = venues.filter(v => v.lat && v.lng);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Inject Leaflet CSS dynamically — this is the key fix for tile rendering
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    import('leaflet').then(lf => {
      L = lf;

      // Fix default icon paths
      delete (lf.Icon.Default.prototype as any)._getIconUrl;
      lf.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapRef.current) return;

      const map = lf.map(mapRef.current, {
        center: NYC_CENTER,
        zoom: NYC_ZOOM,
        zoomControl: true,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // CartoDB dark tiles — free, no API key
      lf.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Add venue markers
      venues.filter(v => v.lat && v.lng).forEach(venue => {
        const icon = createFlagIcon(countryFlag, venue.type, lf);
        const tc = typeColor(venue.type as any);
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.address)}`;
        const marker = lf.marker([venue.lat!, venue.lng!], { icon });
        marker.addTo(map);
        marker.bindPopup(`
          <div style="font-family:Impact,sans-serif;min-width:200px;max-width:240px;">
            <div style="font-size:14px;text-transform:uppercase;color:#fff;margin-bottom:4px;">${venue.name}</div>
            <div style="display:inline-block;background:${tc}22;color:${tc};font-size:9px;padding:2px 6px;border-radius:2px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;">${venue.type}</div>
            <div style="font-size:11px;color:#888;margin-bottom:6px;font-family:Georgia,serif;">📍 ${venue.address}</div>
            <div style="font-size:11px;color:#bbb;line-height:1.5;font-family:Georgia,serif;margin-bottom:8px;">${venue.why}</div>
            <div style="font-size:11px;color:#666;font-family:Georgia,serif;margin-bottom:8px;"><span style="color:#E8C84A;">Order: </span>${venue.mustOrder}</div>
            <a href="${mapsUrl}" target="_blank" style="display:block;background:#E8C84A;color:#000;padding:6px;border-radius:3px;text-align:center;font-family:Impact,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">Directions ↗</a>
          </div>`, { maxWidth: 260, className: 'golazo-popup' });
      });

      // MetLife marker
      const metIcon = createMetLifeIcon(lf);
      lf.marker(METLIFE, { icon: metIcon }).addTo(map)
        .bindPopup(`<div style="font-family:Impact,sans-serif;min-width:180px;"><div style="font-size:14px;text-transform:uppercase;color:#E8C84A;margin-bottom:4px;">MetLife Stadium</div><div style="font-size:11px;color:#888;font-family:Georgia,serif;margin-bottom:6px;">1 MetLife Stadium Dr, East Rutherford, NJ</div><div style="font-size:11px;color:#bbb;font-family:Georgia,serif;margin-bottom:8px;">World Cup 2026 Final — July 19</div><a href="https://www.google.com/maps/place/MetLife+Stadium" target="_blank" style="display:block;background:#E8C84A;color:#000;padding:6px;border-radius:3px;text-align:center;font-family:Impact,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">Directions ↗</a></div>`,
          { maxWidth: 240, className: 'golazo-popup' });

      // Fit bounds to show all venues + MetLife
      const pts = venues.filter(v => v.lat && v.lng).map(v => [v.lat!, v.lng!] as [number, number]);
      pts.push(METLIFE);
      if (pts.length >= 2) {
        map.fitBounds(lf.latLngBounds(pts), { padding: [40, 40] });
      }

      setLoading(false);
    }).catch(() => { setError('Map failed to load'); setLoading(false); });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when country changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !L) return;

    map.eachLayer(layer => { if (!(layer as any)._url) map.removeLayer(layer); });

    venues.filter(v => v.lat && v.lng).forEach(venue => {
      if (!L) return;
      const icon = createFlagIcon(countryFlag, venue.type, L);
      const tc = typeColor(venue.type as any);
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.address)}`;
      L.marker([venue.lat!, venue.lng!], { icon }).addTo(map)
        .bindPopup(`<div style="font-family:Impact,sans-serif;min-width:200px;max-width:240px;"><div style="font-size:14px;text-transform:uppercase;color:#fff;margin-bottom:4px;">${venue.name}</div><div style="display:inline-block;background:${tc}22;color:${tc};font-size:9px;padding:2px 6px;border-radius:2px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;">${venue.type}</div><div style="font-size:11px;color:#888;margin-bottom:6px;font-family:Georgia,serif;">📍 ${venue.address}</div><div style="font-size:11px;color:#bbb;line-height:1.5;font-family:Georgia,serif;margin-bottom:8px;">${venue.why}</div><a href="${mapsUrl}" target="_blank" style="display:block;background:#E8C84A;color:#000;padding:6px;border-radius:3px;text-align:center;font-family:Impact,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">Directions ↗</a></div>`,
          { maxWidth: 260, className: 'golazo-popup' });
    });

    if (L) {
      const metIcon = createMetLifeIcon(L);
      L.marker(METLIFE, { icon: metIcon }).addTo(map)
        .bindPopup(`<div style="font-family:Impact,sans-serif;"><div style="font-size:14px;text-transform:uppercase;color:#E8C84A;">MetLife Stadium</div><div style="font-size:11px;color:#888;font-family:Georgia,serif;margin:4px 0;">World Cup 2026 Final — July 19</div><a href="https://www.google.com/maps/place/MetLife+Stadium" target="_blank" style="display:block;background:#E8C84A;color:#000;padding:6px;border-radius:3px;text-align:center;font-family:Impact,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">Directions ↗</a></div>`,
          { maxWidth: 200, className: 'golazo-popup' });

      const pts = venues.filter(v => v.lat && v.lng).map(v => [v.lat!, v.lng!] as [number, number]);
      pts.push(METLIFE);
      if (pts.length >= 2) map.fitBounds(L.latLngBounds(pts), { padding: [40, 40] });
      else map.setView(NYC_CENTER, NYC_ZOOM);
    }
  }, [venues, countryFlag]);

  if (error) return (
    <div className="flex items-center justify-center h-64 rounded" style={{ background: '#111', border: '1px solid #222' }}>
      <p className="text-zinc-600 text-sm">{error}</p>
    </div>
  );

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full rounded overflow-hidden" style={{ height: '420px', background: '#1A1A1A' }} />

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded" style={{ background: '#111' }}>
          <div className="text-4xl mb-3" style={{ animation: 'spin 1.2s linear infinite' }}>{countryFlag}</div>
          <div className="label text-xs text-zinc-500" style={{ letterSpacing: '0.1em' }}>Loading map...</div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {!loading && (
        <div className="mt-2 flex flex-wrap gap-3 px-1">
          {(['watch party','bar','restaurant'] as const).map(type => {
            const tc = typeColor(type);
            if (!mappableVenues.some(v => v.type === type)) return null;
            return (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: tc }} />
                <span className="text-[10px] text-zinc-500 capitalize">{type}</span>
              </div>
            );
          })}
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-sm">🏟️</span>
            <span className="text-[10px] text-zinc-500">MetLife Stadium</span>
          </div>
        </div>
      )}

      {!loading && mappableVenues.length > 0 && (
        <div className="mt-1 text-center">
          <p className="text-[10px] text-zinc-600">{mappableVenues.length} venues mapped · Tap any {countryFlag} pin for details + directions</p>
        </div>
      )}

      {/* Leaflet popup dark theme */}
      <style>{`
        .leaflet-popup-content-wrapper { background:#111!important;border:1px solid #333!important;border-radius:6px!important;box-shadow:0 8px 32px rgba(0,0,0,0.8)!important;padding:0!important; }
        .leaflet-popup-content { margin:12px!important;color:#fff!important; }
        .leaflet-popup-tip { background:#333!important; }
        .leaflet-popup-close-button { color:#666!important;top:8px!important;right:8px!important; }
        .leaflet-popup-close-button:hover { color:#fff!important; }
        .leaflet-control-zoom a { background:#161616!important;color:#888!important;border-color:#333!important; }
        .leaflet-control-zoom a:hover { background:#222!important;color:#fff!important; }
      `}</style>
    </div>
  );
}
