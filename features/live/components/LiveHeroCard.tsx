import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { LiveHealthMetric, LiveStreamView } from '../types';
import LiveHealthPanel from './LiveHealthPanel';

interface LiveHeroCardProps {
  healthLabel: string;
  healthMetrics: LiveHealthMetric[];
  heroMetaBg: string;
  heroMetaBorder: string;
  heroOverlay: string;
  heroTitleColor: string;
  isLight: boolean;
  offsetLabel: string;
  showHealth: boolean;
  statusButtonBg: string;
  stream: LiveStreamView;
  streamHealthLabel: string;
  toggleHealth: () => void;
  watchLiveLabel: string;
  watchHref: string;
}

export default function LiveHeroCard({ healthLabel, healthMetrics, heroMetaBg, heroMetaBorder, heroOverlay, heroTitleColor, isLight, offsetLabel, showHealth, statusButtonBg, stream, streamHealthLabel, toggleHealth, watchLiveLabel, watchHref }: LiveHeroCardProps) {
  return (
    <motion.div animate={{ opacity: 1, scale: 1 }} className="relative rounded-3xl overflow-hidden" initial={{ opacity: 0, scale: 0.97 }} key={stream.id} style={{ height: '320px' }} transition={{ delay: 0.15 }}>
      <Image alt={stream.title} className="object-cover" fill src={stream.imageUrl} />
      <div className="absolute inset-0" style={{ background: heroOverlay }} />
      <div className="absolute top-4 left-4 flex items-center gap-2.5">
        <motion.div animate={{ opacity: [1, 0.85, 1] }} className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(239,68,68,0.85)', backdropFilter: 'blur(8px)' }} transition={{ duration: 1.8, repeat: Infinity }}>
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="text-white text-xs font-bold">LIVE</span>
        </motion.div>
        <div className="px-2.5 py-1.5 rounded-full text-xs font-medium" style={{ background: isLight ? 'rgba(255,255,255,0.88)' : 'rgba(10,15,24,0.55)', backdropFilter: 'blur(8px)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.12)', color: isLight ? '#0f172a' : '#ffffff' }}>{stream.category}</div>
      </div>
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: isLight ? 'rgba(255,255,255,0.88)' : 'rgba(10,15,24,0.55)', backdropFilter: 'blur(8px)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.12)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: isLight ? '#0f172a' : '#ffffff' }} viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="text-xs font-semibold" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{stream.viewers.toLocaleString()}</span>
        </div>
        <motion.button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[10px] font-bold" onClick={toggleHealth} style={{ background: statusButtonBg, backdropFilter: 'blur(8px)', color: 'rgb(0,229,186)', border: isLight ? '1px solid rgba(0,229,186,0.24)' : '1px solid rgba(0,229,186,0.3)' }} whileHover={{ scale: 1.05 }}>
          {healthLabel}
        </motion.button>
      </div>
      <AnimatePresence>
        {showHealth && <LiveHealthPanel isLight={isLight} metrics={healthMetrics} streamHealthLabel={streamHealthLabel} />}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h2 className="text-2xl font-black mb-3" style={{ color: heroTitleColor }}>{stream.title}</h2>
        <div className="flex items-center gap-3">
          <Link href={watchHref}>
            <motion.button className="px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2" style={{ background: 'rgba(239,68,68,0.9)', color: 'white' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              {watchLiveLabel}
            </motion.button>
          </Link>
          <div className="px-3 py-2 rounded-full text-xs font-medium flex items-center gap-1.5" style={{ background: heroMetaBg, border: heroMetaBorder, color: 'rgb(0,229,186)' }}>
            {stream.carbonOffset.toFixed(3)}g {offsetLabel}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
