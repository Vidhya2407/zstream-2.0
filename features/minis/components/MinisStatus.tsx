interface MinisStatusProps {
  isLoading: boolean;
  language: string;
  loadError: string | null;
}

export default function MinisStatus({ isLoading, language, loadError }: MinisStatusProps) {
  return (
    <div className="absolute top-4 left-4 z-40 min-h-5">
      {isLoading && <p className="text-xs text-white/70">{language === 'de' ? 'Lade Minis...' : 'Loading minis...'}</p>}
      {loadError && <p className="text-xs text-red-300">{loadError}</p>}
    </div>
  );
}
