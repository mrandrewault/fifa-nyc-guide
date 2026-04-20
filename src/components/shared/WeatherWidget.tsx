'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  temp_f: number;
  temp_c: number;
  condition: string;
  icon: string;
  humidity: number;
  feels_like_f: number;
}

const CONDITION_EMOJI: Record<string, string> = {
  sunny: '☀️', clear: '☀️', 'partly cloudy': '⛅', cloudy: '☁️',
  overcast: '☁️', rain: '🌧️', drizzle: '🌦️', shower: '🌧️',
  thunder: '⛈️', storm: '⛈️', fog: '🌫️', mist: '🌫️',
  humid: '💧', hot: '🥵',
};

function getConditionEmoji(condition: string): string {
  const lower = condition.toLowerCase();
  for (const [key, emoji] of Object.entries(CONDITION_EMOJI)) {
    if (lower.includes(key)) return emoji;
  }
  return '🌡️';
}

function getHeatWarning(temp_f: number, humidity: number): string | null {
  if (temp_f >= 90 && humidity >= 60) return "Extreme heat + high humidity. Bring water, wear light clothing.";
  if (temp_f >= 85) return "Hot and humid. Stay hydrated — MetLife is an open-air stadium.";
  if (temp_f >= 75) return "Warm and likely humid. Breathable clothing recommended.";
  return null;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // wttr.in free weather API — no key needed
    fetch('https://wttr.in/East+Rutherford+NJ?format=j1')
      .then(r => r.json())
      .then(data => {
        const current = data.current_condition?.[0];
        if (!current) throw new Error('No data');
        setWeather({
          temp_f: parseInt(current.temp_F),
          temp_c: parseInt(current.temp_C),
          condition: current.weatherDesc?.[0]?.value ?? 'Unknown',
          icon: getConditionEmoji(current.weatherDesc?.[0]?.value ?? ''),
          humidity: parseInt(current.humidity),
          feels_like_f: parseInt(current.FeelsLikeF),
        });
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="rounded p-3 flex items-center gap-2" style={{ background: '#111', border: '1px solid #222' }}>
        <span className="text-lg">🌡️</span>
        <span className="text-xs text-zinc-600">Loading MetLife weather...</span>
      </div>
    );
  }

  if (error || !weather) return null;

  const warning = getHeatWarning(weather.temp_f, weather.humidity);

  return (
    <div className="rounded p-3 mb-4" style={{ background: '#111', border: '1px solid #222' }}>
      <div className="label text-[9px] mb-2" style={{ color: '#666', letterSpacing: '0.15em' }}>
        🏟️ MetLife Stadium Area — Current Conditions
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{weather.icon}</span>
          <div>
            <div className="text-white font-medium text-sm">
              {weather.temp_f}°F <span className="text-zinc-600">({weather.temp_c}°C)</span>
            </div>
            <div className="text-xs text-zinc-500">{weather.condition}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-500">Feels like {weather.feels_like_f}°F</div>
          <div className="text-xs text-zinc-600">Humidity {weather.humidity}%</div>
        </div>
      </div>
      {warning && (
        <div className="mt-2 text-[11px] leading-relaxed" style={{ color: '#E8C84A' }}>
          ⚠️ {warning}
        </div>
      )}
    </div>
  );
}
