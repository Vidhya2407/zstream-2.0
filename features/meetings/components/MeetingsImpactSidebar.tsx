'use client';

import { useAppTranslations } from '@/lib/utils/translations';

interface MeetingsImpactSidebarProps {
  activeRooms: string;
  co2Offset: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  renewable: string;
  surfaceBg: string;
  surfaceBorder: string;
  width: string;
}

export default function MeetingsImpactSidebar({ activeRooms, co2Offset, pageTextPrimary, pageTextSecondary, renewable, surfaceBg, surfaceBorder, width }: MeetingsImpactSidebarProps) {
  const { t } = useAppTranslations();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl p-6 space-y-6" style={{ background: surfaceBg, border: `1px solid ${surfaceBorder}` }}>
        <h3 className="text-sm font-black tracking-widest uppercase" style={{ color: pageTextPrimary }}>{t('meetings.impact.title', 'Global Impact')}</h3>
        <div className="space-y-6">
          <div>
            <div className="flex items-end justify-between mb-2">
              <span className="text-3xl font-black text-eco-green">{activeRooms}</span>
              <span className="text-[10px] font-black text-eco-green/60 uppercase pb-1">{t('meetings.impact.roomsActive', 'Rooms active')}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-eco-green/10 overflow-hidden"><div className="h-full bg-eco-green" style={{ width }} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-eco-green/5 border border-eco-green/10"><div className="text-[9px] font-bold text-eco-green/60 uppercase mb-1">{t('meetings.impact.co2OffsetLabel', 'CO2 Offset')}</div><div className="text-lg font-black text-eco-green">{co2Offset}</div></div>
            <div className="p-4 rounded-2xl bg-blue-400/5 border border-blue-400/10"><div className="text-[9px] font-bold text-blue-400/60 uppercase mb-1">{t('meetings.impact.renewableLabel', 'Renewable')}</div><div className="text-lg font-black text-blue-400">{renewable}</div></div>
          </div>
          <div className="p-5 rounded-2xl bg-gradient-to-br from-eco-green/10 to-blue-400/10 border border-eco-green/10">
            <div className="flex items-center gap-3 mb-3"><div className="w-8 h-8 rounded-lg bg-eco-green/20 flex items-center justify-center text-eco-green">CN</div><div className="text-xs font-bold" style={{ color: pageTextPrimary }}>{t('meetings.impact.networkTitle', 'Carbon Neutral Network')}</div></div>
            <p className="text-[11px] leading-relaxed" style={{ color: pageTextSecondary }}>{t('meetings.impact.networkDescription', 'Our global infrastructure is powered by renewable energy and carbon offsets for all meeting traffic.')}</p>
          </div>
        </div>
      </div>
      <div className="rounded-3xl p-6 bg-eco-green text-[#0A0F18] overflow-hidden relative"><div className="relative z-10"><h3 className="font-black text-lg mb-2">{t('meetings.pro.title', 'Go Professional')}</h3><p className="text-xs font-medium opacity-80 mb-6">{t('meetings.pro.description', 'Unlimited participants, custom branding, and detailed impact reports.')}</p><button className="w-full py-3 rounded-xl bg-[#0A0F18] text-white font-bold text-xs hover:bg-[#121212] transition-colors">{t('meetings.pro.cta', 'Upgrade Now')}</button></div></div>
    </div>
  );
}
