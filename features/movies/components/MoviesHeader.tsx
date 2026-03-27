import { motion } from 'framer-motion';

interface MoviesHeaderProps {
  isGerman: boolean;
  isLight: boolean;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
}

export default function MoviesHeader({ isGerman, isLight, viewMode, setViewMode }: MoviesHeaderProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4 mb-8" initial={{ opacity: 0, y: -20 }}>
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0,128,255,0.4), rgba(0,229,186,0.3))', border: '1px solid rgba(0,128,255,0.3)', boxShadow: '0 0 28px rgba(0,128,255,0.15)' }}>
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight" style={{ color: isLight ? '#1d1d1f' : 'white' }}>{isGerman ? 'Filme' : 'Movies'}</h1>
          <p className="mt-0.5 text-sm" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>{isGerman ? 'Curated and licensed | Carbon-neutral delivery' : 'Curated and licensed | Carbon-neutral delivery'}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button aria-label="Grid view" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" onClick={() => setViewMode('grid')} style={{ background: viewMode === 'grid' ? 'rgba(0,128,255,0.15)' : isLight ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.04)', border: `1px solid ${viewMode === 'grid' ? 'rgba(0,128,255,0.3)' : isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}` }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: viewMode === 'grid' ? 'rgb(96,165,250)' : 'rgb(107,114,128)' }} viewBox="0 0 24 24"><path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button aria-label="List view" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" onClick={() => setViewMode('list')} style={{ background: viewMode === 'list' ? 'rgba(0,128,255,0.15)' : isLight ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.04)', border: `1px solid ${viewMode === 'list' ? 'rgba(0,128,255,0.3)' : isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)'}` }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} style={{ color: viewMode === 'list' ? 'rgb(96,165,250)' : 'rgb(107,114,128)' }} viewBox="0 0 24 24"><path d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </motion.div>
  );
}
