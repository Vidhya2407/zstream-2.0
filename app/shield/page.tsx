'use client';

import { motion } from 'framer-motion';
import ZstreamShieldPanel from '../../components/shield/ZstreamShieldPanel';

const pillars = [
  {
    title: 'Fingerprinting',
    body: 'Uploads can receive a content DNA signature so reposts and copies are easier to detect and review.',
  },
  {
    title: 'Blockchain Proof',
    body: 'Proof-ready ownership and publish records can be timestamped for creator trust and dispute support.',
  },
  {
    title: 'Invisible Watermarking',
    body: 'Streams can include non-visible tracing signals to help track leaked or reposted copies.',
  },
  {
    title: 'AI Safety Screening',
    body: 'Uploads can be checked for manipulation risk, tampering, and deepfake-style warning signals.',
  },
];

const safeForUsers = [
  'Protected by ZSTREAM Shield',
  'Fingerprint active',
  'Blockchain proof available',
  'Invisible watermark enabled',
  'AI safety screening monitored',
  'Viewer report path available',
];

export default function ShieldPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, #eef6f7 0%, #f8fbfc 46%, #eef7f2 100%)' }}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2rem] border px-6 py-8 sm:px-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(239,248,247,0.92))',
            borderColor: 'rgba(15,23,42,0.08)',
            boxShadow: '0 20px 60px rgba(15,23,42,0.08)',
          }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: '#64748b' }}>
            ZSTREAM Shield
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl" style={{ color: '#0f172a' }}>
            Public protection signals for creators, viewers, and brand partners.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed sm:text-base" style={{ color: '#475569' }}>
            ZSTREAM Shield is the user-facing trust layer for content protection. It surfaces the parts of our
            protection stack that are meaningful to viewers and creators, while keeping internal enforcement and
            legal operations out of the public experience.
          </p>

          <div className="mt-6">
            <ZstreamShieldPanel
              light
              mode="viewer"
              title="What users can see"
              subtitle="These are the trust signals we can safely display across watch pages, creator surfaces, and public product pages."
              metrics={[
                { label: 'Viewer-facing', value: 'Trust status', detail: 'High-level signals only, no internal review data.' },
                { label: 'Creator-facing', value: 'Protection summary', detail: 'Upload and proof status can be shown inside Studio.' },
                { label: 'Internal-only', value: 'Ops dashboards', detail: 'Queues, cases, notices, and provider routing stay private.' },
              ]}
            />
          </div>
        </motion.section>

        <section className="mt-8 grid gap-4 lg:grid-cols-2">
          {pillars.map((pillar, index) => (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-3xl border p-6"
              style={{ background: 'rgba(255,255,255,0.88)', borderColor: 'rgba(15,23,42,0.08)' }}
            >
              <h2 className="text-lg font-bold" style={{ color: '#0f172a' }}>{pillar.title}</h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: '#475569' }}>{pillar.body}</p>
            </motion.article>
          ))}
        </section>

        <section className="mt-8 rounded-[2rem] border p-6 sm:p-8" style={{ background: 'rgba(255,255,255,0.9)', borderColor: 'rgba(15,23,42,0.08)' }}>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-2xl font-black tracking-tight" style={{ color: '#0f172a' }}>
                Where this belongs in the product
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed" style={{ color: '#475569' }}>
                <p><strong style={{ color: '#0f172a' }}>/watch and /ztube/watch</strong> can show protection status near playback and title details.</p>
                <p><strong style={{ color: '#0f172a' }}>/ztube/studio</strong> can show creator protection totals, proof-ready uploads, and review status.</p>
                <p><strong style={{ color: '#0f172a' }}>/ztube/studio/upload</strong> can explain what Shield prepares automatically when a creator publishes.</p>
                <p><strong style={{ color: '#0f172a' }}>/dashboard</strong> can show a compact account-level trust summary without exposing internal ops.</p>
              </div>
            </div>

            <div className="rounded-3xl p-5" style={{ background: 'rgba(15,23,42,0.03)', border: '1px solid rgba(15,23,42,0.06)' }}>
              <h3 className="text-sm font-bold uppercase tracking-[0.24em]" style={{ color: '#64748b' }}>
                Safe public labels
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {safeForUsers.map((item) => (
                  <span
                    key={item}
                    className="rounded-full px-3 py-1.5 text-[11px] font-semibold"
                    style={{ background: 'rgba(0,229,186,0.1)', color: '#0f766e', border: '1px solid rgba(0,229,186,0.18)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
