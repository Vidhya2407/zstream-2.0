'use client';

import Link from 'next/link';
import { getMeetingRecordingWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';

interface RecordingsListProps {
  items: Array<{ attendees: number; co2Saved: string; date: string; duration: string; id: number; thumbnail: string; title: string }>;
  pageTextMuted: string;
  pageTextPrimary: string;
  surfaceBg: string;
  surfaceBorder: string;
}

export default function RecordingsList({ items, pageTextMuted, pageTextPrimary, surfaceBg, surfaceBorder }: RecordingsListProps) {
  return (
    <div className="grid gap-4">
      {items.map((recording) => (
        <div key={recording.id} className="rounded-2xl p-6 flex items-center justify-between group transition-all" style={{ background: surfaceBg, border: `1px solid ${surfaceBorder}` }}>
          <div className="flex items-center gap-6 min-w-0">
            <div className="w-16 h-12 rounded-lg bg-eco-green/10 flex items-center justify-center text-sm font-black flex-shrink-0">{recording.thumbnail}</div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm mb-1 truncate" style={{ color: pageTextPrimary }}>{recording.title}</h3>
              <div className="flex items-center gap-3 text-[10px] flex-wrap" style={{ color: pageTextMuted }}>
                <span>{recording.date}</span>
                <span>•</span>
                <span>{recording.duration}</span>
                <span>•</span>
                <span>{recording.attendees} attendees</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 flex-shrink-0">
            <div className="text-right">
              <div className="text-xs font-black text-eco-green">-{recording.co2Saved} CO2</div>
              <div className="text-[9px] font-bold opacity-40 uppercase">Saved</div>
            </div>
            <Link className="h-10 px-6 rounded-xl bg-eco-green/10 text-eco-green font-bold text-xs hover:bg-eco-green/20 transition-all inline-flex items-center" href={getWatchHref(getMeetingRecordingWatchId(recording.id))}>
              Watch
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
