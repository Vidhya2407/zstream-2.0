'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { drmDevices, interfaceLanguages, playbackQualities, themeOptions } from '../../features/settings/config';
import { SettingSection, ToggleSetting } from '../../features/settings/components/SettingPrimitives';
import { useAppTranslations } from '../../lib/utils/translations';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useSettingsStore, type PreferredVideoQuality } from '../../lib/stores/settingsStore';
import { useThemeStore } from '../../lib/stores/themeStore';
import { useHydrated } from '@/hooks/useHydrated';

export default function SettingsPage() {
  const { t } = useAppTranslations();
  const hydrated = useHydrated(useThemeStore);
  const { language, setLanguage } = useLanguageStore();
  const { theme, set: setTheme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';
  const {
    preferredVideoQuality,
    autoplayNext,
    downloadOnWifiOnly,
    pushNotifications,
    emailDigest,
    carbonMilestoneAlerts,
    reducedMotion,
    highContrast,
    setPreferredVideoQuality,
    setAutoplayNext,
    setDownloadOnWifiOnly,
    setPushNotifications,
    setEmailDigest,
    setCarbonMilestoneAlerts,
    setReducedMotion,
    setHighContrast,
    reset,
  } = useSettingsStore();

  const [dataExporting, setDataExporting] = React.useState(false);
  const [removingDevice, setRemovingDevice] = React.useState<string | null>(null);
  const [devices, setDevices] = React.useState([...drmDevices]);

  const qualityLabels: Record<PreferredVideoQuality, string> = {
    auto: t('settings.quality_auto', 'Auto'),
    '1080': '1080p Full HD',
    '720': '720p HD',
    '480': '480p SD',
    '360': '360p Data Saver',
  };

  const handleExport = () => {
    setDataExporting(true);
    setTimeout(() => {
      const data = {
        exportDate: new Date().toISOString(),
        request: 'GDPR Art. 20 data portability export',
        settings: {
          preferredVideoQuality,
          autoplayNext,
          downloadOnWifiOnly,
          pushNotifications,
          emailDigest,
          carbonMilestoneAlerts,
          reducedMotion,
          highContrast,
          theme,
          language,
        },
        note: 'Full data export would be emailed within 72 hours according to the privacy workflow.',
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'zstream-data-export.json';
      link.click();
      URL.revokeObjectURL(url);
      setDataExporting(false);
    }, 1200);
  };

  const removeDevice = (id: string) => {
    setRemovingDevice(id);
    setTimeout(() => {
      setDevices((currentDevices) => currentDevices.filter((device) => device.id !== id));
      setRemovingDevice(null);
    }, 600);
  };

  const handleResetPreferences = () => {
    reset();
    setTheme('dark');
    setLanguage('en');
  };

  const pageBg = isLight ? 'linear-gradient(180deg, #eff5f8 0%, #f7fafc 100%)' : 'linear-gradient(180deg, #09111c 0%, #0a0f18 100%)';
  const heading = isLight ? '#0f172a' : '#ffffff';
  const body = isLight ? '#334155' : '#d1d5db';
  const muted = isLight ? '#475569' : '#94a3b8';
  const soft = isLight ? '#64748b' : '#9ca3af';
  const panel = isLight ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.05)';
  const panelBorder = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)';
  const inactiveButtonBg = isLight ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.06)';
  const inactiveButtonColor = isLight ? '#334155' : '#d1d5db';

  return (
    <div className="min-h-screen" data-no-translate="true" style={{ background: pageBg }}>
      <div className="mx-auto max-w-4xl space-y-6 px-4 pb-32 pt-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em]" style={{ color: 'rgb(0,229,186)' }}>Experience Controls</p>
            <h1 className="text-3xl font-black" style={{ color: heading }}>{t('settings.title')}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6" style={{ color: body }}>
              Playback, appearance, notifications, and accessibility preferences are now stored across the app and applied globally where supported.
            </p>
          </div>
          <button
            className="rounded-xl px-4 py-2 text-sm font-bold transition-all"
            onClick={handleResetPreferences}
            style={{ background: inactiveButtonBg, color: inactiveButtonColor, border: `1px solid ${panelBorder}` }}
          >
            Reset preferences
          </button>
        </div>

        <SettingSection title={t('settings.playback')}>
          <div>
            <p className="mb-2 text-sm font-semibold" style={{ color: heading }}>{t('settings.videoQuality')}</p>
            <p className="mb-3 text-sm leading-5" style={{ color: muted }}>Applies as the default starting quality for movies, series, live, and gaming playback.</p>
            <div className="flex flex-wrap gap-2">
              {playbackQualities.map((option) => (
                <button
                  className="rounded-xl px-3 py-1.5 text-xs font-semibold transition-all"
                  key={option.value}
                  onClick={() => setPreferredVideoQuality(option.value)}
                  style={{
                    background: preferredVideoQuality === option.value ? 'rgba(0,229,186,0.15)' : inactiveButtonBg,
                    color: preferredVideoQuality === option.value ? 'rgb(0,229,186)' : inactiveButtonColor,
                    border: `1px solid ${preferredVideoQuality === option.value ? 'rgba(0,229,186,0.35)' : panelBorder}`,
                  }}
                >
                  {qualityLabels[option.value] ?? option.label}
                </button>
              ))}
            </div>
          </div>
          <ToggleSetting checked={autoplayNext} desc='Automatically continue to the next title when playback ends where watch handoff exists.' label={t('settings.autoplayNext')} onChange={setAutoplayNext} />
          <ToggleSetting checked={downloadOnWifiOnly} desc='Used by offline download flows to prefer Wi-Fi-safe behavior by default.' label='Download on Wi-Fi only' onChange={setDownloadOnWifiOnly} />
        </SettingSection>

        <SettingSection title='Appearance & Language'>
          <div>
            <p className="mb-3 text-sm font-semibold" style={{ color: heading }}>Theme</p>
            <div className="grid grid-cols-2 gap-2 sm:max-w-xs">
              {themeOptions.map((option) => (
                <button
                  className="rounded-xl py-2 text-sm font-medium transition-all"
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  style={{
                    background: theme === option.value ? 'rgba(0,229,186,0.15)' : inactiveButtonBg,
                    color: theme === option.value ? 'rgb(0,229,186)' : inactiveButtonColor,
                    border: `1px solid ${theme === option.value ? 'rgba(0,229,186,0.3)' : panelBorder}`,
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-semibold" style={{ color: heading }}>{t('settings.interfaceLanguage')}</p>
            <div className="grid grid-cols-2 gap-2 sm:max-w-xs">
              {interfaceLanguages.map((option) => (
                <button
                  className="rounded-xl py-2 text-sm font-medium transition-all"
                  key={option.value}
                  onClick={() => setLanguage(option.value)}
                  style={{
                    background: language === option.value ? 'rgba(0,229,186,0.15)' : inactiveButtonBg,
                    color: language === option.value ? 'rgb(0,229,186)' : inactiveButtonColor,
                    border: `1px solid ${language === option.value ? 'rgba(0,229,186,0.3)' : panelBorder}`,
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </SettingSection>

        <SettingSection title={t('settings.notifications')}>
          <ToggleSetting checked={pushNotifications} desc='Controls in-app push-style delivery and future browser notification prompts.' label={t('settings.pushNotifications')} onChange={setPushNotifications} />
          <ToggleSetting checked={emailDigest} desc='Keeps the weekly viewing and sustainability summary enabled.' label={t('settings.weeklyEmailDigest')} onChange={setEmailDigest} />
          <ToggleSetting checked={carbonMilestoneAlerts} desc='Allows milestone-based sustainability notifications and celebration prompts.' label={t('settings.carbonMilestoneAlerts')} onChange={setCarbonMilestoneAlerts} />
        </SettingSection>

        <SettingSection title={t('settings.accessibilityTitle')}>
          <ToggleSetting checked={reducedMotion} desc='Disables most animations and transitions across the app shell.' label={t('settings.reduceMotion')} onChange={setReducedMotion} />
          <ToggleSetting checked={highContrast} desc='Boosts text and panel contrast for stronger readability in the current theme.' label={t('settings.highContrastMode')} onChange={setHighContrast} />
          <div className="rounded-xl p-3.5" style={{ background: isLight ? 'rgba(0,229,186,0.08)' : 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.12)' }}>
            <p className="text-xs font-semibold" style={{ color: 'rgb(0,229,186)' }}>{t('settings.wcagTarget')}</p>
            <p className="mt-1 text-sm leading-5" style={{ color: muted }}>Reduced motion and high contrast now apply to the full document shell, not just this page.</p>
          </div>
        </SettingSection>

        <SettingSection title={t('settings.drmManagement')}>
          <p className="text-sm leading-5" style={{ color: muted }}>Registered playback devices are shown here so users can audit DRM sessions and remove stale endpoints.</p>
          <div className="space-y-3">
            {devices.map((device) => (
              <motion.div animate={{ opacity: removingDevice === device.id ? 0 : 1 }} className="flex items-center justify-between gap-3 rounded-xl px-4 py-3" key={device.id} layout style={{ background: panel, border: `1px solid ${device.current ? 'rgba(0,229,186,0.2)' : panelBorder}` }}>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold" style={{ color: heading }}>{device.name}</p>
                    {device.current ? <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)' }}>{t('settings.current')}</span> : null}
                  </div>
                  <p className="mt-1 text-sm" style={{ color: soft }}>{device.type} | {t('settings.lastUsed')} {device.lastUsed}</p>
                </div>
                {!device.current ? <button className="text-xs font-semibold text-red-400 transition-colors hover:text-red-300" onClick={() => removeDevice(device.id)}>{t('settings.remove')}</button> : null}
              </motion.div>
            ))}
          </div>
        </SettingSection>

        <SettingSection title={t('settings.privacyTitle')}>
          <div className="space-y-3">
            <p className="text-sm leading-6" style={{ color: body }}>Privacy actions should live next to real preference state, exportable in a predictable format.</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <motion.button className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all" disabled={dataExporting} onClick={handleExport} style={{ background: 'rgba(0,229,186,0.12)', color: dataExporting ? 'rgba(0,229,186,0.4)' : 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.25)' }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                {dataExporting ? <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" /></svg>{t('settings.preparing')}</> : <><svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" /></svg>{t('settings.exportData')}</>}
              </motion.button>
              <button className="rounded-xl py-2.5 text-sm font-bold transition-all" style={{ background: 'rgba(239,68,68,0.08)', color: 'rgb(239,68,68)', border: '1px solid rgba(239,68,68,0.2)' }}>{t('settings.requestDeletion')}</button>
            </div>
            <p className="text-sm leading-5" style={{ color: muted }}>Current export includes persisted experience preferences along with the privacy request metadata.</p>
          </div>
        </SettingSection>
      </div>
    </div>
  );
}
