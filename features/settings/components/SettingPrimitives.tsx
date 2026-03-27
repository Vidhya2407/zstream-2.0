import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function SettingSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <motion.section animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-6" initial={{ opacity: 0, y: 16 }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <h2 className="mb-5 border-b pb-3 text-sm font-black uppercase tracking-widest text-white" style={{ borderBottomColor: 'rgba(255,255,255,0.06)' }}>{title}</h2>
      <div className="space-y-4">{children}</div>
    </motion.section>
  );
}

export function ToggleSetting({ label, desc, checked, onChange }: { label: string; desc?: string; checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        {desc ? <p className="mt-0.5 text-xs text-gray-500">{desc}</p> : null}
      </div>
      <button aria-checked={checked} aria-label={label} className="relative h-6 w-11 flex-shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2" onClick={() => onChange(!checked)} role="switch" style={{ background: checked ? 'rgb(0,229,186)' : 'rgba(255,255,255,0.12)' }}>
        <motion.span animate={{ x: checked ? 20 : 0 }} className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow" transition={{ type: 'spring', damping: 22, stiffness: 400 }} />
      </button>
    </div>
  );
}
