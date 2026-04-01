import { motion } from 'framer-motion';

interface MusicCarbonPanelProps {
  carbonFreeTitle: string;
  carbonFreeDescription: string;
  pageTextMuted: string;
  pageTextSecondary: string;
  qualityLabel: string;
  co2Value: string;
  waterValue: string;
  ewasteValue: string;
  runtimeLabel: string;
}

export default function MusicCarbonPanel({ carbonFreeDescription, carbonFreeTitle, pageTextMuted, pageTextSecondary, qualityLabel, co2Value, waterValue, ewasteValue, runtimeLabel }: MusicCarbonPanelProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 rounded-2xl border p-5"
      initial={{ opacity: 0, y: 20 }}
      style={{ background: 'rgba(0,229,186,0.05)', borderColor: 'rgba(0,229,186,0.15)', backdropFilter: 'blur(12px)' }}
      transition={{ delay: 0.7 }}
    >
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(0,229,186,0.12)' }}>
          <svg className="h-5 w-5" fill="none" stroke="rgb(0,229,186)" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>

        <div className="min-w-[220px] flex-1">
          <p className="text-sm font-semibold" style={{ color: 'rgb(0,229,186)' }}>{carbonFreeTitle}</p>
          <p className="mt-0.5 text-xs" style={{ color: pageTextSecondary }}>{carbonFreeDescription}</p>
          <p className="mt-2 text-[11px] font-medium" style={{ color: pageTextMuted }}>{qualityLabel} � {runtimeLabel}</p>
        </div>

        <div className="grid min-w-[280px] flex-1 grid-cols-3 gap-3">
          {[
            { label: 'CO2 estimate', value: co2Value, color: 'rgb(0,229,186)' },
            { label: 'Water estimate', value: waterValue, color: 'rgb(0,217,255)' },
            { label: 'E-waste estimate', value: ewasteValue, color: 'rgb(96,165,250)' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border px-3 py-2" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
              <p className="text-sm font-bold" style={{ color: item.color }}>{item.value}</p>
              <p className="mt-0.5 text-[10px]" style={{ color: pageTextMuted }}>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
