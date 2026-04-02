'use client';

import Link from 'next/link';

interface PlaybackProtectionCardProps {
  isLight?: boolean;
  isGerman?: boolean;
  sessionId: string;
  sessionExpiresIn: string;
  compact?: boolean;
}

export default function PlaybackProtectionCard({
  isLight = false,
  isGerman = false,
  sessionId,
  sessionExpiresIn,
  compact = false,
}: PlaybackProtectionCardProps) {
  const panelBg = isLight ? 'rgba(255,255,255,0.84)' : 'rgba(255,255,255,0.03)';
  const panelBorder = isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.08)';
  const title = isLight ? '#0f172a' : '#ffffff';
  const body = isLight ? '#475569' : '#cbd5e1';
  const muted = isLight ? '#64748b' : '#94a3b8';
  const soft = isLight ? 'rgba(15,23,42,0.03)' : 'rgba(255,255,255,0.03)';

  return (
    <section
      className={`rounded-2xl ${compact ? 'p-4' : 'p-5'}`}
      style={{
        background: panelBg,
        border: panelBorder,
        boxShadow: isLight ? '0 16px 36px rgba(15,23,42,0.07)' : 'none',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: muted }}>
            {isGerman ? 'Wiedergabeschutz' : 'Playback Protection'}
          </p>
          <h3 className="mt-2 text-sm font-black sm:text-base" style={{ color: title }}>
            {isGerman ? 'Dieses Playback ist geschützt' : 'This playback is protected'}
          </h3>
          <p className="mt-1 text-xs leading-relaxed sm:text-sm" style={{ color: body }}>
            {isGerman
              ? 'Streaming und Downloads koennen mit deiner Account-ID verknuepft werden, um unautorisierte Weitergabe zu untersuchen und Creator zu schuetzen.'
              : 'Streams and downloads can be tied to your account ID so unauthorised sharing can be investigated and creators stay protected.'}
          </p>
        </div>
        <span
          className="rounded-full px-3 py-1.5 text-[11px] font-bold"
          style={{ background: 'rgba(0,229,186,0.1)', border: '1px solid rgba(0,229,186,0.2)', color: 'rgb(0,229,186)' }}
        >
          {isGerman ? 'Shield aktiv' : 'Shield active'}
        </span>
      </div>

      <div className={`mt-4 grid gap-3 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
        <div className="rounded-xl p-3" style={{ background: soft, border: panelBorder }}>
          <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: muted }}>
            {isGerman ? 'Sitzungs-ID' : 'Session ID'}
          </p>
          <p className="mt-2 font-mono text-sm font-bold" style={{ color: title }}>{sessionId}</p>
        </div>
        <div className="rounded-xl p-3" style={{ background: soft, border: panelBorder }}>
          <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: muted }}>
            {isGerman ? 'Ablauf' : 'Expires'}
          </p>
          <p className="mt-2 text-sm font-semibold" style={{ color: title }}>{sessionExpiresIn}</p>
        </div>
        <div className="rounded-xl p-3" style={{ background: soft, border: panelBorder }}>
          <p className="text-[11px] uppercase tracking-[0.2em]" style={{ color: muted }}>
            {isGerman ? 'Downloads' : 'Downloads'}
          </p>
          <p className="mt-2 text-sm font-semibold" style={{ color: title }}>
            {isGerman ? 'Nur auf diesem Gerät' : 'Device-bound only'}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Link
          href="/privacy-policy"
          className="rounded-xl px-4 py-2 text-sm font-bold"
          style={{ background: soft, border: panelBorder, color: body }}
        >
          {isGerman ? 'Datenschutz lesen' : 'Read privacy policy'}
        </Link>
        <span className="text-xs" style={{ color: muted }}>
          {isGerman ? 'Berichte und Konto-Sicherheit in /settings/security' : 'Reports and account safety live in /settings/security'}
        </span>
      </div>
    </section>
  );
}
