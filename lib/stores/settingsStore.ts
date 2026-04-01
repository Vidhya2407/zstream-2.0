import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PreferredVideoQuality = 'auto' | '1080' | '720' | '480' | '360';

interface SettingsState {
  preferredVideoQuality: PreferredVideoQuality;
  autoplayNext: boolean;
  downloadOnWifiOnly: boolean;
  pushNotifications: boolean;
  emailDigest: boolean;
  carbonMilestoneAlerts: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  setPreferredVideoQuality: (quality: PreferredVideoQuality) => void;
  setAutoplayNext: (value: boolean) => void;
  setDownloadOnWifiOnly: (value: boolean) => void;
  setPushNotifications: (value: boolean) => void;
  setEmailDigest: (value: boolean) => void;
  setCarbonMilestoneAlerts: (value: boolean) => void;
  setReducedMotion: (value: boolean) => void;
  setHighContrast: (value: boolean) => void;
  reset: () => void;
}

const defaultSettings = {
  preferredVideoQuality: 'auto' as PreferredVideoQuality,
  autoplayNext: true,
  downloadOnWifiOnly: true,
  pushNotifications: true,
  emailDigest: true,
  carbonMilestoneAlerts: true,
  reducedMotion: false,
  highContrast: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      setPreferredVideoQuality: (preferredVideoQuality) => set({ preferredVideoQuality }),
      setAutoplayNext: (autoplayNext) => set({ autoplayNext }),
      setDownloadOnWifiOnly: (downloadOnWifiOnly) => set({ downloadOnWifiOnly }),
      setPushNotifications: (pushNotifications) => set({ pushNotifications }),
      setEmailDigest: (emailDigest) => set({ emailDigest }),
      setCarbonMilestoneAlerts: (carbonMilestoneAlerts) => set({ carbonMilestoneAlerts }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setHighContrast: (highContrast) => set({ highContrast }),
      reset: () => set(defaultSettings),
    }),
    {
      name: 'zstream-settings',
    }
  )
);
