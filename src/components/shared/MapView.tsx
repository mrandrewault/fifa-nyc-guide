'use client';

/**
 * MapView.tsx
 *
 * Full NYC map showing all venues for a selected country
 * as flag-emoji markers. Uses Leaflet (no API key required).
 *
 * Renders all 5 boroughs at once so fans can see their
 * community spots geographically distributed across the city.
 */

import { useEffect, useRef, useState } from 'react';
import type { Venue } from '@/types';
import { typeColor } from '@/lib/utils';

// Leaflet must be imported dynamically (SSR-safe)
let L: typeof import('leaflet') | null = null;

// NYC center — shows all 5 boroughs comfortably at zoom 11
const NYC_CENTER: [number, number] = [40.7128, -73.9860];
const NYC_ZOOM = 11;

// MetLife Stadium coordinates
const METLIFE: [number, number] = [40.8135, -74.0745];

interface MapViewProps {
  venues: Venue[];
  countryFlag: string;
  countryName: string;
  accent: string;
}

function createFlagIcon(flag: string, type: string, lf: typeof import('leaflet')) {
  const tc = typeColor(type as any);
  const html = `
    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:36px;
      height:36px;
      border-radius:50%;
      background:#111;
      border:2.5px solid ${tc};
      font-size:18px;
      box-shadow:0 2px 8px rgba(0,0,0,0.6);
      cursor:pointer;
    ">${flag}</div>
  `;
  return lf.divIcon({
    html,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
}

function createMetLifeIcon(lf: typeof import('leaflet')) {
  const html = `
    <div style="
      display:flex;
      align-items:center;
      justify-content:center;
      width:40px;
      height:40px;
      border-radius:6px;
      background:#E8C84A;
      font-size:20px;
      box-shadow:0 2px 10px rgba(232,200,74,0.4);
      cursor:pointer;
    ">🏟️</div>
  `;
  return lf.divIcon({
    html,
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

  // Venues that have coordinates
  const mappableVenues = venues.filter(v => v.lat && v.lng);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import Leaflet (SSR-safe)
    import('leaflet').then(lf => {
      L = lf;

      // Fix default icon path issue with Next.js
      delete (lf.Icon.Default.prototype as any)._getIconUrl;
      lf.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      if (!mapRef.current) return;

      // Create map
      const map = lf.map(mapRef.current, {
        center: NYC_CENTER,
        zoom: NYC_ZOOM,
        zoomControl: true,
        attributionControl: false,
      });

      mapInstanceRef.current = map;

      // Dark tile layer (CartoDB dark matter - no API key)
      lf.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        {
          attribution: '© OpenStreetMap contributors © CARTO',
          subdomains: 'abcd',
          maxZoom: 19,
        }
      ).addTo(map);

      // Add venue markers
      mappableVenues.forEach(venue => {
        if (!venue.lat || !venue.lng) return;

        const icon = createFlagIcon(countryFlag, venue.type, lf);
        const tc = typeColor(venue.type as any);

        const popupContent = `
          <div style="font-family:Impact,sans-serif;min-width:200px;max-width:240px;">
            <div style="font-size:14px;text-transform:uppercase;letter-spacing:0.04em;color:#fff;margin-bottom:4px;">${venue.name}</div>
            <div style="display:inline-block;background:${tc}22;color:${tc};font-size:9px;padding:2px 6px;border-radius:2px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;">${venue.type}</div>
            <div style="font-size:11px;color:#888;margin-bottom:6px;font-family:Georgia,serif;">📍 ${venue.address}</div>
            <div style="font-size:11px;color:#bbb;line-height:1.5;font-family:Georgia,serif;margin-bottom:8px;">${venue.why}</div>
            <div style="font-size:11px;color:#666;font-family:Georgia,serif;margin-bottom:8px;"><span style="color:#E8C84A;">Order: </span>${venue.mustOrder}</div>
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.address + ' New York City')}" 
               target="_blank" 
               style="display:block;background:#E8C84A;color:#000;padding:6px;border-radius:3px;text-align:center;font-family:Impact,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">
              Directions ↗
            </a>
          </div>
        `;

        const marker = lf.marker([venue.lat, venue.lng], { icon });
        marker.addTo(map);
        marker.bindPopup(popupContent, {
          maxWidth: 260,
          className: 'golazo-popup',
        });
      });

      // Add MetLife marker
      const metlifeIcon = createMetLifeIcon(lf);
      const metlifeMarker = lf.marker(METLIFE, { icon: metlifeIcon });
      metlifeMarker.addTo(map);
      metlifeMarker.bindPopup(`
        <div style="font-family:Impact,sans-serif;min-width:180px;">
          <div style="font-size:14px;text-transform:uppercase;letter-spacing:0.04em;color:#E8C84A;margin-bottom:4px;">MetLife Stadium</div>
          <div style="font-size:11px;color:#888;font-family:Georgia,serif;margin-bottom:6px;">1 MetLife Stadium Dr, East Rutherford, NJ</div>
          <div style="font-size:11px;color:#bbb;font-family:Georgia,serif;margin-bottom:8px;">World Cup 2026 Final — July 19 · 8 total matches</div>
          <a href="https://www.google.com/maps/place/MetLife+Stadium" 
             target="_blank"
             style="display:block;background:#E8C84A;color:#000;padding:6px;border-radius:3px;text-align:center;font-family:Impact,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">
            Directions ↗
          </a>
        </div>
      `, { maxWidth: 240, className: 'golazo-popup' });

      // Fit bounds to all venues if we have enough
      if (mappableVenues.length >= 2) {
        const points: [number, number][] = mappableVenues
          .filter(v => v.lat && v.lng)
          .map(v => [v.lat!, v.lng!]);
        // Always include MetLife in bounds
        points.push(METLIFE);
        const bounds = lf.latLngBounds(points);
        map.fitBounds(bounds, { padding: [40, 40] });
      }

      setLoading(false);
    }).catch(err => {
      console.error('Leaflet load error:', err);
      setError('Map failed to load');
      setLoading(false);
    });

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Only run once on mount

  // When venues change (different country), remove old markers and add new ones
  useEffect(() => {
    if (!mapInstanceRef.current || !L) return;
    const map = mapInstanceRef.current;

    // Remove all layers except tile layer
    map.eachLayer(layer => {
      if ((layer as any)._url) return; // keep tile layer
      map.removeLayer(layer);
    });

    // Re-add venue markers
    mappableVenues.forEach(venue => {
      if (!venue.lat || !venue.lng || !L) return;
      const icon = createFlagIcon(countryFlag, venue.type, L);
      const tc = typeColor(venue.type as any);
      const marker = L.marker([venue.lat, venue.lng], { icon });
      marker.addTo(map);
      marker.bindPopup(`
        <div style="font-family:Impact,sans-serif;min-width:200px;max-width:240px;">
          <div style="font-size:14px;text-transform:uppercase;color:#fff;margin-bottom:4px;">${venue.name}</div>
          <div style="display:inline-block;background:${tc}22;color:${tc};font-size:9px;padding:2px 6px;border-radius:2px;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;">${venue.type}</div>
          <div style="font-size:11px;color:#888;margin-bottom:6px;font-family:Georgia,serif;">📍 ${venue.address}</div>
          <div style="font-size:11px;color:#bbb;line-height:1.5;font-family:Georgia,serif;margin-bottom:8px;">${venue.why}</div>
          <div style="font-size:11px;color:#666;font-family:Georgia,serif;margin-bottom:8px;"><span style="color:#E8C84A;">Order: </span>${venue.mustOrder}</div>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.address + ' New York City')}"
             target="_blank"
             style="display:block;background:#E8C84A;color:#000;padding:6px;border-radius:3px;text-align:center;font-family:Impact,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">
            Directions ↗
          </a>
        </div>
      `, { maxWidth: 260, className: 'golazo-popup' });
    });

    // Re-add MetLife
    if (L) {
      const metIcon = createMetLifeIcon(L);
      const m = L.marker(METLIFE, { icon: metIcon });
      m.addTo(map);
      m.bindPopup(`
        <div style="font-family:Impact,sans-serif;min-width:180px;">
          <div style="font-size:14px;text-transform:uppercase;color:#E8C84A;margin-bottom:4px;">MetLife Stadium</div>
          <div style="font-size:11px;color:#888;font-family:Georgia,serif;margin-bottom:6px;">1 MetLife Stadium Dr, East Rutherford, NJ</div>
          <div style="font-size:11px;color:#bbb;font-family:Georgia,serif;margin-bottom:8px;">World Cup 2026 Final — July 19</div>
          <a href="https://www.google.com/maps/place/MetLife+Stadium" target="_blank"
             style="display:block;background:#E8C84A;color:#000;padding:6px;border-radius:3px;text-align:center;font-family:Impact,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;text-decoration:none;">
            Directions ↗
          </a>
        </div>
      `, { maxWidth: 240, className: 'golazo-popup' });
    }

    // Refit bounds
    if (mappableVenues.length >= 2 && L) {
      const pts: [number, number][] = mappableVenues
        .filter(v => v.lat && v.lng)
        .map(v => [v.lat!, v.lng!]);
      pts.push(METLIFE);
      map.fitBounds(L.latLngBounds(pts), { padding: [40, 40] });
    } else {
      map.setView(NYC_CENTER, NYC_ZOOM);
    }
  }, [venues, countryFlag]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 rounded" style={{ background: '#111', border: '1px solid #222' }}>
        <p className="text-zinc-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Map container */}
      <div
        ref={mapRef}
        className="w-full rounded overflow-hidden"
        style={{ height: '420px', background: '#1A1A1A' }}
      />

      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded" style={{ background: '#111' }}>
          <div className="text-4xl mb-3" style={{ animation: 'spin 1.2s linear infinite' }}>
            {countryFlag}
          </div>
          <div className="label text-xs text-zinc-500" style={{ letterSpacing: '0.1em' }}>
            Loading map...
          </div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Legend */}
      {!loading && (
        <div
          className="mt-2 flex flex-wrap gap-3 px-1"
        >
          {[
            { type: 'watch party', label: 'Watch Party' },
            { type: 'bar', label: 'Bar' },
            { type: 'restaurant', label: 'Restaurant' },
            { type: 'cultural', label: 'Cultural' },
          ].map(({ type, label }) => {
            const tc = typeColor(type as any);
            const hasAny = mappableVenues.some(v => v.type === type);
            if (!hasAny) return null;
            return (
              <div key={type} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full border border-zinc-700" style={{ background: tc }} />
                <span className="text-[10px] text-zinc-500">{label}</span>
              </div>
            );
          })}
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-sm">🏟️</span>
            <span className="text-[10px] text-zinc-500">MetLife Stadium</span>
          </div>
        </div>
      )}

      {/* No coordinates warning */}
      {!loading && mappableVenues.length === 0 && (
        <div className="mt-2 text-center py-3">
          <p className="text-xs text-zinc-600">
            Map coordinates coming soon for {countryName} venues.
            Use the list view below to explore all spots.
          </p>
        </div>
      )}

      {/* Venue count */}
      {!loading && mappableVenues.length > 0 && (
        <div className="mt-2 text-center">
          <p className="text-[10px] text-zinc-600">
            {mappableVenues.length} venues mapped · Tap any {countryFlag} pin for details + directions
          </p>
        </div>
      )}

      {/* Leaflet CSS */}
      <style>{`
        .leaflet-container { background: #1a1a1a; }
        .leaflet-popup-content-wrapper {
          background: #111 !important;
          border: 1px solid #333 !important;
          border-radius: 6px !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.8) !important;
          color: #fff !important;
          padding: 0 !important;
        }
        .leaflet-popup-content {
          margin: 12px !important;
          color: #fff !important;
        }
        .leaflet-popup-tip {
          background: #333 !important;
        }
        .leaflet-popup-close-button {
          color: #666 !important;
          font-size: 16px !important;
          top: 8px !important;
          right: 8px !important;
        }
        .leaflet-popup-close-button:hover { color: #fff !important; }
        .leaflet-control-zoom a {
          background: #161616 !important;
          color: #888 !important;
          border-color: #333 !important;
        }
        .leaflet-control-zoom a:hover {
          background: #222 !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}
