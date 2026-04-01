'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../../lib/images/unsplash';

type StudioTab = 'overview' | 'content' | 'analytics' | 'monetization' | 'community' | 'settings';

interface ContentRow {
  id: number;
  title: string;
  type: 'video' | 'music' | 'podcast' | 'mini';
  status: 'published' | 'draft' | 'processing';
  views: string;
  date: string;
  revenue: string;
  imageIdx: number;
}

const CONTENT_ROWS: ContentRow[] = [
  { id: 1, title: 'How Solar Panels Actually Work', type: 'video', status: 'published', views: '4.2M', date: 'Mar 16, 2026', revenue: 'EUR 1,240', imageIdx: 0 },
  { id: 2, title: 'Ocean Cleanup - Full Documentary', type: 'video', status: 'published', views: '8.7M', date: 'Mar 13, 2026', revenue: 'EUR 3,180', imageIdx: 1 },
  { id: 3, title: 'Zero Waste Kitchen in 30 Days', type: 'video', status: 'published', views: '2.1M', date: 'Mar 17, 2026', revenue: 'EUR 870', imageIdx: 0 },
  { id: 4, title: 'Climate Science Explained Simply', type: 'video', status: 'draft', views: '-', date: 'Mar 18, 2026', revenue: '-', imageIdx: 1 },
  { id: 5, title: 'Wind Turbine Farm - Inside Look', type: 'video', status: 'processing', views: '-', date: 'Mar 18, 2026', revenue: '-', imageIdx: 0 },
  { id: 6, title: 'Eco Beats: Solar Sessions Vol.3', type: 'music', status: 'published', views: '1.9M', date: 'Mar 14, 2026', revenue: 'EUR 640', imageIdx: 1 },
  { id: 7, title: 'EcoTech Weekly - Episode 84', type: 'podcast', status: 'published', views: '280K', date: 'Mar 15, 2026', revenue: 'EUR 210', imageIdx: 0 },
  { id: 8, title: '60-Second Climate Hack 🌿', type: 'mini', status: 'published', views: '2.4M', date: 'Mar 17, 2026', revenue: 'EUR 180', imageIdx: 0 },
  { id: 9, title: 'Zero Waste Kitchen - Quick Tip', type: 'mini', status: 'published', views: '1.1M', date: 'Mar 16, 2026', revenue: 'EUR 92', imageIdx: 1 },
  { id: 10, title: 'Solar Panel Install in 30s', type: 'mini', status: 'draft', views: '-', date: 'Mar 18, 2026', revenue: '-', imageIdx: 0 },
];

const PAYOUT_HISTORY = [
  { date: 'Feb 28, 2026', amount: 'EUR 4,821.00', status: 'paid', method: 'Stripe' },
  { date: 'Jan 31, 2026', amount: 'EUR 3,940.50', status: 'paid', method: 'Stripe' },
  { date: 'Dec 31, 2025', amount: 'EUR 5,112.80', status: 'paid', method: 'Stripe' },
  { date: 'Nov 30, 2025', amount: 'EUR 2,875.00', status: 'paid', method: 'Stripe' },
];

const OVERVIEW_STATS = [
  { label: 'Total Views', value: '17.2M', delta: '+12%', icon: '👁', color: 'rgb(0,229,186)' },
  { label: 'Watch Time', value: '284K hrs', delta: '+8%', icon: '', color: 'rgb(0,217,255)' },
  { label: 'Subscribers', value: '1.8M', delta: '+3.4K', icon: '🔔', color: 'rgb(239,68,68)' },
  { label: 'Revenue (MTD)', value: 'EUR 6,140', delta: '+18%', icon: '💶', color: 'rgb(251,191,36)' },
  { label: 'CO2 Saved', value: '12.4 t', delta: '+0.8 t', icon: '🌿', color: 'rgb(0,229,186)' },
  { label: 'Tip Jar', value: 'EUR 342', delta: '+EUR 48', icon: 'Tip', color: 'rgb(196,132,252)' },
];

const TOP_CONTENT = [
  { title: 'Ocean Cleanup Project', views: '8.7M', revenue: 'EUR 3,180', trend: '+24%', imageIdx: 1 },
  { title: 'How Solar Panels Work', views: '4.2M', revenue: 'EUR 1,240', trend: '+11%', imageIdx: 0 },
  { title: 'Climate Science Explained', views: '5.6M', revenue: 'EUR 2,010', trend: '+7%', imageIdx: 1 },
];

const CHART_BARS = [28, 42, 38, 55, 48, 62, 71, 58, 80, 74, 88, 95];
const CHART_MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

const TABS: { id: StudioTab; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'content', label: 'Content', icon: '🎬' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'monetization', label: 'Monetization', icon: '💶' },
  { id: 'community', label: 'Community', icon: '💬' },
  { id: 'settings', label: 'Settings', icon: 'Set' },
];

const statusConfig: Record<ContentRow['status'], { label: string; color: string; bg: string; border: string }> = {
  published: { label: 'Published', color: 'rgb(0,229,186)', bg: 'rgba(0,229,186,0.1)', border: 'rgba(0,229,186,0.25)' },
  draft: { label: 'Draft', color: 'rgb(156,163,175)', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)' },
  processing: { label: 'Processing', color: 'rgb(251,191,36)', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.25)' },
};

function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {OVERVIEW_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="text-white font-black text-lg leading-none">{s.value}</div>
            <div className="text-gray-500 text-[10px] mt-0.5">{s.label}</div>
            <div className="text-[10px] font-bold mt-1.5" style={{ color: s.color }}>{s.delta} this month</div>
          </motion.div>
        ))}
      </div>

      {/* Views Chart */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm mb-4">Views - Last 12 Months</h3>
        <div className="flex items-end gap-1.5 h-32">
          {CHART_BARS.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                className="w-full rounded-t-md"
                style={{ background: i === CHART_BARS.length - 1 ? 'rgb(239,68,68)' : 'rgba(239,68,68,0.35)' }}
              />
              <span className="text-[8px] text-gray-600">{CHART_MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performing Content */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm mb-4">Top Performing Content</h3>
        <div className="space-y-3">
          {TOP_CONTENT.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="relative w-16 h-10 rounded-lg overflow-hidden flex-shrink-0">
                <Image src={contentImages.abstract[item.imageIdx].url} alt={item.title} fill sizes="64px" className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">{item.title}</p>
                <p className="text-gray-500 text-[10px]">{item.views} views  {item.revenue}</p>
              </div>
              <span className="text-[10px] font-bold flex-shrink-0" style={{ color: 'rgb(0,229,186)' }}>{item.trend}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Carbon Impact */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🌍</span>
          <h3 className="text-white font-bold text-sm">Carbon Impact of Your Content</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total CO2 Saved', value: '12.4 t', sub: 'by all your viewers' },
            { label: 'Trees Equivalent', value: '562', sub: 'trees planted equivalent' },
            { label: 'Avg. Score', value: 'A+', sub: 'per stream efficiency' },
          ].map((m, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-black" style={{ color: 'rgb(0,229,186)' }}>{m.value}</div>
              <div className="text-white text-xs font-semibold mt-0.5">{m.label}</div>
              <div className="text-gray-500 text-[10px]">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContentTab({ onUpload }: { onUpload: () => void }) {
  const [rows, setRows] = React.useState<ContentRow[]>(CONTENT_ROWS);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [filterStatus, setFilterStatus] = React.useState<'all' | ContentRow['status']>('all');
  const [filterType, setFilterType] = React.useState<'all' | ContentRow['type']>('all');

  const filtered = rows.filter(r => {
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (filterType !== 'all' && r.type !== filterType) return false;
    return true;
  });

  const toggleSelect = (id: number) =>
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const deleteSelected = () => {
    setRows(r => r.filter(x => !selected.includes(x.id)));
    setSelected([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 flex-wrap">
          {(['all', 'published', 'draft', 'processing'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              className="px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all"
              style={filterStatus === f ? { background: 'rgba(239,68,68,0.15)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.3)' }
                : { background: 'rgba(255,255,255,0.05)', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {f === 'all' ? 'All Content' : f}
            </button>
          ))}
          <div className="w-px self-stretch" style={{ background: 'rgba(255,255,255,0.08)' }} />
          {(['all', 'video', 'music', 'podcast', 'mini'] as const).map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className="px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all"
              style={filterType === t ? { background: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' }
                : { background: 'rgba(255,255,255,0.05)', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {t === 'all' ? 'All Types' : t === 'mini' ? '📱 Mini' : t === 'video' ? '🎬 Video' : t === 'music' ? '🎵 Music' : '🎙 Podcast'}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && (
            <button onClick={deleteSelected} className="px-3 py-1.5 rounded-full text-xs font-bold transition-all" style={{ background: 'rgba(239,68,68,0.1)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.2)' }}>
              Delete ({selected.length})
            </button>
          )}
          <Link href="/ztube/studio/upload?type=mini">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold"
              style={{ background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' }}
            >
              📱 Upload Mini
            </motion.button>
          </Link>
          <Link href="/ztube/studio/upload">
            <motion.button
              onClick={onUpload}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold"
              style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Upload
            </motion.button>
          </Link>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <th className="px-4 py-3 text-left w-8">
                <input type="checkbox" className="accent-red-500" onChange={e => setSelected(e.target.checked ? filtered.map(r => r.id) : [])} checked={selected.length === filtered.length && filtered.length > 0} />
              </th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold">Content</th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold hidden md:table-cell">Type</th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold hidden lg:table-cell">Views</th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold hidden lg:table-cell">Revenue</th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold hidden md:table-cell">Date</th>
              <th className="px-4 py-3 text-left text-gray-400 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => {
              const sc = statusConfig[row.status];
              return (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="border-b transition-colors hover:bg-white/[0.02]"
                  style={{ borderColor: 'rgba(255,255,255,0.05)', background: selected.includes(row.id) ? 'rgba(239,68,68,0.04)' : undefined }}
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" className="accent-red-500" checked={selected.includes(row.id)} onChange={() => toggleSelect(row.id)} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-9 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={contentImages.abstract[row.imageIdx].url} alt={row.title} fill sizes="56px" className="object-cover" />
                      </div>
                      <span className="text-white font-medium truncate max-w-[140px]">{row.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-gray-400 capitalize">{row.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                      {sc.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{row.views}</td>
                  <td className="px-4 py-3 text-gray-400 hidden lg:table-cell">{row.revenue}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{row.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-gray-500 hover:text-white transition-colors" aria-label="Edit"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" /></svg></button>
                      <button className="text-gray-500 hover:text-red-400 transition-colors" aria-label="Delete" onClick={() => setRows(r => r.filter(x => x.id !== row.id))}><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg></button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AnalyticsTab() {
  const retention = [100, 92, 85, 80, 74, 68, 63, 59, 55, 52, 50, 48];
  const sources = [
    { label: 'ZTube Search', pct: 38, color: 'rgb(239,68,68)' },
    { label: 'Homepage', pct: 28, color: 'rgb(0,229,186)' },
    { label: 'External', pct: 18, color: 'rgb(0,217,255)' },
    { label: 'Subscriptions', pct: 16, color: 'rgb(196,132,252)' },
  ];
  const devices = [
    { label: 'Desktop', pct: 52 },
    { label: 'Mobile', pct: 34 },
    { label: 'Tablet', pct: 14 },
  ];
  const geos = [
    { country: '🇩🇪 Germany', pct: 28 },
    { country: '🇺🇸 USA', pct: 22 },
    { country: '🇬🇧 UK', pct: 14 },
    { country: 'France', pct: 10 },
    { country: '🌍 Other', pct: 26 },
  ];

  return (
    <div className="space-y-5">
      {/* Audience Retention */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm mb-4">Audience Retention</h3>
        <div className="flex items-end gap-1 h-24">
          {retention.map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${v}%` }}
                transition={{ delay: i * 0.04 }}
                className="w-full rounded-t-sm"
                style={{ background: `rgba(239,68,68,${0.3 + (v / 100) * 0.7})` }}
              />
              <span className="text-[8px] text-gray-600">{i === 0 ? '0%' : i === 11 ? '100%' : ''}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-[10px] mt-2">Avg. view duration: <strong className="text-white">7m 42s</strong>  Avg. retention: <strong className="text-white">62%</strong></p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Traffic Sources */}
        <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 className="text-white font-bold text-sm mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            {sources.map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">{s.label}</span>
                  <span className="text-white font-semibold">{s.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div className="h-full rounded-full" style={{ background: s.color }} initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ duration: 0.6 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geographic Breakdown */}
        <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <h3 className="text-white font-bold text-sm mb-4">Geographic Breakdown</h3>
          <div className="space-y-2.5">
            {geos.map(g => (
              <div key={g.country} className="flex items-center justify-between">
                <span className="text-gray-300 text-xs">{g.country}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div className="h-full rounded-full" style={{ background: 'rgba(239,68,68,0.7)' }} initial={{ width: 0 }} animate={{ width: `${g.pct}%` }} transition={{ duration: 0.6 }} />
                  </div>
                  <span className="text-white text-xs font-semibold w-8 text-right">{g.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Breakdown */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm mb-4">Device Breakdown</h3>
        <div className="flex gap-6">
          {devices.map(d => (
            <div key={d.label} className="text-center">
              <div className="text-2xl font-black text-white">{d.pct}%</div>
              <div className="text-gray-500 text-xs mt-0.5">{d.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MonetizationTab() {
  const [steuernummer, setSteuernummer] = React.useState('');

  return (
    <div className="space-y-5">
      {/* Revenue Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Ad Revenue (MTD)', value: 'EUR 5,798', icon: '📢', color: 'rgb(251,191,36)' },
          { label: 'Tip Jar Earnings', value: 'EUR 342', icon: 'Tip', color: 'rgb(196,132,252)' },
          { label: 'Pending Payout', value: 'EUR 6,140', icon: '', color: 'rgb(0,229,186)' },
          { label: 'Total Earned (YTD)', value: 'EUR 16,750', icon: '💰', color: 'rgb(239,68,68)' },
        ].map(m => (
          <div key={m.label} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-xl mb-1">{m.icon}</div>
            <div className="text-white font-black text-lg">{m.value}</div>
            <div className="text-gray-500 text-[10px] mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Payout History */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-sm">Payout History (Stripe Connect)</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(0,229,186,0.1)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.2)' }}>Stripe Connected</span>
        </div>
        <div className="space-y-2">
          {PAYOUT_HISTORY.map((p, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <div>
                <p className="text-white text-xs font-semibold">{p.amount}</p>
                <p className="text-gray-500 text-[10px]">{p.date}  {p.method}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(0,229,186,0.1)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.2)' }}>Paid</span>
            </div>
          ))}
        </div>
      </div>

      {/* German Tax - Steuernummer */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🇩🇪</span>
          <h3 className="text-white font-bold text-sm">German Tax Documents</h3>
        </div>
        <p className="text-gray-400 text-xs mb-4">Required for payouts in Germany ( 22a EStG / UStG). Your Steuernummer is kept encrypted and only shared with tax authorities.</p>
        <div className="space-y-3">
          <div>
            <label className="text-gray-400 text-xs block mb-1.5">Steuernummer <span className="text-red-400">*</span></label>
            <input
              value={steuernummer}
              onChange={e => setSteuernummer(e.target.value)}
              placeholder="e.g. 21/815/08150"
              className="w-full max-w-xs bg-transparent border rounded-xl px-3 py-2 text-white text-xs outline-none transition-colors"
              style={{ borderColor: steuernummer ? 'rgba(0,229,186,0.4)' : 'rgba(255,255,255,0.12)' }}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
            Upload Tax Document (PDF)
          </button>
        </div>
      </div>
    </div>
  );
}

function CommunityTab() {
  const [postText, setPostText] = React.useState('');
  const [pollQuestion, setPollQuestion] = React.useState('');
  const [activeType, setActiveType] = React.useState<'text' | 'poll'>('text');
  const [posts, setPosts] = React.useState<{ id: number; text: string; likes: number; time: string; type: 'text' | 'poll' }[]>([
    { id: 1, text: 'New video dropping this Friday - carbon capture in Antarctica!', likes: 2840, time: '1 day ago', type: 'text' },
    { id: 2, text: 'We hit 2 MILLION subscribers! Thank you for this green journey. 🌿', likes: 12400, time: '1 week ago', type: 'text' },
  ]);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    const text = activeType === 'text' ? postText : pollQuestion;
    if (!text.trim()) return;
    setPosts(prev => [{ id: Date.now(), text: text.trim(), likes: 0, time: 'Just now', type: activeType }, ...prev]);
    setPostText('');
    setPollQuestion('');
  };

  return (
    <div className="space-y-5">
      {/* Post Composer */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm mb-4">Create Post</h3>
        <div className="flex gap-2 mb-4">
          {(['text', 'poll'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className="px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all"
              style={activeType === t ? { background: 'rgba(239,68,68,0.15)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.3)' }
                : { background: 'rgba(255,255,255,0.05)', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              {t === 'text' ? '📝 Text Update' : '📊 Poll'}
            </button>
          ))}
        </div>
        <form onSubmit={handlePost} className="space-y-3">
          {activeType === 'text' ? (
            <textarea
              value={postText}
              onChange={e => setPostText(e.target.value)}
              placeholder="Share an update with your subscribers..."
              rows={3}
              className="w-full bg-transparent border rounded-xl px-3 py-2.5 text-white text-xs placeholder-gray-600 outline-none resize-none transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.12)' }}
            />
          ) : (
            <input
              value={pollQuestion}
              onChange={e => setPollQuestion(e.target.value)}
              placeholder="Poll question..."
              className="w-full bg-transparent border rounded-xl px-3 py-2.5 text-white text-xs placeholder-gray-600 outline-none transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.12)' }}
            />
          )}
          <div className="flex items-center gap-3">
            <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}>
              Publish
            </button>
            <button type="button" className="px-4 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }}>
              Schedule
            </button>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-3">
        {posts.map(post => (
          <div key={post.id} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden" style={{ border: '1px solid rgba(239,68,68,0.3)' }}>
                  <Image src={contentImages.creators[0].url} alt="Channel" width={28} height={28} className="object-cover" />
                </div>
                <span className="text-white text-xs font-bold">TechGreen Labs</span>
                <span className="text-gray-600 text-[10px]">{post.time}</span>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-white text-[10px] transition-colors">Edit</button>
                <button className="text-gray-500 hover:text-red-400 text-[10px] transition-colors" onClick={() => setPosts(p => p.filter(x => x.id !== post.id))}>Delete</button>
              </div>
            </div>
            <p className="text-gray-200 text-xs leading-relaxed">{post.text}</p>
            <p className="mt-2 text-gray-600 text-[10px]">d {post.likes.toLocaleString()} likes</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [channelName, setChannelName] = React.useState('TechGreen Labs');
  const [bio, setBio] = React.useState('Science-backed sustainability content. Solar, wind, carbon, and the green tech revolution.');
  const [customUrl, setCustomUrl] = React.useState('@techgreenlabs');
  const [notifyNewSub, setNotifyNewSub] = React.useState(true);
  const [notifyComment, setNotifyComment] = React.useState(true);
  const [notifyMilestone, setNotifyMilestone] = React.useState(true);
  const [saved, setSaved] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSave} className="space-y-5 max-w-2xl">
      {/* Channel Identity */}
      <div className="p-5 rounded-2xl space-y-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm">Channel Identity</h3>

        {/* Avatar + Banner */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0" style={{ border: '2px solid rgba(239,68,68,0.4)' }}>
            <Image src={contentImages.creators[0].url} alt="Avatar" fill sizes="64px" className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50 cursor-pointer">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
            </div>
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Channel Avatar</p>
            <p className="text-gray-500 text-[10px] mt-0.5">JPG, PNG or WebP  Max 2MB</p>
            <button type="button" className="mt-1.5 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all" style={{ background: 'rgba(239,68,68,0.1)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.2)' }}>Change Avatar</button>
          </div>
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1.5">Channel Name</label>
          <input value={channelName} onChange={e => setChannelName(e.target.value)} className="w-full bg-transparent border rounded-xl px-3 py-2 text-white text-xs outline-none transition-colors" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1.5">Description</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full bg-transparent border rounded-xl px-3 py-2 text-white text-xs outline-none resize-none transition-colors" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
        </div>
        <div>
          <label className="text-gray-400 text-xs block mb-1.5">Custom URL</label>
          <div className="flex items-center gap-0">
            <span className="px-3 py-2 rounded-l-xl text-xs text-gray-500" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRight: 'none' }}>ztube.zstream.com/</span>
            <input value={customUrl} onChange={e => setCustomUrl(e.target.value)} className="flex-1 bg-transparent border rounded-r-xl px-3 py-2 text-white text-xs outline-none" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-5 rounded-2xl space-y-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm">Notification Preferences</h3>
        {[
          { label: 'New subscriber', value: notifyNewSub, set: setNotifyNewSub },
          { label: 'Comment on my content', value: notifyComment, set: setNotifyComment },
          { label: 'Milestone reached (subscribers, views)', value: notifyMilestone, set: setNotifyMilestone },
        ].map(n => (
          <div key={n.label} className="flex items-center justify-between">
            <span className="text-gray-300 text-xs">{n.label}</span>
            <button
              type="button"
              onClick={() => n.set(v => !v)}
              className="relative w-10 h-5 rounded-full transition-colors flex-shrink-0"
              style={{ background: n.value ? 'rgba(239,68,68,0.8)' : 'rgba(255,255,255,0.1)' }}
              role="switch"
              aria-checked={n.value}
            >
              <span className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform" style={{ transform: n.value ? 'translateX(22px)' : 'translateX(2px)' }} />
            </button>
          </div>
        ))}
      </div>

      {/* DSGVO Export */}
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(0,128,255,0.05)', border: '1px solid rgba(0,128,255,0.15)' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">🇪🇺</span>
          <h3 className="text-white font-bold text-sm">DSGVO Data Export</h3>
        </div>
        <p className="text-gray-400 text-xs mb-3">Download all your channel data, analytics, and personal information as required by EU GDPR / German DSGVO.</p>
        <button type="button" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(0,128,255,0.1)', color: 'rgb(96,165,250)', border: '1px solid rgba(0,128,255,0.2)' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
          Export My Data
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}>
          Save Changes
        </button>
        <AnimatePresence>
          {saved && (
            <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-xs font-bold" style={{ color: 'rgb(0,229,186)' }}>
              Saved
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

export default function ZTubeStudioPage() {
  const [activeTab, setActiveTab] = React.useState<StudioTab>('overview');

  return (
    <main className="min-h-screen relative" style={{ background: '#0A0F18' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute rounded-full" style={{ width: '500px', height: '500px', top: '-15%', right: '-5%', background: 'radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 12, repeat: Infinity }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Header */}
        <motion.div className="flex items-center justify-between mb-7 flex-wrap gap-4" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.4), rgba(251,146,60,0.3))', border: '1px solid rgba(239,68,68,0.3)' }}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-black text-2xl">ZTube Studio</h1>
              <p className="text-gray-500 text-xs">Creator Dashboard  TechGreen Labs</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/ztube">
              <button className="px-4 py-2 rounded-xl text-xs font-bold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>
                Back to ZTube
              </button>
            </Link>
            <Link href="/ztube/studio/upload">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold"
                style={{ background: 'rgba(239,68,68,0.85)', color: 'white' }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                Upload Content
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Tab Nav */}
        <div className="flex gap-1 mb-7 overflow-x-auto pb-1" role="tablist" aria-label="Studio tabs">
          {TABS.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={activeTab === t.id}
              onClick={() => setActiveTab(t.id)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0"
              style={activeTab === t.id ? { background: 'rgba(239,68,68,0.15)', color: 'rgb(252,165,165)', border: '1px solid rgba(239,68,68,0.3)' }
                : { background: 'transparent', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }
              }
            >
              <span>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'content' && <ContentTab onUpload={() => {}} />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'monetization' && <MonetizationTab />}
            {activeTab === 'community' && <CommunityTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
