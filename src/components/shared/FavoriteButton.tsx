'use client';

/**
 * FavoriteButton.tsx
 * 
 * Heart button to add/remove a venue from saved spots.
 * Drop this into any venue card.
 * 
 * Place in: src/components/shared/FavoriteButton.tsx
 * 
 * Usage:
 *   <FavoriteButton venue={venue} />
 */

import { useFavorites, FavoriteVenue } from '@/lib/useFavorites';

interface Props {
  venue: FavoriteVenue;
  size?: 'sm' | 'md';
}

export default function FavoriteButton({ venue, size = 'md' }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const saved = isFavorite(venue.id);

  return (
    <button
      onClick={e => {
        e.stopPropagation();
        toggleFavorite(venue);
      }}
      title={saved ? 'Remove from My Spots' : 'Save to My Spots'}
      className="transition-transform active:scale-90"
      style={{ fontSize: size === 'sm' ? '14px' : '18px', lineHeight: 1 }}
    >
      {saved ? '❤️' : '🤍'}
    </button>
  );
}
