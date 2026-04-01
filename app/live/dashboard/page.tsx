'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../../lib/images/unsplash';
import { getLiveWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';

type LiveTab = 'overview' | 'health' | 'chat' | 'schedule' | 'vods' | 'revenue';

interface ChatMessage {
  id: number;
  user: string;
  msg: string;
  time: string;
  color: string;
  pinned?: boolean;
  deleted?: boolean;
  isMod?: boolean;
}

interface ScheduledStream {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  estimated: string;
}

interface VOD {
  id: number;
  title: string;
  date: string;
  duration: string;
  views: string;
  imageIdx: number;
  autoSave: boolean;
}

interface DonationEvent {
  id: number;
  user: string;
  amount: string;
  type: 'donation' | 'superchat' | 'subscription';
  time: string;
  message?: string;
}

const SEED_CHAT: ChatMessage[] = [
  { id: 1, user: 'EcoWarrior99', msg: 'Stream looks amazing tonight! ??', time: '14:23', color: 'rgb(0,229,186)' },
  { id: 2, user: 'GreenStreamer', msg: 'Love the zero-carbon broadcast!', time: '14:23', color: 'rgb(0,217,255)' },
  { id: 3, user: 'ClimateHero', msg: 'How many viewers right now ? ', time: '14:24', color: 'rgb(167,139,250)' },
  { id: 4, user: 'NatureLover', msg: '??????', time: '14:24', color: 'rgb(251,146,60)' },
  { id: 5, user: 'SolarFuture', msg: 'Carbon offset counter is amazing', time: '14:24', color: 'rgb(96,165,250)' },
  { id: 6, user: 'ZeroEmissioner', msg: 'Can we get a replay ? ??', time: '14:25', color: 'rgb(251,191,36)' },
  { id: 7, user: 'EcoBeats', msg: 'Stream quality is ?? tonight', time: '14:25', color: 'rgb(0,229,186)' },
  { id: 8, user: 'GreenGrid', msg: 'Watching from Berlin ????', time: '14:25', color: 'rgb(167,139,250)' },
];

const SCHEDULED: ScheduledStream[] = [
  { id: 1, title: 'Weekly Climate Q&A', category: 'Talk Show', date: 'Mar 19, 2026', time: '19:00 CET', estimated: '2h' },
  { id: 2, title: 'Solar Panel Installation Live', category: 'DIY / Tech', date: 'Mar 21, 2026', time: '14:00 CET', estimated: '3h' },
  { id: 3, title: 'Eco Gaming Marathon', category: 'Gaming', date: 'Mar 22, 2026', time: '12:00 CET', estimated: '6h' },
  { id: 4, title: 'Green Tech Innovation Summit', category: 'Events', date: 'Mar 25, 2026', time: '10:00 CET', estimated: '4h' },
];

const VODS: VOD[] = [
  { id: 1, title: 'Climate Action Livestream - Mar 15', date: 'Mar 15, 2026', duration: '2h 14m', views: '84K', imageIdx: 0, autoSave: true },
  { id: 2, title: 'Community Q&A - Mar 12', date: 'Mar 12, 2026', duration: '1h 32m', views: '41K', imageIdx: 1, autoSave: true },
  { id: 3, title: 'Solar Tech Deep-Dive - Mar 8', date: 'Mar 8, 2026', duration: '3h 05m', views: '127K', imageIdx: 0, autoSave: false },
  { id: 4, title: 'Eco Gaming Session - Mar 5', date: 'Mar 5, 2026', duration: '4h 20m', views: '62K', imageIdx: 1, autoSave: true },
];

const DONATIONS: DonationEvent[] = [
  { id: 1, user: 'EcoWarrior99', amount: 'EUR 50.00', type: 'superchat', time: '14:28', message: 'Keep up the amazing work! ??' },
  { id: 2, user: 'GreenBlaster', amount: 'EUR 5.99/mo', type: 'subscription', time: '14:24', message: 'Just subbed! Love the channel' },
  { id: 3, user: 'ClimateHero', amount: 'EUR 20.00', type: 'donation', time: '14:21', message: 'One tree planted for this stream ??' },
  { id: 4, user: 'SolarFuture', amount: 'EUR 100.00', type: 'superchat', time: '14:18', message: 'Best stream on the internet!' },
  { id: 5, user: 'NatureLover', amount: 'EUR 5.99/mo', type: 'subscription', time: '14:15' },
];

const BOT_MESSAGES = [
  { user: 'StreamBot', msg: '?? 100K viewers milestone reached!', color: 'rgb(251,191,36)' },
  { user: 'EcoAlert', msg: '?? 500g CO2 offset this stream!', color: 'rgb(0,229,186)' },
  { user: 'Moderator', msg: 'Keep chat eco-friendly! ??', color: 'rgb(239,68,68)', isMod: true },
  { user: 'ClimateWatch', msg: 'Next segment starts in 5 min ', color: 'rgb(0,217,255)' },
  { user: 'EcoCitizen', msg: 'Shared this with 50 friends! ??', color: 'rgb(167,139,250)' },
];

const STREAM_KEY = 'live_sk_zstream_------------1a2b';

const typeConfig: Record<DonationEvent['type'], { label: string; color: string; bg: string; border: string; icon: string }> = {
  superchat: { label: 'Super Chat', color: 'rgb(251,191,36)', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)', icon: '??' },
  subscription: { label: 'Subscription', color: 'rgb(196,132,252)', bg: 'rgba(196,132,252,0.08)', border: 'rgba(196,132,252,0.2)', icon: '??' },
  donation: { label: 'Donation', color: 'rgb(0,229,186)', bg: 'rgba(0,229,186,0.08)', border: 'rgba(0,229,186,0.2)', icon: '??' },
};

function CarbonOffsetCounter() {
  const [seconds, setSeconds] = React.useState(0);
  const RATE_G_PER_MIN = 0.82;

  React.useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const mins = seconds / 60;
  const grams = (mins * RATE_G_PER_MIN).toFixed(2);
  const displayMins = Math.floor(mins);
  const displaySecs = seconds % 60;

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(0,229,186,0.08)', border: '1px solid rgba(0,229,186,0.2)', color: 'rgb(0,229,186)' }}>
      <span className="text-base animate-pulse">??</span>
      <span>{String(displayMins).padStart(2, '0')}:{String(displaySecs).padStart(2, '0')} live  <strong>{grams}g</strong> CO2 offset</span>
    </div>
  );
}

function OverviewTab({ onGoLive }: { onGoLive: () => void }) {
  const [viewers, setViewers] = React.useState(12480);
  const [peakViewers] = React.useState(18240);
  const [isLive, setIsLive] = React.useState(true);

  React.useEffect(() => {
    if (!isLive) return;
    const t = setInterval(() => setViewers(v => Math.max(8000, v + Math.round((Math.random() - 0.48) * 300))), 3000);
    return () => clearInterval(t);
  }, [isLive]);

  return (
    <div className="space-y-5">
      {/* Live Status */}
      <div className="p-5 rounded-2xl relative overflow-hidden" style={{ background: isLive ? 'rgba(239,68,68,0.06)' : 'rgba(255,255,255,0.03)', border: `1px solid ${isLive ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.07)'}` }}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {isLive && <motion.div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-white font-black text-lg">Climate Action Summit Live</h2>
                {isLive && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(239,68,68,0.2)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.3)' }}>?? LIVE</span>}
              </div>
              <p className="text-gray-500 text-xs">Events & Talk  Started 1h 24m ago</p>
            </div>
          </div>
          <div className="flex gap-3">
            {isLive ? (
              <button onClick={() => setIsLive(false)} className="px-4 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(239,68,68,0.15)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.3)' }}>End Stream</button>
            ) : (
              <button onClick={onGoLive} className="px-5 py-2.5 rounded-xl text-xs font-black transition-all" style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}>?? Go Live</button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Current Viewers', value: viewers.toLocaleString(), icon: '??', color: 'rgb(0,229,186)', live: true },
          { label: 'Peak Viewers', value: peakViewers.toLocaleString(), icon: '??', color: 'rgb(0,217,255)', live: false },
          { label: 'Stream Duration', value: '1h 24m', icon: '', color: 'rgb(251,191,36)', live: false },
          { label: 'CO2 Offset', value: '68.5g', icon: '??', color: 'rgb(0,229,186)', live: true },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="font-black text-xl text-white">{s.value}</div>
            <div className="text-gray-500 text-[10px] mt-0.5">{s.label}</div>
            {s.live && isLive && <div className="text-[9px] font-bold mt-1" style={{ color: s.color }}>Live updating</div>}
          </motion.div>
        ))}
      </div>

      {/* Viewers Chart */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm mb-4">Viewer Count (Last 30 min)</h3>
        <div className="flex items-end gap-1 h-24">
          {[40, 52, 48, 60, 55, 72, 68, 80, 76, 85, 90, 88, 82, 87, 92, 88, 95, 90, 88, 85, 88, 82, 78, 80, 82, 85, 88, 84, 87, 90].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.02 }} className="flex-1 rounded-t-sm" style={{ background: i === 29 ? 'rgb(239,68,68)' : 'rgba(239,68,68,0.35)' }} />
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-gray-600 mt-1"><span>30 min ago</span><span>Now</span></div>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Donations', value: 'EUR 120.00', icon: '??', color: 'rgb(0,229,186)' },
          { label: 'Super Chats', value: 'EUR 150.00', icon: '??', color: 'rgb(251,191,36)' },
          { label: 'New Subs', value: '2 x EUR 5.99', icon: '??', color: 'rgb(196,132,252)' },
        ].map(r => (
          <div key={r.label} className="p-4 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-xl mb-1">{r.icon}</div>
            <div className="font-black text-sm text-white">{r.value}</div>
            <div className="text-gray-500 text-[10px] mt-0.5">{r.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthTab() {
  const [bitrate, setBitrate] = React.useState(6.2);
  const [fps, setFps] = React.useState(60);
  const [dropped, setDropped] = React.useState(0.1);
  const [latency, setLatency] = React.useState(14);

  React.useEffect(() => {
    const t = setInterval(() => {
      setBitrate(b => Math.max(4.5, Math.min(8.0, b + (Math.random() - 0.5) * 0.3)));
      setDropped(d => Math.max(0, Math.min(2, d + (Math.random() - 0.7) * 0.1)));
      setLatency(l => Math.max(10, Math.min(30, l + Math.round((Math.random() - 0.5) * 3))));
    }, 2000);
    return () => clearInterval(t);
  }, []);

  const bitrateHistory = [5.8, 6.0, 6.1, 6.3, 6.2, 6.4, 6.2, 6.3, 6.1, 6.4, 6.2, bitrate];

  const health = dropped < 0.5 && bitrate > 5 && latency < 20 ? 'Excellent' : dropped < 1 ? 'Good' : 'Poor';
  const healthColor = health === 'Excellent' ? 'rgb(0,229,186)' : health === 'Good' ? 'rgb(251,191,36)' : 'rgb(239,68,68)';

  return (
    <div className="space-y-5">
      {/* Overall Health */}
      <div className="p-5 rounded-2xl flex items-center gap-5" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${healthColor}30` }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: `${healthColor}15`, border: `1px solid ${healthColor}30` }}>
          {health === 'Excellent' ? 'OK' : health === 'Good' ? 'Warn' : 'Poor'}
        </div>
        <div>
          <p className="text-white font-black text-xl">{health}</p>
          <p className="text-gray-400 text-xs">Stream health  Updated every 2s</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-white font-bold text-sm">1080p60</p>
          <p className="text-gray-500 text-xs">Output quality</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Bitrate', value: `${bitrate.toFixed(1)} Mb/s`, icon: '??', good: bitrate > 5, color: bitrate > 5 ? 'rgb(0,229,186)' : 'rgb(239,68,68)' },
          { label: 'FPS', value: `${fps} fps`, icon: '??', good: fps >= 60, color: fps >= 60 ? 'rgb(0,229,186)' : 'rgb(251,191,36)' },
          { label: 'Dropped Frames', value: `${dropped.toFixed(1)}%`, icon: 'Drop', good: dropped < 0.5, color: dropped < 0.5 ? 'rgb(0,229,186)' : dropped < 1 ? 'rgb(251,191,36)' : 'rgb(239,68,68)' },
          { label: 'Latency', value: `${latency}ms`, icon: 'Ping', good: latency < 20, color: latency < 20 ? 'rgb(0,229,186)' : latency < 25 ? 'rgb(251,191,36)' : 'rgb(239,68,68)' },
        ].map((m, i) => (
          <motion.div key={m.label} animate={{ borderColor: m.good ? 'rgba(0,229,186,0.2)' : 'rgba(239,68,68,0.2)' }} transition={{ duration: 0.5 }} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-xl mb-1">{m.icon}</div>
            <motion.div key={m.value} initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} className="font-black text-xl" style={{ color: m.color }}>{m.value}</motion.div>
            <div className="text-gray-500 text-[10px] mt-0.5">{m.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Bitrate Graph */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-sm">Bitrate History</h3>
          <span className="text-[10px] font-bold" style={{ color: 'rgb(0,229,186)' }}>{bitrate.toFixed(1)} Mb/s now</span>
        </div>
        <div className="flex items-end gap-1.5 h-20">
          {bitrateHistory.map((b, i) => (
            <motion.div key={i} animate={{ height: `${(b / 8.5) * 100}%` }} transition={{ duration: 0.5 }} className="flex-1 rounded-t-sm" style={{ background: i === bitrateHistory.length - 1 ? 'rgb(0,229,186)' : 'rgba(0,229,186,0.35)' }} />
          ))}
        </div>
      </div>

      {/* Stream Key */}
      <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <p className="text-gray-400 text-xs mb-2">Stream Key (keep private)</p>
        <div className="flex items-center gap-2">
          <code className="flex-1 text-xs font-mono text-white px-3 py-2 rounded-xl" style={{ background: 'rgba(0,0,0,0.3)' }}>{STREAM_KEY}</code>
          <button className="px-3 py-2 rounded-xl text-[10px] font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>Copy</button>
          <button className="px-3 py-2 rounded-xl text-[10px] font-bold transition-all" style={{ background: 'rgba(239,68,68,0.08)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.15)' }}>Reset</button>
        </div>
      </div>
    </div>
  );
}

function ChatModerationTab() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(SEED_CHAT);
  const [chatInput, setChatInput] = React.useState('');
  const [slowMode, setSlowMode] = React.useState(false);
  const [subsOnly, setSubsOnly] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);
  const msgIdRef = React.useRef(200);

  React.useEffect(() => {
    const t = setInterval(() => {
      const bot = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
      msgIdRef.current += 1;
      const now = new Date();
      setMessages(prev => [...prev.slice(-40), { id: msgIdRef.current, user: bot.user, msg: bot.msg, time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`, color: bot.color, isMod: bot.isMod }]);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const deleteMsg = (id: number) => setMessages(prev => prev.map(m => m.id === id ? { ...m, deleted: true } : m));
  const pinMsg = (id: number) => setMessages(prev => prev.map(m => m.id === id ? { ...m, pinned: !m.pinned } : m));

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    msgIdRef.current += 1;
    const now = new Date();
    setMessages(prev => [...prev, { id: msgIdRef.current, user: 'Moderator', msg: chatInput.trim(), time: `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`, color: 'rgb(239,68,68)', isMod: true }]);
    setChatInput('');
  };

  const pinned = messages.find(m => m.pinned && !m.deleted);

  return (
    <div className="space-y-4">
      {/* Moderation Controls */}
      <div className="p-4 rounded-2xl flex flex-wrap items-center gap-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <span className="text-white text-xs font-bold">Moderation</span>
        {[
          { label: 'Slow Mode', value: slowMode, set: setSlowMode },
          { label: 'Subs Only', value: subsOnly, set: setSubsOnly },
        ].map(ctrl => (
          <div key={ctrl.label} className="flex items-center gap-2">
            <span className="text-gray-400 text-xs">{ctrl.label}</span>
            <button onClick={() => ctrl.set(v => !v)} className="relative w-9 h-5 rounded-full transition-colors" style={{ background: ctrl.value ? 'rgba(239,68,68,0.8)' : 'rgba(255,255,255,0.1)' }} role="switch" aria-checked={ctrl.value}>
              <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform" style={{ transform: ctrl.value ? 'translateX(18px)' : 'translateX(2px)' }} />
            </button>
          </div>
        ))}
        <button onClick={() => setMessages([])} className="ml-auto px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all" style={{ background: 'rgba(239,68,68,0.1)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.2)' }}>Clear Chat</button>
      </div>

      {/* Pinned Message */}
      {pinned && (
        <div className="p-3 rounded-xl flex items-center gap-2" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
          <span className="text-[10px] font-bold" style={{ color: 'rgb(251,191,36)' }}>?? Pinned</span>
          <span className="text-white text-xs flex-1">{pinned.msg}</span>
          <button onClick={() => pinMsg(pinned.id)} className="text-gray-500 hover:text-white text-[10px]">Unpin</button>
        </div>
      )}

      {/* Chat Feed */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', height: '360px', display: 'flex', flexDirection: 'column' }}>
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
          {messages.filter(m => !m.deleted).map(msg => (
            <div key={msg.id} className="flex items-start gap-2 group hover:bg-white/[0.02] rounded-lg px-1.5 py-1 transition-colors">
              <span className="text-[10px] text-gray-600 flex-shrink-0 mt-0.5">{msg.time}</span>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold" style={{ color: msg.color }}>{msg.isMod ? '?? ' : ''}{msg.user}</span>
                <span className="text-gray-400 text-[10px]">: </span>
                <span className="text-white text-[10px] leading-relaxed">{msg.msg}</span>
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button onClick={() => pinMsg(msg.id)} className="text-[9px] text-gray-500 hover:text-yellow-400 transition-colors">??</button>
                <button onClick={() => deleteMsg(msg.id)} className="text-[9px] text-gray-500 hover:text-red-400 transition-colors">Delete</button>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form onSubmit={handleSend} className="flex gap-2 p-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <input value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Send mod message..." className="flex-1 bg-transparent text-white text-xs placeholder-gray-600 outline-none px-2" aria-label="Chat message" />
          <button type="submit" className="px-3 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(239,68,68,0.8)', color: 'white' }}>Send</button>
        </form>
      </div>
    </div>
  );
}

function ScheduleTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-bold text-sm">Upcoming Streams</h3>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          Schedule Stream
        </button>
      </div>
      <div className="space-y-3">
        {SCHEDULED.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-center flex-shrink-0" style={{ minWidth: 48 }}>
              <div className="text-white font-black text-lg leading-none">{s.date.split(',')[0].split(' ')[1]}</div>
              <div className="text-gray-500 text-[10px]">{s.date.split(' ')[0]}</div>
            </div>
            <div className="w-px h-10 self-stretch" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold truncate">{s.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-gray-500 text-xs">{s.time}</span>
                <span className="text-gray-600 text-[10px]"></span>
                <span className="text-gray-500 text-xs">{s.estimated}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: 'rgba(0,229,186,0.08)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.15)' }}>{s.category}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button className="text-gray-500 hover:text-white text-[10px] transition-colors">Edit</button>
              <button className="text-gray-500 hover:text-red-400 text-[10px] transition-colors">Cancel</button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function VODsTab() {
  const [vods, setVods] = React.useState<VOD[]>(VODS);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-bold text-sm">Past Broadcasts</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>Auto-save VODs</span>
          <div className="w-2 h-2 rounded-full" style={{ background: 'rgb(0,229,186)' }} />
          <span style={{ color: 'rgb(0,229,186)' }}>On</span>
        </div>
      </div>
      <div className="space-y-3">
        {vods.map((vod, i) => (
          <motion.div key={vod.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={contentImages.live[vod.imageIdx % contentImages.live.length].url} alt={vod.title} fill sizes="96px" className="object-cover" />
              <div className="absolute bottom-1 right-1 text-[9px] font-bold text-white px-1 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.8)' }}>{vod.duration}</div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold truncate">{vod.title}</p>
              <p className="text-gray-500 text-[10px]">{vod.date}  {vod.views} views</p>
              <div className="flex items-center gap-2 mt-1">
                {vod.autoSave ? <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(0,229,186,0.08)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.15)' }}>?? Auto-saved</span>
                  : <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }}>Not saved</span>
                }
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-shrink-0">
              <Link href={getWatchHref(getLiveWatchId(vod.id))} className="px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all text-center" style={{ background: 'rgba(0,229,186,0.1)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.2)' }}>Watch</Link>
              <button onClick={() => setVods(prev => prev.map(v => v.id === vod.id ? { ...v, autoSave: !v.autoSave } : v))} className="px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>
                {vod.autoSave ? 'Unsave' : 'Save VOD'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RevenueTab() {
  const total = DONATIONS.reduce((s, d) => {
    const num = parseFloat(d.amount.replace('EUR ', '').replace('/mo', ''));
    return s + num;
  }, 0);

  return (
    <div className="space-y-5">
      {/* Revenue Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Today\'s Revenue', value: `EUR ${total.toFixed(2)}`, icon: '??', color: 'rgb(251,191,36)' },
          { label: 'This Month', value: 'EUR 2,840', icon: '??', color: 'rgb(0,229,186)' },
          { label: 'Super Chats', value: 'EUR 150', icon: '??', color: 'rgb(251,191,36)' },
          { label: 'Subscriptions', value: 'EUR 11.98', icon: '??', color: 'rgb(196,132,252)' },
        ].map(r => (
          <div key={r.label} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-xl mb-1">{r.icon}</div>
            <div className="font-black text-lg text-white">{r.value}</div>
            <div className="text-gray-500 text-[10px] mt-0.5">{r.label}</div>
          </div>
        ))}
      </div>

      {/* Events Feed */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm mb-4">Recent Events</h3>
        <div className="space-y-3">
          {DONATIONS.map((d, i) => {
            const tc = typeConfig[d.type];
            return (
              <motion.div key={d.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: tc.bg, border: `1px solid ${tc.border}` }}>
                <span className="text-lg flex-shrink-0">{tc.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white text-xs font-bold">{d.user}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ color: tc.color, background: 'rgba(0,0,0,0.2)' }}>{tc.label}</span>
                    <span className="text-gray-600 text-[9px] ml-auto">{d.time}</span>
                  </div>
                  <span className="font-black text-sm" style={{ color: tc.color }}>{d.amount}</span>
                  {d.message && <p className="text-gray-300 text-[10px] mt-0.5 leading-snug">{d.message}</p>}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Payout */}
      <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)' }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-bold">Next Payout (Stripe Connect)</p>
            <p className="text-gray-400 text-xs mt-0.5">EUR 2,840.00  Due Mar 31, 2026</p>
          </div>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(0,229,186,0.1)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.2)' }}>Stripe Connected</span>
        </div>
      </div>
    </div>
  );
}

const TABS: { id: LiveTab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '??' },
  { id: 'health', label: 'Stream Health', icon: '??' },
  { id: 'chat', label: 'Chat Mod', icon: '??' },
  { id: 'schedule', label: 'Schedule', icon: '??' },
  { id: 'vods', label: 'VODs', icon: '??' },
  { id: 'revenue', label: 'Revenue', icon: '??' },
];

export default function LiveDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<LiveTab>('overview');
  const [showGoLiveWizard, setShowGoLiveWizard] = React.useState(false);
  const [wizardStep, setWizardStep] = React.useState(1);
  const [streamTitle, setStreamTitle] = React.useState('');
  const [streamCategory, setStreamCategory] = React.useState('');

  const handleGoLiveOpen = () => { setShowGoLiveWizard(true); setWizardStep(1); };
  const handleGoLiveClose = () => setShowGoLiveWizard(false);

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ background: '#0A0F18' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute rounded-full" style={{ width: '600px', height: '600px', top: '-20%', right: '-8%', background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)', filter: 'blur(70px)' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 13, repeat: Infinity }} />
        <motion.div className="absolute rounded-full" style={{ width: '400px', height: '400px', bottom: '-10%', left: '-5%', background: 'radial-gradient(circle, rgba(0,229,186,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 4 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <motion.div className="flex flex-wrap items-center justify-between gap-4 mb-7" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.4), rgba(251,146,60,0.3))', border: '1px solid rgba(239,68,68,0.3)' }}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" /></svg>
            </div>
            <div>
              <h1 className="text-white font-black text-2xl">Live Dashboard</h1>
              <p className="text-gray-500 text-xs">Stream Management  ZStream Live</p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <CarbonOffsetCounter />
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleGoLiveOpen} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black" style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}>
              <motion.div className="w-2 h-2 rounded-full bg-white" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }} />
              Go Live
            </motion.button>
            <Link href="/live">
              <button className="px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>Browse Live</button>
            </Link>
          </div>
        </motion.div>

        {/* Tab Nav */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1" role="tablist">
          {TABS.map(t => (
            <button key={t.id} role="tab" aria-selected={activeTab === t.id} onClick={() => setActiveTab(t.id)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0" style={activeTab === t.id ? { background: 'rgba(239,68,68,0.15)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.3)' } : { background: 'transparent', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.16 }}>
            {activeTab === 'overview' && <OverviewTab onGoLive={handleGoLiveOpen} />}
            {activeTab === 'health' && <HealthTab />}
            {activeTab === 'chat' && <ChatModerationTab />}
            {activeTab === 'schedule' && <ScheduleTab />}
            {activeTab === 'vods' && <VODsTab />}
            {activeTab === 'revenue' && <RevenueTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Go Live Wizard Modal */}
      <AnimatePresence>
        {showGoLiveWizard && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={handleGoLiveClose} />
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} className="relative w-full max-w-md rounded-3xl p-6" style={{ background: 'rgba(10,15,24,0.98)', border: '1px solid rgba(239,68,68,0.3)', backdropFilter: 'blur(24px)' }}>
              <button onClick={handleGoLiveClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" aria-label="Close">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="flex items-center gap-2 mb-5">
                <motion.div className="w-2.5 h-2.5 rounded-full bg-red-500" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                <h2 className="text-white font-black text-lg">Go Live Setup</h2>
                <span className="text-gray-500 text-xs ml-auto">Step {wizardStep}/3</span>
              </div>

              {wizardStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-xs block mb-1.5">Stream Title <span className="text-red-400">*</span></label>
                    <input value={streamTitle} onChange={e => setStreamTitle(e.target.value)} placeholder="What are you streaming today ? " className="w-full bg-transparent border rounded-xl px-3 py-2.5 text-white text-sm outline-none" style={{ borderColor: streamTitle ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.12)' }} />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs block mb-1.5">Category</label>
                    <select value={streamCategory} onChange={e => setStreamCategory(e.target.value)} className="w-full border rounded-xl px-3 py-2.5 text-white text-xs outline-none" style={{ background: 'rgba(10,15,24,0.98)', borderColor: 'rgba(255,255,255,0.12)' }}>
                      <option value="">Select category...</option>
                      {['Gaming', 'Music', 'Talk Show', 'Events', 'Sports', 'DIY / Tech', 'Nature & Outdoor'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="space-y-4">
                  <p className="text-gray-400 text-xs mb-1">Thumbnail</p>
                  <div className="border-2 border-dashed rounded-2xl flex items-center justify-center h-28 cursor-pointer" style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                    <div className="text-center">
                      <p className="text-gray-500 text-xs">Upload stream thumbnail</p>
                      <p className="text-gray-600 text-[10px] mt-0.5">or auto-generate from stream</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1.5">Stream Key</p>
                    <code className="block text-xs font-mono text-gray-400 px-3 py-2 rounded-xl" style={{ background: 'rgba(0,0,0,0.3)' }}>{STREAM_KEY}</code>
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {[
                      { label: 'Title', value: streamTitle || '-' },
                      { label: 'Category', value: streamCategory || '-' },
                      { label: 'Quality', value: '1080p60  Auto' },
                      { label: 'Carbon Offset', value: '?? Auto (Ecologi)' },
                    ].map(r => (
                      <div key={r.label} className="flex justify-between text-xs">
                        <span className="text-gray-500">{r.label}</span>
                        <span className="text-white font-semibold">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {wizardStep > 1 && <button onClick={() => setWizardStep((s) => (Math.max(1, s - 1) as 1 | 2 | 3))} className="flex-1 py-2.5 rounded-xl text-xs font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.1)' }}>Back</button>}
                {wizardStep < 3 ? <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setWizardStep((s) => (Math.min(3, s + 1) as 1 | 2 | 3))} disabled={wizardStep === 1 && !streamTitle.trim()} className="flex-1 py-2.5 rounded-xl text-xs font-bold disabled:opacity-40" style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}>Continue</motion.button>
                  : <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handleGoLiveClose} className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black" style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}>
                      <motion.div className="w-2 h-2 rounded-full bg-white" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                      Start Streaming
                    </motion.button>
                }
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}



