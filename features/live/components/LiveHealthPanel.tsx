import { motion } from 'framer-motion';
import type { LiveHealthMetric } from '../types';

interface LiveHealthPanelProps {
  isLight: boolean;
  metrics: LiveHealthMetric[];
  streamHealthLabel: string;
}

export default function LiveHealthPanel({ isLight, metrics, streamHealthLabel }: LiveHealthPanelProps) {
  return (
    <motion.div animate={{ opacity: 1, scale: 1, y: 0 }} className="absolute top-14 right-4 rounded-2xl p-4 space-y-3 min-w-[200px]" exit={{ opacity: 0, scale: 0.9, y: -8 }} initial={{ opacity: 0, scale: 0.9, y: -8 }} style={{ background: isLight ? 'rgba(255,255,255,0.94)' : 'rgba(10,15,24,0.9)', backdropFilter: 'blur(16px)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.1)', boxShadow: isLight ? '0 18px 36px rgba(15,23,42,0.12)' : 'none' }}>
      <p className="text-[10px] uppercase tracking-widest mb-3" style={{ color: isLight ? '#64748b' : '#9ca3af' }}>{streamHealthLabel}</p>
      {metrics.map((metric) => (
        <div key={metric.label}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px]" style={{ color: isLight ? '#64748b' : '#6b7280' }}>{metric.label}</span>
            <span className="text-[10px] font-bold" style={{ color: metric.color }}>{metric.value}</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.06)' }}>
            <motion.div animate={{ width: `${metric.bar}%` }} className="h-full rounded-full" initial={{ width: 0 }} style={{ background: metric.color }} transition={{ duration: 0.8, delay: 0.1 }} />
          </div>
        </div>
      ))}
    </motion.div>
  );
}
