'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { contentImages } from '../../../lib/images/unsplash';
import type { ZCreator } from '../types';

interface ZtubeCreatorCardProps {
  creator: ZCreator;
  index: number;
}

export default function ZtubeCreatorCard({ creator, index }: ZtubeCreatorCardProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5 cursor-pointer"
      initial={{ opacity: 0, y: 16 }}
      style={{ background: 'rgba(15,25,35,0.85)', border: '1px solid rgba(255,255,255,0.06)' }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -4, borderColor: 'rgba(239,68,68,0.2)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0" style={{ border: '2px solid rgba(0,229,186,0.3)' }}>
          <Image alt={creator.name} className="object-cover w-full h-full" height={48} src={contentImages.creators[creator.imageIdx % contentImages.creators.length].url} width={48} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-white font-semibold text-sm truncate">{creator.name}</p>
            {creator.verified && (
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="rgb(0,229,186)" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            )}
          </div>
          <p className="text-gray-500 text-[10px]">{creator.category}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[{ label: 'Subscribers', value: creator.subscribers }, { label: 'Videos', value: creator.videos }].map((stat) => (
          <div key={stat.label} className="text-center rounded-xl py-2" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <p className="text-white font-black text-sm">{stat.value}</p>
            <p className="text-gray-600 text-[9px]">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px]" style={{ color: 'rgb(0,229,186)' }}>{creator.carbonOffset} offset</span>
        <motion.button className="text-[10px] font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.22)', color: 'rgb(252,165,165)' }} whileHover={{ scale: 1.06 }}>Subscribe</motion.button>
      </div>
    </motion.div>
  );
}

