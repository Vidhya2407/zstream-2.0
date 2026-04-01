'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { sustainabilityCertifications, sustainabilityLeaderboard, sustainabilityMonths, sustainabilitySavingsData, sustainabilityStats } from '../../features/sustainability/config';
import { useAppTranslations } from '../../lib/utils/translations';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '@/lib/stores/themeStore';

function StatCard({ icon, value, unit, label, isLight }: { icon: string; value: string; unit: string; label: string; isLight: boolean }) {
  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-[1.5rem] p-5"
      initial={{ opacity: 0, scale: 0.95 }}
      style={{
        background: isLight ? 'rgba(255,255,255,0.88)' : 'rgba(8,18,26,0.78)',
        border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(0,229,186,0.14)',
        boxShadow: isLight ? '0 18px 40px rgba(15,23,42,0.08)' : '0 18px 44px rgba(0,0,0,0.22)',
      }}
    >
      <div className="mb-4 inline-flex rounded-full px-3 py-1 text-[11px] font-black tracking-[0.18em]" style={{ background: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)' }}>{icon}</div>
      <div className="mb-2 flex items-end gap-2">
        <span className="text-3xl font-black" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{value}</span>
        {unit ? <span className="mb-1 text-sm font-semibold" style={{ color: isLight ? '#64748b' : '#9ca3af' }}>{unit}</span> : null}
      </div>
      <p className="text-sm leading-5" style={{ color: isLight ? '#475569' : '#cbd5e1' }}>{label}</p>
    </motion.div>
  );
}

export default function SustainabilityPage() {
  const { t } = useAppTranslations();
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';
  const [reportExporting, setReportExporting] = React.useState(false);
  const maxVal = Math.max(...sustainabilitySavingsData);

  const handlePdfExport = () => {
    setReportExporting(true);
    setTimeout(() => {
      window.print();
      setReportExporting(false);
    }, 300);
  };

  const pageBg = isLight
    ? 'linear-gradient(180deg, #eef5f7 0%, #f8fbfc 42%, #eef8f4 100%)'
    : 'radial-gradient(circle at top left, rgba(0,229,186,0.08), transparent 30%), linear-gradient(180deg, #07111c 0%, #0a0f18 48%, #08141f 100%)';
  const shellCard = isLight ? 'rgba(255,255,255,0.88)' : 'rgba(8,18,26,0.8)';
  const shellBorder = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)';
  const heading = isLight ? '#0f172a' : '#ffffff';
  const body = isLight ? '#334155' : '#d1d5db';
  const muted = isLight ? '#475569' : '#9ca3af';
  const chartLabel = isLight ? '#64748b' : '#94a3b8';

  return (
    <div className="min-h-screen" data-no-translate="true" style={{ background: pageBg }}>
      <div className="mx-auto max-w-6xl px-4 pb-32 pt-24">
        <div className="mb-8 overflow-hidden rounded-[2rem] border p-6 sm:p-8" style={{ background: shellCard, borderColor: shellBorder, boxShadow: isLight ? '0 30px 70px rgba(15,23,42,0.08)' : '0 30px 70px rgba(0,0,0,0.24)' }}>
          <div className="mb-4 inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em]" style={{ background: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)' }}>Impact Hub</div>
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1 className="mb-2 text-3xl font-black sm:text-4xl" style={{ color: heading }}>{t('sustainability.title')}</h1>
              <p className="max-w-2xl text-sm leading-6 sm:text-base" style={{ color: body }}>{t('sustainability.subtitle')}</p>
            </div>
            <motion.button className="print:hidden flex-shrink-0 rounded-xl px-5 py-3 text-sm font-bold transition-all" disabled={reportExporting} onClick={handlePdfExport} style={{ background: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              {reportExporting ? t('sustainability.generating') : t('sustainability.exportMonthlyReport')}
            </motion.button>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sustainabilityStats.map((stat) => (
            <StatCard icon={stat.icon} isLight={isLight} key={stat.labelKey} label={t(stat.labelKey)} unit={stat.unit} value={stat.value} />
          ))}
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-[1.75rem] p-6 lg:col-span-2" style={{ background: shellCard, border: `1px solid ${shellBorder}` }}>
            <h2 className="mb-6 text-sm font-black uppercase tracking-[0.22em]" style={{ color: heading }}>{t('sustainability.monthlySavings')}</h2>
            <div className="flex h-52 items-end gap-2">
              {sustainabilitySavingsData.map((value, index) => (
                <div className="flex flex-1 flex-col items-center gap-2" key={sustainabilityMonths[index]}>
                  <motion.div animate={{ height: `${(value / maxVal) * 100}%` }} className="w-full rounded-t-xl" initial={{ height: 0 }} style={{ background: 'linear-gradient(to top, rgba(0,229,186,0.92), rgba(0,217,255,0.35))' }} title={`${value}g CO2`} transition={{ delay: index * 0.05, type: 'spring', damping: 16 }} />
                  <span className="text-[11px] font-semibold" style={{ color: chartLabel }}>{sustainabilityMonths[index]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] p-6" style={{ background: shellCard, border: `1px solid ${shellBorder}` }}>
            <h2 className="mb-4 text-sm font-black uppercase tracking-[0.22em]" style={{ color: heading }}>{t('sustainability.certifications')}</h2>
            <div className="space-y-4">
              {sustainabilityCertifications.map((cert) => (
                <div className="flex items-start gap-3 rounded-2xl p-4" key={cert.name} style={{ background: isLight ? 'rgba(240,249,248,0.9)' : 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.1)' }}>
                  <span className="inline-flex min-w-12 justify-center rounded-xl px-2 py-2 text-xs font-black tracking-[0.16em]" style={{ background: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)' }}>{cert.logo}</span>
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <p className="text-sm font-bold" style={{ color: heading }}>{cert.name}</p>
                      <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold" style={{ background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)' }}>{cert.year}</span>
                    </div>
                    <p className="text-sm font-semibold" style={{ color: body }}>{cert.cert}</p>
                    <p className="mt-1 text-sm leading-5" style={{ color: muted }}>{cert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] p-6" style={{ background: shellCard, border: `1px solid ${shellBorder}` }}>
            <h2 className="mb-5 text-sm font-black uppercase tracking-[0.22em]" style={{ color: heading }}>{t('sustainability.globalLeaderboard')}</h2>
            <div className="space-y-2">
              {sustainabilityLeaderboard.map((user, index) => (
                <motion.div animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 rounded-2xl px-3 py-3" initial={{ opacity: 0, x: -10 }} key={user.rank} style={{ background: user.isUser ? 'rgba(0,229,186,0.08)' : isLight ? 'rgba(248,250,252,0.95)' : 'rgba(255,255,255,0.02)', border: `1px solid ${user.isUser ? 'rgba(0,229,186,0.25)' : isLight ? 'rgba(15,23,42,0.06)' : 'transparent'}` }} transition={{ delay: index * 0.04 }}>
                  <span className="w-9 text-center text-sm font-black" style={{ color: user.rank <= 3 ? 'rgb(251,191,36)' : muted }}>{user.badge || user.rank}</span>
                  <span className="text-sm font-semibold" style={{ color: body }}>{user.country}</span>
                  <span className="flex-1 text-sm font-semibold" style={{ color: heading }}>{user.name}</span>
                  <span className="text-sm font-bold" style={{ color: 'rgb(0,229,186)' }}>{user.saved.toLocaleString()}g</span>
                  <span className="text-xs font-semibold" style={{ color: muted }}>T{user.trees}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] p-6" style={{ background: shellCard, border: `1px solid ${shellBorder}` }}>
            <h2 className="mb-5 text-sm font-black uppercase tracking-[0.22em]" style={{ color: heading }}>{t('sustainability.ecologiTitle')}</h2>
            <div className="rounded-[1.5rem] border p-5 text-center" style={{ background: isLight ? 'rgba(240,249,248,0.9)' : 'rgba(0,229,186,0.05)', borderColor: 'rgba(0,229,186,0.15)' }}>
              <div className="mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-black tracking-[0.18em]" style={{ background: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)' }}>FOREST</div>
              <p className="mb-1 text-4xl font-black" style={{ color: heading }}>41</p>
              <p className="mb-6 text-sm leading-6" style={{ color: muted }}>{t('sustainability.treesPlantedOnBehalf')}</p>
              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-2xl p-4" style={{ background: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.03)', border: `1px solid ${shellBorder}` }}>
                  <p className="text-xl font-black" style={{ color: heading }}>8,241g</p>
                  <p className="mt-1 text-sm leading-5" style={{ color: muted }}>{t('sustainability.co2OffsetViaTrees')}</p>
                </div>
                <div className="rounded-2xl p-4" style={{ background: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.03)', border: `1px solid ${shellBorder}` }}>
                  <p className="text-xl font-black" style={{ color: heading }}>Kenya</p>
                  <p className="mt-1 text-sm leading-5" style={{ color: muted }}>{t('sustainability.primaryLocation')}</p>
                </div>
              </div>
              <motion.a className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold" href="https://ecologi.com" rel="noopener noreferrer" style={{ background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' }} target="_blank" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {t('sustainability.viewForest')}
              </motion.a>
            </div>
            <div className="mt-4 rounded-2xl p-4" style={{ background: isLight ? 'rgba(248,250,252,0.96)' : 'rgba(255,255,255,0.03)', border: `1px solid ${shellBorder}` }}>
              <p className="text-sm leading-6" style={{ color: muted }}>{t('sustainability.ecologiFootnote')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
