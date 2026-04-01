'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '@/lib/stores/themeStore';

interface RedeemOption {
  id: string;
  icon: string;
  title: string;
  description: string;
  cost: number;
  impact: string;
  color: string;
}

interface Transaction {
  id: string;
  type: 'earn' | 'spend';
  label: string;
  amount: number;
  time: string;
  icon: string;
}

const REDEEM_OPTIONS: RedeemOption[] = [
  { id: 'tree', icon: 'Tree', title: 'Plant a Tree', description: 'One tree planted in certified forests via Eden Reforestation', cost: 100, impact: '1 tree = 25 kg CO2/yr', color: 'rgb(0,229,186)' },
  { id: 'ocean', icon: 'Wave', title: 'Ocean Cleanup', description: '1 kg of ocean plastic removed through The Ocean Cleanup', cost: 500, impact: '1 kg plastic removed', color: 'rgb(0,217,255)' },
  { id: 'cert', icon: 'Cert', title: 'Carbon Certificate', description: 'Verified carbon offset certificate issued to your name', cost: 750, impact: 'Verified carbon offset', color: 'rgb(96,165,250)' },
  { id: 'premium', icon: 'Bolt', title: 'Green Month', description: 'One month of ZSTREAM Green subscription', cost: 2000, impact: '1 month ad-free HD', color: 'rgb(167,139,250)' },
];

const TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'earn', label: 'Streamed 2h today', amount: 24, time: 'Today', icon: 'Play' },
  { id: '2', type: 'earn', label: 'Daily login bonus', amount: 5, time: 'Today', icon: 'Gift' },
  { id: '3', type: 'earn', label: 'Streamed 3h · Ocean Warriors', amount: 36, time: 'Yesterday', icon: 'Play' },
  { id: '4', type: 'spend', label: 'Tree planted', amount: -100, time: '2 days ago', icon: 'Tree' },
  { id: '5', type: 'earn', label: 'Streamed 1.5h · Green Beats', amount: 18, time: '3 days ago', icon: 'Play' },
  { id: '6', type: 'earn', label: 'NFT milestone bonus', amount: 150, time: '1 week ago', icon: 'Trophy' },
  { id: '7', type: 'spend', label: 'Ocean cleanup', amount: -500, time: '1 week ago', icon: 'Wave' },
  { id: '8', type: 'earn', label: 'Green tier multiplier bonus', amount: 250, time: '1 mo ago', icon: 'Bolt' },
];

const BALANCE = 2840;
const EARN_RATE = 12;
const MULTIPLIER = 1.5;

export default function CarbonCreditPanel() {
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';
  const [redeemTarget, setRedeemTarget] = React.useState<string | null>(null);
  const [redeeming, setRedeeming] = React.useState(false);
  const [redeemed, setRedeemed] = React.useState<Set<string>>(new Set());
  const [balance, setBalance] = React.useState(BALANCE);
  const [showHistory, setShowHistory] = React.useState(false);
  const [animBalance, setAnimBalance] = React.useState(BALANCE);
  const animBalanceRef = React.useRef(BALANCE);
  const muted = isLight ? '#64748b' : '#6b7280';
  const title = isLight ? '#0f172a' : '#ffffff';
  const subtle = isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.02)';
  const border = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)';

  React.useEffect(() => {
    const target = balance;
    const start = animBalanceRef.current;
    const diff = target - start;
    if (diff === 0) return;
    const steps = 30;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      const next = Math.round(start + (diff * i) / steps);
      animBalanceRef.current = next;
      setAnimBalance(next);
      if (i >= steps) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [balance]);

  const handleRedeem = async (option: RedeemOption) => {
    if (balance < option.cost || redeemed.has(option.id)) return;
    setRedeemTarget(option.id);
    setRedeeming(true);
    await new Promise((r) => setTimeout(r, 1400));
    setBalance((b) => b - option.cost);
    setRedeemed((prev) => new Set([...prev, option.id]));
    setRedeeming(false);
    setRedeemTarget(null);
  };

  return (
    <div className="space-y-5">
      <motion.div className="relative overflow-hidden rounded-2xl p-5" style={{ background: isLight ? 'linear-gradient(135deg, rgba(0,229,186,0.14) 0%, rgba(59,130,246,0.08) 55%, rgba(255,255,255,0.95) 100%)' : 'linear-gradient(135deg, rgba(0,229,186,0.1) 0%, rgba(0,217,255,0.06) 50%, rgba(0,128,255,0.08) 100%)', border: '1px solid rgba(0,229,186,0.2)' }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 80% 20%, rgba(0,229,186,0.08), transparent 60%)' }} />
        <div className="relative z-10">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <p className="mb-1 text-[10px] uppercase tracking-[0.16em]" style={{ color: muted }}>Carbon Credit Balance</p>
              <div className="flex items-baseline gap-2">
                <motion.span key={animBalance} className="text-3xl font-black" style={{ color: 'rgb(0,229,186)' }}>{animBalance.toLocaleString()}</motion.span>
                <span className="text-sm font-bold" style={{ color: muted }}>GRNC</span>
              </div>
              <p className="mt-1 text-[10px]" style={{ color: muted }}>˜ EUR {(animBalance * 0.001).toFixed(2)} equivalent</p>
            </div>
            <div className="text-right">
              <div className="mb-2 flex items-center gap-1.5 rounded-full px-2.5 py-1.5" style={{ background: 'rgba(0,229,186,0.1)', border: '1px solid rgba(0,229,186,0.2)' }}>
                <motion.div className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(0,229,186)' }} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="text-[10px] font-bold" style={{ color: 'rgb(0,229,186)' }}>+{Math.round(EARN_RATE * MULTIPLIER)}/hr</span>
              </div>
              <p className="text-[9px]" style={{ color: muted }}>{MULTIPLIER}x Green tier multiplier</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[{ label: 'Earned total', value: '4,240', color: 'rgb(0,229,186)' }, { label: 'Redeemed', value: '1,400', color: 'rgb(251,146,60)' }, { label: 'Streak bonus', value: 'x1.2', color: 'rgb(251,191,36)' }].map((stat) => (
              <div key={stat.label} className="rounded-xl py-2 text-center" style={{ background: isLight ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.2)' }}>
                <p className="text-xs font-black" style={{ color: stat.color }}>{stat.value}</p>
                <p className="mt-0.5 text-[9px]" style={{ color: muted }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <div>
        <h3 className="mb-3 text-xs font-black uppercase tracking-wider" style={{ color: title }}>Redeem Credits</h3>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {REDEEM_OPTIONS.map((option, i) => {
            const canAfford = balance >= option.cost;
            const isDone = redeemed.has(option.id);
            const isActive = redeemTarget === option.id;
            return (
              <motion.div key={option.id} className="relative overflow-hidden rounded-xl" style={{ background: isDone ? `${option.color}08` : subtle, border: `1px solid ${isDone ? option.color + '25' : canAfford ? border : isLight ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.04)'}` }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} whileHover={canAfford && !isDone ? { scale: 1.01 } : {}}>
                {isActive && redeeming && <motion.div className="absolute bottom-0 left-0 h-0.5" style={{ background: option.color }} initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.4, ease: 'easeInOut' }} />}
                <div className="flex items-center gap-3 p-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-[11px] font-bold" style={{ background: `${option.color}12`, color: option.color, filter: !canAfford && !isDone ? 'grayscale(1) brightness(0.75)' : 'none' }}>{option.icon}</div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold leading-tight" style={{ color: title }}>{option.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-[9px] leading-tight" style={{ color: muted }}>{option.description}</p>
                    <p className="mt-1 text-[9px]" style={{ color: option.color + 'CC' }}>{option.impact}</p>
                  </div>
                  <motion.button onClick={() => handleRedeem(option)} disabled={!canAfford || isDone || redeeming} className="flex-shrink-0 rounded-full px-2.5 py-1.5 text-[10px] font-bold transition-all" style={{ background: isDone ? `${option.color}15` : canAfford ? `${option.color}18` : isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isDone ? option.color + '30' : canAfford ? option.color + '35' : border}`, color: isDone ? option.color : canAfford ? option.color : muted, cursor: !canAfford || isDone ? 'default' : 'pointer' }} whileHover={canAfford && !isDone && !redeeming ? { scale: 1.08 } : {}} whileTap={canAfford && !isDone && !redeeming ? { scale: 0.94 } : {}}>{isDone ? 'Done' : isActive && redeeming ? '...' : `${option.cost}`}</motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div>
        <button onClick={() => setShowHistory((v) => !v)} className="mb-3 flex items-center gap-2 text-xs font-bold transition-colors" style={{ color: muted }}>
          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Transaction History
          <motion.span animate={{ rotate: showHistory ? 180 : 0 }} transition={{ duration: 0.22 }} style={{ color: muted }}>?</motion.span>
        </button>
        <AnimatePresence>
          {showHistory && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="space-y-1">
                {TRANSACTIONS.map((tx, i) => (
                  <motion.div key={tx.id} className="flex items-center gap-3 rounded-lg py-2 px-3" style={{ background: subtle }} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    <span className="w-8 flex-shrink-0 text-center text-[10px] font-bold" style={{ color: title }}>{tx.icon}</span>
                    <span className="min-w-0 flex-1 truncate text-[11px]" style={{ color: muted }}>{tx.label}</span>
                    <span className="flex-shrink-0 text-[10px]" style={{ color: muted }}>{tx.time}</span>
                    <span className="w-14 flex-shrink-0 text-right text-xs font-bold" style={{ color: tx.type === 'earn' ? 'rgb(0,229,186)' : 'rgb(251,146,60)' }}>{tx.type === 'earn' ? '+' : ''}{tx.amount}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}



