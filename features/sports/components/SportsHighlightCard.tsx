import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { contentImages } from '../../../lib/images/unsplash';
import type { HighlightCard } from '../../../lib/data/sportsCatalog';

interface SportsHighlightCardProps {
  isGerman: boolean;
  isWatchlisted: boolean;
  item: HighlightCard;
  onToggleWatchlist: (id: string) => void;
}

function CarbonBadge({ score }: { score: number }) {
  const grade = score < 0.03 ? { label: 'A+', color: 'rgb(0,229,186)', bg: 'rgba(0,229,186,0.1)', border: 'rgba(0,229,186,0.2)' }
    : score < 0.06 ? { label: 'A', color: 'rgb(0,217,255)', bg: 'rgba(0,217,255,0.1)', border: 'rgba(0,217,255,0.2)' }
    : { label: 'B', color: 'rgb(96,165,250)', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)' };

  return <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-black" style={{ background: grade.bg, color: grade.color, border: `1px solid ${grade.border}` }}>{grade.label} · {(score * 1000).toFixed(0)}mg</span>;
}

function StarRating({ value }: { value: number }) {
  return <div className="flex items-center gap-0.5 text-xs">{[1,2,3,4,5].map((n) => <span key={n} style={{ color: n <= value ? 'rgb(251,191,36)' : 'rgba(255,255,255,0.12)' }}>★</span>)}</div>;
}

export default function SportsHighlightCard({ isGerman, isWatchlisted, item, onToggleWatchlist }: SportsHighlightCardProps) {
  return (
    <motion.div className="group cursor-pointer overflow-hidden rounded-2xl" initial={{ opacity: 0, y: 16 }} style={{ background: 'rgba(15,25,35,0.9)', border: '1px solid rgba(255,255,255,0.06)' }} whileHover={{ y: -4, borderColor: 'rgba(251,191,36,0.2)' }}>
      <div className="relative aspect-video overflow-hidden">
        <Image alt={item.title} className="object-cover transition-transform duration-500 group-hover:scale-105" fill sizes="320px" src={contentImages.sports[item.imageIdx % contentImages.sports.length].url} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute left-2 top-2"><span className="rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-bold text-[#0A0F18]">{item.sport}</span></div>
        <div className="absolute right-2 top-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-bold text-amber-300">★ {item.rating}</div>
        <motion.button aria-label="Toggle watchlist" className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full" onClick={(event) => { event.stopPropagation(); event.preventDefault(); onToggleWatchlist(item.id); }} style={{ background: isWatchlisted ? 'rgba(0,229,186,0.9)' : 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)', border: `1px solid ${isWatchlisted ? 'rgba(0,229,186,0.5)' : 'rgba(255,255,255,0.12)'}` }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <svg className="h-4 w-4" fill={isWatchlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} style={{ color: isWatchlisted ? '#0A0F18' : 'white' }} viewBox="0 0 24 24"><path d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </motion.button>
        <div className="absolute bottom-2 left-2 rounded bg-black/75 px-1.5 py-0.5 text-[9px] font-bold text-white">{item.duration}</div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"><Link href={`/sports/${item.id}`}><motion.div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400" style={{ boxShadow: '0 0 28px rgba(251,191,36,0.5)' }} whileHover={{ scale: 1.08 }}><svg className="ml-1 h-6 w-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></motion.div></Link></div>
      </div>
      <div className="p-3.5">
        <Link href={`/sports/${item.id}`}><h3 className="mb-1 line-clamp-2 text-sm font-bold text-white transition-colors hover:text-amber-300">{item.title}</h3></Link>
        <p className="mb-2 text-[10px] text-gray-500">{item.match} · {item.daysAgo === 0 ? (isGerman ? 'Heute' : 'Today') : item.daysAgo === 1 ? (isGerman ? 'Gestern' : 'Yesterday') : `${item.daysAgo}d ago`} · {item.views} views</p>
        <div className="flex items-center justify-between">
          <CarbonBadge score={item.carbonScore} />
          <StarRating value={Math.round(item.rating / 2)} />
        </div>
      </div>
    </motion.div>
  );
}


