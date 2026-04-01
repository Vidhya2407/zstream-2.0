'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { getMainCategoryFromPath } from '../../lib/config/navigation';
import { HEADER_HEIGHT, SUBHEADER_HEIGHT } from '../../lib/config/header';

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const pathname = usePathname();
  const showSubHeader = getMainCategoryFromPath(pathname) !== 'home';
  const topPadding = showSubHeader ? HEADER_HEIGHT + SUBHEADER_HEIGHT : HEADER_HEIGHT;

  return (
    <motion.div
      className="min-h-screen"
      style={{ paddingTop: `${topPadding}px`, paddingBottom: 'clamp(4rem, 7vw, 6rem)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
