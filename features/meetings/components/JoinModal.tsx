'use client';

import { AnimatePresence, motion } from 'framer-motion';

interface JoinModalProps {
  inputBg: string;
  inputBorder: string;
  joinCode: string;
  joinLabel: string;
  onClose: () => void;
  onJoinCodeChange: (value: string) => void;
  onSubmit: () => void;
  pageTextPrimary: string;
  pageTextSecondary: string;
  show: boolean;
  surfaceBg: string;
  surfaceBorder: string;
  title: string;
}

export default function JoinModal({ inputBg, inputBorder, joinCode, joinLabel, onClose, onJoinCodeChange, onSubmit, pageTextPrimary, pageTextSecondary, show, surfaceBg, surfaceBorder, title }: JoinModalProps) {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <motion.div animate={{ opacity: 1 }} className="absolute inset-0 bg-dark-base/60 backdrop-blur-sm" exit={{ opacity: 0 }} initial={{ opacity: 0 }} onClick={onClose} />
          <motion.div animate={{ scale: 1, opacity: 1 }} className="relative z-10 w-full max-w-md rounded-3xl p-8 shadow-2xl" exit={{ scale: 0.9, opacity: 0 }} initial={{ scale: 0.9, opacity: 0 }} style={{ background: surfaceBg, border: `1px solid ${surfaceBorder}` }}>
            <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-black" style={{ color: pageTextPrimary }}>{title}</h2><button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-eco-green/10 text-eco-green" onClick={onClose}>X</button></div>
            <div className="space-y-4">
              <p className="text-sm" style={{ color: pageTextSecondary }}>Enter your secure room code.</p>
              <input className="w-full h-14 px-6 rounded-2xl text-lg font-mono tracking-widest text-center focus:outline-none focus:ring-2 ring-eco-green/30" onChange={(event) => onJoinCodeChange(event.target.value.toUpperCase())} placeholder="ECO-XXXX-XXXX" style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: pageTextPrimary }} type="text" value={joinCode} />
              <button className={`w-full h-14 rounded-2xl font-black text-sm transition-all ${joinCode.length > 8 ? 'bg-eco-green text-[#0A0F18] shadow-lg shadow-eco-green/20' : 'bg-eco-green/10 text-eco-green cursor-not-allowed opacity-50'}`} disabled={joinCode.length <= 8} onClick={onSubmit}>{joinLabel}</button>
              <button className="w-full py-3 text-xs font-bold opacity-50 hover:opacity-100 transition-opacity" onClick={onClose} style={{ color: pageTextSecondary }}>Cancel</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
