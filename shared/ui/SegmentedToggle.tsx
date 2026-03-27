'use client';

import { motion } from 'framer-motion';

export interface SegmentedToggleOption {
  id: string;
  label: string;
}

interface SegmentedToggleProps {
  activeId: string;
  background: string;
  border: string;
  inactiveColor: string;
  activeBackground: string;
  activeColor: string;
  options: SegmentedToggleOption[];
  onChange: (id: string) => void;
}

export default function SegmentedToggle({ activeId, background, border, inactiveColor, activeBackground, activeColor, options, onChange }: SegmentedToggleProps) {
  return (
    <div className="hidden md:flex items-center rounded-full p-1 transition-all duration-180" style={{ background, border }}>
      {options.map((option) => {
        const active = activeId === option.id;
        return (
          <motion.button
            key={option.id}
            aria-pressed={active}
            className="h-8 min-w-[36px] rounded-full px-2 text-[11px] font-semibold tracking-wide"
            onClick={() => onChange(option.id)}
            style={{
              background: active ? activeBackground : 'transparent',
              color: active ? activeColor : inactiveColor,
            }}
            transition={{ duration: 0.18 }}
            whileTap={{ scale: 0.96 }}
          >
            {option.label}
          </motion.button>
        );
      })}
    </div>
  );
}
