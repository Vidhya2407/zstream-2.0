'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../lib/stores/themeStore';
import { useHydrated } from '@/hooks/useHydrated';
import { useAppTranslations } from '../../lib/utils/translations';
import { SurfacePanel } from '../../shared/ui';

const BOTTOM_NAV = [
  {
    labelKey: 'platform.music',
    fallback: 'Music',
    path: '/music',
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    labelKey: 'platform.minis',
    fallback: 'Minis',
    path: '/minis',
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
      </svg>
    ),
  },
  {
    labelKey: 'platform.live',
    fallback: 'Live Streams',
    path: '/live',
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
  },
  {
    labelKey: 'platform.ztube',
    fallback: 'ZTUBE',
    path: '/ztube',
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
      </svg>
    ),
  },
  {
    labelKey: 'nav.search',
    fallback: 'Search',
    path: '/search',
    icon: (active: boolean) => (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const { t } = useAppTranslations();
  const isLight = (hydrated ? theme : 'dark') === 'light';

  const navBg = isLight ? 'rgba(240, 244, 247, 0.97)' : 'rgba(8,12,22,0.97)';
  const navBorder = isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255,255,255,0.07)';
  const inactiveColor = isLight ? '#888888' : 'rgb(107,114,128)';
  const activeColor = 'rgb(0,229,186)';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden" aria-label="Mobile navigation" data-no-translate="true">
      <SurfacePanel background={navBg} border={navBorder} className="px-1" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="flex items-stretch justify-around">
          {BOTTOM_NAV.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            const label = t(item.labelKey, item.fallback);

            return (
              <Link key={item.path} href={item.path} className="relative flex min-w-0 flex-1 flex-col items-center justify-center gap-1 px-2 py-3" aria-label={label} aria-current={isActive ? 'page' : undefined}>
                {isActive && (
                  <motion.div layoutId="bottom-nav-indicator" className="absolute top-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full" style={{ background: activeColor }} transition={{ type: 'spring', damping: 26, stiffness: 380 }} />
                )}
                <span style={{ color: isActive ? activeColor : inactiveColor }}>{item.icon(isActive)}</span>
                <span className="w-full truncate text-center text-[10px] font-semibold" style={{ color: isActive ? activeColor : inactiveColor }}>{label}</span>
              </Link>
            );
          })}
        </div>
      </SurfacePanel>
    </nav>
  );
}


