import { motion } from 'framer-motion';

interface HomeStatsStripProps {
  stats: Array<{ label: string; value: string; color: string }>;
}

export default function HomeStatsStrip({ stats }: HomeStatsStripProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 glass-panel" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }} />
      <div className="relative z-10 app-container py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div key={`${stat.label}-${index}`} className="flex items-center gap-3" initial={{ opacity: 0, y: 10 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }}>
              <div className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: stat.color, boxShadow: `0 0 8px ${stat.color}` }} />
              <div>
                <div className="text-sm font-black" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-[11px] font-medium" style={{ color: 'var(--app-muted-color)' }}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


