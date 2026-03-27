import { motion } from 'framer-motion';
import Link from 'next/link';

interface DashboardImpactBannerProps {
  isLight?: boolean;
  labels: { impactTitle?: string; methodology?: string } | undefined;
}

export default function DashboardImpactBanner({ isLight = false, labels }: DashboardImpactBannerProps) {
  return (
    <motion.div animate={{ opacity: 1 }} className="flex flex-wrap items-center gap-4 rounded-2xl p-5" initial={{ opacity: 0 }} style={{ background: isLight ? 'linear-gradient(135deg, rgba(0,229,186,0.09), rgba(59,130,246,0.05), rgba(255,255,255,0.86))' : 'linear-gradient(135deg, rgba(0,229,186,0.07), rgba(0,217,255,0.04))', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(0,229,186,0.15)' }} transition={{ delay: 0.35 }}>
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: 'rgba(0,229,186,0.12)' }}><svg className="h-5 w-5" fill="none" stroke="rgb(0,229,186)" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      <div className="flex-1"><p className="text-sm font-bold" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{labels?.impactTitle ?? 'Environmental impact'}</p><p className="mt-0.5 text-xs" style={{ color: isLight ? '#64748b' : '#9ca3af' }}><span className="font-bold text-eco-green-bright">4.2 kg CO2</span> saved | <span className="font-bold" style={{ color: 'rgb(0,217,255)' }}>11.4 L water</span> conserved | <span className="font-bold" style={{ color: 'rgb(96,165,250)' }}>2.8 g e-waste</span> avoided | <span className="font-bold" style={{ color: 'rgb(251,191,36)' }}>5 NFTs</span> earned</p></div>
      <Link href="/methodology"><motion.button className="rounded-full px-4 py-2 text-xs font-semibold" style={{ background: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(0,229,186,0.1)', border: `1px solid ${isLight ? 'rgba(15,23,42,0.08)' : 'rgba(0,229,186,0.2)'}`, color: 'rgb(0,229,186)' }} whileHover={{ scale: 1.04 }}>{labels?.methodology ?? 'Methodology'}</motion.button></Link>
    </motion.div>
  );
}
