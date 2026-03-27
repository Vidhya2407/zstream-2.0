'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigationStore } from '../../lib/stores/navigationStore';

interface PageWrapperProps {
  children: React.ReactNode;
}

const HEADER_HEIGHT = 74;
const SUBHEADER_HEIGHT = 60;

export default function PageWrapper({ children }: PageWrapperProps) {
  const { activeMainCategory } = useNavigationStore();
  const showSubHeader = activeMainCategory !== 'home';
  const topPadding = showSubHeader ? HEADER_HEIGHT + SUBHEADER_HEIGHT : HEADER_HEIGHT;

  return (
    <motion.div
      className="min-h-screen"
      style={{ paddingTop: `${topPadding}px` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
