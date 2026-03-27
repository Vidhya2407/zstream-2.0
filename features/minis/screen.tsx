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
      <MinisStatus isLoading={isLoading} language={language} loadError={loadError} />
      {currentMini && <MinisViewer currentIndex={currentIndex} currentMini={currentMini} interactions={interactions} isLight={isLight} minisCount={minis.length} onInteraction={(type) => setInteractions((prev) => ({ ...prev, [type]: !prev[type] }))} onSwipe={handleSwipe} watchProgress={watchProgress} watchTime={watchTime} />}
    </main>
  );
}
