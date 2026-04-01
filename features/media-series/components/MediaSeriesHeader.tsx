import { motion } from 'framer-motion';

interface MediaSeriesHeaderProps {
  isLight: boolean;
}

export default function MediaSeriesHeader({ isLight }: MediaSeriesHeaderProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-wrap items-center justify-between gap-4" initial={{ opacity: 0, y: -20 }}>
      <div className="flex items-center gap-5">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(0,128,255,0.4), rgba(0,229,186,0.3))', border: '1px solid rgba(0,128,255,0.3)', boxShadow: '0 0 28px rgba(0,128,255,0.15)' }}>
          <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h1 className="text-4xl font-black tracking-tight" style={{ color: isLight ? '#1d1d1f' : 'white' }}>Media Series</h1>
          <p className="mt-0.5 text-sm" style={{ color: isLight ? '#6b7280' : '#9ca3af' }}>Episodic content, originals, and licensed broadcasts.</p>
        </div>
      </div>
    </motion.div>
  );
}



