'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useNotificationStore, type NotificationType } from '../../lib/stores/notificationStore';
import { useThemeStore } from '../../lib/stores/themeStore';
import { useSettingsStore } from '../../lib/stores/settingsStore';

function typeColor(t: NotificationType) {
  const map: Record<NotificationType, string> = {
    carbon: 'rgb(0,229,186)',
    content: 'rgb(96,165,250)',
    live: 'rgb(239,68,68)',
    achievement: 'rgb(251,191,36)',
    system: 'rgb(156,163,175)',
  };
  return map[t];
}

function typeIcon(t: NotificationType) {
  const map: Record<NotificationType, string> = {
    carbon: 'Leaf',
    content: 'Play',
    live: 'Live',
    achievement: 'Win',
    system: 'Info',
  };
  return map[t];
}

function fmtTime(ts: number) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function NotificationCenter() {
  const { notifications, isOpen, close, markRead, markAllRead, dismiss, clearAll, unreadCount } = useNotificationStore();
  const { theme } = useThemeStore();
  const pushNotificationsEnabled = useSettingsStore((state) => state.pushNotifications);
  const count = unreadCount();
  const isLight = theme === 'light';

  const notifBg = isLight ? 'rgba(240, 244, 247, 0.98)' : 'rgba(10,18,30,0.98)';
  const notifBorder = isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255,255,255,0.1)';
  const titleColor = isLight ? '#1d1d1f' : 'white';
  const bodyColor = isLight ? '#666666' : 'rgb(156,163,175)';
  const timeColor = isLight ? '#888888' : 'rgb(107,114,128)';
  const itemBorder = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255,255,255,0.04)';
  const itemBg = isLight ? 'rgba(0, 229, 186, 0.02)' : 'rgba(0,229,186,0.03)';
  const emptyTextColor = isLight ? '#888888' : 'rgb(107,114,128)';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            className="fixed top-[70px] right-4 z-[61] flex max-h-[calc(100vh-90px)] w-[380px] flex-col overflow-hidden rounded-2xl"
            style={{ background: notifBg, border: `1px solid ${notifBorder}`, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ type: 'spring', damping: 28, stiffness: 380 }}
          >
            <div className="flex shrink-0 items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${itemBorder}` }}>
              <div className="flex items-center gap-2.5">
                <h3 className="text-sm font-bold" style={{ color: titleColor }}>Notifications</h3>
                {count > 0 && (
                  <span className="min-w-[20px] rounded-full bg-red-500 px-1.5 py-0.5 text-center text-[10px] font-black text-white">{count}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {count > 0 && (
                  <button onClick={markAllRead} className="text-[10px] font-semibold transition-colors" style={{ color: 'rgb(0,229,186)' }} aria-label="Mark all as read">
                    Mark all read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button onClick={clearAll} className="text-[10px] text-gray-500 transition-colors hover:text-red-400" aria-label="Clear all notifications">
                    Clear all
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16" style={{ color: emptyTextColor }}>
                  <span className="mb-3 text-4xl">Bell</span>
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                <div>
                  {notifications.map((n) => (
                    <motion.div
                      key={n.id}
                      layout
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="group relative flex cursor-pointer items-start gap-3 px-5 py-3.5 transition-colors"
                      style={{ background: n.read ? 'transparent' : itemBg, borderBottom: `1px solid ${itemBorder}` }}
                      onClick={() => markRead(n.id)}
                    >
                      {!n.read && (
                        <div className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full" style={{ background: typeColor(n.type) }} />
                      )}
                      <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-[11px] font-bold" style={{ background: `${typeColor(n.type)}14`, border: `1px solid ${typeColor(n.type)}22`, color: typeColor(n.type) }}>
                        {typeIcon(n.type)}
                      </div>
                      <div className="min-w-0 flex-1">
                        {n.href ? (
                          <Link href={n.href} onClick={close}>
                            <p className="mb-0.5 text-xs font-semibold leading-snug hover:underline decoration-dotted" style={{ color: titleColor }}>{n.title}</p>
                          </Link>
                        ) : (
                          <p className="mb-0.5 text-xs font-semibold leading-snug" style={{ color: titleColor }}>{n.title}</p>
                        )}
                        <p className="text-[11px] leading-relaxed" style={{ color: bodyColor }}>{n.body}</p>
                        <p className="mt-1 text-[10px]" style={{ color: timeColor }}>{fmtTime(n.time)}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                        className="mt-0.5 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                        style={{ color: isLight ? '#888888' : 'rgb(107,114,128)' }}
                        aria-label="Dismiss notification"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            <div className="shrink-0 px-5 py-3" style={{ borderTop: `1px solid ${itemBorder}` }}>
              <p className="text-center text-[10px]" style={{ color: timeColor }}>
                {pushNotificationsEnabled ? 'Push notifications enabled' : 'Push notifications paused'} | <Link href="/settings" className="text-eco-green hover:underline" onClick={close}>Manage preferences</Link>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
