'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface IconButtonProps {
  ariaLabel: string;
  background: string;
  color?: string;
  hoverBackground: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hiddenOnMobile?: boolean;
  title?: string;
}

export default function IconButton({ ariaLabel, background, color, hoverBackground, children, className = '', onClick, hiddenOnMobile = false, title }: IconButtonProps) {
  return (
    <motion.button
      aria-label={ariaLabel}
      className={`${hiddenOnMobile ? 'hidden md:flex ' : 'flex '}h-10 w-10 items-center justify-center rounded-full transition-all duration-180 ${className}`}
      onClick={onClick}
      style={{ background, color }}
      title={title}
      transition={{ duration: 0.18 }}
      whileHover={{ backgroundColor: hoverBackground }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
