'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { WatchContent } from '../../lib/data/watchContent';
import { useThemeStore } from '../../lib/stores/themeStore';
import { getCarbonGrade, relatedContentSidebarMetrics, watchContentTypeAccent, watchContentTypeLabel } from './shared/config';

interface RelatedContentSidebarProps {
  items: WatchContent[];
  currentId: string;
}

export default function RelatedContentSidebar({ items, currentId }: RelatedContentSidebarProps) {
  const { theme } = useThemeStore();
  const isLight = theme === 'light';
  const title = isLight ? '#0f172a' : '#ffffff';
  const muted = isLight ? '#64748b' : '#9ca3af';
  const faint = isLight ? '#94a3b8' : '#6b7280';
  const cardBg = isLight ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.02)';
  const cardBorder = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.05)';

  return (
    <aside>
      <div className="mb-4 flex items-center gap-2">
        <span className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ background: 'rgba(0,229,186,0.08)', border: '1px solid rgba(0,229,186,0.2)', color: 'rgb(0,229,186)' }}>Up Next</span>
        <h3 className="text-sm font-bold" style={{ color: title }}>Related Content</h3>
      </div>

      <div className="flex flex-col gap-3">
        {items.map((item, index) => {
          const accent = watchContentTypeAccent[item.type];
          const isLive = item.type === 'live';
          const { grade, color } = getCarbonGrade(item.carbonScore);

          return (
            <motion.div animate={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 16 }} key={item.id} transition={{ delay: index * 0.07 }}>
              <Link href={`/watch/${item.id}`}>
                <motion.div className="group flex cursor-pointer gap-3 rounded-xl p-2.5 transition-all" style={{ background: item.id === currentId ? 'rgba(0,229,186,0.07)' : cardBg, border: item.id === currentId ? '1px solid rgba(0,229,186,0.2)' : `1px solid ${cardBorder}` }} whileHover={{ scale: 1.015, backgroundColor: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.04)' }} whileTap={{ scale: 0.98 }}>
                  <div className="relative flex-shrink-0 overflow-hidden rounded-lg" style={{ width: '112px', height: '63px' }}>
                    <Image alt={item.title} className="object-cover transition-transform duration-500 group-hover:scale-110" fill sizes="112px" src={item.imageUrl} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute left-1 top-1 rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white" style={{ background: accent?.replace('0.85', '0.9') }}>{watchContentTypeLabel[item.type]}</div>
                    {isLive && <motion.div animate={{ opacity: [1, 0.65, 1] }} className="absolute right-1 top-1 flex items-center gap-1 rounded px-1.5 py-0.5 text-[8px] font-bold text-white" style={{ background: 'rgba(239,68,68,0.9)' }} transition={{ duration: 1.5, repeat: Infinity }}><span className="inline-block h-1 w-1 rounded-full bg-white" />LIVE</motion.div>}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"><div className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: accent?.replace('0.85', '0.9') }}><svg className="ml-0.5 h-3 w-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></div></div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="mb-1 line-clamp-2 text-xs font-semibold leading-tight transition-colors group-hover:text-eco-green-bright" style={{ color: title }}>{item.title}</h4>
                    <p className="mb-1.5 line-clamp-1 text-[10px]" style={{ color: muted }}>{item.genre} · {item.year}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full px-1.5 py-0.5" style={{ background: `${color}12`, border: `1px solid ${color}30` }}><svg className="h-2 w-2 flex-shrink-0" fill="none" stroke={color} strokeWidth={2.5} viewBox="0 0 24 24"><path d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" strokeLinecap="round" strokeLinejoin="round" /></svg><span className="text-[9px] font-bold" style={{ color }}>{item.carbonScore.toFixed(2)}g · {grade}</span></div>
                      {item.rating && <div className="flex items-center gap-1"><svg className="h-2.5 w-2.5 text-amber-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg><span className="text-[10px] font-bold text-amber-400">{item.rating}</span></div>}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl p-4" style={{ background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(0,229,186,0.04)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(0,229,186,0.1)' }}>
        <p className="mb-1 text-[10px] uppercase tracking-wider" style={{ color: faint }}>{relatedContentSidebarMetrics.audienceLabel}</p>
        <p className="mb-0.5 text-xs font-semibold" style={{ color: title }}>{relatedContentSidebarMetrics.audienceSummary}</p>
        <p className="text-[11px] leading-relaxed" style={{ color: muted }}>{relatedContentSidebarMetrics.audienceDetailPrefix} <span className="font-bold text-eco-green-bright">{relatedContentSidebarMetrics.audienceDetailValue}</span> {relatedContentSidebarMetrics.audienceDetailSuffix}</p>
      </div>
    </aside>
  );
}
