'use client';

import Link from 'next/link';
import { getMeetingWebinarWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';
import { useAppTranslations } from '@/lib/utils/translations';

interface WebinarsGridProps {
  items: Array<{ date: string; icon: string; id: number; registered: number; speaker: string; time: string; title: string }>;
  pageTextPrimary: string;
  pageTextSecondary: string;
  surfaceBg: string;
  surfaceBorder: string;
}

export default function WebinarsGrid({ items, pageTextPrimary, pageTextSecondary, surfaceBg, surfaceBorder }: WebinarsGridProps) {
  const { t } = useAppTranslations();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((webinar) => (
        <div key={webinar.id} className="rounded-3xl p-8 space-y-6 group transition-all relative overflow-hidden" style={{ background: surfaceBg, border: `1px solid ${surfaceBorder}` }}>
          <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-eco-green/5 blur-3xl group-hover:bg-eco-green/10 transition-colors" />
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-eco-green/10 flex items-center justify-center text-xs font-black">{webinar.icon}</div>
            <div className="px-3 py-1 rounded-full bg-eco-green/10 text-eco-green text-[10px] font-black uppercase tracking-wider">{webinar.date}</div>
          </div>
          <div>
            <h3 className="font-black text-lg mb-1" style={{ color: pageTextPrimary }}>{webinar.title}</h3>
            <p className="text-xs font-bold text-eco-green mb-4">{webinar.speaker}</p>
            <div className="flex items-center gap-4 text-[11px]" style={{ color: pageTextSecondary }}>
              <span>{webinar.time}</span>
              <span>{webinar.registered} {t('meetings.webinars.registered', 'registered')}</span>
            </div>
          </div>
          <Link className="w-full h-12 rounded-xl border border-eco-green/30 text-eco-green font-bold text-xs hover:bg-eco-green/10 transition-all inline-flex items-center justify-center" href={getWatchHref(getMeetingWebinarWatchId(webinar.id))}>
            {t('meetings.webinars.registerNow', 'Register Now')}
          </Link>
        </div>
      ))}
    </div>
  );
}
