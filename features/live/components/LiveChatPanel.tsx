import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import type { ChatMessage } from '../../../lib/data/liveCatalog';

interface LiveChatPanelProps {
  chatInput: string;
  chatMessages: ChatMessage[];
  encryptedLabel: string;
  inputBg: string;
  inputBorder: string;
  isLight: boolean;
  liveChatLabel: string;
  pageTextMuted: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
  saySomethingLabel: string;
  sendLabel: string;
  surfaceBg: string;
  surfaceBorder: string;
  watchStatText: string;
  onChatInputChange: (value: string) => void;
  onSend: () => void;
}

export default function LiveChatPanel({ chatInput, chatMessages, encryptedLabel, inputBg, inputBorder, isLight, liveChatLabel, pageTextMuted, pageTextPrimary, pageTextSecondary, saySomethingLabel, sendLabel, surfaceBg, surfaceBorder, watchStatText, onChatInputChange, onSend }: LiveChatPanelProps) {
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <motion.div animate={{ opacity: 1, x: 0 }} className="flex min-w-0 flex-col overflow-hidden rounded-3xl" initial={{ opacity: 0, x: 20 }} style={{ background: surfaceBg, border: `1px solid ${surfaceBorder}`, height: 'fit-content', maxHeight: '640px', boxShadow: isLight ? '0 18px 36px rgba(15,23,42,0.08)' : 'none' }} transition={{ delay: 0.25 }}>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.05)'}` }}>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px rgba(0,229,186,0.5)' }} />
          <span className="text-sm font-bold" style={{ color: pageTextPrimary }}>{liveChatLabel}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: pageTextMuted }}>
          <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {watchStatText}
        </div>
      </div>
      <div className="scrollbar-none flex-1 space-y-2 overflow-y-auto p-3" style={{ minHeight: '320px', maxHeight: '480px' }}>
        <AnimatePresence initial={false}>
          {chatMessages.map((msg) => (
            <motion.div animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2" exit={{ opacity: 0 }} initial={{ opacity: 0, y: 10 }} key={msg.id}>
              <span className="flex-shrink-0 text-xs font-bold" style={{ color: msg.color }}>{msg.user}</span>
              <span className="text-sm leading-6 break-words" style={{ color: isLight ? '#334155' : '#d1d5db' }}>{msg.msg}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>
      <div className="p-3" style={{ borderTop: `1px solid ${isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.05)'}` }}>
        <div className="flex gap-2">
          <input className="flex-1 rounded-xl bg-transparent px-3 py-2.5 text-sm outline-none" onChange={(event) => onChatInputChange(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && onSend()} placeholder={saySomethingLabel} style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: pageTextPrimary }} type="text" value={chatInput} />
          <motion.button className="rounded-xl px-3 py-2 text-sm font-semibold" onClick={onSend} style={{ background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.2)' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {sendLabel}
          </motion.button>
        </div>
        <p className="mt-2 text-center text-[11px]" style={{ color: pageTextSecondary }}>{encryptedLabel}</p>
      </div>
    </motion.div>
  );
}
