'use client';

import { motion } from 'framer-motion';

interface MeetingSetupPanelProps {
  generateCode: () => void;
  inPersonCO2: number;
  inPersonLabel: string;
  inputBg: string;
  inputBorder: string;
  meetingTitle: string;
  pageTextMuted: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  roomCode: string;
  saveLabel: string;
  savedCO2: number;
  savedPct: number;
  setMeetingTitle: (value: string) => void;
  shareCodeLabel: string;
  startLabel: string;
  startMeeting: () => void;
  surfaceBg: string;
  surfaceBorder: string;
  title: string;
  virtualCO2: number;
  virtualLabel: string;
}

export default function MeetingSetupPanel(props: MeetingSetupPanelProps) {
  const { generateCode, inPersonCO2, inPersonLabel, inputBg, inputBorder, meetingTitle, pageTextMuted, pageTextPrimary, pageTextSecondary, roomCode, saveLabel, savedCO2, savedPct, setMeetingTitle, shareCodeLabel, startLabel, startMeeting, surfaceBg, surfaceBorder, title, virtualCO2, virtualLabel } = props;

  return (
    <div className="rounded-3xl p-8 space-y-8" style={{ background: surfaceBg, border: `1px solid ${surfaceBorder}` }}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black" style={{ color: pageTextPrimary }}>{title}</h2>
        <div className="px-3 py-1 rounded-full bg-eco-green/10 border border-eco-green/20 text-[10px] font-bold text-eco-green tracking-wider uppercase">Live Preview</div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: pageTextMuted }}>Room Name</label>
            <input className="w-full h-12 px-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 ring-eco-green/30 transition-all" onChange={(event) => setMeetingTitle(event.target.value)} placeholder="Enter room name..." style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: pageTextPrimary }} type="text" value={meetingTitle} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest" style={{ color: pageTextMuted }}>Room Code</label>
            <div className="flex gap-2">
              <div className="flex-1 h-12 flex items-center px-4 rounded-xl text-sm font-mono tracking-wider font-bold" style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: 'rgb(0,229,186)' }}>{roomCode}</div>
              <button className="h-12 w-12 flex items-center justify-center rounded-xl bg-eco-green/10 text-eco-green border border-eco-green/20 hover:bg-eco-green/20 transition-all" onClick={generateCode} title="Regenerate">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
            <p className="text-[10px]" style={{ color: pageTextMuted }}>{shareCodeLabel}</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-4 rounded-2xl p-6 bg-eco-green/5 border border-eco-green/10">
            <div className="flex items-center justify-between"><span className="text-xs font-bold" style={{ color: pageTextSecondary }}>{virtualLabel}</span><span className="text-xs font-black text-eco-green">{virtualCO2.toFixed(3)} kg</span></div>
            <div className="flex items-center justify-between"><span className="text-xs font-bold" style={{ color: pageTextSecondary }}>{inPersonLabel}</span><span className="text-xs font-black text-red-400">{inPersonCO2.toFixed(1)} kg</span></div>
            <div className="pt-4 border-t border-eco-green/10 flex items-center justify-between">
              <span className="text-sm font-black" style={{ color: pageTextPrimary }}>{saveLabel}</span>
              <div className="text-right"><div className="text-lg font-black text-eco-green">-{savedPct}% CO2</div><div className="text-[10px] font-bold text-eco-green/60 uppercase">{savedCO2.toFixed(2)} kg saved</div></div>
            </div>
          </div>
          <motion.button className="w-full h-14 rounded-2xl bg-eco-green text-[#0A0F18] font-black text-sm shadow-lg shadow-eco-green/20 flex items-center justify-center gap-2" onClick={startMeeting} whileHover={{ scale: 1.02, boxShadow: '0 0 32px rgba(0,229,186,0.3)' }} whileTap={{ scale: 0.98 }}>
            <div className="w-2 h-2 rounded-full bg-[#0A0F18] animate-pulse" />
            {startLabel}
          </motion.button>
        </div>
      </div>
    </div>
  );
}


