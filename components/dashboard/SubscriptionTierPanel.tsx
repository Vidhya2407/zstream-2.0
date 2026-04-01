'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '@/lib/stores/themeStore';

type TierId = 'free' | 'green' | 'carbon-zero';
interface Tier { id: TierId; name: string; badge: string; price: string; period: string; tagline: string; color: string; border: string; glow: string; gradient: string; features: { text: string; included: boolean }[]; cta: string; creditMultiplier: string; nftDrops: string; }
const TIERS: Tier[] = [
  { id: 'free', name: 'Free', badge: 'Free', price: 'EUR0', period: 'forever', tagline: 'Start your eco-streaming journey', color: 'rgb(156,163,175)', border: 'rgba(156,163,175,0.2)', glow: 'rgba(156,163,175,0.06)', gradient: 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.8))', creditMultiplier: '1x', nftDrops: '1 / month', features: [{ text: 'SD streaming (480p)', included: true }, { text: 'Carbon Score badges', included: true }, { text: 'Carbon credit earning', included: true }, { text: '1 NFT drop per month', included: true }, { text: 'Ad-supported', included: true }, { text: 'HD / FHD streaming', included: false }, { text: 'Offline downloads', included: false }, { text: 'DRM 4K downloads', included: false }], cta: 'Current Plan' },
  { id: 'green', name: 'Green', badge: 'Green', price: 'EUR7.99', period: '/ month', tagline: 'Stream greener, earn faster', color: 'rgb(0,229,186)', border: 'rgba(0,229,186,0.35)', glow: 'rgba(0,229,186,0.08)', gradient: 'linear-gradient(135deg, rgba(0,229,186,0.1), rgba(0,217,255,0.06))', creditMultiplier: '1.5x', nftDrops: '2 / month', features: [{ text: 'HD + FHD streaming', included: true }, { text: 'Ad-free experience', included: true }, { text: 'Offline 720p downloads', included: true }, { text: '1.5x credit multiplier', included: true }, { text: '2 NFT drops / month', included: true }, { text: 'Priority CDN routing', included: true }, { text: '4K Ultra HD streaming', included: false }, { text: '4K DRM downloads', included: false }], cta: 'Upgrade to Green' },
  { id: 'carbon-zero', name: 'Carbon Zero', badge: 'Zero', price: 'EUR14.99', period: '/ month', tagline: 'Maximum impact, zero compromises', color: 'rgb(167,139,250)', border: 'rgba(147,51,234,0.45)', glow: 'rgba(147,51,234,0.1)', gradient: 'linear-gradient(135deg, rgba(147,51,234,0.15), rgba(79,70,229,0.1))', creditMultiplier: '3x', nftDrops: '5 / month + Legendary', features: [{ text: '4K HDR + Dolby Atmos', included: true }, { text: 'Ad-free · Priority support', included: true }, { text: 'Offline 4K DRM downloads', included: true }, { text: '3x credit multiplier', included: true }, { text: '5 NFT drops + Legendary tier', included: true }, { text: 'Tier-1 CDN · <10ms latency', included: true }, { text: 'Early access to new content', included: true }, { text: 'Verified carbon offset cert', included: true }], cta: 'Upgrade to Carbon Zero' },
];
const CURRENT_TIER: TierId = 'green';

export default function SubscriptionTierPanel() {
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';
  const [expanded, setExpanded] = React.useState<TierId | null>(null);
  const [showAnnual, setShowAnnual] = React.useState(false);
  const title = isLight ? '#0f172a' : '#ffffff';
  const muted = isLight ? '#64748b' : '#6b7280';
  const chipBg = isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.04)';
  const chipBorder = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.07)';

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black" style={{ color: title }}>Subscription Tier</h2>
          <p className="mt-0.5 text-[11px]" style={{ color: muted }}>Currently on <span className="font-bold" style={{ color: 'rgb(0,229,186)' }}>Green</span></p>
        </div>
        <div className="flex items-center gap-1 rounded-full p-0.5" style={{ background: chipBg, border: `1px solid ${chipBorder}` }}>
          {['Monthly', 'Annual'].map((label) => <button key={label} onClick={() => setShowAnnual(label === 'Annual')} className="rounded-full px-3 py-1 text-[11px] font-semibold transition-all" style={{ background: (showAnnual ? label === 'Annual' : label === 'Monthly') ? 'rgba(0,229,186,0.15)' : 'transparent', color: (showAnnual ? label === 'Annual' : label === 'Monthly') ? 'rgb(0,229,186)' : muted }}>{label}{label === 'Annual' && <span className="ml-1 text-[9px] font-black" style={{ color: 'rgb(0,229,186)' }}>-20%</span>}</button>)}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {TIERS.map((tier, i) => {
          const isCurrent = tier.id === CURRENT_TIER;
          const isExpanded = expanded === tier.id;
          const annualPrice = tier.price !== 'EUR0' ? `EUR${(parseFloat(tier.price.replace('EUR', '')) * 12 * 0.8).toFixed(2)}` : 'EUR0';
          return (
            <motion.div key={tier.id} className="relative cursor-pointer overflow-hidden rounded-2xl" style={{ background: isLight ? 'rgba(255,255,255,0.9)' : tier.gradient, border: `1px solid ${isCurrent ? tier.border : chipBorder}`, boxShadow: isCurrent ? `0 0 32px ${tier.glow}` : isLight ? '0 16px 40px rgba(15,23,42,0.08)' : 'none' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ scale: 1.015 }} onClick={() => setExpanded(isExpanded ? null : tier.id)}>
              {isCurrent && <div className="absolute left-0 right-0 top-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }} />}
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2"><span className="text-sm font-bold" style={{ color: tier.color }}>{tier.badge}</span><span className="text-sm font-black" style={{ color: tier.color }}>{tier.name}</span>{isCurrent && <span className="rounded-full px-2 py-0.5 text-[9px] font-black" style={{ background: `${tier.color}20`, color: tier.color }}>ACTIVE</span>}</div>
                    <p className="text-[10px] leading-tight" style={{ color: muted }}>{tier.tagline}</p>
                  </div>
                  <div className="flex-shrink-0 text-right"><p className="text-base font-black" style={{ color: title }}>{showAnnual ? annualPrice : tier.price}</p><p className="text-[9px]" style={{ color: muted }}>{showAnnual && tier.price !== 'EUR0' ? '/ year' : tier.period}</p></div>
                </div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex-1 rounded-lg py-1.5 text-center" style={{ background: `${tier.color}10`, border: `1px solid ${tier.color}20` }}><p className="text-[10px] font-black" style={{ color: tier.color }}>{tier.creditMultiplier}</p><p className="text-[8px]" style={{ color: muted }}>Credits</p></div>
                  <div className="flex-1 rounded-lg py-1.5 text-center" style={{ background: `${tier.color}10`, border: `1px solid ${tier.color}20` }}><p className="text-[10px] font-black" style={{ color: tier.color }}>NFT</p><p className="text-[8px]" style={{ color: muted }}>{tier.nftDrops.split('/')[0].trim()}/mo</p></div>
                </div>
                <AnimatePresence>{isExpanded && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mb-3 overflow-hidden"><div className="space-y-1.5 pt-1">{tier.features.map((feat) => <div key={feat.text} className="flex items-center gap-2">{feat.included ? <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke={tier.color} strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> : <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: muted }}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}<span className="text-[10px]" style={{ color: feat.included ? title : muted }}>{feat.text}</span></div>)}</div></motion.div>}</AnimatePresence>
                <button className="mb-3 flex items-center gap-1 text-[9px] transition-colors" style={{ color: muted }} onClick={(e) => { e.stopPropagation(); setExpanded(isExpanded ? null : tier.id); }}>{isExpanded ? 'Hide features' : 'Show all features'}<motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>?</motion.span></button>
                <motion.button className="w-full rounded-xl py-2 text-[11px] font-bold transition-all" style={{ background: isCurrent ? `${tier.color}15` : tier.id === 'carbon-zero' ? 'linear-gradient(135deg, rgba(147,51,234,0.8), rgba(79,70,229,0.8))' : `${tier.color}20`, border: `1px solid ${isCurrent ? `${tier.color}35` : tier.color + '40'}`, color: isCurrent ? tier.color : tier.id === 'carbon-zero' ? '#fff' : title, cursor: isCurrent ? 'default' : 'pointer' }} whileHover={!isCurrent ? { scale: 1.02 } : {}} whileTap={!isCurrent ? { scale: 0.97 } : {}} onClick={(e) => e.stopPropagation()}>{isCurrent ? `Current: ${tier.cta}` : tier.cta}</motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}



