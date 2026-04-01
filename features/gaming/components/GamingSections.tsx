import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ESPORTS_EVENTS, REMIX_CLIPS, TOP_CREATORS, TOURNAMENT_BRACKET, CloudGame } from '../../../lib/data/gamingCatalog';
import Image from 'next/image';
import { contentImages } from '../../../lib/images/unsplash';
import { getGamingWatchId, getMiniWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';

interface GamingTournamentsSectionProps {
  border: string;
  featuredTitle: string;
  isLight: boolean;
  pageTextPrimary: string;
  pageTextSecondary: string;
  shadow: string;
  surface: string;
  surfaceAlt: string;
  tournamentBracket: typeof TOURNAMENT_BRACKET;
}

export function GamingTournamentsSection({ border, featuredTitle, isLight, pageTextPrimary, pageTextSecondary, shadow, surface, surfaceAlt, tournamentBracket }: GamingTournamentsSectionProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }} key="tournaments">
      <div className="flex items-center justify-between mb-6"><h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: pageTextSecondary }}>Tournament Bracket - {featuredTitle}</h3><span className="text-[10px] font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.1)', color: 'rgb(239,68,68)', border: '1px solid rgba(239,68,68,0.2)' }}>Live</span></div>
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none">
        {tournamentBracket.map((round, roundIndex) => (
          <div key={roundIndex} className="flex-shrink-0" style={{ minWidth: '220px' }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: roundIndex === tournamentBracket.length - 1 ? 'rgb(251,191,36)' : pageTextSecondary }}>{round.round}</p>
            <div className="space-y-4">
              {round.matches.map((match, matchIndex) => (
                <motion.div key={matchIndex} animate={{ opacity: 1, x: 0 }} className="rounded-xl overflow-hidden" initial={{ opacity: 0, x: -12 }} style={{ border: `1px solid ${match.done ? 'rgba(0,229,186,0.2)' : roundIndex === tournamentBracket.length - 1 ? 'rgba(251,191,36,0.3)' : border}`, boxShadow: shadow }} transition={{ delay: roundIndex * 0.1 + matchIndex * 0.07 }}>
                  {[{ name: match.team1, score: match.score1 }, { name: match.team2, score: match.score2 }].map((team, teamIndex) => (
                    <div key={teamIndex} className="flex items-center justify-between px-3 py-2.5" style={{ background: teamIndex === 0 ? surface : surfaceAlt, borderTop: teamIndex === 1 ? `1px solid ${border}` : 'none' }}>
                      <span className="text-xs font-semibold truncate" style={{ color: team.name === 'TBD' ? (isLight ? '#94a3b8' : '#4b5563') : pageTextPrimary, fontStyle: team.name === 'TBD' ? 'italic' : 'normal' }}>{team.name}</span>
                      {team.score !== null ? <span className="text-xs font-black ml-2 flex-shrink-0" style={{ color: teamIndex === 0 && match.score1 !== null && match.score1 > (match.score2 ?? 0) || teamIndex === 1 && (match.score2 ?? 0) > (match.score1 ?? 0) ? 'rgb(0,229,186)' : 'rgb(156,163,175)' }}>{team.score}</span> : <span className="text-[10px] ml-2" style={{ color: pageTextSecondary }}>-</span>}
                    </div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-2xl p-5" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)', boxShadow: shadow }}><p className="text-amber-400 font-black text-sm mb-1">Grand Final Prize</p><p className="text-2xl font-black" style={{ color: pageTextPrimary }}>$1,000,000 <span className="text-base font-normal" style={{ color: pageTextSecondary }}>in Carbon Credits</span></p><p className="text-xs mt-1" style={{ color: pageTextSecondary }}>Winner donates 10% to verified reforestation projects</p></div>
    </motion.div>
  );
}

interface GamingCreatorsSectionProps {
  border: string;
  creators: typeof TOP_CREATORS;
  creatorsTitle: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  shadow: string;
  surface: string;
}

export function GamingCreatorsSection({ border, creators, creatorsTitle, pageTextPrimary, pageTextSecondary, shadow, surface }: GamingCreatorsSectionProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }} key="creators">
      <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: pageTextSecondary }}>{creatorsTitle}</h3>
      <div className="grid md:grid-cols-3 gap-6">{creators.map((creator, index) => <motion.div key={creator.id} animate={{ opacity: 1, scale: 1 }} className="p-6 rounded-2xl" initial={{ opacity: 0, scale: 0.95 }} style={{ background: surface, border: `1px solid ${border}`, boxShadow: shadow }} transition={{ delay: index * 0.1 }}><div className="flex items-center gap-4 mb-4"><div className="w-16 h-16 rounded-full overflow-hidden border-2 border-eco-green"><Image alt={creator.name} className="object-cover" height={64} src={contentImages.music[creator.avatarIdx % contentImages.music.length].url} width={64} /></div><div><h4 className="font-bold" style={{ color: pageTextPrimary }}>{creator.name}</h4><p className="text-xs" style={{ color: 'rgb(0,229,186)' }}>{creator.followers} followers</p></div></div><p className="text-xs mb-4" style={{ color: pageTextSecondary }}>{creator.bio}</p><motion.button className="w-full py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(0,200,80,0.1)', color: 'rgb(0,200,80)', border: '1px solid rgba(0,200,80,0.2)' }} whileHover={{ background: 'rgba(0,200,80,0.2)' }}>Follow</motion.button></motion.div>)}</div>
    </motion.div>
  );
}

interface GamingEsportsSectionProps {
  esports: typeof ESPORTS_EVENTS;
  esportsTitle: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  shadow: string;
  surface: string;
  border: string;
}

export function GamingEsportsSection({ border, esports, esportsTitle, pageTextPrimary, pageTextSecondary, shadow, surface }: GamingEsportsSectionProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }} key="esports">
      <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: pageTextSecondary }}>{esportsTitle}</h3>
      <div className="space-y-4">{esports.map((event, index) => <motion.div key={event.id} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between p-5 rounded-2xl" initial={{ opacity: 0, x: -20 }} style={{ background: surface, border: `1px solid ${border}`, boxShadow: shadow }} transition={{ delay: index * 0.1 }}><div className="flex items-center gap-6"><div className="text-center min-w-[80px]"><p className="text-[10px] font-bold uppercase" style={{ color: event.date === 'LIVE NOW' ? 'rgb(239,68,68)' : pageTextSecondary }}>{event.date}</p></div><div><h4 className="font-bold" style={{ color: pageTextPrimary }}>{event.title}</h4><p className="text-xs" style={{ color: pageTextSecondary }}>{event.game} | {event.viewers} watching</p></div></div><div className="text-right"><p className="text-[10px] uppercase font-bold" style={{ color: pageTextSecondary }}>Prize Pool</p><p className="text-sm font-black text-amber-400">{event.prize}</p></div></motion.div>)}</div>
    </motion.div>
  );
}

interface GamingNewGamesSectionProps {
  newGames: CloudGame[];
  newGamesTitle: string;
  shadow: string;
}

export function GamingNewGamesSection({ newGames, newGamesTitle, shadow }: GamingNewGamesSectionProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }} key="new-games">
      <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#94a3b8' }}>{newGamesTitle}</h3>
      <div className="grid md:grid-cols-2 gap-6">{newGames.map((game, index) => <Link key={game.id} href={getWatchHref(getGamingWatchId(game.id))}><motion.div animate={{ opacity: 1, y: 0 }} className="group relative aspect-[21/9] rounded-2xl overflow-hidden cursor-pointer" initial={{ opacity: 0, y: 20 }} style={{ boxShadow: shadow }} transition={{ delay: index * 0.1 }}><Image alt={game.title} className="object-cover group-hover:scale-105 transition-transform duration-700" fill src={contentImages.gaming[game.imageIdx % contentImages.gaming.length].url} /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /><div className="absolute bottom-0 left-0 p-6"><h4 className="text-xl font-bold text-white mb-1">{game.title}</h4><p className="text-xs text-white/70">{game.genre} | Rating: {game.rating}</p></div><div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold bg-eco-green text-dark-base">NEW</div></motion.div></Link>)}</div>
    </motion.div>
  );
}

interface GamingRemixSectionProps {
  border: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  remixClips: typeof REMIX_CLIPS;
  remixTitle: string;
  shadow: string;
  surface: string;
}

export function GamingRemixSection({ border, pageTextPrimary, pageTextSecondary, remixClips, remixTitle, shadow, surface }: GamingRemixSectionProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} initial={{ opacity: 0, y: 8 }} key="remix">
      <h3 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: pageTextSecondary }}>{remixTitle}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">{remixClips.map((clip, index) => <Link key={clip.id} href={getWatchHref(getMiniWatchId(clip.id))}><motion.div animate={{ opacity: 1, scale: 1 }} className="group rounded-xl overflow-hidden" initial={{ opacity: 0, scale: 0.9 }} style={{ background: surface, border: `1px solid ${border}`, boxShadow: shadow }} transition={{ delay: index * 0.08 }}><div className="aspect-video relative bg-black/20"><div className="absolute inset-0 flex items-center justify-center"><svg className="w-10 h-10 text-white/50 group-hover:text-eco-green transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></div><div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-[10px] text-white font-mono">{clip.duration}</div></div><div className="p-3"><h4 className="text-xs font-bold mb-1 line-clamp-1" style={{ color: pageTextPrimary }}>{clip.title}</h4><div className="flex items-center justify-between text-[10px]" style={{ color: pageTextSecondary }}><span>{clip.creator}</span><span className="text-eco-green-bright">-{clip.carbonSaved} CO2</span></div></div></motion.div></Link>)}</div>
    </motion.div>
  );
}


