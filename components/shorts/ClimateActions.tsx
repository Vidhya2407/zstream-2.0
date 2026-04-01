'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Globe, Sprout, Recycle, MessageCircle } from 'lucide-react';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useThemeStore } from '../../lib/stores/themeStore';

interface ClimateActionsProps {
  appreciations: number;
  shares: number;
  recycles: number;
  interactions: {
    appreciated: boolean;
    saved: boolean;
    shared: boolean;
    recycled: boolean;
  };
  onInteraction: (type: 'appreciated' | 'saved' | 'shared' | 'recycled') => void;
}

export default function ClimateActions({ appreciations, shares, recycles, interactions, onInteraction }: ClimateActionsProps) {
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const isLight = theme === 'light';
  const isGerman = language === 'de';

  const formatCount = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const actions = [
    { id: 'appreciated', icon: LeafIcon, label: formatCount(appreciations + (interactions.appreciated ? 1 : 0)), active: interactions.appreciated, animation: LeafBurstAnimation },
    { id: 'saved', icon: PlanetIcon, label: isGerman ? 'Speichern' : 'Save', active: interactions.saved, animation: PlanetRippleAnimation },
    { id: 'shared', icon: SproutIcon, label: formatCount(shares + (interactions.shared ? 1 : 0)), active: interactions.shared, animation: SproutGrowAnimation },
    { id: 'recycled', icon: RecycleIcon, label: formatCount(recycles + (interactions.recycled ? 1 : 0)), active: interactions.recycled, animation: RecycleSpinAnimation },
    { id: 'comment', icon: CO2CommentIcon, label: '124', active: false, animation: null }
  ];

  return (
    <motion.div className="flex flex-col gap-[18px] relative" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
      {actions.map((action, index) => (
        <motion.div key={action.id} className="flex flex-col items-center gap-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + index * 0.05 }}>
          <motion.button className="relative group" style={{ width: '54px', height: '54px', borderRadius: '50%', background: action.active ? 'rgba(0, 229, 186, 0.15)' : isLight ? 'rgba(255, 255, 255, 0.82)' : 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: action.active ? '1px solid rgba(0, 229, 186, 0.4)' : isLight ? '1px solid rgba(15, 23, 42, 0.1)' : '1px solid rgba(0, 229, 186, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isLight ? '0 10px 24px rgba(15,23,42,0.12)' : 'none' }} onClick={() => action.id !== 'comment' && onInteraction(action.id as 'appreciated' | 'saved' | 'shared' | 'recycled')} whileHover={{ scale: 1.1, backgroundColor: action.active ? 'rgba(0, 229, 186, 0.25)' : isLight ? 'rgba(255, 255, 255, 0.96)' : 'rgba(0, 0, 0, 0.6)', boxShadow: action.active ? '0 0 24px rgba(0, 229, 186, 0.4)' : isLight ? '0 14px 28px rgba(15,23,42,0.16)' : '0 0 16px rgba(0, 229, 186, 0.2)' }} whileTap={{ scale: 0.92 }} transition={{ duration: 0.18 }}>
            <action.icon active={action.active} />
            {action.active && action.animation && <action.animation />}
          </motion.button>

          <span className="text-[10px] font-bold" style={{ color: action.active ? 'rgb(0, 229, 186)' : isLight ? 'rgba(17, 24, 39, 0.88)' : 'rgba(255, 255, 255, 0.8)', textShadow: isLight ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.8)' }}>
            {action.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}

function LeafIcon({ active }: { active: boolean }) {
  const { theme } = useThemeStore();
  return <Leaf className={`w-5 h-5 transition-colors ${active ? 'text-eco-green-bright' : theme === 'light' ? 'text-slate-900' : 'text-white'}`} strokeWidth={1.75} />;
}

function PlanetIcon({ active }: { active: boolean }) {
  const { theme } = useThemeStore();
  return <Globe className={`w-5 h-5 transition-colors ${active ? 'text-cyan-neon' : theme === 'light' ? 'text-slate-900' : 'text-white'}`} strokeWidth={1.75} />;
}

function SproutIcon({ active }: { active: boolean }) {
  const { theme } = useThemeStore();
  return <Sprout className={`w-5 h-5 transition-colors ${active ? 'text-eco-green-bright' : theme === 'light' ? 'text-slate-900' : 'text-white'}`} strokeWidth={1.75} />;
}

function RecycleIcon({ active }: { active: boolean }) {
  const { theme } = useThemeStore();
  return <Recycle className={`w-5 h-5 transition-colors ${active ? 'text-eco-green-bright' : theme === 'light' ? 'text-slate-900' : 'text-white'}`} strokeWidth={1.75} />;
}

function CO2CommentIcon({ active }: { active: boolean }) {
  const { theme } = useThemeStore();
  return <MessageCircle className={`w-5 h-5 transition-colors ${active ? 'text-eco-green-bright' : theme === 'light' ? 'text-slate-900' : 'text-white'}`} strokeWidth={1.75} />;
}

function LeafBurstAnimation() {
  const [show, setShow] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShow(false), 650);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && [...Array(8)].map((_, i) => (
        <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-eco-green-bright" initial={{ scale: 0, x: 0, y: 0, opacity: 1 }} animate={{ scale: [0, 1, 0], x: Math.cos((i * Math.PI * 2) / 8) * 30, y: Math.sin((i * Math.PI * 2) / 8) * 30, opacity: 0 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 0.6 }} />
      ))}
    </AnimatePresence>
  );
}

function PlanetRippleAnimation() {
  return (
    <>
      {[...Array(2)].map((_, i) => (
        <motion.div key={i} className="absolute inset-0 border-2 border-cyan-neon rounded-full" initial={{ scale: 1, opacity: 0.6 }} animate={{ scale: 2, opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.75 }} />
      ))}
    </>
  );
}

function SproutGrowAnimation() {
  return (
    <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2" initial={{ scaleY: 0, originY: 1 }} animate={{ scaleY: [0, 1.5, 1] }} transition={{ duration: 0.6 }}>
      <span className="text-2xl">??</span>
    </motion.div>
  );
}

function RecycleSpinAnimation() {
  return <motion.div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(from 0deg, rgba(0, 229, 186, 0.3), transparent)' }} animate={{ rotate: 360 }} transition={{ duration: 1, ease: 'linear', repeat: 2 }} />;
}


