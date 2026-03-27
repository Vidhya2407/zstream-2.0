import { create } from 'zustand';

export type NotificationType = 'carbon' | 'content' | 'live' | 'achievement' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  time: number;
  read: boolean;
  href?: string;
  icon?: string;
}

const SEED: Notification[] = [
  { id: 'n1', type: 'carbon', title: '🌿 Carbon Milestone!', body: 'You\'ve saved 1 kg CO₂ this month — equivalent to planting 0.5 trees!', time: Date.now() - 1000 * 60 * 5, read: false, href: '/sustainability' },
  { id: 'n2', type: 'content', title: '🎬 New Episode Available', body: 'Planet: A New Hope — Season 2 Episode 4 is now streaming.', time: Date.now() - 1000 * 60 * 30, read: false, href: '/media-series' },
  { id: 'n3', type: 'live', title: '📡 Live Now', body: 'Climate Summit 2026 is live — 125K viewers watching.', time: Date.now() - 1000 * 60 * 60, read: false, href: '/live' },
  { id: 'n4', type: 'achievement', title: '🏆 Achievement Unlocked', body: 'Eco Warrior: 30-day green streaming streak! +500 Carbon Credits added.', time: Date.now() - 1000 * 60 * 60 * 2, read: true, href: '/dashboard' },
  { id: 'n5', type: 'system', title: '📋 Weekly Carbon Report', body: 'Your weekly eco report is ready. Total saved: 0.38 kg CO₂ this week.', time: Date.now() - 1000 * 60 * 60 * 24, read: true, href: '/sustainability' },
  { id: 'n6', type: 'content', title: '🎵 New Music Drop', body: 'Eco Beats Collective released their new album "Solar Wind Sessions".', time: Date.now() - 1000 * 60 * 60 * 36, read: true, href: '/music' },
];

interface NotificationState {
  notifications: Notification[];
  isOpen: boolean;
  unreadCount: () => number;
  open: () => void;
  close: () => void;
  toggle: () => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  dismiss: (id: string) => void;
  clearAll: () => void;
  push: (n: Omit<Notification, 'id' | 'time' | 'read'>) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: SEED,
  isOpen: false,
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  markRead: (id) => set((s) => ({ notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n) })),
  markAllRead: () => set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
  dismiss: (id) => set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
  clearAll: () => set({ notifications: [] }),
  push: (n) => set((s) => ({
    notifications: [
      { ...n, id: `n${Date.now()}`, time: Date.now(), read: false },
      ...s.notifications,
    ],
  })),
}));
