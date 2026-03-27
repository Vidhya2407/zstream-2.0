'use client';
import { motion } from 'framer-motion';
import { useAppTranslations } from '../../lib/utils/translations';
import { methodologySectionStyles, methodologySourceKeys } from '../../features/methodology/config';

export default function MethodologyPage() {
  const { t } = useAppTranslations();
  const sections = methodologySectionStyles.map((section) => ({
    ...section,
    title: t(section.titleKey, section.fallbackTitle),
    content: t(section.contentKey),
  }));
  const sources = methodologySourceKeys.map((source) => t(source));

  return (
    <main className="min-h-screen" data-no-translate="true" style={{ background: '#0A0F18' }}>
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute rounded-full" style={{ width: '600px', height: '600px', top: '-150px', left: '-150px', background: 'radial-gradient(circle, rgba(0,229,186,0.05), transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute rounded-full" style={{ width: '400px', height: '400px', bottom: '10%', right: '5%', background: 'radial-gradient(circle, rgba(0,128,255,0.05), transparent 70%)', filter: 'blur(60px)' }} />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-10">
        <motion.div animate={{ opacity: 1, y: 0 }} className="space-y-12" initial={{ opacity: 0, y: 30 }}>
          <motion.div animate={{ opacity: 1 }} className="space-y-4 text-center" initial={{ opacity: 0 }} transition={{ delay: 0.1 }}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{ background: 'rgba(0,229,186,0.08)', border: '1px solid rgba(0,229,186,0.2)' }}>
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-eco-green" />
              <span className="text-xs font-semibold uppercase tracking-wider text-eco-green">{t('methodology.badge')}</span>
            </div>
            <h1 className="text-5xl font-black"><span className="bg-gradient-to-r from-eco-green to-cyan-neon bg-clip-text text-transparent">{t('methodology.title')}</span></h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400">{t('methodology.subtitle')}</p>
          </motion.div>
          <div className="grid gap-5">
            {sections.map((section, index) => (
              <motion.div animate={{ opacity: 1, x: 0 }} className="relative overflow-hidden rounded-3xl p-7" initial={{ opacity: 0, x: -30 }} key={section.title} style={{ background: section.color, border: `1px solid ${section.border}` }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.01, y: -2 }}>
                <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at top right, rgba(0,229,186,0.08), transparent 60%)' }} />
                <div className="relative flex items-start gap-5">
                  <motion.div animate={{ scale: [1, 1.06, 1] }} className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl" style={{ background: section.iconBg }} transition={{ duration: 3, repeat: Infinity, delay: index * 0.4 }}>{section.icon}</motion.div>
                  <div className="flex-1">
                    <h2 className={`mb-2 text-xl font-bold ${section.textColor}`}>{section.title}</h2>
                    <p className="leading-relaxed text-gray-300">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div animate={{ opacity: 1 }} className="rounded-3xl p-7" initial={{ opacity: 0 }} style={{ background: 'linear-gradient(135deg, rgba(15,25,35,0.9), rgba(10,20,30,0.8))', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(0,229,186,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }} transition={{ delay: 0.5 }}>
            <h2 className="mb-6 text-2xl font-bold text-eco-green">{t('methodology.sourcesTitle')}</h2>
            <ul className="space-y-3 text-gray-300">
              {sources.map((source) => (
                <li className="flex items-start gap-3" key={source}>
                  <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-eco-green" />
                  <span className="text-sm leading-relaxed">{source}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div animate={{ opacity: 1 }} className="rounded-2xl p-6" initial={{ opacity: 0 }} style={{ background: 'rgba(0,217,255,0.05)', border: '1px solid rgba(0,217,255,0.2)' }} transition={{ delay: 0.7 }}>
            <h3 className="mb-3 text-lg font-bold text-cyan-neon">{t('methodology.statementTitle')}</h3>
            <p className="text-sm leading-relaxed text-gray-400">{t('methodology.statementPrefix')} <strong className="text-white">{t('methodology.statementHighlight')}</strong> {t('methodology.statementSuffix')}</p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
