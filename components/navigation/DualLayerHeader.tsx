'use client';
import React from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useNavigationStore, MainCategory } from '../../lib/stores/navigationStore';
import { useNotificationStore } from '../../lib/stores/notificationStore';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '../../lib/stores/themeStore';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useAppTranslations } from '../../lib/utils/translations';
import { IconButton, SegmentedToggle, type SegmentedToggleOption, SurfacePanel } from '../../shared/ui';
import SubHeader from './SubHeader';

interface NavItem {
  id: MainCategory;
  label: string;
  path: string;
  translationKey: string;
}

const mainNavItems: NavItem[] = [
  { id: 'music', label: 'Music', path: '/music', translationKey: 'platform.music' },
  { id: 'minis', label: 'Minis', path: '/minis', translationKey: 'platform.minis' },
  { id: 'movies', label: 'Movies', path: '/movies', translationKey: 'platform.movies' },
  { id: 'mediaseries', label: 'Media Series', path: '/media-series', translationKey: 'platform.mediaSeries' },
  { id: 'sports', label: 'Sports', path: '/sports', translationKey: 'platform.sports' },
  { id: 'gaming', label: 'Gaming', path: '/gaming', translationKey: 'platform.gaming' },
  { id: 'live', label: 'Live', path: '/live', translationKey: 'platform.live' },
  { id: 'meetings', label: 'Meetings', path: '/meetings', translationKey: 'platform.meetings' },
  { id: 'ztube', label: 'ZTube', path: '/ztube', translationKey: 'platform.ztube' },
  { id: 'marketplace', label: 'Marketplace', path: '/marketplace', translationKey: 'platform.marketplace' },
];

export default function DualLayerHeader() {
  const pathname = usePathname();
  const { activeMainCategory, setMainCategory } = useNavigationStore();
  const { toggle: toggleNotifications, unreadCount } = useNotificationStore();
  const hydratedTheme = useHydrated(useThemeStore);
  const hydratedLanguage = useHydrated(useLanguageStore);
  const { theme, toggle: toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const { t } = useAppTranslations();
  const { scrollY } = useScroll();
  const { data: session } = useSession();

  const [carbonSaved, setCarbonSaved] = React.useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement | null>(null);
  const notifCount = unreadCount();
  const isLight = (hydratedTheme ? theme : 'dark') === 'light';
  const resolvedLanguage = hydratedLanguage ? language : 'en';

  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.88]);
  const headerBgRgb = isLight ? '240, 244, 247' : '18, 18, 18';
  const headerBg = useMotionTemplate`rgba(${headerBgRgb}, ${headerOpacity})`;
  const iconButtonBg = 'rgba(0, 234, 175, 0.08)';
  const iconButtonHoverBg = isLight ? 'rgba(0, 234, 175, 0.16)' : 'rgba(0, 234, 175, 0.14)';
  const mutedIconColor = isLight ? '#666666' : '#a0aec0';
  const navInactiveColor = isLight ? '#334155' : '#cbd5e1';
  const segmentedOptions: SegmentedToggleOption[] = [
    { id: 'de', label: 'DE' },
    { id: 'en', label: 'EN' },
  ];
  const fallbackUser = React.useMemo(
    () => ({
      name: 'ZSTREAM Demo',
      email: 'demo@zstream.app',
      role: 'admin' as const,
      carbonPoints: 1280,
    }),
    []
  );
  const currentUser = session?.user ?? fallbackUser;
  const userInitial = (currentUser.name?.trim()?.charAt(0) || currentUser.email?.trim()?.charAt(0) || 'Z').toUpperCase();
  const roleLabel = currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1);
  const accountSummary = [
    { label: 'Plan', value: 'Beta access' },
    { label: 'Language', value: resolvedLanguage === 'de' ? 'German' : 'English' },
    { label: 'Theme', value: isLight ? 'Light' : 'Dark' },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCarbonSaved((prev) => prev + Math.random() * 0.015);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const categoryFromPath = mainNavItems.find((item) => pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)));
    if (categoryFromPath && categoryFromPath.id !== activeMainCategory) {
      setMainCategory(categoryFromPath.id);
    }
  }, [pathname, activeMainCategory, setMainCategory]);

  React.useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!userMenuRef.current?.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const showSubHeader = activeMainCategory !== 'home';

  return (
    <>
      <motion.header
        data-no-translate="true"
        className="fixed top-0 left-0 right-0 z-50 glass"
        style={{
          height: '82px',
          background: headerBg,
          borderBottom: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.05)',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300, delay: 0.1 }}
      >
        <div className="h-full flex items-center justify-between px-4 sm:px-5 lg:px-8 xl:px-10 w-full gap-3 lg:gap-5">
          <div className="flex flex-1 items-center gap-4 lg:gap-6 min-w-0 overflow-hidden">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div className="relative w-7 h-7 flex-shrink-0" whileHover={{ scale: 1.05, rotate: -2 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.18 }}>
                <Image src="/logo-z.svg" alt="Zero Logo" width={28} height={28} className="relative drop-shadow-[0_0_12px_rgba(0,229,186,0.3)] group-hover:drop-shadow-[0_0_16px_rgba(0,229,186,0.4)] transition-all duration-300" priority />
              </motion.div>

              <motion.div className="hidden sm:flex flex-col -space-y-1" whileHover={{ x: 2 }} transition={{ duration: 0.18 }}>
                <span className="text-lg font-bold tracking-tight leading-none bg-gradient-to-r from-eco-green-bright via-eco-green to-eco-green-dark bg-clip-text text-transparent">ZSTREAM</span>
                <span className="text-[8px] text-eco-green/40 font-medium tracking-[0.12em] uppercase">Zero Carbon</span>
              </motion.div>
            </Link>

            <nav className="hidden min-[1500px]:flex items-center gap-1 min-w-0 overflow-hidden">
              {mainNavItems.map((item) => (
                <Link key={item.id} href={item.path}>
                  <motion.button
                    className="relative rounded-full px-3 py-2 text-[14px] font-semibold tracking-[0.01em] transition-all duration-180 whitespace-nowrap"
                    style={{
                      opacity: activeMainCategory === item.id ? 1 : 0.92,
                      color: activeMainCategory === item.id ? '#00eaaf' : navInactiveColor,
                    }}
                    onClick={() => setMainCategory(item.id)}
                    whileHover={{ opacity: 1, y: -1 }}
                    transition={{ duration: 0.18 }}
                  >
                    {t(item.translationKey, item.label)}
                    {activeMainCategory === item.id && (
                      <motion.div
                        className="absolute inset-0 -z-10 rounded-full"
                        style={{
                          backgroundColor: isLight ? 'rgba(0, 234, 175, 0.14)' : 'rgba(0, 234, 175, 0.12)',
                          border: isLight ? '1px solid rgba(0, 234, 175, 0.24)' : '1px solid rgba(0, 234, 175, 0.25)',
                        }}
                        layoutId="nav-pill"
                        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                      />
                    )}
                  </motion.button>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center gap-2 lg:gap-3">
            <motion.div className="hidden min-[1700px]:flex items-center gap-2.5 px-4 rounded-full cursor-pointer glass-card glow-green flex-shrink-0" style={{ height: '42px', border: '1px solid rgba(0, 229, 186, 0.2)' }} whileHover={{ scale: 1.02, backgroundColor: isLight ? 'rgba(0, 234, 175, 0.15)' : 'rgba(0, 234, 175, 0.1)' }} transition={{ duration: 0.18 }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="w-5 h-5 flex items-center justify-center">
                <svg className="w-4 h-4 text-eco-green-bright" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2-2 4-4 6-4a3 3 0 010 6c-2 0-4-1-6-2z" />
                  <circle cx="12" cy="20" r="1.5" />
                </svg>
              </motion.div>
              <div className="flex items-center gap-1.5">
                <motion.span className="text-[0.95rem] font-semibold text-eco-green-bright" key={carbonSaved.toFixed(2)} initial={{ opacity: 0, y: -3 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>{carbonSaved.toFixed(2)}</motion.span>
                <span className="text-[0.85rem] text-eco-green/70 font-medium">kg</span>
              </div>
            </motion.div>

            <Link href="/search" aria-label={t('nav.search', 'Search')}>
              <IconButton ariaLabel={t('nav.search', 'Search')} background={iconButtonBg} hoverBackground={iconButtonHoverBg}>
                <svg className="w-4 h-4" style={{ color: mutedIconColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </IconButton>
            </Link>

            <IconButton ariaLabel={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} background={iconButtonBg} hiddenOnMobile hoverBackground={iconButtonHoverBg} onClick={toggleTheme}>
              {theme === 'dark' ? (
                <svg className="w-4 h-4" style={{ color: mutedIconColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" style={{ color: mutedIconColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </IconButton>

            <SegmentedToggle
              activeBackground={isLight ? 'rgba(0, 234, 175, 0.18)' : 'rgba(0, 234, 175, 0.2)'}
              activeColor="#00eaaf"
              activeId={resolvedLanguage}
              background={iconButtonBg}
              border={isLight ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(0, 234, 175, 0.12)'}
              inactiveColor={mutedIconColor}
              onChange={(value) => setLanguage(value as 'en' | 'de')}
              options={segmentedOptions}
            />

            <IconButton ariaLabel={notifCount > 0 ? `Notifications (${notifCount} unread)` : 'Notifications'} background={iconButtonBg} hiddenOnMobile hoverBackground={iconButtonHoverBg} onClick={toggleNotifications}>
              <div className="relative flex items-center justify-center">
                <svg className="w-4 h-4" style={{ color: mutedIconColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifCount > 0 && (
                  <motion.div className="absolute -right-2 -top-2 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white px-0.5" style={{ background: 'rgb(239,68,68)' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }}>
                    {notifCount > 9 ? '9+' : notifCount}
                  </motion.div>
                )}
              </div>
            </IconButton>

            <div className="relative" ref={userMenuRef}>
              <motion.button
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
                aria-label="Open account menu"
                className="flex h-10 items-center gap-3 rounded-full pl-1 pr-3 transition-all duration-180"
                onClick={() => setUserMenuOpen((open) => !open)}
                style={{
                  background: isLight ? 'rgba(255, 255, 255, 0.78)' : 'rgba(13, 18, 30, 0.82)',
                  border: isLight ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isLight ? '0 12px 30px rgba(15, 23, 42, 0.08)' : '0 18px 34px rgba(0, 0, 0, 0.28)',
                }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(0, 229, 186, 0.4)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, rgba(0, 128, 255, 0.82), rgba(0, 229, 186, 0.82))' }}>
                  {userInitial}
                </div>
                <div className="hidden text-left xl:block">
                  <div className="max-w-[120px] truncate text-sm font-semibold" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>
                    {currentUser.name}
                  </div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.14em]" style={{ color: '#00eaaf' }}>
                    {roleLabel}
                  </div>
                </div>
              </motion.button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    className="absolute right-0 top-[calc(100%+14px)] z-50 w-[320px] max-w-[calc(100vw-2rem)]"
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                  >
                    <SurfacePanel
                      background={isLight ? 'rgba(255, 255, 255, 0.96)' : 'rgba(11, 18, 32, 0.94)'}
                      border={isLight ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(255, 255, 255, 0.08)'}
                      className="overflow-hidden rounded-[28px] p-0 shadow-2xl"
                    >
                      <div className="border-b px-5 py-5" style={{ borderColor: isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)' }}>
                        <div className="flex items-start gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, rgba(0, 128, 255, 0.88), rgba(0, 229, 186, 0.9))' }}>
                            {userInitial}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-base font-semibold" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>
                              {currentUser.name}
                            </p>
                            <p className="truncate text-sm" style={{ color: isLight ? '#475569' : '#94a3b8' }}>
                              {currentUser.email}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ background: 'rgba(0, 229, 186, 0.12)', color: '#00eaaf' }}>
                                {roleLabel}
                              </span>
                              <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: isLight ? 'rgba(15, 23, 42, 0.06)' : 'rgba(148, 163, 184, 0.16)', color: isLight ? '#334155' : '#cbd5e1' }}>
                                ID {'id' in currentUser ? currentUser.id : 'demo-user'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 px-5 py-4">
                        <div className="rounded-2xl px-4 py-3" style={{ background: isLight ? 'rgba(0, 234, 175, 0.1)' : 'rgba(0, 234, 175, 0.08)' }}>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: '#00eaaf' }}>
                            Carbon Points
                          </p>
                          <p className="mt-2 text-xl font-semibold" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>
                            {currentUser.carbonPoints.toLocaleString()}
                          </p>
                        </div>
                        <div className="rounded-2xl px-4 py-3" style={{ background: isLight ? 'rgba(15, 23, 42, 0.04)' : 'rgba(148, 163, 184, 0.1)' }}>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: isLight ? '#475569' : '#94a3b8' }}>
                            Status
                          </p>
                          <p className="mt-2 text-xl font-semibold" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>
                            Active
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 px-5 pb-4">
                        {accountSummary.map((item) => (
                          <div
                            key={item.label}
                            className="flex items-center justify-between rounded-2xl px-4 py-3"
                            style={{ background: isLight ? 'rgba(248, 250, 252, 0.95)' : 'rgba(15, 23, 42, 0.7)' }}
                          >
                            <span className="text-sm font-medium" style={{ color: isLight ? '#475569' : '#94a3b8' }}>
                              {item.label}
                            </span>
                            <span className="text-sm font-semibold" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t px-5 py-4" style={{ borderColor: isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)' }}>
                        <div className="grid gap-2">
                          <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}>
                            <div className="flex items-center justify-between rounded-2xl px-4 py-3 transition-colors" style={{ background: isLight ? 'rgba(0, 234, 175, 0.08)' : 'rgba(0, 234, 175, 0.07)' }}>
                              <span className="text-sm font-semibold" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>
                                Dashboard
                              </span>
                              <span className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: '#00eaaf' }}>
                                Open
                              </span>
                            </div>
                          </Link>
                          <Link href="/settings/security" onClick={() => setUserMenuOpen(false)}>
                            <div className="flex items-center justify-between rounded-2xl px-4 py-3 transition-colors" style={{ background: isLight ? 'rgba(15, 23, 42, 0.04)' : 'rgba(15, 23, 42, 0.7)' }}>
                              <span className="text-sm font-semibold" style={{ color: isLight ? '#0f172a' : '#f8fafc' }}>
                                Security Settings
                              </span>
                              <span className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: isLight ? '#475569' : '#94a3b8' }}>
                                Manage
                              </span>
                            </div>
                          </Link>
                          <button
                            className="flex items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors"
                            onClick={() => {
                              setUserMenuOpen(false);
                              void signOut({ callbackUrl: '/login' });
                            }}
                            style={{ background: isLight ? 'rgba(239, 68, 68, 0.08)' : 'rgba(239, 68, 68, 0.12)' }}
                            type="button"
                          >
                            <span className="text-sm font-semibold" style={{ color: isLight ? '#991b1b' : '#fecaca' }}>
                              Sign Out
                            </span>
                            <span className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: isLight ? '#b91c1c' : '#fca5a5' }}>
                              Exit
                            </span>
                          </button>
                        </div>
                      </div>
                    </SurfacePanel>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <IconButton ariaLabel="Toggle mobile menu" background={iconButtonBg} hoverBackground={iconButtonHoverBg} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-5 h-5 text-eco-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </IconButton>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            data-no-translate="true"
            className="fixed top-[82px] left-0 right-0 z-40 lg:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <SurfacePanel
              background={isLight ? 'rgba(255, 255, 255, 0.95)' : 'rgba(18, 18, 18, 0.95)'}
              border={isLight ? '1px solid rgba(0, 0, 0, 0.12)' : '1px solid rgba(0, 234, 175, 0.15)'}
              className="m-4 rounded-2xl p-4"
            >
              <nav className="grid grid-cols-3 gap-2">
                {mainNavItems.map((item) => (
                  <Link key={item.id} href={item.path} onClick={() => setMobileMenuOpen(false)}>
                    <motion.div
                      className={`p-3 rounded-xl text-center text-xs font-medium ${activeMainCategory === item.id ? 'text-eco-green-bright' : isLight ? 'text-gray-700' : 'text-gray-300'}`}
                      style={{
                        background: activeMainCategory === item.id ? (isLight ? 'rgba(0, 234, 175, 0.14)' : 'rgba(0, 234, 175, 0.12)') : 'transparent',
                        border: activeMainCategory === item.id ? (isLight ? '1px solid rgba(0, 234, 175, 0.25)' : '1px solid rgba(0, 234, 175, 0.25)') : '1px solid transparent',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t(item.translationKey, item.label)}
                    </motion.div>
                  </Link>
                ))}
              </nav>
            </SurfacePanel>
          </motion.div>
        )}
      </AnimatePresence>

      {showSubHeader && <SubHeader />}
    </>
  );
}

