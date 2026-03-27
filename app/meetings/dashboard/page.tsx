'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../../lib/images/unsplash';

type DashTab = 'overview' | 'upcoming' | 'past' | 'participants' | 'settings' | 'analytics';

interface Meeting {
  id: number;
  title: string;
  type: 'webinar' | 'team' | 'conference' | 'workshop';
  date: string;
  time: string;
  duration: string;
  attendees: number;
  maxAttendees: number;
  status: 'upcoming' | 'live' | 'ended';
  co2Saved: number;
  hasRecording: boolean;
  password: boolean;
  waitingRoom: boolean;
  hostName: string;
}

interface Participant {
  id: number;
  name: string;
  email: string;
  avatarIdx: number;
  role: 'host' | 'co-host' | 'attendee' | 'speaker';
  location: string;
  co2Saved: number;
  attendanceRate: number;
}

const MEETINGS: Meeting[] = [
  { id: 1, title: 'Climate Policy Q&A', type: 'webinar', date: 'Mar 19, 2026', time: '15:00 CET', duration: '1h 30m', attendees: 842, maxAttendees: 10000, status: 'upcoming', co2Saved: 0.38, hasRecording: false, password: false, waitingRoom: true, hostName: 'Dr. Sarah Chen' },
  { id: 2, title: 'Zero Waste Workshop', type: 'workshop', date: 'Mar 20, 2026', time: '10:00 CET', duration: '2h', attendees: 124, maxAttendees: 250, status: 'upcoming', co2Saved: 0.12, hasRecording: false, password: true, waitingRoom: true, hostName: 'Marcus Webb' },
  { id: 3, title: 'Solar Energy Summit', type: 'conference', date: 'Mar 25, 2026', time: '14:00 CET', duration: '4h', attendees: 3280, maxAttendees: 5000, status: 'upcoming', co2Saved: 1.24, hasRecording: false, password: false, waitingRoom: false, hostName: 'Dr. Sarah Chen' },
  { id: 4, title: 'Eco Dev Team Sync', type: 'team', date: 'Mar 18, 2026', time: '17:30 CET', duration: '45m', attendees: 18, maxAttendees: 50, status: 'live', co2Saved: 0.04, hasRecording: false, password: false, waitingRoom: false, hostName: 'You' },
  { id: 5, title: 'Green Tech Panel', type: 'webinar', date: 'Mar 15, 2026', time: '11:00 CET', duration: '1h 45m', attendees: 1240, maxAttendees: 10000, status: 'ended', co2Saved: 0.56, hasRecording: true, password: false, waitingRoom: false, hostName: 'Dr. Sarah Chen' },
  { id: 6, title: 'Quarterly Sustainability Review', type: 'team', date: 'Mar 10, 2026', time: '14:00 CET', duration: '1h 10m', attendees: 24, maxAttendees: 50, status: 'ended', co2Saved: 0.08, hasRecording: true, password: false, waitingRoom: false, hostName: 'You' },
  { id: 7, title: 'Carbon Offset Strategy Session', type: 'conference', date: 'Mar 5, 2026', time: '09:00 CET', duration: '3h 20m', attendees: 412, maxAttendees: 1000, status: 'ended', co2Saved: 0.72, hasRecording: true, password: true, waitingRoom: true, hostName: 'Prof. Erik Larsen' },
];

const PARTICIPANTS: Participant[] = [
  { id: 1, name: 'Dr. Sarah Chen', email: 'sarah@ecolab.org', avatarIdx: 1, role: 'host', location: '🇺🇸 San Francisco', co2Saved: 0.42, attendanceRate: 100 },
  { id: 2, name: 'Marcus Webb', email: 'marcus@greentech.io', avatarIdx: 0, role: 'co-host', location: '🇬🇧 London', co2Saved: 0.38, attendanceRate: 96 },
  { id: 3, name: 'Amara Diallo', email: 'amara@ecofuture.sn', avatarIdx: 3, role: 'speaker', location: '🇸🇳 Dakar', co2Saved: 0.51, attendanceRate: 88 },
  { id: 4, name: 'Prof. Erik Larsen', email: 'erik@uni-berlin.de', avatarIdx: 2, role: 'speaker', location: '🇩🇪 Berlin', co2Saved: 0.28, attendanceRate: 92 },
  { id: 5, name: 'Yuki Tanaka', email: 'yuki@greenjp.co', avatarIdx: 1, role: 'attendee', location: '🇯🇵 Tokyo', co2Saved: 0.61, attendanceRate: 78 },
  { id: 6, name: 'Leo Martins', email: 'leo@ecobr.com', avatarIdx: 0, role: 'attendee', location: '🇧🇷 São Paulo', co2Saved: 0.72, attendanceRate: 82 },
];

const TABS: { id: DashTab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'upcoming', label: 'Upcoming', icon: '📅' },
  { id: 'past', label: 'Past Meetings', icon: '📼' },
  { id: 'participants', label: 'Participants', icon: '👥' },
  { id: 'settings', label: 'Room Settings', icon: '⚙️' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
];

const typeConfig: Record<Meeting['type'], { label: string; color: string; bg: string; border: string }> = {
  webinar: { label: 'Webinar', color: 'rgb(0,229,186)', bg: 'rgba(0,229,186,0.08)', border: 'rgba(0,229,186,0.2)' },
  team: { label: 'Team', color: 'rgb(96,165,250)', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)' },
  conference: { label: 'Conference', color: 'rgb(196,132,252)', bg: 'rgba(196,132,252,0.08)', border: 'rgba(196,132,252,0.2)' },
  workshop: { label: 'Workshop', color: 'rgb(251,191,36)', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)' },
};

const roleConfig: Record<Participant['role'], { label: string; color: string }> = {
  host: { label: 'Host', color: 'rgb(0,229,186)' },
  'co-host': { label: 'Co-host', color: 'rgb(96,165,250)' },
  speaker: { label: 'Speaker', color: 'rgb(196,132,252)' },
  attendee: { label: 'Attendee', color: 'rgb(156,163,175)' },
};

const IN_PERSON_KG_PER_HR = 2.8;

function NewMeetingModal({ onClose }: { onClose: () => void }) {
  const [meetingTitle, setMeetingTitle] = React.useState('');
  const [meetingType, setMeetingType] = React.useState<Meeting['type']>('team');
  const [instant, setInstant] = React.useState(true);
  const [scheduledDate, setScheduledDate] = React.useState('');
  const [maxPart, setMaxPart] = React.useState('50');
  const [usePassword, setUsePassword] = React.useState(false);
  const [useWaiting, setUseWaiting] = React.useState(true);
  const [step, setStep] = React.useState<1 | 2>(1);

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} className="relative w-full max-w-md rounded-3xl p-6" style={{ background: 'rgba(10,15,24,0.98)', border: '1px solid rgba(0,128,255,0.3)', backdropFilter: 'blur(24px)' }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" aria-label="Close">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl">🎥</span>
          <h2 className="text-white font-black text-lg">New Meeting</h2>
          <span className="text-gray-500 text-xs ml-auto">Step {step}/2</span>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs block mb-1.5">Meeting Title <span className="text-red-400">*</span></label>
              <input value={meetingTitle} onChange={e => setMeetingTitle(e.target.value)} placeholder="e.g. Eco Team Standup" className="w-full bg-transparent border rounded-xl px-3 py-2.5 text-white text-sm outline-none" style={{ borderColor: meetingTitle ? 'rgba(0,128,255,0.4)' : 'rgba(255,255,255,0.12)' }} />
            </div>
            <div>
              <label className="text-gray-400 text-xs block mb-1.5">Meeting Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(['team', 'webinar', 'conference', 'workshop'] as const).map(t => {
                  const tc = typeConfig[t];
                  return (
                    <button key={t} onClick={() => setMeetingType(t)} className="p-3 rounded-xl text-left transition-all" style={meetingType === t ? { background: tc.bg, border: `2px solid ${tc.border}` } : { background: 'rgba(255,255,255,0.03)', border: '2px solid rgba(255,255,255,0.07)' }}>
                      <p className="text-xs font-bold capitalize" style={{ color: meetingType === t ? tc.color : 'rgb(156,163,175)' }}>{tc.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setInstant(true)} className="flex-1 py-2 rounded-xl text-xs font-bold transition-all" style={instant ? { background: 'rgba(0,128,255,0.15)', color: 'rgb(96,165,250)', border: '2px solid rgba(0,128,255,0.3)' } : { background: 'rgba(255,255,255,0.03)', color: 'rgb(107,114,128)', border: '2px solid rgba(255,255,255,0.07)' }}>⚡ Instant</button>
              <button onClick={() => setInstant(false)} className="flex-1 py-2 rounded-xl text-xs font-bold transition-all" style={!instant ? { background: 'rgba(0,128,255,0.15)', color: 'rgb(96,165,250)', border: '2px solid rgba(0,128,255,0.3)' } : { background: 'rgba(255,255,255,0.03)', color: 'rgb(107,114,128)', border: '2px solid rgba(255,255,255,0.07)' }}>📅 Schedule</button>
            </div>
            {!instant && (
              <input type="datetime-local" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} className="w-full bg-transparent border rounded-xl px-3 py-2 text-white text-xs outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)', colorScheme: 'dark' }} />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs block mb-1.5">Max Participants</label>
              <input type="number" value={maxPart} onChange={e => setMaxPart(e.target.value)} min="2" max="10000" className="w-full bg-transparent border rounded-xl px-3 py-2 text-white text-sm outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
            </div>
            {[
              { label: 'Password protect room', value: usePassword, set: setUsePassword },
              { label: 'Enable waiting room', value: useWaiting, set: setUseWaiting },
            ].map(ctrl => (
              <div key={ctrl.label} className="flex items-center justify-between">
                <span className="text-gray-300 text-xs">{ctrl.label}</span>
                <button onClick={() => ctrl.set(v => !v)} className="relative w-10 h-5 rounded-full transition-colors" style={{ background: ctrl.value ? 'rgba(0,128,255,0.8)' : 'rgba(255,255,255,0.1)' }} role="switch" aria-checked={ctrl.value}>
                  <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform" style={{ transform: ctrl.value ? 'translateX(22px)' : 'translateX(2px)' }} />
                </button>
              </div>
            ))}
            <div className="p-3 rounded-xl" style={{ background: 'rgba(0,229,186,0.06)', border: '1px solid rgba(0,229,186,0.15)' }}>
              <p className="text-[10px] font-bold" style={{ color: 'rgb(0,229,186)' }}>🌿 Carbon savings estimate</p>
              <p className="text-gray-300 text-[10px] mt-0.5">With {maxPart} participants meeting virtually instead of travelling, this saves approximately <strong style={{ color: 'rgb(0,229,186)' }}>{(parseInt(maxPart) * 0.018).toFixed(2)} kg CO₂</strong> per hour.</p>
            </div>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          {step > 1 && <button onClick={() => setStep(1)} className="flex-1 py-2.5 rounded-xl text-xs font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.1)' }}>← Back</button>}
          {step === 1
            ? <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep(2)} disabled={!meetingTitle.trim()} className="flex-1 py-2.5 rounded-xl text-xs font-bold disabled:opacity-40" style={{ background: 'rgba(0,128,255,0.85)', color: 'white' }}>Continue →</motion.button>
            : <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={onClose} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black" style={{ background: instant ? 'rgba(0,128,255,0.85)' : 'rgba(0,229,186,0.85)', color: 'white' }}>
                {instant ? '▶ Start Now' : '📅 Schedule'}
              </motion.button>
          }
        </div>
      </motion.div>
    </motion.div>
  );
}

function OverviewTab({ onNew }: { onNew: () => void }) {
  const totalCO2 = MEETINGS.reduce((s, m) => s + m.co2Saved, 0);
  const liveMeeting = MEETINGS.find(m => m.status === 'live');
  const upcoming = MEETINGS.filter(m => m.status === 'upcoming');

  return (
    <div className="space-y-5">
      {/* Live banner */}
      {liveMeeting && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-2xl flex items-center gap-4" style={{ background: 'rgba(0,128,255,0.08)', border: '1px solid rgba(0,128,255,0.25)' }}>
          <motion.div className="w-3 h-3 rounded-full bg-blue-400 flex-shrink-0" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm">{liveMeeting.title}</p>
            <p className="text-blue-300 text-xs">{liveMeeting.attendees} participants · In progress</p>
          </div>
          <Link href="/meetings">
            <button className="px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0" style={{ background: 'rgba(0,128,255,0.85)', color: 'white' }}>Join</button>
          </Link>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total CO₂ Saved', value: `${totalCO2.toFixed(2)} kg`, icon: '🌿', color: 'rgb(0,229,186)' },
          { label: 'Upcoming', value: upcoming.length, icon: '📅', color: 'rgb(96,165,250)' },
          { label: 'Recordings', value: MEETINGS.filter(m => m.hasRecording).length, icon: '📼', color: 'rgb(196,132,252)' },
          { label: 'Trees Equivalent', value: Math.round(totalCO2 / 0.021), icon: '🌳', color: 'rgb(0,200,80)' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="font-black text-xl text-white">{s.value}</div>
            <div className="text-gray-500 text-[10px] mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: 'Instant Meeting', icon: '⚡', desc: 'Start a room right now', color: 'rgba(0,128,255,0.85)', action: onNew },
          { label: 'Schedule Meeting', icon: '📅', desc: 'Plan for later', color: 'rgba(0,229,186,0.12)', textColor: 'rgb(0,229,186)', action: onNew },
          { label: 'Join by ID', icon: '🔗', desc: 'Enter a room code', color: 'rgba(196,132,252,0.12)', textColor: 'rgb(196,132,252)', action: onNew },
        ].map((a, i) => (
          <motion.button key={a.label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={a.action} className="p-4 rounded-2xl text-left transition-all" style={{ background: i === 0 ? a.color : 'rgba(255,255,255,0.03)', border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-2xl mb-2">{a.icon}</div>
            <p className="text-white text-xs font-bold">{a.label}</p>
            <p className="text-gray-400 text-[10px] mt-0.5">{a.desc}</p>
          </motion.button>
        ))}
      </div>

      {/* Carbon Savings Widget */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)' }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🌍</span>
          <h3 className="text-white font-bold text-sm">Carbon Savings vs. In-Person</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'vs. Flying', saving: `${(totalCO2 * 4.2).toFixed(1)} kg`, desc: 'Short-haul flight emissions avoided', icon: '✈️' },
            { label: 'vs. Driving', saving: `${(totalCO2 * 1.8).toFixed(1)} kg`, desc: 'Car trip emissions avoided', icon: '🚗' },
            { label: 'vs. Train', saving: `${(totalCO2 * 0.3).toFixed(2)} kg`, desc: 'Train journey emissions avoided', icon: '🚄' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <div className="text-3xl mb-1">{item.icon}</div>
              <div className="font-black text-lg" style={{ color: 'rgb(0,229,186)' }}>{item.saving}</div>
              <div className="text-white text-[10px] font-semibold mt-0.5">{item.label}</div>
              <div className="text-gray-500 text-[9px] leading-snug mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar integrations */}
      <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm mb-3">Calendar Integrations</h3>
        <div className="flex flex-wrap gap-3">
          {[
            { name: 'Google Calendar', icon: '📅', connected: true, color: 'rgb(0,229,186)' },
            { name: 'Outlook', icon: '📧', connected: false, color: 'rgb(96,165,250)' },
            { name: 'Apple Calendar', icon: '🍎', connected: false, color: 'rgb(156,163,175)' },
          ].map(cal => (
            <div key={cal.name} className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span>{cal.icon}</span>
              <span className="text-white text-xs font-medium">{cal.name}</span>
              {cal.connected
                ? <span className="text-[9px] font-bold" style={{ color: cal.color }}>✓ Connected</span>
                : <button className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgb(156,163,175)' }}>Connect</button>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UpcomingTab({ onNew }: { onNew: () => void }) {
  const upcoming = MEETINGS.filter(m => m.status === 'upcoming' || m.status === 'live');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-sm">Upcoming Meetings ({upcoming.length})</h3>
        <button onClick={onNew} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(0,128,255,0.85)', color: 'white' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          New Meeting
        </button>
      </div>
      {upcoming.map((m, i) => {
        const tc = typeConfig[m.type];
        return (
          <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${m.status === 'live' ? 'rgba(0,128,255,0.3)' : 'rgba(255,255,255,0.07)'}` }}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-bold text-sm truncate">{m.title}</h4>
                  {m.status === 'live' && <motion.span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(0,128,255,0.2)', color: 'rgb(96,165,250)' }} animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>● LIVE</motion.span>}
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>{tc.label}</span>
                </div>
                <p className="text-gray-500 text-xs">{m.date} · {m.time} · {m.duration}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                  <span>👥 {m.attendees.toLocaleString()} / {m.maxAttendees.toLocaleString()}</span>
                  {m.password && <span>🔒 Password</span>}
                  {m.waitingRoom && <span>⏳ Waiting room</span>}
                  <span className="font-bold" style={{ color: 'rgb(0,229,186)' }}>🌿 ~{m.co2Saved} kg CO₂ saved</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link href="/meetings">
                  <button className="px-3 py-1.5 rounded-xl text-[10px] font-bold" style={{ background: 'rgba(0,128,255,0.12)', color: 'rgb(96,165,250)', border: '1px solid rgba(0,128,255,0.2)' }}>
                    {m.status === 'live' ? 'Join' : 'Edit'}
                  </button>
                </Link>
                <button className="px-3 py-1.5 rounded-xl text-[10px] font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>Copy Link</button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function PastTab() {
  const past = MEETINGS.filter(m => m.status === 'ended');

  return (
    <div className="space-y-4">
      <h3 className="text-white font-bold text-sm">Past Meetings ({past.length})</h3>
      {past.map((m, i) => {
        const tc = typeConfig[m.type];
        return (
          <motion.div key={m.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-bold text-sm truncate">{m.title}</h4>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>{tc.label}</span>
                </div>
                <p className="text-gray-500 text-xs">{m.date} · {m.duration} · Host: {m.hostName}</p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                  <span>👥 {m.attendees.toLocaleString()} attended</span>
                  <span className="font-bold" style={{ color: 'rgb(0,229,186)' }}>🌿 {m.co2Saved} kg CO₂ saved</span>
                  <span>≈ {(m.co2Saved / (IN_PERSON_KG_PER_HR * (parseInt(m.duration) || 1)) * 100).toFixed(0)}% less than in-person</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {m.hasRecording && (
                  <button className="px-3 py-1.5 rounded-xl text-[10px] font-bold" style={{ background: 'rgba(196,132,252,0.1)', color: 'rgb(196,132,252)', border: '1px solid rgba(196,132,252,0.2)' }}>
                    📼 Recording
                  </button>
                )}
                <button className="px-3 py-1.5 rounded-xl text-[10px] font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>Report</button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function ParticipantsTab() {
  const [search, setSearch] = React.useState('');
  const filtered = PARTICIPANTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}>
          <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search participants..." className="flex-1 bg-transparent text-white text-xs placeholder-gray-600 outline-none" />
        </div>
        <button className="px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(0,128,255,0.12)', color: 'rgb(96,165,250)', border: '1px solid rgba(0,128,255,0.2)' }}>+ Invite</button>
      </div>
      <div className="space-y-2">
        {filtered.map((p, i) => {
          const rc = roleConfig[p.role];
          return (
            <motion.div key={p.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0" style={{ border: `2px solid ${rc.color}40` }}>
                <Image src={contentImages.creators[p.avatarIdx % contentImages.creators.length].url} alt={p.name} width={40} height={40} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white text-xs font-semibold truncate">{p.name}</p>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ color: rc.color, background: `${rc.color}15` }}>{rc.label}</span>
                </div>
                <p className="text-gray-500 text-[10px] truncate">{p.email} · {p.location}</p>
                <div className="flex items-center gap-3 mt-1 text-[9px]">
                  <span style={{ color: 'rgb(0,229,186)' }}>🌿 {p.co2Saved} kg saved</span>
                  <span className="text-gray-500">Attendance: {p.attendanceRate}%</span>
                </div>
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <button className="text-gray-500 hover:text-white text-[10px] transition-colors">Edit</button>
                <button className="text-gray-500 hover:text-red-400 text-[10px] transition-colors">Remove</button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [roomName, setRoomName] = React.useState('ZStream Meeting Room');
  const [maxPart, setMaxPart] = React.useState('250');
  const [password, setPassword] = React.useState('');
  const [waitingRoom, setWaitingRoom] = React.useState(true);
  const [muteOnEntry, setMuteOnEntry] = React.useState(true);
  const [allowRecording, setAllowRecording] = React.useState(true);
  const [autoTranscript, setAutoTranscript] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  return (
    <form onSubmit={e => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }} className="space-y-5 max-w-xl">
      <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm">Room Configuration</h3>
        <div>
          <label className="text-gray-400 text-xs block mb-1.5">Room Display Name</label>
          <input value={roomName} onChange={e => setRoomName(e.target.value)} className="w-full bg-transparent border rounded-xl px-3 py-2 text-white text-xs outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1.5">Max Participants</label>
          <input type="number" value={maxPart} onChange={e => setMaxPart(e.target.value)} min="2" max="10000" className="w-full bg-transparent border rounded-xl px-3 py-2 text-white text-xs outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1.5">Room Password (optional)</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Leave blank for no password" className="w-full bg-transparent border rounded-xl px-3 py-2 text-white text-xs outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
        </div>
      </div>

      <div className="p-5 rounded-2xl space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm">Meeting Controls</h3>
        {[
          { label: 'Enable waiting room', value: waitingRoom, set: setWaitingRoom },
          { label: 'Mute participants on entry', value: muteOnEntry, set: setMuteOnEntry },
          { label: 'Allow recording', value: allowRecording, set: setAllowRecording },
          { label: 'Auto-transcription (AI)', value: autoTranscript, set: setAutoTranscript },
        ].map(ctrl => (
          <div key={ctrl.label} className="flex items-center justify-between">
            <span className="text-gray-300 text-xs">{ctrl.label}</span>
            <button type="button" onClick={() => ctrl.set(v => !v)} className="relative w-10 h-5 rounded-full transition-colors" style={{ background: ctrl.value ? 'rgba(0,128,255,0.8)' : 'rgba(255,255,255,0.1)' }} role="switch" aria-checked={ctrl.value}>
              <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform" style={{ transform: ctrl.value ? 'translateX(22px)' : 'translateX(2px)' }} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="px-5 py-2.5 rounded-xl text-xs font-bold" style={{ background: 'rgba(0,128,255,0.85)', color: 'white' }}>Save Settings</button>
        <AnimatePresence>
          {saved && <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-xs font-bold" style={{ color: 'rgb(0,229,186)' }}>✓ Saved</motion.span>}
        </AnimatePresence>
      </div>
    </form>
  );
}

function AnalyticsTab() {
  const avgDuration = 95;
  const avgAttendance = Math.round(PARTICIPANTS.reduce((s, p) => s + p.attendanceRate, 0) / PARTICIPANTS.length);
  const totalCO2 = MEETINGS.reduce((s, m) => s + m.co2Saved, 0);
  const bars = [62, 74, 58, 88, 72, 95, 84, 91, 78, 86, 90, 97];
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Avg. Duration', value: `${avgDuration}m`, icon: '⏱️', color: 'rgb(96,165,250)' },
          { label: 'Avg. Attendance', value: `${avgAttendance}%`, icon: '👥', color: 'rgb(0,229,186)' },
          { label: 'Total Meetings', value: MEETINGS.length, icon: '🎥', color: 'rgb(196,132,252)' },
          { label: 'Total CO₂ Saved', value: `${totalCO2.toFixed(2)} kg`, icon: '🌿', color: 'rgb(0,229,186)' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="font-black text-xl" style={{ color: s.color }}>{s.value}</div>
            <div className="text-gray-500 text-[10px] mt-0.5">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm mb-4">Meetings per Month</h3>
        <div className="flex items-end gap-1.5 h-28">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.04, duration: 0.5 }} className="w-full rounded-t-md" style={{ background: i === bars.length - 1 ? 'rgb(0,128,255)' : 'rgba(0,128,255,0.35)' }} />
              <span className="text-[8px] text-gray-600">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)' }}>
        <h3 className="text-white font-bold text-sm mb-3">Carbon Impact Report</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'vs. Flights avoided', value: `${(totalCO2 / 0.255).toFixed(0)} flights`, icon: '✈️' },
            { label: 'vs. Car km avoided', value: `${(totalCO2 / 0.17 * 1000).toFixed(0)} km`, icon: '🚗' },
            { label: 'Trees equivalent', value: `${Math.round(totalCO2 / 0.021)} trees/yr`, icon: '🌳' },
          ].map(item => (
            <div key={item.label} className="text-center">
              <div className="text-3xl mb-1">{item.icon}</div>
              <div className="font-black text-sm" style={{ color: 'rgb(0,229,186)' }}>{item.value}</div>
              <div className="text-gray-500 text-[9px] mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MeetingsDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<DashTab>('overview');
  const [showNewMeeting, setShowNewMeeting] = React.useState(false);

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ background: '#0A0F18' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute rounded-full" style={{ width: '600px', height: '600px', top: '-20%', right: '-8%', background: 'radial-gradient(circle, rgba(0,128,255,0.06) 0%, transparent 70%)', filter: 'blur(70px)' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 13, repeat: Infinity }} />
        <motion.div className="absolute rounded-full" style={{ width: '400px', height: '400px', bottom: '-10%', left: '-5%', background: 'radial-gradient(circle, rgba(0,229,186,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 4 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">
        <motion.div className="flex flex-wrap items-center justify-between gap-4 mb-7" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0,128,255,0.4), rgba(0,229,186,0.3))', border: '1px solid rgba(0,128,255,0.3)' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
            </div>
            <div>
              <h1 className="text-white font-black text-2xl">Meetings Dashboard</h1>
              <p className="text-gray-500 text-xs">WebRTC Meetings · ZStream Connect</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowNewMeeting(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black" style={{ background: 'rgba(0,128,255,0.85)', color: 'white' }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              New Meeting
            </motion.button>
            <Link href="/meetings">
              <button className="px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>← Meetings</button>
            </Link>
          </div>
        </motion.div>

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1" role="tablist">
          {TABS.map(t => (
            <button key={t.id} role="tab" aria-selected={activeTab === t.id} onClick={() => setActiveTab(t.id)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0" style={activeTab === t.id ? { background: 'rgba(0,128,255,0.15)', color: 'rgb(96,165,250)', border: '1px solid rgba(0,128,255,0.3)' } : { background: 'transparent', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.16 }}>
            {activeTab === 'overview' && <OverviewTab onNew={() => setShowNewMeeting(true)} />}
            {activeTab === 'upcoming' && <UpcomingTab onNew={() => setShowNewMeeting(true)} />}
            {activeTab === 'past' && <PastTab />}
            {activeTab === 'participants' && <ParticipantsTab />}
            {activeTab === 'settings' && <SettingsTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showNewMeeting && <NewMeetingModal onClose={() => setShowNewMeeting(false)} />}
      </AnimatePresence>
    </main>
  );
}
