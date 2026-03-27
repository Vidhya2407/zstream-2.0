'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { drmDevices, interfaceLanguages, playbackQualities } from '../../features/settings/config';
import { SettingSection, ToggleSetting } from '../../features/settings/components/SettingPrimitives';
import { useAppTranslations } from '../../lib/utils/translations';

export default function SettingsPage() {
  const { language, t } = useAppTranslations();
  const [quality, setQuality] = React.useState('Auto');
  const [uiLang, setUiLang] = React.useState(language === 'de' ? 'Deutsch' : 'English');
  const [pushNotif, setPushNotif] = React.useState(true);
  const [emailDigest, setEmailDigest] = React.useState(true);
  const [carbonMilestone, setCarbonMilestone] = React.useState(true);
  const [autoplay, setAutoplay] = React.useState(true);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);
  const [dataExporting, setDataExporting] = React.useState(false);
  const [removingDevice, setRemovingDevice] = React.useState<string | null>(null);
  const [devices, setDevices] = React.useState([...drmDevices]);

  const qualityLabels: Record<string, string> = {
    Auto: t('settings.quality_auto', 'Auto'),
    '4K Ultra HD': '4K Ultra HD',
    '1080p Full HD': '1080p Full HD',
    '720p HD': '720p HD',
    '480p SD': '480p SD',
    '360p': '360p',
  };

  const handleExport = () => {
    setDataExporting(true);
    setTimeout(() => {
      const data = { exportDate: new Date().toISOString(), request: 'DSGVO Art. 20 data portability export', note: 'Full data export would be emailed within 72 hours per DSGVO section 34.' };
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

  return (
    <div className="min-h-screen" data-no-translate="true" style={{ background: 'var(--color-dark-base, #0A0F18)' }}>
      <div className="mx-auto max-w-3xl space-y-6 px-4 pb-32 pt-24">
        <h1 className="text-3xl font-black text-white">{t('settings.title')}</h1>
        <SettingSection title={t('settings.playback')}>
          <div>
            <p className="mb-2 text-sm font-semibold text-white">{t('settings.videoQuality')}</p>
            <p className="mb-3 text-xs text-gray-500">{t('settings.videoQualityDesc')}</p>
            <div className="flex flex-wrap gap-2">
              {playbackQualities.map((option) => (
                <button className="rounded-xl px-3 py-1.5 text-xs font-semibold transition-all" key={option} onClick={() => setQuality(option)} style={{ background: quality === option ? 'rgba(0,229,186,0.15)' : 'rgba(255,255,255,0.06)', color: quality === option ? 'rgb(0,229,186)' : 'rgba(255,255,255,0.6)', border: `1px solid ${quality === option ? 'rgba(0,229,186,0.35)' : 'transparent'}` }}>{qualityLabels[option] ?? option}</button>
              ))}
            </div>
          </div>
          <ToggleSetting checked={autoplay} desc={t('settings.autoplayNextDesc')} label={t('settings.autoplayNext')} onChange={setAutoplay} />
        </SettingSection>
        <SettingSection title={t('settings.language')}>
          <div>
            <p className="mb-3 text-sm font-semibold text-white">{t('settings.interfaceLanguage')}</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {interfaceLanguages.map((label) => (
                <button className="rounded-xl py-2 text-sm font-medium transition-all" key={label} onClick={() => setUiLang(label)} style={{ background: uiLang === label ? 'rgba(0,229,186,0.15)' : 'rgba(255,255,255,0.04)', color: uiLang === label ? 'rgb(0,229,186)' : 'rgba(255,255,255,0.6)', border: `1px solid ${uiLang === label ? 'rgba(0,229,186,0.3)' : 'rgba(255,255,255,0.06)'}` }}>{label}</button>
              ))}
            </div>
          </div>
        </SettingSection>
        <SettingSection title={t('settings.notifications')}>
          <ToggleSetting checked={pushNotif} desc={t('settings.pushNotificationsDesc')} label={t('settings.pushNotifications')} onChange={setPushNotif} />
          <ToggleSetting checked={emailDigest} desc={t('settings.weeklyEmailDigestDesc')} label={t('settings.weeklyEmailDigest')} onChange={setEmailDigest} />
          <ToggleSetting checked={carbonMilestone} desc={t('settings.carbonMilestoneAlertsDesc')} label={t('settings.carbonMilestoneAlerts')} onChange={setCarbonMilestone} />
        </SettingSection>
        <SettingSection title={t('settings.accessibilityTitle')}>
          <ToggleSetting checked={reducedMotion} desc={t('settings.reduceMotionDesc')} label={t('settings.reduceMotion')} onChange={setReducedMotion} />
          <ToggleSetting checked={highContrast} desc={t('settings.highContrastModeDesc')} label={t('settings.highContrastMode')} onChange={setHighContrast} />
          <div className="rounded-xl p-3.5" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.12)' }}>
            <p className="text-xs font-semibold" style={{ color: 'rgb(0,229,186)' }}>{t('settings.wcagTarget')}</p>
            <p className="mt-0.5 text-[11px] text-gray-500">{t('settings.wcagDesc')}</p>
          </div>
        </SettingSection>
        <SettingSection title={t('settings.drmManagement')}>
          <p className="text-xs text-gray-500">{t('settings.drmDesc')}</p>
          <div className="space-y-3">
            {devices.map((device) => (
              <motion.div animate={{ opacity: removingDevice === device.id ? 0 : 1 }} className="flex items-center justify-between gap-3 rounded-xl px-4 py-3" key={device.id} layout style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${device.current ? 'rgba(0,229,186,0.2)' : 'rgba(255,255,255,0.06)'}` }}>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-white">{device.name}</p>
                    {device.current ? <span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold" style={{ background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)' }}>{t('settings.current')}</span> : null}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">{device.type} · {t('settings.lastUsed')} {device.lastUsed}</p>
                </div>
                {!device.current ? <button className="text-xs font-semibold text-red-400 transition-colors hover:text-red-300" onClick={() => removeDevice(device.id)}>{t('settings.remove')}</button> : null}
              </motion.div>
            ))}
          </div>
        </SettingSection>
        <SettingSection title={t('settings.privacyTitle')}>
          <div className="space-y-3">
            <p className="text-sm text-gray-400">{t('settings.privacyDesc')}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <motion.button className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-bold transition-all" disabled={dataExporting} onClick={handleExport} style={{ background: 'rgba(0,229,186,0.12)', color: dataExporting ? 'rgba(0,229,186,0.4)' : 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.25)' }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                {dataExporting ? <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" /></svg>{t('settings.preparing')}</> : <><svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" /></svg>{t('settings.exportData')}</>}
              </motion.button>
              <button className="rounded-xl py-2.5 text-sm font-bold transition-all" style={{ background: 'rgba(239,68,68,0.08)', color: 'rgb(239,68,68)', border: '1px solid rgba(239,68,68,0.2)' }}>{t('settings.requestDeletion')}</button>
            </div>
            <p className="text-[11px] text-gray-600">{t('settings.privacyFootnote')}</p>
          </div>
        </SettingSection>
      </div>
    </div>
  );
}
