'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useThemeStore } from '../../lib/stores/themeStore';
import { downloadTiers, premiumDownloadFeatures, type DownloadTier } from './config';

interface DownloadPanelProps {
  isPremium: boolean;
  contentTitle: string;
}

export default function DownloadPanel({ isPremium, contentTitle }: DownloadPanelProps) {
  const { language } = useLanguageStore();
  const { theme } = useThemeStore();
  const isGerman = language === 'de';
  const isLight = theme === 'light';
  const [downloading, setDownloading] = React.useState<string | null>(null);
  const [downloaded, setDownloaded] = React.useState<Set<string>>(new Set());
  const [progress, setProgress] = React.useState<Record<string, number>>({});
  const [showPremiumGate, setShowPremiumGate] = React.useState(false);

  const title = isLight ? '#0f172a' : '#ffffff';
  const body = isLight ? '#334155' : '#d1d5db';
  const muted = isLight ? '#64748b' : '#9ca3af';
  const faint = isLight ? '#94a3b8' : '#6b7280';
  const cardBg = isLight ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.03)';
  const cardBorder = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.07)';

  const handleDownload = async (tier: DownloadTier) => {
    if (tier.requiresPremium && !isPremium) {
      setShowPremiumGate(true);
      return;
    }
    if (downloaded.has(tier.quality) || downloading) return;
    setDownloading(tier.quality);
    setProgress((prev) => ({ ...prev, [tier.quality]: 0 }));
    const duration = tier.requiresPremium ? 4000 : 2500;
    const interval = 60;
    const steps = duration / interval;
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      const nextProgress = Math.min((step / steps) * 100, 100);
      setProgress((prev) => ({ ...prev, [tier.quality]: nextProgress }));
      if (nextProgress >= 100) {
        clearInterval(timer);
        setDownloading(null);
        setDownloaded((prev) => new Set([...prev, tier.quality]));
      }
    }, interval);
  };

  const premiumFeatures = isGerman ? premiumDownloadFeatures.de : premiumDownloadFeatures.en;

  return (
    <div>
      <div className="mb-5 flex items-center gap-2"><div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: 'rgba(0,229,186,0.1)', border: '1px solid rgba(0,229,186,0.2)' }}><svg className="h-4 w-4" fill="none" stroke="rgb(0,229,186)" strokeWidth={2} viewBox="0 0 24 24"><path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div><h3 className="text-sm font-bold" style={{ color: title }}>{isGerman ? 'Offline herunterladen' : 'Download for Offline'}</h3><p className="text-[10px]" style={{ color: muted }}>{contentTitle} · {isGerman ? 'DRM-geschuetzt' : 'DRM-protected'} · {isGerman ? 'Laeuft nach 30 Tagen ab' : 'Expires after 30 days'}</p></div></div>
      <div className="mb-4 flex items-start gap-2.5 rounded-xl p-3" style={{ background: isLight ? 'rgba(240,253,250,0.85)' : 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.12)' }}><svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-eco-green-bright" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" strokeLinecap="round" strokeLinejoin="round" /></svg><p className="text-[10px] leading-relaxed" style={{ color: body }}>{isGerman ? <>Downloads sind mit <span className="font-semibold text-eco-green-bright">Widevine L1</span> DRM verschluesselt. 4K und 1080p benoetigen ZSTREAM Premium. Dateien werden nach 30 Tagen oder 5 Wiedergaben automatisch entfernt.</> : <>Downloads are encrypted with <span className="font-semibold text-eco-green-bright">Widevine L1</span> DRM. 4K and 1080p require ZSTREAM Premium. Files are automatically removed after 30 days or 5 plays.</>}</p></div>
      <div className="space-y-2.5">{downloadTiers.map((tier) => { const isLocked = tier.requiresPremium && !isPremium; const isDone = downloaded.has(tier.quality); const isActive = downloading === tier.quality; const tierProgress = progress[tier.quality] ?? 0; return <motion.div className="relative overflow-hidden rounded-xl" key={tier.quality} style={{ background: isLocked ? (isLight ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.02)') : isDone ? `${tier.color}08` : cardBg, border: isDone ? `1px solid ${tier.color}30` : `1px solid ${isLocked ? cardBorder : cardBorder}` }} whileHover={!isLocked && !isActive ? { scale: 1.01 } : {}}>{isActive && <motion.div animate={{ width: `${tierProgress}%` }} className="absolute bottom-0 left-0 h-0.5" initial={{ width: 0 }} style={{ background: tier.color }} transition={{ ease: 'linear' }} />}<div className="flex items-center gap-3 p-3.5"><div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg" style={{ background: isLocked ? (isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.04)') : `${tier.color}12`, border: `1px solid ${isLocked ? cardBorder : `${tier.color}25`}` }}>{isLocked ? <svg className="h-4 w-4" style={{ color: faint }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round" /></svg> : isDone ? <svg className="h-4 w-4" fill="none" stroke={tier.color} strokeWidth={2.5} viewBox="0 0 24 24"><path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : isActive ? <motion.div animate={{ rotate: 360 }} className="h-4 w-4 rounded-full border-2" style={{ borderColor: `${tier.color}40`, borderTopColor: tier.color }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} /> : <svg className="h-4 w-4" fill="none" stroke={tier.color} strokeWidth={2} viewBox="0 0 24 24"><path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" strokeLinecap="round" strokeLinejoin="round" /></svg>}</div><div className="min-w-0 flex-1"><div className="mb-0.5 flex items-center gap-2"><span className="text-xs font-bold" style={{ color: isLocked ? faint : title }}>{tier.quality}</span>{tier.drm && <span className="rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider" style={{ background: isLocked ? (isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.04)') : `${tier.color}15`, color: isLocked ? faint : tier.color }}>DRM</span>}{tier.requiresPremium && <span className="rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider" style={{ background: 'rgba(147,51,234,0.15)', color: 'rgb(167,139,250)' }}>Premium</span>}</div><p className="text-[10px]" style={{ color: muted }}>{tier.resolution} · {tier.size} · {tier.codec}</p>{isActive && <p className="mt-0.5 text-[10px]" style={{ color: tier.color }}>{isGerman ? 'Wird heruntergeladen...' : 'Downloading...'} {Math.round(tierProgress)}%</p>}{isDone && <p className="mt-0.5 text-[10px]" style={{ color: tier.color }}>{isGerman ? 'Offline verfuegbar · Laeuft in 30 Tagen ab' : 'Available offline · Expires in 30 days'}</p>}</div><motion.button className="flex-shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all" disabled={isActive || isDone} onClick={() => handleDownload(tier)} style={{ background: isDone ? `${tier.color}15` : isLocked ? (isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.04)') : `${tier.color}15`, border: `1px solid ${isDone || isActive ? `${tier.color}30` : isLocked ? cardBorder : `${tier.color}35`}`, color: isDone ? tier.color : isLocked ? faint : tier.color }} whileHover={!isLocked && !isActive && !isDone ? { scale: 1.06 } : {}} whileTap={!isLocked && !isActive && !isDone ? { scale: 0.95 } : {}}>{isDone ? (isGerman ? 'Gespeichert' : 'Saved') : isLocked ? (isGerman ? 'Upgrade' : 'Upgrade') : isActive ? `${Math.round(tierProgress)}%` : (isGerman ? 'Download' : 'Download')}</motion.button></div></motion.div>; })}</div>
      <AnimatePresence>{showPremiumGate && <motion.div animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" exit={{ opacity: 0 }} initial={{ opacity: 0 }} onClick={() => setShowPremiumGate(false)} style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)' }}><motion.div animate={{ scale: 1, y: 0 }} className="w-full max-w-sm rounded-3xl p-8 text-center" exit={{ scale: 0.9, y: 20 }} initial={{ scale: 0.9, y: 20 }} onClick={(event) => event.stopPropagation()} style={{ background: isLight ? 'rgba(255,255,255,0.98)' : 'rgba(13,27,42,0.98)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(147,51,234,0.3)', boxShadow: isLight ? '0 40px 80px rgba(15,23,42,0.18)' : '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(147,51,234,0.1)' }}><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(147,51,234,0.3), rgba(79,70,229,0.3))', border: '1px solid rgba(147,51,234,0.4)' }}><svg className="h-7 w-7" fill="none" stroke="rgb(167,139,250)" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinecap="round" strokeLinejoin="round" /></svg></div><h3 className="mb-2 text-lg font-black" style={{ color: title }}>{isGerman ? 'Premium erforderlich' : 'Premium Required'}</h3><p className="mb-6 text-sm leading-relaxed" style={{ color: body }}>{isGerman ? '4K- und 1080p-Downloads mit DRM-Schutz sind exklusiv fuer ZSTREAM Premium verfuegbar.' : '4K and 1080p downloads with DRM protection are available exclusively on ZSTREAM Premium.'}</p><div className="mb-6 space-y-2.5 text-left">{premiumFeatures.map((feature) => <div className="flex items-center gap-2.5" key={feature}><svg className="h-4 w-4 flex-shrink-0 text-eco-green-bright" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="text-xs" style={{ color: body }}>{feature}</span></div>)}</div><motion.button className="mb-3 w-full rounded-xl py-3 text-sm font-bold" style={{ background: 'linear-gradient(135deg, rgba(147,51,234,0.9), rgba(79,70,229,0.9))', color: 'white' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{isGerman ? 'Auf Premium upgraden' : 'Upgrade to Premium'}</motion.button><button className="text-xs transition-colors" style={{ color: muted }} onClick={() => setShowPremiumGate(false)}>{isGerman ? 'Vielleicht spaeter' : 'Maybe later'}</button></motion.div></motion.div>}</AnimatePresence>
    </div>
  );
}
