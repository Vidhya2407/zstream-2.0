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
    <motion.div animate={{ opacity: 1, y: 0 }} className="flex items-center gap-5 mb-6" initial={{ opacity: 0, y: -20 }}>
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.4), rgba(251,146,60,0.3))', border: '1px solid rgba(239,68,68,0.3)', boxShadow: '0 0 28px rgba(239,68,68,0.15)' }}>
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-black" style={{ color: pageTextPrimary }}>{title}</h1>
          <motion.div animate={{ opacity: [1, 0.7, 1] }} className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)' }} transition={{ duration: 2, repeat: Infinity }}>
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-red-400 text-xs font-bold">LIVE</span>
          </motion.div>
        </div>
        <p className="mt-0.5 text-sm" style={{ color: pageTextSecondary }}>{subtitle}</p>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(0,229,186,0.07)', border: '1px solid rgba(0,229,186,0.15)' }}>
          <span className="text-[10px]" style={{ color: pageTextSecondary }}>{offsetLabel}</span>
          <motion.span className="text-sm font-black" key={carbonOffset.toFixed(3)} style={{ color: 'rgb(0,229,186)' }}>
            {carbonOffset.toFixed(3)}g
          </motion.span>
        </div>
        <div className="text-[10px]" style={{ color: pageTextMuted }}>{minutesLive} min</div>
      </div>
    </motion.div>
  );
}
