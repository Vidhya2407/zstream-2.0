'use client';
import MinisAmbientBackground from './components/MinisAmbientBackground';
import MinisStatus from './components/MinisStatus';
import MinisViewer from './components/MinisViewer';
import { useMinisScreen } from './hooks/useMinisScreen';

export default function MinisPage() {
  const { currentIndex, currentMini, handleSwipe, interactions, isLight, isLoading, language, loadError, minis, setInteractions, watchProgress, watchTime } = useMinisScreen();

  return (
    <main className="relative overflow-hidden" style={{ height: 'calc(100vh - 130px)' }}>
      <MinisAmbientBackground isLight={isLight} />
      <div className="pointer-events-none absolute left-4 top-4 z-20 max-w-sm rounded-2xl border px-4 py-3" style={{ background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(8,12,22,0.66)', borderColor: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: 'rgb(0,229,186)' }}>Short-form Feed</p>
        <h1 className="mt-1 text-lg font-black sm:text-xl" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>Minis</h1>
        <p className="mt-1 text-xs leading-5 sm:text-sm" style={{ color: isLight ? '#475569' : '#cbd5e1' }}>Swipe through quick climate, culture, and creator stories without losing context.</p>
      </div>
      <MinisStatus isLoading={isLoading} language={language} loadError={loadError} />
      {currentMini && <MinisViewer currentIndex={currentIndex} currentMini={currentMini} interactions={interactions} isLight={isLight} minisCount={minis.length} onInteraction={(type) => setInteractions((prev) => ({ ...prev, [type]: !prev[type] }))} onSwipe={handleSwipe} watchProgress={watchProgress} watchTime={watchTime} />}
    </main>
  );
}
