import { motion } from 'framer-motion';
import Image from 'next/image';
import { contentImages } from '../../../lib/images/unsplash';

interface MusicFeaturedHeroProps {
  featuredStation: string;
  featuredSubtitle: string;
  featuredTitle: string;
  isLight: boolean;
  listenNow: string;
  hasTracks: boolean;
  onPlay: () => void;
}

export default function MusicFeaturedHero({ featuredStation, featuredSubtitle, featuredTitle, hasTracks, isLight, listenNow, onPlay }: MusicFeaturedHeroProps) {
  return (
    <motion.div animate={{ opacity: 1, scale: 1 }} className="relative rounded-3xl overflow-hidden mb-8 cursor-pointer group" initial={{ opacity: 0, scale: 0.97 }} style={{ height: '200px' }} transition={{ delay: 0.15 }}>
      <Image alt="Featured" className="object-cover group-hover:scale-105 transition-transform duration-700" fill src={contentImages.music[1].url} />
      <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to right, rgba(240,244,247,0.92) 0%, rgba(240,244,247,0.55) 55%, rgba(240,244,247,0.1) 100%)' : 'linear-gradient(to right, rgba(10,15,24,0.95) 0%, rgba(10,15,24,0.45) 55%, rgba(10,15,24,0.1) 100%)' }} />
      <div className="absolute inset-0 p-7 flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full" style={{ background: 'rgba(0,229,186,0.15)', border: '1px solid rgba(0,229,186,0.3)', color: 'rgb(0,229,186)' }}>{featuredStation}</span>
          <motion.div animate={{ opacity: [1, 0.6, 1] }} className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)' }} transition={{ duration: 1.5, repeat: Infinity }}>
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            <span className="text-[10px] font-bold text-red-400">LIVE</span>
          </motion.div>
        </div>
        <div>
          <h2 className="text-2xl font-black mb-1" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{featuredTitle}</h2>
          <p className="text-sm mb-3" style={{ color: isLight ? '#475569' : '#9ca3af' }}>{featuredSubtitle}</p>
          <motion.button className="px-5 py-2 rounded-full text-sm font-semibold flex items-center gap-2" disabled={!hasTracks} onClick={onPlay} style={{ background: 'rgba(0,229,186,0.9)', color: '#0A0F18' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            {listenNow}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}


