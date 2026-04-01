import { motion } from 'framer-motion';
import Image from 'next/image';

interface DashboardProfileHeroProps {
  isLight?: boolean;
  labels: { editProfile?: string; memberSince?: string; shareStats?: string } | undefined;
  quickStats: { color: string; icon: string; label: string; value: string }[];
}

export default function DashboardProfileHero({ isLight = false, labels, quickStats }: DashboardProfileHeroProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-3xl" initial={{ opacity: 0, y: -16 }} style={{ background: isLight ? 'linear-gradient(135deg, rgba(0,229,186,0.12) 0%, rgba(59,130,246,0.08) 50%, rgba(255,255,255,0.82) 100%)' : 'linear-gradient(135deg, rgba(0,229,186,0.1) 0%, rgba(0,128,255,0.07) 50%, rgba(147,51,234,0.08) 100%)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(0,229,186,0.18)', boxShadow: isLight ? '0 18px 48px rgba(15,23,42,0.08)' : 'none' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 90% 50%, rgba(0,229,186,0.07), transparent 50%)' }} />
      <div className="relative z-10 flex flex-wrap items-center gap-5 p-6">
        <div className="relative flex-shrink-0">
          <div className="h-16 w-16 overflow-hidden rounded-2xl" style={{ border: '2px solid rgba(0,229,186,0.4)' }}><Image alt="Profile" className="object-cover" fill src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&q=80" /></div>
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px]" style={{ background: 'rgb(0,229,186)', boxShadow: '0 0 12px rgba(0,229,186,0.5)' }}>+</div>
        </div>
        <div className="min-w-0 flex-1"><div className="mb-1 flex flex-wrap items-center gap-2.5"><h1 className="text-xl font-black" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>Alex Greenstream</h1><span className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider" style={{ background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' }}>Green</span><span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: 'rgba(251,191,36,0.1)', color: 'rgb(251,191,36)', border: '1px solid rgba(251,191,36,0.2)' }}>Lv. 24 Eco Warrior</span></div><p className="text-xs" style={{ color: isLight ? '#64748b' : '#6b7280' }}>{labels?.memberSince ?? 'Member since 2024'}</p></div>
        <div className="flex flex-shrink-0 items-center gap-3"><motion.button className="rounded-xl px-4 py-2 text-xs font-semibold" style={{ background: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.05)', border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.09)'}`, color: isLight ? '#334155' : '#9ca3af' }} whileHover={{ scale: 1.04 }}>{labels?.editProfile ?? 'Edit profile'}</motion.button><motion.button className="rounded-xl px-4 py-2 text-xs font-semibold" style={{ background: 'rgba(0,229,186,0.9)', color: '#0A0F18' }} whileHover={{ scale: 1.04 }}>{labels?.shareStats ?? 'Share stats'}</motion.button></div>
      </div>
      <div className="flex gap-6 overflow-x-auto px-6 py-4 scrollbar-none" style={{ borderTop: `1px solid ${isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.05)'}` }}>{quickStats.map((stat, index) => <motion.div key={stat.label} animate={{ opacity: 1, y: 0 }} className="flex flex-shrink-0 items-center gap-3" initial={{ opacity: 0, y: 8 }} transition={{ delay: 0.15 + index * 0.07 }}><span className="text-base">{stat.icon}</span><div><p className="text-sm font-black" style={{ color: stat.color }}>{stat.value}</p><p className="text-[10px]" style={{ color: isLight ? '#64748b' : '#6b7280' }}>{stat.label}</p></div>{index < quickStats.length - 1 && <div className="ml-3 h-6 w-px" style={{ background: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)' }} />}</motion.div>)}</div>
    </motion.div>
  );
}


