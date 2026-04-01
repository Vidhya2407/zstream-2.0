import React from 'react';
import { useThemeStore } from '../../../lib/stores/themeStore';

interface StarRatingProps {
  onChange?: (value: number) => void;
  size?: 'sm' | 'lg';
  value: number;
}

export default function StarRating({ onChange, size = 'sm', value }: StarRatingProps) {
  const { theme } = useThemeStore();
  const isLight = theme === 'light';
  const [hovered, setHovered] = React.useState(0);
  const className = size === 'sm' ? 'text-xs' : 'text-lg';

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
          className="transition-transform hover:scale-110"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          style={{ color: star <= (hovered || value) ? 'rgb(251,191,36)' : isLight ? 'rgba(148,163,184,0.5)' : 'rgba(255,255,255,0.15)' }}
        >
          *
        </button>
      ))}
    </div>
  );
}


