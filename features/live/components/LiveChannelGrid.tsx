import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { fmtViewers } from '../../../lib/data/liveCatalog';
import { getLiveWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';
import type { LiveStreamView } from '../types';

interface LiveChannelGridProps {
  activeStream: number;
  cardBg: string;
  cardBorder: string;
  pageTextMuted: string;
  pageTextPrimary: string;
  streams: LiveStreamView[];
  title: string;
  onSelect: (index: number) => void;
}

export default function LiveChannelGrid({ activeStream, cardBg, cardBorder, pageTextMuted, pageTextPrimary, streams, title, onSelect }: LiveChannelGridProps) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: pageTextMuted }}>{title}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {streams.map((stream, index) => (
          <motion.div animate={{ opacity: 1, y: 0 }} className="group rounded-2xl overflow-hidden" initial={{ opacity: 0, y: 16 }} key={stream.id} style={{ background: activeStream === index ? 'rgba(239,68,68,0.06)' : cardBg, border: `1px solid ${activeStream === index ? 'rgba(239,68,68,0.3)' : cardBorder}` }} transition={{ delay: 0.2 + index * 0.07 }} whileHover={{ y: -2 }}>
            <button className="block w-full text-left" onClick={() => onSelect(index)} type="button">
              <div className="aspect-video relative overflow-hidden">
                <Image alt={stream.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="300px" src={stream.imageUrl} />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,15,24,0.9)] via-transparent to-transparent" />
                <motion.div animate={{ opacity: [1, 0.75, 1] }} className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.85)' }} transition={{ duration: 2, repeat: Infinity }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span className="text-white text-[9px] font-bold">LIVE</span>
                </motion.div>
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <svg className="w-3 h-3 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="text-white text-[9px] font-semibold">{fmtViewers(stream.viewers)}</span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold mb-0.5 truncate" style={{ color: pageTextPrimary }}>{stream.title}</p>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px]" style={{ color: pageTextMuted }}>{stream.category}</span>
                  <span className="text-[9px] font-bold" style={{ color: 'rgb(0,229,186)' }}>{stream.quality} | {stream.fps}fps</span>
                </div>
              </div>
            </button>
            <div className="px-3 pb-3">
              <Link className="block rounded-xl px-3 py-2 text-center text-[10px] font-bold transition-all" href={getWatchHref(getLiveWatchId(stream.id))} style={{ background: 'rgba(239,68,68,0.12)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.22)' }}>
                Watch Live
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
