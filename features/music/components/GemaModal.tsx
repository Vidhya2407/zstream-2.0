import { AnimatePresence, motion } from 'framer-motion';

interface GemaModalProps {
  isLight: boolean;
  isOpen: boolean;
  pageTextPrimary: string;
  onClose: () => void;
  title: string;
  understoodLabel: string;
}

export default function GemaModal({ isLight, isOpen, onClose, pageTextPrimary, title, understoodLabel }: GemaModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-6" exit={{ opacity: 0 }} initial={{ opacity: 0 }} onClick={onClose} style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)' }}>
          <motion.div animate={{ scale: 1, y: 0 }} className="relative max-w-lg w-full rounded-3xl p-7" exit={{ scale: 0.92, y: 20 }} initial={{ scale: 0.92, y: 20 }} onClick={(event) => event.stopPropagation()} style={{ background: isLight ? 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))' : 'linear-gradient(135deg, rgba(15,25,40,0.98), rgba(10,18,30,0.98))', border: '1px solid rgba(251,191,36,0.25)' }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(251,191,36,0.12)' }}>
                <svg className="w-5 h-5" fill="none" stroke="rgb(251,191,36)" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h2 className="font-black text-lg" style={{ color: pageTextPrimary }}>{title}</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: isLight ? '#334155' : '#d1d5db' }}>
              <p>All music content streamed on ZSTREAM is licensed under GEMA for the German territory.</p>
              <p>ZSTREAM holds licensing agreements covering streamed music and rights distribution for Germany.</p>
              <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
                <p className="text-[11px] text-gray-400"><span className="text-amber-300 font-semibold">GEMA membership:</span> ZSTREAM-DE-2024-00847</p>
                <p className="text-[11px] text-gray-400"><span className="text-amber-300 font-semibold">License type:</span> Online Streaming | VR-OD 2.0</p>
                <p className="text-[11px] text-gray-400"><span className="text-amber-300 font-semibold">Valid until:</span> 31 December 2025</p>
                <p className="text-[11px] text-gray-400"><span className="text-amber-300 font-semibold">Territory:</span> Germany, Austria, Switzerland</p>
              </div>
              <p className="text-[11px] text-gray-500">For licensing questions, contact <span className="text-amber-300">licensing@zstream.io</span>.</p>
            </div>
            <motion.button className="mt-6 w-full py-2.5 rounded-xl text-sm font-semibold" onClick={onClose} style={{ background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.2)', color: 'rgb(251,191,36)' }} whileHover={{ scale: 1.02 }}>
              {understoodLabel}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


