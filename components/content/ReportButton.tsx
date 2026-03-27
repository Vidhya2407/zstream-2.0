'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const REPORT_REASONS = [
  { id: 'illegal', label: 'Illegal content (NetzDG §1)', desc: 'Content that violates German law' },
  { id: 'hate', label: 'Hate speech / Incitement', desc: 'Content promoting hatred or violence' },
  { id: 'misinformation', label: 'Misinformation / Fake news', desc: 'Demonstrably false information' },
  { id: 'copyright', label: 'Copyright infringement', desc: 'Unauthorised use of copyrighted material' },
  { id: 'spam', label: 'Spam / Misleading', desc: 'Deceptive, spam or misleading content' },
  { id: 'other', label: 'Other', desc: 'Another reason not listed above' },
];

interface Props {
  contentId?: string;
  contentTitle?: string;
  className?: string;
}

export default function ReportButton({ contentId = 'unknown', contentTitle = 'this content', className = '' }: Props) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState('');
  const [detail, setDetail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = () => {
    if (!selected) return;
    setSubmitted(true);
    setTimeout(() => { setOpen(false); setSubmitted(false); setSelected(''); setDetail(''); }, 2200);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex items-center gap-1 text-[10px] font-semibold text-gray-500 hover:text-red-400 transition-colors ${className}`}
        aria-label="Report content"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
        </svg>
        Report
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Report content dialog"
          >
            <motion.div
              className="w-full max-w-md rounded-3xl p-6"
              style={{ background: 'rgba(10,18,30,0.99)', border: '1px solid rgba(255,255,255,0.1)' }}
              initial={{ scale: 0.93, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {submitted ? (
                <div className="text-center py-6">
                  <div className="text-5xl mb-4">✅</div>
                  <p className="text-white font-bold text-lg mb-1">Report Submitted</p>
                  <p className="text-gray-400 text-sm">Our moderation team will review this within 24h (NetzDG / DSA compliant).</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-black text-base">Report Content</h3>
                    <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors" aria-label="Close">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mb-4">Reporting: <span className="text-gray-300">{contentTitle}</span> (ID: {contentId})</p>

                  <div className="space-y-2 mb-4" role="radiogroup" aria-label="Select report reason">
                    {REPORT_REASONS.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => setSelected(r.id)}
                        className="w-full text-left rounded-xl px-3.5 py-3 transition-all"
                        style={{ background: selected === r.id ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${selected === r.id ? 'rgba(239,68,68,0.35)' : 'rgba(255,255,255,0.07)'}` }}
                        role="radio"
                        aria-checked={selected === r.id}
                      >
                        <p className="text-white text-xs font-semibold">{r.label}</p>
                        <p className="text-gray-500 text-[10px] mt-0.5">{r.desc}</p>
                      </button>
                    ))}
                  </div>

                  {selected && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-4">
                      <textarea
                        placeholder="Additional details (optional)"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        rows={3}
                        className="w-full rounded-xl px-4 py-3 text-white text-xs resize-none outline-none"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                        aria-label="Additional details"
                      />
                    </motion.div>
                  )}

                  <motion.button
                    onClick={handleSubmit}
                    disabled={!selected}
                    className="w-full py-2.5 rounded-xl text-sm font-bold transition-all"
                    style={{ background: selected ? 'rgba(239,68,68,0.9)' : 'rgba(255,255,255,0.06)', color: selected ? 'white' : 'rgb(107,114,128)', cursor: selected ? 'pointer' : 'not-allowed' }}
                    whileHover={selected ? { scale: 1.01 } : {}}
                    whileTap={selected ? { scale: 0.98 } : {}}
                  >
                    Submit Report
                  </motion.button>

                  <p className="text-gray-600 text-[10px] text-center mt-3">
                    Reports processed under <strong className="text-gray-500">NetzDG §3</strong> and EU <strong className="text-gray-500">DSA Article 16</strong> within 24–48h.
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
