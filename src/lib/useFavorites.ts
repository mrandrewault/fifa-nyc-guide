/**
 * useFavorites.ts
 * 
 * Custom hook for managing saved venues in localStorage.
 * No login required — saves to the user's device.
 * 
 * Usage:
 *   const { isFavorite, toggleFavorite, favorites } = useFavorites();
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'golazo_favorites';

export interface FavoriteVenue {
  id: string;
  name: string;
  type: string;
  address: string;
  borough: string;
  neighborhood?: string;
  why: string;
  mustOrder: string;
  atmosphere: string;
  countryAssociations: string[];
  lat?: number;
  lng?: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteVenue[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      setFavorites([]);
    }
  }, []);

  // Save to localStorage whenever favorites change
  const saveFavorites = useCallback((updated: FavoriteVenue[]) => {
    setFavorites(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  }, []);

  const isFavorite = useCallback((id: string) => {
    return favorites.some(f => f.id === id);
  }, [favorites]);

  const toggleFavorite = useCallback((venue: FavoriteVenue) => {
    const exists = favorites.some(f => f.id === venue.id);
    if (exists) {
      saveFavorites(favorites.filter(f => f.id !== venue.id));
    } else {
      saveFavorites([...favorites, venue]);
    }
  }, [favorites, saveFavorites]);

  const clearFavorites = useCallback(() => {
    saveFavorites([]);
  }, [saveFavorites]);

  return { favorites, isFavorite, toggleFavorite, clearFavorites };
}
