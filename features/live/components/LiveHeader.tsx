import { motion } from 'framer-motion';

interface LiveHeaderProps {
  carbonOffset: number;
  minutesLive: number;
  offsetLabel: string;
  pageTextMuted: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  subtitle: string;
  title: string;
}

export default function LiveHeader({ carbonOffset, minutesLive, offsetLabel, pageTextMuted, pageTextPrimary, pageTextSecondary, subtitle, title }: LiveHeaderProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" initial={{ opacity: 0, y: -20 }}>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.4), rgba(251,146,60,0.3))', border: '1px solid rgba(239,68,68,0.3)', boxShadow: '0 0 28px rgba(239,68,68,0.15)' }}>
          <svg className="h-6 w-6 text-white sm:h-7 sm:w-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-black sm:text-3xl" style={{ color: pageTextPrimary }}>{title}</h1>
            <motion.div animate={{ opacity: [1, 0.7, 1] }} className="flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)' }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="h-2 w-2 rounded-full bg-red-500" />
              <span className="text-xs font-bold text-red-400">LIVE</span>
            </motion.div>
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6" style={{ color: pageTextSecondary }}>{subtitle}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:justify-end">
        <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: 'rgba(0,229,186,0.07)', border: '1px solid rgba(0,229,186,0.15)' }}>
          <span className="text-xs font-medium" style={{ color: pageTextSecondary }}>{offsetLabel}</span>
          <motion.span className="text-sm font-black" key={carbonOffset.toFixed(3)} style={{ color: 'rgb(0,229,186)' }}>
            {carbonOffset.toFixed(3)}g
          </motion.span>
        </div>
        <div className="text-xs font-medium" style={{ color: pageTextMuted }}>{minutesLive} min</div>
      </div>
    </motion.div>
  );
}
