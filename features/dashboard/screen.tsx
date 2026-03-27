'use client';
import { motion } from 'framer-motion';
import CarbonCreditPanel from '../../components/dashboard/CarbonCreditPanel';
import CarbonTimelineChart from '../../components/dashboard/CarbonTimelineChart';
import NFTShelf from '../../components/dashboard/NFTShelf';
import SubscriptionTierPanel from '../../components/dashboard/SubscriptionTierPanel';
import DashboardImpactBanner from './components/DashboardImpactBanner';
import DashboardProfileHero from './components/DashboardProfileHero';
import DashboardWatchSections from './components/DashboardWatchSections';
import { useDashboardScreen } from './hooks/useDashboardScreen';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '@/lib/stores/themeStore';

export default function DashboardPage() {
  const { continueWatching, historyTab, isLoading, labels, language, loadError, quickStats, setHistoryTab, watchHistory } = useDashboardScreen();
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';
  const sectionGlass = {
    background: isLight
      ? 'linear-gradient(135deg, rgba(255,255,255,0.94), rgba(244,248,250,0.9))'
      : 'linear-gradient(135deg, rgba(15,25,40,0.9), rgba(10,18,30,0.85))',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.07)',
    borderRadius: '1.5rem',
    padding: '1.5rem',
    boxShadow: isLight ? '0 18px 48px rgba(15,23,42,0.08)' : 'none',
  } as const;

  return (
    <main
      className="min-h-screen"
      style={{
        background: isLight
          ? 'linear-gradient(180deg, #eef5f8 0%, #f9fbfc 38%, #eef8f4 100%)'
          : '#0A0F18',
      }}
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: '600px', height: '600px', top: '-150px', left: '-100px', background: isLight ? 'radial-gradient(circle, rgba(0,229,186,0.08), transparent 70%)' : 'radial-gradient(circle, rgba(0,229,186,0.04), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute rounded-full" style={{ width: '500px', height: '500px', bottom: '10%', right: '-50px', background: isLight ? 'radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)' : 'radial-gradient(circle, rgba(147,51,234,0.05), transparent 70%)', filter: 'blur(80px)' }} />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        <div className="min-h-5">
          {isLoading && <p className="text-xs" style={{ color: isLight ? '#64748b' : '#6b7280' }}>{language === 'de' ? 'Lade Dashboard...' : 'Loading dashboard...'}</p>}
          {loadError && <p className="text-xs text-red-400">{loadError}</p>}
        </div>
        <DashboardProfileHero isLight={isLight} labels={labels} quickStats={quickStats} />
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} style={sectionGlass} transition={{ delay: 0.1 }}><CarbonTimelineChart /></motion.div>
          <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} style={sectionGlass} transition={{ delay: 0.15 }}><CarbonCreditPanel /></motion.div>
        </div>
        <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} style={sectionGlass} transition={{ delay: 0.2 }}><SubscriptionTierPanel /></motion.div>
        <DashboardWatchSections continueWatching={continueWatching} historyTab={historyTab} isLight={isLight} labels={labels} setHistoryTab={setHistoryTab} watchHistory={watchHistory} />
        <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 16 }} style={sectionGlass} transition={{ delay: 0.3 }}><NFTShelf /></motion.div>
        <DashboardImpactBanner isLight={isLight} labels={labels} />
      </div>
    </main>
  );
}
