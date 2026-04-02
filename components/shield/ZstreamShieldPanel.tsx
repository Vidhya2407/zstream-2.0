'use client';

import Link from 'next/link';

type ShieldTone = 'good' | 'info';

interface ShieldSignal {
  label: string;
  value: string;
  detail?: string;
  tone?: ShieldTone;
}

interface ShieldMetric {
  label: string;
  value: string;
  detail?: string;
}

interface ZstreamShieldPanelProps {
  mode?: 'viewer' | 'creator' | 'summary';
  light?: boolean;
  title?: string;
  subtitle?: string;
  signals?: ShieldSignal[];
  metrics?: ShieldMetric[];
  compact?: boolean;
}

const defaultSignals: Record<'viewer' | 'creator' | 'summary', ShieldSignal[]> = {
  viewer: [
    { label: 'Content fingerprint', value: 'Active', detail: 'Unique content DNA is registered for matching.', tone: 'good' },
    { label: 'Blockchain proof', value: 'Timestamped', detail: 'Ownership and publish proof can be anchored on-chain.', tone: 'info' },
    { label: 'Invisible watermark', value: 'Enabled', detail: 'Playback can include non-visible origin tracing.', tone: 'good' },
    { label: 'AI safety screening', value: 'Monitored', detail: 'Uploads can be checked for tampering and deepfake risk.', tone: 'info' },
  ],
  creator: [
    { label: 'Fingerprinting', value: 'On by default', detail: 'New uploads are prepared for matching and proof generation.', tone: 'good' },
    { label: 'Blockchain queue', value: 'Ready', detail: 'Proof records can be anchored once publishing is complete.', tone: 'info' },
    { label: 'Watermark policy', value: 'Protected', detail: 'Creator uploads can carry invisible trace markers.', tone: 'good' },
    { label: 'Piracy monitoring', value: 'Live checks', detail: 'Suspected reposts can be reviewed and escalated.', tone: 'info' },
  ],
  summary: [
    { label: 'Fingerprinting', value: 'Enabled', tone: 'good' },
    { label: 'Watermarking', value: 'Enabled', tone: 'good' },
    { label: 'Blockchain proof', value: 'Available', tone: 'info' },
    { label: 'Review status', value: 'Monitored', tone: 'info' },
  ],
};

const defaultMetrics: Record<'viewer' | 'creator' | 'summary', ShieldMetric[]> = {
  viewer: [
    { label: 'Protection status', value: 'Shield active' },
    { label: 'Viewer report path', value: 'In-app reporting' },
  ],
  creator: [
    { label: 'Protected uploads', value: '184', detail: 'Titles prepared for fingerprinting, watermarking, and review.' },
    { label: 'Blockchain proofs', value: '173', detail: 'Published titles with proof-ready registration records.' },
    { label: 'Open reviews', value: '4', detail: 'Possible reposts or policy checks awaiting review.' },
    { label: 'Response target', value: '< 2 hrs', detail: 'Average first action for creator protection requests.' },
  ],
  summary: [
    { label: 'Protected titles', value: '184' },
    { label: 'Proof-ready', value: '173' },
  ],
};

function toneStyles(tone: ShieldTone, light: boolean) {
  if (tone === 'good') {
    return {
      pillBg: light ? 'rgba(16,185,129,0.12)' : 'rgba(0,229,186,0.12)',
      pillColor: light ? '#047857' : 'rgb(0,229,186)',
      pillBorder: light ? 'rgba(16,185,129,0.22)' : 'rgba(0,229,186,0.24)',
    };
  }

  return {
    pillBg: light ? 'rgba(59,130,246,0.12)' : 'rgba(96,165,250,0.12)',
    pillColor: light ? '#1d4ed8' : 'rgb(147,197,253)',
    pillBorder: light ? 'rgba(59,130,246,0.22)' : 'rgba(96,165,250,0.2)',
  };
}

export default function ZstreamShieldPanel({
  mode = 'viewer',
  light = false,
  title,
  subtitle,
  signals,
  metrics,
  compact = false,
}: ZstreamShieldPanelProps) {
  const panelBg = light ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.03)';
  const panelBorder = light ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.08)';
  const surface = light ? 'rgba(15,23,42,0.03)' : 'rgba(255,255,255,0.03)';
  const titleColor = light ? '#0f172a' : '#ffffff';
  const bodyColor = light ? '#475569' : '#cbd5e1';
  const mutedColor = light ? '#64748b' : '#94a3b8';
  const eyebrowColor = light ? '#64748b' : '#9ca3af';

  const resolvedTitle = title ?? (mode === 'creator' ? 'ZSTREAM Shield For Creators' : 'ZSTREAM Shield');
  const resolvedSubtitle = subtitle ?? (
    mode === 'creator'
      ? 'Your uploads can be fingerprinted, watermark protected, screened, and prepared for proof records without exposing internal enforcement operations.'
      : mode === 'summary'
        ? 'High-level protection signals that are safe to show publicly.'
        : 'This content can be protected with fingerprinting, invisible watermarks, blockchain proof records, and creator-safe monitoring.'
  );

  const resolvedSignals = signals ?? defaultSignals[mode];
  const resolvedMetrics = metrics ?? defaultMetrics[mode];

  return (
    <section
      className={`rounded-2xl ${compact ? 'p-4' : 'p-5'}`}
      style={{
        background: panelBg,
        border: panelBorder,
        boxShadow: light ? '0 18px 40px rgba(15,23,42,0.07)' : 'none',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: eyebrowColor }}>
            Protected Content
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl"
              style={{
                background: light ? 'rgba(0,229,186,0.12)' : 'rgba(0,229,186,0.1)',
                border: '1px solid rgba(0,229,186,0.22)',
                color: 'rgb(0,229,186)',
              }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7.5 3v6c0 4.73-3.07 8.81-7.5 10-4.43-1.19-7.5-5.27-7.5-10V6L12 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 12.75L11.25 14.25L14.5 10.75" />
              </svg>
            </span>
            <div>
              <h3 className="text-sm font-bold sm:text-base" style={{ color: titleColor }}>{resolvedTitle}</h3>
              <p className="text-[11px] leading-relaxed sm:text-xs" style={{ color: bodyColor }}>
                {resolvedSubtitle}
              </p>
            </div>
          </div>
        </div>
        <Link
          href="/shield"
          className="rounded-full px-3 py-1.5 text-[11px] font-bold transition-colors"
          style={{
            background: light ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.05)',
            border: light ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.1)',
            color: mutedColor,
          }}
        >
          Learn more
        </Link>
      </div>

      <div className={`mt-4 grid gap-3 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 xl:grid-cols-4'}`}>
        {resolvedSignals.map((signal) => {
          const tone = toneStyles(signal.tone ?? 'good', light);
          return (
            <div
              key={signal.label}
              className="rounded-xl p-3"
              style={{ background: surface, border: light ? '1px solid rgba(15,23,42,0.06)' : '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold" style={{ color: titleColor }}>{signal.label}</span>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold"
                  style={{ background: tone.pillBg, color: tone.pillColor, border: `1px solid ${tone.pillBorder}` }}
                >
                  {signal.value}
                </span>
              </div>
              {signal.detail && (
                <p className="mt-2 text-[11px] leading-relaxed" style={{ color: mutedColor }}>
                  {signal.detail}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {resolvedMetrics.length > 0 && (
        <div className={`mt-4 grid gap-3 ${resolvedMetrics.length > 2 ? 'sm:grid-cols-2 xl:grid-cols-4' : 'sm:grid-cols-2'}`}>
          {resolvedMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl p-3"
              style={{ background: surface, border: light ? '1px solid rgba(15,23,42,0.06)' : '1px solid rgba(255,255,255,0.06)' }}
            >
              <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: eyebrowColor }}>{metric.label}</p>
              <p className="mt-1 text-sm font-black" style={{ color: titleColor }}>{metric.value}</p>
              {metric.detail && <p className="mt-1 text-[11px] leading-relaxed" style={{ color: mutedColor }}>{metric.detail}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
