'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { sustainabilityCertifications, sustainabilityLeaderboard, sustainabilityMonths, sustainabilitySavingsData, sustainabilityStats } from '../../features/sustainability/config';
import { useAppTranslations } from '../../lib/utils/translations';

function StatCard({ icon, value, unit, label }: { icon: string; value: string; unit: string; label: string }) {
  return <motion.div animate={{ opacity: 1, scale: 1 }} className="rounded-2xl p-5 text-center" initial={{ opacity: 0, scale: 0.95 }} style={{ background: 'rgba(0,229,186,0.06)', border: '1px solid rgba(0,229,186,0.15)' }}><div className="mb-1 text-2xl">{icon}</div><div className="mb-1 flex items-end justify-center gap-1"><span className="text-3xl font-black text-white">{value}</span><span className="mb-1 text-sm text-gray-400">{unit}</span></div><p className="text-xs text-gray-400">{label}</p></motion.div>;
}

export default function SustainabilityPage() {
  const { t } = useAppTranslations();
  const [reportExporting, setReportExporting] = React.useState(false);
  const maxVal = Math.max(...sustainabilitySavingsData);

  const handlePdfExport = () => {
    setReportExporting(true);
    setTimeout(() => {
      window.print();
      setReportExporting(false);
    }, 300);
  };

  return (
    <div className="min-h-screen" data-no-translate="true" style={{ background: 'var(--color-dark-base, #0A0F18)' }}>
      <div className="mx-auto max-w-6xl px-4 pb-32 pt-24">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="mb-1 text-3xl font-black text-white">🌿 {t('sustainability.title')}</h1>
            <p className="text-sm text-gray-400">{t('sustainability.subtitle')}</p>
          </div>
          <motion.button className="print:hidden flex-shrink-0 rounded-xl px-5 py-2.5 text-sm font-bold transition-all" disabled={reportExporting} onClick={handlePdfExport} style={{ background: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            {reportExporting ? t('sustainability.generating') : t('sustainability.exportMonthlyReport')}
          </motion.button>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {sustainabilityStats.map((stat) => (
            <StatCard icon={stat.icon} key={stat.labelKey} label={t(stat.labelKey)} unit={stat.unit} value={stat.value} />
          ))}
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl p-6 lg:col-span-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 className="mb-6 text-sm font-black uppercase tracking-widest text-white">{t('sustainability.monthlySavings')}</h2>
            <div className="flex h-40 items-end gap-2">
              {sustainabilitySavingsData.map((value, index) => (
                <div className="flex flex-1 flex-col items-center gap-1" key={sustainabilityMonths[index]}>
                  <motion.div animate={{ height: `${(value / maxVal) * 100}%` }} className="w-full rounded-t-md" initial={{ height: 0 }} style={{ background: 'linear-gradient(to top, rgba(0,229,186,0.7), rgba(0,229,186,0.3))' }} title={`${value}g CO2`} transition={{ delay: index * 0.05, type: 'spring', damping: 16 }} />
                  <span className="text-[9px] text-gray-600">{sustainabilityMonths[index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 className="mb-4 text-sm font-black uppercase tracking-widest text-white">{t('sustainability.certifications')}</h2>
            <div className="space-y-4">
              {sustainabilityCertifications.map((cert) => (
                <div className="flex items-start gap-3 rounded-xl p-3" key={cert.name} style={{ background: 'rgba(0,229,186,0.04)', border: '1px solid rgba(0,229,186,0.1)' }}>
                  <span className="text-2xl">{cert.logo}</span>
                  <div>
                    <div className="mb-0.5 flex items-center gap-2">
                      <p className="text-xs font-bold text-white">{cert.name}</p>
                      <span className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold" style={{ background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)' }}>{cert.year}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-gray-300">{cert.cert}</p>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-gray-500">{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-white">🌍 {t('sustainability.globalLeaderboard')}</h2>
            <div className="space-y-2">
              {sustainabilityLeaderboard.map((user, index) => (
                <motion.div animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 rounded-xl px-3 py-2.5" initial={{ opacity: 0, x: -10 }} key={user.rank} style={{ background: user.isUser ? 'rgba(0,229,186,0.08)' : 'rgba(255,255,255,0.02)', border: `1px solid ${user.isUser ? 'rgba(0,229,186,0.25)' : 'transparent'}` }} transition={{ delay: index * 0.04 }}>
                  <span className="w-6 text-center text-sm font-black" style={{ color: user.rank <= 3 ? 'rgb(251,191,36)' : 'rgb(107,114,128)' }}>{user.badge || user.rank}</span>
                  <span className="text-base">{user.country}</span>
                  <span className="flex-1 text-xs font-semibold text-white">{user.name}</span>
                  <span className="text-[11px] font-bold" style={{ color: 'rgb(0,229,186)' }}>{user.saved.toLocaleString()}g</span>
                  <span className="text-[10px] text-gray-600">T{user.trees}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h2 className="mb-5 text-sm font-black uppercase tracking-widest text-white">🌳 {t('sustainability.ecologiTitle')}</h2>
            <div className="py-4 text-center">
              <div className="mb-2 text-6xl">🌳</div>
              <p className="mb-1 text-4xl font-black text-white">41</p>
              <p className="mb-6 text-sm text-gray-400">{t('sustainability.treesPlantedOnBehalf')}</p>
              <div className="mb-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl p-3" style={{ background: 'rgba(0,229,186,0.06)', border: '1px solid rgba(0,229,186,0.12)' }}>
                  <p className="text-xl font-black text-white">8,241g</p>
                  <p className="text-xs text-gray-400">{t('sustainability.co2OffsetViaTrees')}</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: 'rgba(0,229,186,0.06)', border: '1px solid rgba(0,229,186,0.12)' }}>
                  <p className="text-xl font-black text-white">Kenya</p>
                  <p className="text-xs text-gray-400">{t('sustainability.primaryLocation')}</p>
                </div>
              </div>
              <motion.a className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold" href="https://ecologi.com" rel="noopener noreferrer" style={{ background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' }} target="_blank" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                🌿 {t('sustainability.viewForest')}
              </motion.a>
            </div>
            <div className="mt-4 rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs leading-relaxed text-gray-400">{t('sustainability.ecologiFootnote')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
