'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '@/lib/stores/themeStore';

type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
interface NFTToken { id: string; name: string; description: string; rarity: Rarity; milestone: string; mintDate: string; icon: string; gradient: string; glowColor: string; earned: boolean; requirement?: string; tokenId: string; }
const RARITY_CONFIG: Record<Rarity, { color: string; bg: string; label: string }> = { Common: { color: 'rgb(156,163,175)', bg: 'rgba(156,163,175,0.12)', label: 'Common' }, Rare: { color: 'rgb(96,165,250)', bg: 'rgba(96,165,250,0.12)', label: 'Rare' }, Epic: { color: 'rgb(167,139,250)', bg: 'rgba(167,139,250,0.12)', label: 'Epic' }, Legendary: { color: 'rgb(251,191,36)', bg: 'rgba(251,191,36,0.12)', label: 'Legendary' } };
const NFT_COLLECTION: NFTToken[] = [
  { id: '1', name: 'Green Pioneer', description: 'First stream on ZSTREAM', rarity: 'Common', milestone: 'First stream', mintDate: 'Jan 12 2024', icon: 'Seed', gradient: 'linear-gradient(135deg, #0f4c35, #0a2e1f)', glowColor: 'rgba(0,229,186,0.25)', earned: true, tokenId: '#00001' },
  { id: '2', name: 'Carbon Champion', description: 'Reached your first 1 kg CO2 estimate', rarity: 'Rare', milestone: '1 kg CO2 estimate', mintDate: 'Feb 28 2024', icon: 'Bolt', gradient: 'linear-gradient(135deg, #0c3a5e, #071c33)', glowColor: 'rgba(0,217,255,0.25)', earned: true, tokenId: '#00247' },
  { id: '3', name: 'Ocean Guardian', description: 'Completed Ocean Warriors series', rarity: 'Epic', milestone: 'Watched 10 episodes', mintDate: 'Apr 3 2024', icon: 'Wave', gradient: 'linear-gradient(135deg, #1e1b4b, #0f0a2e)', glowColor: 'rgba(167,139,250,0.3)', earned: true, tokenId: '#01883' },
  { id: '4', name: 'Solar Streamer', description: 'Reached 100 total streams', rarity: 'Rare', milestone: '100 streams', mintDate: 'Jun 15 2024', icon: 'Sun', gradient: 'linear-gradient(135deg, #451a03, #1c0d01)', glowColor: 'rgba(251,146,60,0.25)', earned: true, tokenId: '#03140' },
  { id: '5', name: 'Zero Emissions', description: 'Streamed 30 days in a row', rarity: 'Epic', milestone: '30-day streak', mintDate: 'Aug 9 2024', icon: 'Fire', gradient: 'linear-gradient(135deg, #4c0519, #2d030e)', glowColor: 'rgba(239,68,68,0.3)', earned: true, tokenId: '#05521' },
  { id: '6', name: 'Climate Hero', description: 'Reached 5 kg CO2 estimate', rarity: 'Legendary', milestone: '5 kg CO2 estimate', mintDate: 'Nov 22 2024', icon: 'Earth', gradient: 'linear-gradient(135deg, #3b1f00, #1c0d00)', glowColor: 'rgba(251,191,36,0.35)', earned: true, tokenId: '#07734' },
  { id: '7', name: 'Quantum Explorer', description: 'Watch all Sci-Fi content', rarity: 'Epic', milestone: 'Complete Sci-Fi genre', mintDate: '-', icon: 'Orb', gradient: 'linear-gradient(135deg, #1a1a2e, #0d0d1a)', glowColor: 'rgba(167,139,250,0.1)', earned: false, requirement: 'Watch 8 Sci-Fi titles', tokenId: '#?????' },
  { id: '8', name: 'Earth Defender', description: 'Reach 10 kg CO2 estimate', rarity: 'Legendary', milestone: '10 kg CO2 estimate', mintDate: '-', icon: 'Shield', gradient: 'linear-gradient(135deg, #1a1200, #0d0900)', glowColor: 'rgba(251,191,36,0.08)', earned: false, requirement: 'Reach 10 kg CO2 estimate (5.8 kg remaining)', tokenId: '#?????' },
];

function NFTCard({ token, index, isLight }: { token: NFTToken; index: number; isLight: boolean }) {
  const [flipped, setFlipped] = React.useState(false);
  const rarity = RARITY_CONFIG[token.rarity];
  const meta = isLight ? '#64748b' : '#6b7280';
  return (
    <motion.div className="flex-shrink-0" style={{ width: '168px' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }}>
      <motion.div className="relative cursor-pointer" style={{ perspective: '800px' }} onClick={() => token.earned && setFlipped((v) => !v)} whileHover={token.earned ? { y: -4 } : {}}>
        <motion.div style={{ transformStyle: 'preserve-3d' }} animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.55, ease: 'easeInOut' }}>
          <div className={`relative overflow-hidden rounded-2xl ${token.earned ? 'nft-shimmer' : ''}`} style={{ background: token.gradient, border: `1px solid ${token.earned ? rarity.color + '35' : 'rgba(255,255,255,0.05)'}`, boxShadow: token.earned ? `0 0 20px ${token.glowColor}` : 'none', filter: token.earned ? 'none' : 'grayscale(1) brightness(0.5)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
            <div className="p-4 pb-3">
              <div className="mb-3 flex items-center justify-between"><span className="rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider" style={{ background: rarity.bg, color: rarity.color }}>{rarity.label}</span><span className="font-mono text-[8px]" style={{ color: meta }}>{token.tokenId}</span></div>
              <div className="mb-3 flex items-center justify-center"><div className="flex h-14 w-14 items-center justify-center rounded-xl text-[11px] font-bold" style={{ background: `${rarity.color}12`, border: `1px solid ${rarity.color}20`, boxShadow: `0 0 20px ${token.glowColor}`, color: rarity.color }}>{token.icon}</div></div>
              <h4 className="mb-1 text-center text-xs font-black leading-tight text-white">{token.name}</h4>
              <p className="mb-3 text-center text-[9px] leading-tight" style={{ color: token.earned ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.55)' }}>{token.earned ? token.description : token.requirement}</p>
              {token.earned ? <div className="flex items-center justify-center gap-1 rounded-lg py-1" style={{ background: `${rarity.color}10` }}><svg className="h-2.5 w-2.5" fill="none" stroke={rarity.color} strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg><span className="text-[9px] font-bold" style={{ color: rarity.color }}>Minted {token.mintDate}</span></div> : <div className="flex items-center justify-center gap-1 rounded-lg py-1" style={{ background: 'rgba(255,255,255,0.04)' }}><svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: 'rgba(255,255,255,0.5)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg><span className="text-[9px] font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>Locked</span></div>}
            </div>
          </div>
          {token.earned && <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl p-4" style={{ background: token.gradient, border: `1px solid ${rarity.color}35`, transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}><div className="mb-3 text-[11px] font-bold" style={{ color: rarity.color }}>{token.icon}</div><p className="mb-1 text-[8px] font-black uppercase tracking-widest" style={{ color: rarity.color }}>{token.rarity} NFT</p><p className="mb-2 text-center text-xs font-bold text-white">{token.name}</p><div className="mb-2 w-full rounded-lg p-2" style={{ background: 'rgba(0,0,0,0.3)' }}><p className="mb-0.5 text-[8px] uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.55)' }}>Milestone</p><p className="text-[9px] font-semibold text-white">{token.milestone}</p></div><p className="font-mono text-[8px]" style={{ color: 'rgba(255,255,255,0.6)' }}>{token.tokenId}</p><p className="mt-1 text-[8px]" style={{ color: 'rgba(255,255,255,0.55)' }}>Tap to flip back</p></div>}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function NFTShelf() {
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';
  const earned = NFT_COLLECTION.filter((n) => n.earned).length;
  const total = NFT_COLLECTION.length;
  const title = isLight ? '#0f172a' : '#ffffff';
  const muted = isLight ? '#64748b' : '#6b7280';

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-black" style={{ color: title }}>Green NFT Collection</h2>
          <p className="mt-0.5 text-[11px]" style={{ color: muted }}><span className="font-bold" style={{ color: title }}>{earned}</span> of {total} earned, tap a card to inspect</p>
        </div>
        <div className="flex items-center gap-3">{Object.entries(RARITY_CONFIG).map(([key, cfg]) => <div key={key} className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full" style={{ background: cfg.color }} /><span className="text-[10px]" style={{ color: muted }}>{cfg.label}</span></div>)}</div>
      </div>
      <div className="relative"><div className="absolute left-0 top-0 bottom-0 z-10 w-8 rounded-l-xl pointer-events-none" style={{ background: isLight ? 'linear-gradient(to right, rgba(255,255,255,0.95), transparent)' : 'linear-gradient(to right, #0A0F18, transparent)' }} /><div className="absolute right-0 top-0 bottom-0 z-10 w-8 rounded-r-xl pointer-events-none" style={{ background: isLight ? 'linear-gradient(to left, rgba(255,255,255,0.95), transparent)' : 'linear-gradient(to left, #0A0F18, transparent)' }} /><div className="flex gap-3 overflow-x-auto px-1 pb-2 scrollbar-none">{NFT_COLLECTION.map((token, i) => <NFTCard key={token.id} token={token} index={i} isLight={isLight} />)}</div></div>
      <div className="mt-4 flex items-center gap-2 rounded-xl px-4 py-2.5" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.12)' }}><span className="text-sm font-bold" style={{ color: 'rgb(251,191,36)' }}>Drop</span><div className="min-w-0 flex-1"><p className="text-xs font-semibold" style={{ color: title }}>Next drop: <span style={{ color: 'rgb(251,191,36)' }}>Quantum Explorer (Epic)</span></p><p className="text-[10px]" style={{ color: muted }}>Watch 8 Sci-Fi titles, 3 remaining</p></div><div className="flex flex-shrink-0 items-center gap-1"><div className="flex gap-0.5">{[0,1,2,3,4,5,6,7].map((n) => <div key={n} className="h-2 w-2 rounded-sm" style={{ background: n < 5 ? 'rgb(167,139,250)' : isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)' }} />)}</div><span className="ml-1 text-[10px]" style={{ color: muted }}>5/8</span></div></div>
    </div>
  );
}


