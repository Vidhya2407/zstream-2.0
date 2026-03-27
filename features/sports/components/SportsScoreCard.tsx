import React from 'react';
import { motion } from 'framer-motion';
import type { LiveMatch } from '../../../lib/data/sportsCatalog';

interface SportsScoreCardProps {
  isGerman: boolean;
  isLight: boolean;
  match: LiveMatch;
}

export default function SportsScoreCard({ isGerman, isLight, match }: SportsScoreCardProps) {
  const [minute, setMinute] = React.useState(match.minute);
  const isLive = match.status === 'LIVE';
  const isFinished = match.status === 'FT';

  React.useEffect(() => {
    if (!isLive) return;
    const timer = setInterval(() => setMinute((current) => Math.min(current + 1, 90)), 60000);
    return () => clearInterval(timer);
  }, [isLive]);

  const formatScore = (score: number) => {
    if (match.sport === 'Golf') return score > 0 ? `+${score}` : score === 0 ? 'E' : score;
    return score;
  };

  const getStatusText = () => {
    if (isLive) {
      if (match.sport === 'Cricket') return `LIVE (Day ${Math.floor(minute / 450) + 1})`;
      if (match.sport === 'Tennis') return 'LIVE (Set 3)';
      if (match.sport === 'Golf') return 'LIVE (Hole 14)';
      if (match.sport === 'Racing') return `LIVE (Lap ${minute}/78)`;
      return `LIVE ${minute}'`;
    }
    if (isFinished) return isGerman ? 'Beendet' : 'Full Time';
    return isGerman ? 'Demnaechst' : 'Soon';
  };

  return (
    <motion.div className="rounded-2xl p-4 sm:p-5" style={{ background: isLight ? 'rgba(255,255,255,0.78)' : 'rgba(15,25,35,0.85)', border: `1px solid ${isLive ? 'rgba(239,68,68,0.25)' : isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)'}`, boxShadow: isLight ? '0 10px 30px rgba(15,23,42,0.08)' : 'none' }} whileHover={{ y: -3, scale: 1.01 }}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex flex-col"><span className="mb-0.5 text-[9px] font-black uppercase tracking-widest text-eco-green">{match.sport}</span><span className="line-clamp-1 text-[10px] font-medium text-gray-500">{match.league}</span></div>
        <div className="flex items-center gap-2.5">
          {isLive ? <motion.div animate={{ opacity: [1, 0.75, 1] }} className="flex items-center gap-1.5 rounded-full bg-red-500/85 px-2.5 py-1 text-[9px] font-bold text-white" transition={{ duration: 1.8, repeat: Infinity }}><div className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> {getStatusText()}</motion.div> : <span className="rounded-full px-2.5 py-1 text-[9px] font-bold" style={{ background: isFinished ? 'rgba(255,255,255,0.05)' : 'rgba(251,191,36,0.15)', color: isFinished ? 'rgba(255,255,255,0.4)' : 'rgb(251,191,36)' }}>{getStatusText()}</span>}
          <div className="flex items-center gap-1 text-[9px] text-gray-500"><svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>{match.viewers}</div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-right"><p className="mb-2 line-clamp-1 text-xs font-bold text-white sm:text-sm">{match.homeTeam}</p><motion.p animate={{ scale: [1.15, 1] }} className="text-3xl font-black sm:text-4xl" key={match.homeScore} style={{ color: isLive && match.homeScore > match.awayScore ? 'rgb(0,229,186)' : '#fff' }} transition={{ duration: 0.3 }}>{formatScore(match.homeScore)}</motion.p></div>
        <div className="flex flex-shrink-0 flex-col items-center"><span className="mb-1 text-[10px] font-black text-gray-600">VS</span>{isLive && <motion.div animate={{ opacity: [1, 0, 1] }} className="h-1.5 w-1.5 rounded-full bg-red-500" transition={{ duration: 1, repeat: Infinity }} />}</div>
        <div className="flex-1 text-left"><p className="mb-2 line-clamp-1 text-xs font-bold text-white sm:text-sm">{match.awayTeam}</p><motion.p animate={{ scale: [1.15, 1] }} className="text-3xl font-black sm:text-4xl" key={match.awayScore} style={{ color: isLive && match.awayScore > match.homeScore ? 'rgb(0,229,186)' : '#fff' }} transition={{ duration: 0.3 }}>{formatScore(match.awayScore)}</motion.p></div>
      </div>
    </motion.div>
  );
}
