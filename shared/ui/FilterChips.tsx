import { motion } from 'framer-motion';

export interface FilterChipItem {
  id: string;
  label: string;
}

interface FilterChipsProps {
  activeId: string;
  activeLayoutId?: string;
  activeStyles?: {
    background: string;
    border: string;
    color: string;
  };
  className?: string;
  fadeRight?: boolean;
  inactiveStyles?: {
    background: string;
    border: string;
    color: string;
  };
  items: FilterChipItem[];
  onChange: (id: string) => void;
  paddingClassName?: string;
}

export default function FilterChips({
  activeId,
  activeLayoutId = 'filter-chip-pill',
  activeStyles = {
    background: 'rgba(0, 229, 186, 0.08)',
    border: '1px solid rgba(0, 229, 186, 0.35)',
    color: 'rgb(0, 229, 186)',
  },
  className = '',
  fadeRight = false,
  inactiveStyles = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgb(156, 163, 175)',
  },
  items,
  onChange,
  paddingClassName = 'px-6 pr-16',
}: FilterChipsProps) {
  return (
    <div className={`relative ${className}`.trim()}>
      {fadeRight && (
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16" style={{ background: 'linear-gradient(to left, #0A0F18, transparent)' }} />
      )}
      <div className={`flex items-center gap-2 overflow-x-auto py-1 [scrollbar-width:none] [-ms-overflow-style:none] ${paddingClassName}`.trim()}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <motion.button
              className="relative flex-shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200"
              key={item.id}
              onClick={() => onChange(item.id)}
              style={{
                background: isActive ? activeStyles.background : inactiveStyles.background,
                border: isActive ? activeStyles.border : inactiveStyles.border,
                color: isActive ? activeStyles.color : inactiveStyles.color,
              }}
              whileHover={{
                backgroundColor: isActive ? activeStyles.background : 'rgba(255,255,255,0.08)',
                color: isActive ? activeStyles.color : 'rgb(255,255,255)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  layoutId={activeLayoutId}
                  style={{
                    background: activeStyles.background,
                    border: activeStyles.border,
                  }}
                  transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
