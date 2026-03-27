import React from 'react';

interface SeriesStarRatingProps {
  onChange?: (value: number) => void;
  value: number;
}

export default function SeriesStarRating({ onChange, value }: SeriesStarRatingProps) {
  const [hovered, setHovered] = React.useState(0);
  return <div className="flex items-center gap-0.5 text-xs">{[1,2,3,4,5].map((star) => <button key={star} aria-label={`Rate ${star} stars`} onClick={() => onChange?.(star)} onMouseEnter={() => onChange && setHovered(star)} onMouseLeave={() => onChange && setHovered(0)} style={{ color: star <= (hovered || value) ? 'rgb(251,191,36)' : 'rgba(255,255,255,0.12)', cursor: onChange ? 'pointer' : 'default' }}>*</button>)}</div>;
}
