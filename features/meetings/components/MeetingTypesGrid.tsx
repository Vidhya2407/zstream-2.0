'use client';

import { motion } from 'framer-motion';
import type { MeetingTypeCard } from '../types';

interface MeetingTypesGridProps {
  cards: MeetingTypeCard[];
  pageTextPrimary: string;
  pageTextSecondary: string;
}

export default function MeetingTypesGrid({ cards, pageTextPrimary, pageTextSecondary }: MeetingTypesGridProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <motion.div key={card.title} className="rounded-2xl p-6 cursor-pointer border transition-all" style={{ background: card.accentColor, borderColor: card.border }} whileHover={{ y: -4, borderColor: 'rgba(0,229,186,0.4)' }}>
          <div aria-label={card.iconText} className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-xs font-black" style={{ background: card.border, color: card.textColor }}>{card.iconLabel}</div>
          <h3 className="font-bold text-sm mb-1" style={{ color: pageTextPrimary }}>{card.title}</h3>
          <p className="text-[11px] leading-relaxed opacity-70 mb-3" style={{ color: pageTextSecondary }}>{card.description}</p>
          <div className="flex items-center justify-between pt-3 border-t border-eco-green/10">
            <span className="text-[10px] font-bold uppercase text-eco-green/70">{card.capacity}</span>
            <span className="text-[10px] font-black text-eco-green">{card.co2}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
