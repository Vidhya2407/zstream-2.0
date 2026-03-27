import { motion } from 'framer-motion';

interface MusicCarbonPanelProps {
  carbonFreeDescription: string;
  carbonFreeMetric: string;
  carbonFreeTitle: string;
  pageTextMuted: string;
  pageTextSecondary: string;
}

export default function MusicCarbonPanel({ carbonFreeDescription, carbonFreeMetric, carbonFreeTitle, pageTextMuted, pageTextSecondary }: MusicCarbonPanelProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-2xl p-5 flex items-center gap-5" initial={{ opacity: 0, y: 20 }} style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)', backdropFilter: 'blur(12px)' }} transition={{ delay: 0.7 }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,229,186,0.12)' }}>
        <svg className="w-5 h-5" fill="none" stroke="rgb(0,229,186)" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <div>
        <p className="text-sm font-semibold" style={{ color: 'rgb(0,229,186)' }}>{carbonFreeTitle}</p>
        <p className="text-xs mt-0.5" style={{ color: pageTextSecondary }}>{carbonFreeDescription}</p>
      </div>
      <div className="ml-auto text-right flex-shrink-0">
        <p className="font-bold text-lg" style={{ color: 'rgb(0,229,186)' }}>0.002g</p>
        <p className="text-xs" style={{ color: pageTextMuted }}>{carbonFreeMetric}</p>
      </div>
    </motion.div>
  );
}
