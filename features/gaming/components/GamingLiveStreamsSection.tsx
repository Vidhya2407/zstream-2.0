import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../../lib/images/unsplash';
import type { CloudGame } from '../../../lib/data/gamingCatalog';
import { getGamingWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';

interface GamingLiveStreamsSectionProps {
  border: string;
  featuredChip: string;
  featuredSubtitle: string;
  featuredTitle: string;
  games: CloudGame[];
  hoveredGame: number | null;
  isLight: boolean;
  libraryTitle: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  playingLabel: string;
  setHoveredGame: (index: number | null) => void;
  shadow: string;
  surface: string;
  watchLive: string;
}

export default function GamingLiveStreamsSection({ border, featuredChip, featuredSubtitle, featuredTitle, games, hoveredGame, isLight, libraryTitle, pageTextPrimary, pageTextSecondary, playingLabel, setHoveredGame, shadow, surface, watchLive }: GamingLiveStreamsSectionProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }} key="live-streams">
      <motion.div animate={{ opacity: 1, scale: 1 }} className="relative rounded-3xl overflow-hidden mb-8 cursor-pointer group" initial={{ opacity: 0, scale: 0.97 }} style={{ height: '280px', boxShadow: shadow }} transition={{ delay: 0.1 }}>
        <Image alt="Featured game" className="object-cover group-hover:scale-105 transition-transform duration-700" fill src={contentImages.gaming[1].url} />
        <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to right, rgba(240,244,247,0.96) 0%, rgba(240,244,247,0.55) 55%, rgba(240,244,247,0.12) 100%)' : 'linear-gradient(to right, rgba(10,15,24,0.97) 0%, rgba(10,15,24,0.5) 55%, rgba(10,15,24,0.1) 100%)' }} />
        <div className="absolute inset-0 p-10 flex flex-col justify-center max-w-lg">
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full w-fit mb-3" style={{ background: 'rgba(0,200,80,0.15)', border: '1px solid rgba(0,200,80,0.35)', color: 'rgb(74,222,128)' }}>{featuredChip}</span>
          <h2 className="text-3xl font-black mb-2" style={{ color: pageTextPrimary }}>{featuredTitle}</h2>
          <p className="text-sm mb-5" style={{ color: pageTextSecondary }}>{featuredSubtitle}</p>
          <Link href={getWatchHref(getGamingWatchId(2))}><motion.button className="px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 w-fit" style={{ background: 'rgba(0,200,80,0.85)', color: '#0A0F18' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>{watchLive}</motion.button></Link>
        </div>
      </motion.div>

      <h3 className="text-xs font-bold uppercase tracking-widest mb-5" style={{ color: pageTextSecondary }}>{libraryTitle}</h3>
      <div className="grid md:grid-cols-3 gap-5">
        {games.map((game, index) => (
          <Link key={game.id} href={getWatchHref(getGamingWatchId(game.id))}>
          <motion.div key={game.id} animate={{ opacity: 1, scale: 1 }} className="group rounded-2xl overflow-hidden cursor-pointer" initial={{ opacity: 0, scale: 0.94 }} onHoverEnd={() => setHoveredGame(null)} onHoverStart={() => setHoveredGame(index)} style={{ background: hoveredGame === index ? (isLight ? 'rgba(0,200,80,0.08)' : 'rgba(0,200,80,0.04)') : surface, border: `1px solid ${hoveredGame === index ? 'rgba(0,200,80,0.3)' : border}`, boxShadow: shadow, transition: 'all 0.25s ease' }} transition={{ delay: index * 0.07 }} whileHover={{ y: -4 }}>
            <div className="aspect-video relative overflow-hidden">
              <Image alt={game.title} className="object-cover group-hover:scale-105 transition-transform duration-500" fill sizes="280px" src={contentImages.gaming[game.imageIdx].url} />
              <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to top, rgba(248,250,252,0.92), rgba(248,250,252,0.08), transparent)' : 'linear-gradient(to top, rgba(10,15,24,0.95), transparent, transparent)' }} />
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg text-xs font-bold" style={{ background: 'rgba(0,200,80,0.15)', border: '1px solid rgba(0,200,80,0.3)', color: 'rgb(74,222,128)' }}>{game.rating}</div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"><div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,200,80,0.85)', boxShadow: '0 0 24px rgba(0,200,80,0.4)' }}><svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></div></div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-sm mb-1" style={{ color: pageTextPrimary }}>{game.title}</h4>
              <div className="flex items-center justify-between"><span className="text-xs" style={{ color: pageTextSecondary }}>{game.genre}</span><span className="text-xs" style={{ color: 'rgb(0,229,186)' }}>{game.players} {playingLabel}</span></div>
            </div>
          </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}


