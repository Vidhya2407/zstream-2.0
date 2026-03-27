'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../../lib/images/unsplash';
import { fmtAge, translateZTube } from '../config';
import type { ZVideo } from '../types';

function TypeBadge({ type }: { type: ZVideo['type'] }) {
  if (type === 'music') {
    return <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(147,51,234,0.15)', color: 'rgb(196,132,252)', border: '1px solid rgba(147,51,234,0.2)' }}>Music</span>;
  }

  if (type === 'podcast') {
    return <span className="text-[8px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(0,128,255,0.12)', color: 'rgb(96,165,250)', border: '1px solid rgba(0,128,255,0.2)' }}>Podcast</span>;
  }

  return null;
}

interface ZtubeVideoCardProps {
  delay?: number;
  isGerman: boolean;
  isLight: boolean;
  video: ZVideo;
}

export default function ZtubeVideoCard({ delay = 0, isGerman, isLight, video }: ZtubeVideoCardProps) {
  return (
    <Link href={`/ztube/watch/${video.id}`}>
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="group cursor-pointer"
        initial={{ opacity: 0, y: 14 }}
        transition={{ delay }}
        whileHover={{ y: -3 }}
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-3">
          <Image
            alt={video.title}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            src={contentImages.abstract[video.imageIdx % contentImages.abstract.length].url}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-lg" style={{ background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.8)', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid transparent', boxShadow: isLight ? '0 8px 18px rgba(15,23,42,0.10)' : 'none' }}>{video.duration}</div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,229,186,0.9)' }}>
              <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </div>
          <div className="absolute top-2 left-2">
            <TypeBadge type={video.type} />
          </div>
        </div>

        <div className="flex gap-2.5">
          <div className="w-9 h-9 rounded-full flex-shrink-0 overflow-hidden" style={{ background: 'rgba(0,229,186,0.15)', border: '1px solid rgba(0,229,186,0.2)' }}>
            <Image alt={video.channel} className="object-cover w-full h-full" height={36} src={contentImages.creators[Number(video.id) % contentImages.creators.length].url} width={36} />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-semibold line-clamp-2 mb-1 leading-snug" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{translateZTube(video.title, isGerman)}</h4>
            <div className="flex items-center gap-1">
              <p className="text-[10px] truncate" style={{ color: isLight ? '#64748b' : '#6b7280' }}>{video.channel}</p>
              {video.verified && (
                <svg className="w-3 h-3 flex-shrink-0" fill="rgb(0,229,186)" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )}
            </div>
            <p className="text-[10px] mt-0.5" style={{ color: isLight ? '#94a3b8' : '#4b5563' }}>{video.views} {isGerman ? 'Aufrufe' : 'views'} · {fmtAge(video.daysAgo, isGerman)}</p>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1 inline-block" style={{ background: 'rgba(0,229,186,0.08)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.15)' }}>
              {video.carbonScore}g CO2/hr {isGerman ? 'saved' : 'saved'}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

