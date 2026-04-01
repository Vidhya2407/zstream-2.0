'use client';

import ZtubeVideoCard from './ZtubeVideoCard';
import type { ZVideo } from '../types';

interface ZtubeVideoSectionProps {
  isGerman: boolean;
  isLight: boolean;
  items: ZVideo[];
  title: string;
}

export default function ZtubeVideoSection({ isGerman, isLight, items, title }: ZtubeVideoSectionProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'rgb(0,229,186)' }}>{title}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((video, index) => (
          <ZtubeVideoCard key={video.id} delay={index * 0.05} isGerman={isGerman} isLight={isLight} video={video} />
        ))}
      </div>
    </div>
  );
}



