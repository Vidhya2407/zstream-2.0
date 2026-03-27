'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../../lib/images/unsplash';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { getGamingWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';
import { ACHIEVEMENTS, DASH_TABS as TABS, FRIENDS, GAMES, RECS, SAVE_STATES, getAchievements, getFriends, getGames, getSaveStates, rarityConfig, statusConfig, type Achievement, type CloudGame, type DashTab, type Friend, type SaveState } from '../../../lib/data/gamingCatalog';

function CarbonSessionCounter() {
  const [seconds, setSeconds] = React.useState(0);
  const RATE_G_PER_HR = 14.8;

  React.useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const grams = ((seconds / 3600) * RATE_G_PER_HR).toFixed(3);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(0,200,80,0.08)', border: '1px solid rgba(0,200,80,0.2)', color: 'rgb(0,200,80)' }}>
      <span className="text-base">CO2</span>
      <span>Session: {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')} � <strong>{grams}g</strong> CO2</span>
    </div>
  );
}

function LibraryTab({ onPlay, games }: { onPlay: (game: CloudGame) => void; games: CloudGame[] }) {
  const [filter, setFilter] = React.useState<'all' | 'owned' | 'subscribed'>('all');
  const filtered = filter === 'all' ? games : filter === 'owned' ? games.filter(g => g.owned) : games.filter(g => g.subscribed);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(['all', 'owned', 'subscribed'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all" style={filter === f ? { background: 'rgba(0,200,80,0.15)', color: 'rgb(0,200,80)', border: '1px solid rgba(0,200,80,0.3)' } : { background: 'rgba(255,255,255,0.05)', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {f === 'all' ? 'All Games' : f === 'owned' ? 'Owned' : 'Subscribed'}
            </button>
          ))}
        </div>
        <span className="text-gray-500 text-xs">{filtered.length} games</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((game, i) => (
          <motion.div key={game.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl overflow-hidden group" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="relative h-36">
              <Image src={contentImages.gaming[game.imageIdx % contentImages.gaming.length].url} alt={game.title} fill sizes="400px" className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-2 left-2 flex gap-1.5">
                {game.owned && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(0,229,186,0.2)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' }}>Owned</span>}
                {game.subscribed && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(196,132,252,0.2)', color: 'rgb(196,132,252)', border: '1px solid rgba(196,132,252,0.3)' }}>Sub</span>}
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] font-bold text-white px-1.5 py-0.5 rounded-lg" style={{ background: 'rgba(0,0,0,0.8)' }}>* {game.rating}</div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm leading-snug">{game.title}</p>
                <p className="text-gray-400 text-[10px]">{game.genre}</p>
              </div>
            </div>
            <div className="p-3 space-y-2.5">
              <div>
                <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                  <span>Progress</span>
                  <span className="text-white font-semibold">{game.progress}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div className="h-full rounded-full" style={{ background: 'rgb(0,200,80)', width: `${game.progress}%` }} initial={{ width: 0 }} animate={{ width: `${game.progress}%` }} transition={{ duration: 0.7, delay: i * 0.05 }} />
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-gray-500">
                <span>{game.hoursPlayed}h played</span>
                <span className="font-bold" style={{ color: 'rgb(0,200,80)' }}>{game.carbonGPerHr}g CO2/hr</span>
              </div>
              <Link href={getWatchHref(getGamingWatchId(game.id))}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => onPlay(game)} className="w-full py-2 rounded-xl text-xs font-black transition-all" style={{ background: 'linear-gradient(135deg, rgba(0,200,80,0.8), rgba(0,229,186,0.7))', color: 'white' }}>
                  Play Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-white font-bold text-sm mb-3">Recommended for You</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RECS.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="relative h-24">
                <Image src={contentImages.gaming[r.imageIdx].url} alt={r.title} fill sizes="300px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <p className="text-white text-xs font-bold">{r.title}</p>
                  <p className="text-gray-400 text-[9px]">{r.genre}</p>
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-gray-500 text-[9px] leading-snug">{r.reason}</p>
                <Link href={getWatchHref(getGamingWatchId(i + 1))} className="mt-2 block w-full py-1.5 rounded-lg text-[10px] font-bold text-center" style={{ background: 'rgba(0,200,80,0.1)', color: 'rgb(0,200,80)', border: '1px solid rgba(0,200,80,0.2)' }}>Play Demo</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RecentTab({ games }: { games: CloudGame[] }) {
  const recent = [...games].sort((a, b) => a.lastPlayed.localeCompare(b.lastPlayed)).slice(0, 5);

  return (
    <div className="space-y-3">
      {recent.map((game, i) => (
        <motion.div key={game.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="flex items-center gap-4 p-4 rounded-2xl group" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="relative w-20 h-14 rounded-xl overflow-hidden flex-shrink-0">
            <Image src={contentImages.gaming[game.imageIdx % contentImages.gaming.length].url} alt={game.title} fill sizes="80px" className="object-cover group-hover:scale-105 transition-transform duration-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold truncate">{game.title}</p>
            <p className="text-gray-500 text-xs">{game.genre} � Last played: {game.lastPlayed}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="h-full rounded-full" style={{ background: 'rgb(0,200,80)', width: `${game.progress}%` }} />
              </div>
              <span className="text-[10px] text-gray-400">{game.progress}%</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <span className="text-[10px] font-bold" style={{ color: 'rgb(0,200,80)' }}>{game.carbonGPerHr}g/hr</span>
            <Link href={getWatchHref(getGamingWatchId(game.id))}><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-4 py-1.5 rounded-xl text-[10px] font-black" style={{ background: 'rgba(0,200,80,0.15)', color: 'rgb(0,200,80)', border: '1px solid rgba(0,200,80,0.25)' }}>
              Resume
            </motion.button></Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AchievementsTab({ achievements }: { achievements: Achievement[] }) {
  const totalPoints = achievements.reduce((s, a) => s + a.points, 0);
  const byRarity = { legendary: achievements.filter(a => a.rarity === 'legendary').length, epic: achievements.filter(a => a.rarity === 'epic').length, rare: achievements.filter(a => a.rarity === 'rare').length, common: achievements.filter(a => a.rarity === 'common').length };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Points', value: totalPoints, color: 'rgb(251,191,36)' },
          { label: 'Legendary', value: byRarity.legendary, color: 'rgb(251,191,36)' },
          { label: 'Epic', value: byRarity.epic, color: 'rgb(196,132,252)' },
          { label: 'Rare', value: byRarity.rare, color: 'rgb(96,165,250)' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="font-black text-2xl" style={{ color: s.color }}>{s.value}</div>
            <div className="text-gray-500 text-[10px] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {achievements.map((ach, i) => {
          const rc = rarityConfig[ach.rarity];
          return (
            <motion.div key={ach.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: rc.bg, border: `1px solid ${rc.border}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: 'rgba(0,0,0,0.2)' }}>{ach.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-white text-xs font-bold truncate">{ach.title}</p>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 capitalize" style={{ background: rc.bg, color: rc.color, border: `1px solid ${rc.border}` }}>{ach.rarity}</span>
                </div>
                <p className="text-gray-400 text-[10px] leading-snug">{ach.desc}</p>
                <p className="text-gray-600 text-[9px] mt-1">{ach.game} � {ach.unlockedAt}</p>
              </div>
              <div className="flex-shrink-0 text-center">
                <div className="font-black text-sm" style={{ color: rc.color }}>+{ach.points}</div>
                <div className="text-gray-600 text-[9px]">pts</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function FriendsTab({ friends }: { friends: Friend[] }) {
  const online = friends.filter(f => f.status !== 'offline');
  const offline = friends.filter(f => f.status === 'offline');

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-white font-bold text-sm mb-3">Online ({online.length})</h3>
        <div className="space-y-2">
          {online.map((f, i) => {
            const sc = statusConfig[f.status];
            return (
              <motion.div key={f.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden" style={{ border: '2px solid rgba(0,200,80,0.3)' }}>
                    <Image src={contentImages.creators[f.avatarIdx % contentImages.creators.length].url} alt={f.name} width={40} height={40} className="object-cover w-full h-full" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0A0F18]" style={{ background: sc.dot }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-white text-xs font-semibold truncate">{f.name}</p>
                    <span className="text-[9px]">{f.country}</span>
                  </div>
                  <p className="text-[10px] truncate" style={{ color: sc.color }}>
                    {f.status === 'in-game' ? `${f.game}` : 'Online'}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {f.status === 'in-game' && <Link href={getWatchHref(getGamingWatchId(1))} className="px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all" style={{ background: 'rgba(0,200,80,0.12)', color: 'rgb(0,200,80)', border: '1px solid rgba(0,200,80,0.25)' }}>Join</Link>}
                  <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    Invite
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      {offline.length > 0 && (
        <div>
          <h3 className="text-gray-500 font-bold text-sm mb-3">Offline ({offline.length})</h3>
          <div className="space-y-2">
            {offline.map((f) => (
              <div key={f.id} className="flex items-center gap-3 p-3 rounded-2xl opacity-50" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden grayscale">
                    <Image src={contentImages.creators[f.avatarIdx % contentImages.creators.length].url} alt={f.name} width={40} height={40} className="object-cover w-full h-full" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0A0F18]" style={{ background: 'rgb(75,85,99)' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-400 text-xs font-semibold">{f.name} {f.country}</p>
                  <p className="text-gray-600 text-[10px]">Offline</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SaveStatesTab({ saveStates }: { saveStates: SaveState[] }) {
  const totalKB = saveStates.reduce((s, sv) => s + sv.sizeKB, 0);
  const maxKB = 10 * 1024;

  return (
    <div className="space-y-5">
      <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-white text-sm font-bold">Cloud Storage</p>
            <p className="text-gray-500 text-xs">{(totalKB / 1024).toFixed(1)} MB used of 10 GB</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(0,200,80,0.1)', color: 'rgb(0,200,80)', border: '1px solid rgba(0,200,80,0.2)' }}>
            {((totalKB / maxKB) * 100).toFixed(1)}% used
          </span>
        </div>
        <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, rgb(0,200,80), rgb(0,229,186))', width: `${(totalKB / maxKB) * 100}%` }} initial={{ width: 0 }} animate={{ width: `${(totalKB / maxKB) * 100}%` }} transition={{ duration: 0.8 }} />
        </div>
      </div>

      <div className="space-y-3">
        {saveStates.map((sv, i) => (
          <motion.div key={sv.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="relative w-16 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={contentImages.gaming[sv.imageIdx % contentImages.gaming.length].url} alt={sv.game} fill sizes="64px" className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-[9px] font-black" style={{ background: 'rgba(0,0,0,0.5)' }}>Slot {sv.slot}</div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold truncate">{sv.game}</p>
              <p className="text-gray-400 text-[10px] truncate">{sv.location}</p>
              <p className="text-gray-600 text-[9px] mt-0.5">Saved {sv.savedAt} � {(sv.sizeKB / 1024).toFixed(2)} MB</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link href={getWatchHref(getGamingWatchId(sv.id))} className="px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all" style={{ background: 'rgba(0,200,80,0.12)', color: 'rgb(0,200,80)', border: '1px solid rgba(0,200,80,0.25)' }}>Load</Link>
              <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all" style={{ background: 'rgba(239,68,68,0.08)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.15)' }}>Delete</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function GamingDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<DashTab>('library');
  const [launchGame, setLaunchGame] = React.useState<CloudGame | null>(null);
  const { language } = useLanguageStore();
  const games = React.useMemo(() => getGames(language), [language]);
  const achievements = React.useMemo(() => getAchievements(language), [language]);
  const friends = React.useMemo(() => getFriends(language), [language]);
  const saveStates = React.useMemo(() => getSaveStates(language), [language]);

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ background: '#0A0F18' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute rounded-full" style={{ width: '600px', height: '600px', top: '-20%', right: '-8%', background: 'radial-gradient(circle, rgba(0,200,80,0.06) 0%, transparent 70%)', filter: 'blur(70px)' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 13, repeat: Infinity }} />
        <motion.div className="absolute rounded-full" style={{ width: '400px', height: '400px', bottom: '-10%', left: '-5%', background: 'radial-gradient(circle, rgba(0,229,186,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 4 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">
        <motion.div className="flex flex-wrap items-center justify-between gap-4 mb-7" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0,200,80,0.4), rgba(0,229,186,0.3))', border: '1px solid rgba(0,200,80,0.3)' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
            </div>
            <div>
              <h1 className="text-white font-black text-2xl">Gaming Dashboard</h1>
              <p className="text-gray-500 text-xs">Cloud Gaming � ZStream Play</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <CarbonSessionCounter />
            <Link href="/gaming">
              <button className="px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>Browse Games</button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-7">
          {[
            { label: 'Total Hours', value: `${games.reduce((s, g) => s + g.hoursPlayed, 0)}h`, icon: 'Time', color: 'rgb(0,200,80)' },
            { label: 'Games in Library', value: games.length, icon: 'Games', color: 'rgb(0,229,186)' },
            { label: 'Achievements', value: ACHIEVEMENTS.length, icon: 'Trophy', color: 'rgb(251,191,36)' },
            { label: 'Cloud Saves', value: `${(saveStates.reduce((s, sv) => s + sv.sizeKB, 0) / 1024).toFixed(1)} MB`, icon: 'Save', color: 'rgb(196,132,252)' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="font-black text-xl text-white">{s.value}</div>
              <div className="text-gray-500 text-[10px] mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1" role="tablist">
          {TABS.map(t => (
            <button key={t.id} role="tab" aria-selected={activeTab === t.id} onClick={() => setActiveTab(t.id)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0" style={activeTab === t.id ? { background: 'rgba(0,200,80,0.15)', color: 'rgb(0,200,80)', border: '1px solid rgba(0,200,80,0.3)' } : { background: 'transparent', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.16 }}>
            {activeTab === 'library' && <LibraryTab onPlay={setLaunchGame} games={games} />}
            {activeTab === 'recent' && <RecentTab games={games} />}
            {activeTab === 'achievements' && <AchievementsTab achievements={achievements} />}
            {activeTab === 'friends' && <FriendsTab friends={friends} />}
            {activeTab === 'saves' && <SaveStatesTab saveStates={saveStates} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {launchGame && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setLaunchGame(null)} />
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} className="relative w-full max-w-sm rounded-3xl p-6 text-center" style={{ background: 'rgba(10,15,24,0.98)', border: '1px solid rgba(0,200,80,0.3)', backdropFilter: 'blur(24px)' }}>
              <div className="relative h-32 rounded-2xl overflow-hidden mb-4">
                <Image src={contentImages.gaming[launchGame.imageIdx % contentImages.gaming.length].url} alt={launchGame.title} fill sizes="400px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <h2 className="text-white font-black text-lg mb-1">{launchGame.title}</h2>
              <p className="text-gray-400 text-xs mb-1">{launchGame.genre} � * {launchGame.rating}</p>
              <p className="text-xs font-bold mb-4" style={{ color: 'rgb(0,200,80)' }}>{launchGame.carbonGPerHr}g CO2/hr � Cloud Streaming</p>
              <div className="flex gap-3">
                <button onClick={() => setLaunchGame(null)} className="flex-1 py-2.5 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.1)' }}>Cancel</button>
                <Link href={getWatchHref(getGamingWatchId(launchGame.id))} className="flex-1"><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setLaunchGame(null)} className="w-full py-2.5 rounded-xl text-xs font-black" style={{ background: 'linear-gradient(135deg, rgb(0,200,80), rgb(0,229,186))', color: 'white' }}>
                  Launch Game
                </motion.button></Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
