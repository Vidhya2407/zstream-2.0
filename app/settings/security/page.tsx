'use client';

import React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthShell } from '../../../components/auth/AuthShell';
import {
  mockBackupCodes,
  mockSecuritySecret,
  type BackupStage,
  type SmsStage,
  type TotpStage,
} from '../../../features/settings-security/config';
import { useAppTranslations } from '../../../lib/utils/translations';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '@/lib/stores/themeStore';

function useSecurityTheme() {
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';

  return {
    isLight,
    title: isLight ? '#0f172a' : '#ffffff',
    body: isLight ? '#475569' : '#9ca3af',
    muted: isLight ? '#64748b' : '#6b7280',
    panelBg: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.03)',
    panelBorder: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.07)',
    inputBg: isLight ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.05)',
    inputBorder: isLight ? 'rgba(15,23,42,0.12)' : 'rgba(255,255,255,0.09)',
    softBg: isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.04)',
    successBg: 'rgba(0,229,186,0.08)',
    successBorder: 'rgba(0,229,186,0.2)',
    successText: 'rgb(0,229,186)',
  };
}

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  const theme = useSecurityTheme();

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6"
      initial={{ opacity: 0, y: 16 }}
      style={{
        background: theme.panelBg,
        border: `1px solid ${theme.panelBorder}`,
        boxShadow: theme.isLight ? '0 16px 40px rgba(15,23,42,0.08)' : 'none',
      }}
    >
      <h2
        className="mb-5 flex items-center gap-2 border-b pb-3 text-sm font-black uppercase tracking-widest"
        style={{ borderBottom: `1px solid ${theme.panelBorder}`, color: theme.title }}
      >
        {icon ? <span aria-hidden="true">{icon}</span> : null}
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </motion.section>
  );
}

function SecurityInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { centered?: boolean },
) {
  const theme = useSecurityTheme();
  const { centered, style, ...rest } = props;

  return (
    <input
      {...rest}
      className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-all ${centered ? 'text-center font-mono tracking-[0.35em]' : ''}`.trim()}
      onBlur={(event) => {
        event.currentTarget.style.borderColor = theme.inputBorder;
        props.onBlur?.(event);
      }}
      onFocus={(event) => {
        event.currentTarget.style.borderColor = 'rgba(0,229,186,0.45)';
        props.onFocus?.(event);
      }}
      style={{
        background: theme.inputBg,
        border: `1px solid ${theme.inputBorder}`,
        color: theme.title,
        ...style,
      }}
    />
  );
}

function ActionButton({
  children,
  disabled,
  onClick,
  type = 'button',
  variant = 'primary',
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
}) {
  const theme = useSecurityTheme();
  const active = variant === 'primary';

  return (
    <motion.button
      className="rounded-xl px-5 py-2.5 text-sm font-bold transition-all"
      disabled={disabled}
      onClick={onClick}
      style={{
        background: active
          ? disabled
            ? theme.softBg
            : 'rgba(0,229,186,0.12)'
          : theme.softBg,
        color: active
          ? disabled
            ? theme.muted
            : theme.successText
          : theme.body,
        border: `1px solid ${active && !disabled ? 'rgba(0,229,186,0.25)' : theme.panelBorder}`,
      }}
      type={type}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

function SuccessBanner({ message }: { message: string }) {
  const theme = useSecurityTheme();

  return (
    <div
      className="flex items-center gap-3 rounded-2xl p-4"
      style={{ background: theme.successBg, border: `1px solid ${theme.successBorder}` }}
    >
      <span className="text-lg" style={{ color: theme.successText }} aria-hidden="true">
        OK
      </span>
      <p className="text-sm font-semibold" style={{ color: theme.title }}>
        {message}
      </p>
    </div>
  );
}

function Pill({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  const theme = useSecurityTheme();

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-bold"
      style={{
        background: active ? 'rgba(0,229,186,0.12)' : theme.softBg,
        border: `1px solid ${active ? 'rgba(0,229,186,0.22)' : theme.panelBorder}`,
        color: active ? theme.successText : theme.body,
      }}
    >
      {children}
    </span>
  );
}

function StatusListCard({
  title,
  icon,
  rows,
  footer,
  accent = 'rgb(0,229,186)',
}: {
  title: string;
  icon: string;
  rows: Array<{ label: string; value: string; good?: boolean }>;
  footer?: React.ReactNode;
  accent?: string;
}) {
  const theme = useSecurityTheme();

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[1.75rem] p-6"
      initial={{ opacity: 0, y: 16 }}
      style={{
        background: theme.panelBg,
        border: `1px solid ${theme.panelBorder}`,
        boxShadow: theme.isLight ? '0 16px 40px rgba(15,23,42,0.08)' : 'none',
      }}
    >
      <h2 className="mb-4 flex items-center gap-2 text-sm font-black" style={{ color: theme.title }}>
        <span aria-hidden="true">{icon}</span>
        {title}
      </h2>
      <div className="space-y-1">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 border-b py-3 text-sm"
            style={{ borderBottom: `1px solid ${theme.panelBorder}` }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="inline-block h-3 w-3 rounded-full"
                style={{ background: row.good ? accent : 'rgb(59,130,246)', boxShadow: row.good ? `0 0 14px ${accent}` : 'none' }}
              />
              <span style={{ color: theme.title }}>{row.label}</span>
            </div>
            <span className="text-right text-sm" style={{ color: theme.body }}>{row.value}</span>
          </div>
        ))}
      </div>
      {footer ? <div className="mt-5">{footer}</div> : null}
    </motion.section>
  );
}

function DeviceCard({
  name,
  detail,
  current,
  actionLabel,
}: {
  name: string;
  detail: string;
  current?: boolean;
  actionLabel?: string;
}) {
  const theme = useSecurityTheme();

  return (
    <div className="flex items-center justify-between gap-4 border-b py-4" style={{ borderBottom: `1px solid ${theme.panelBorder}` }}>
      <div className="flex min-w-0 items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl text-xl"
          style={{ background: theme.softBg, border: `1px solid ${theme.panelBorder}` }}
        >
          DV
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold" style={{ color: theme.title }}>{name}</p>
          <p className="text-sm" style={{ color: theme.body }}>{detail}</p>
        </div>
      </div>
      {current ? (
        <span className="rounded-full px-4 py-1.5 text-sm font-bold" style={{ background: 'rgba(0,229,186,0.1)', color: theme.successText, border: '1px solid rgba(0,229,186,0.2)' }}>
          Current
        </span>
      ) : (
        <button className="rounded-xl px-4 py-2 text-sm font-bold" style={{ background: theme.softBg, border: `1px solid ${theme.panelBorder}`, color: theme.body }} type="button">
          {actionLabel ?? 'Remove'}
        </button>
      )}
    </div>
  );
}

function DownloadCard({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  const theme = useSecurityTheme();
  return (
    <div className="border-b py-4" style={{ borderBottom: `1px solid ${theme.panelBorder}` }}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-black" style={{ background: theme.softBg, border: `1px solid ${theme.panelBorder}`, color: theme.title }}>
            DL
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold" style={{ color: theme.title }}>{title}</p>
            <p className="text-sm" style={{ color: theme.body }}>{detail}</p>
          </div>
        </div>
        <span className="rounded-full px-4 py-1.5 text-sm font-bold" style={{ background: 'rgba(0,229,186,0.1)', color: theme.successText, border: '1px solid rgba(0,229,186,0.2)' }}>
          Ready
        </span>
      </div>
      <div className="mt-3 h-1 rounded-full" style={{ background: theme.softBg }}>
        <div className="h-full rounded-full" style={{ width: '82%', background: 'linear-gradient(90deg, rgb(0,229,186), rgb(0,217,255))' }} />
      </div>
    </div>
  );
}

export default function SecurityPage() {
  const { t } = useAppTranslations();
  const theme = useSecurityTheme();
  const [totpStage, setTotpStage] = React.useState<TotpStage>('idle');
  const [totpCode, setTotpCode] = React.useState('');
  const [totpError, setTotpError] = React.useState('');
  const [smsStage, setSmsStage] = React.useState<SmsStage>('idle');
  const [phone, setPhone] = React.useState('');
  const [smsCode, setSmsCode] = React.useState('');
  const [smsError, setSmsError] = React.useState('');
  const [smsCooldown, setSmsCooldown] = React.useState(0);
  const [backupStage, setBackupStage] = React.useState<BackupStage>('idle');
  const [copiedAll, setCopiedAll] = React.useState(false);
  const [downloaded, setDownloaded] = React.useState(false);
  const [currentPw, setCurrentPw] = React.useState('');
  const [newPw, setNewPw] = React.useState('');
  const [confirmPw, setConfirmPw] = React.useState('');
  const [pwLoading, setPwLoading] = React.useState(false);
  const [pwSuccess, setPwSuccess] = React.useState(false);
  const [pwError, setPwError] = React.useState('');
  const [dataExporting, setDataExporting] = React.useState(false);

  const resendLabel = smsCooldown > 0
    ? t('security.resendIn', 'Resend in {seconds}s').replace('{seconds}', String(smsCooldown))
    : t('security.resendCode');

  const canSubmitPasswordChange = Boolean(
    currentPw &&
      newPw &&
      confirmPw &&
      newPw === confirmPw &&
      newPw.length >= 8 &&
      currentPw !== newPw &&
      !pwLoading,
  );

  const getPasswordErrorMessage = (message: string) => {
    switch (message) {
      case 'Current password is incorrect.':
        return t('security.currentPasswordIncorrect');
      case 'New password and confirmation must match.':
        return t('security.passwordConfirmMismatch');
      case 'New password must be different from your current password.':
        return t('security.passwordReuse');
      default:
        return message || t('security.passwordUpdateFailed');
    }
  };

  const startSmsCooldown = () => {
    setSmsCooldown(30);
    const timer = window.setInterval(() => {
      setSmsCooldown((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  };

  const handleTotpVerify = () => {
    setTotpError('');
    if (totpCode.length !== 6) {
      setTotpError(t('security.enterAuthenticatorCode'));
      return;
    }
    setTotpStage('verifying');
    window.setTimeout(() => setTotpStage('active'), 1200);
  };

  const handleSendSms = () => {
    if (!phone.replace(/\D/g, '').length) {
      setSmsError(t('security.enterPhone'));
      return;
    }
    setSmsError('');
    setSmsCode('');
    setSmsStage('entering');
    startSmsCooldown();
  };

  const handleSmsVerify = () => {
    setSmsError('');
    if (smsCode.length < 4) {
      setSmsError(t('security.enterCodeSent'));
      return;
    }
    setSmsStage('verifying');
    window.setTimeout(() => setSmsStage('active'), 900);
  };

  const handleGenerateBackup = () => {
    setBackupStage('generating');
    setCopiedAll(false);
    setDownloaded(false);
    window.setTimeout(() => setBackupStage('ready'), 1000);
  };

  const handleExport = () => {
    setDataExporting(true);
    window.setTimeout(() => {
      const data = {
        exportDate: new Date().toISOString(),
        request: 'DSAR account export',
        accountProtection: {
          trustedDevices: 2,
          downloadsProtected: true,
          region: 'Frankfurt, Germany',
        },
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'zstream-account-export.json';
      link.click();
      URL.revokeObjectURL(url);
      setDataExporting(false);
    }, 900);
  };

  const handleDownloadCodes = () => {
    const content = mockBackupCodes.join('\n');
    const blob = new Blob(
      [
        `ZSTREAM 2FA Backup Codes\nGenerated: ${new Date().toISOString()}\n\n${content}\n\nEach code can only be used once. Store these securely.`,
      ],
      { type: 'text/plain' },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'zstream-backup-codes.txt';
    link.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  const handleCopyAll = () => {
    navigator.clipboard?.writeText(mockBackupCodes.join('\n')).then(() => {
      setCopiedAll(true);
      window.setTimeout(() => setCopiedAll(false), 2000);
    });
  };

  const handleChangePw = async (event: React.FormEvent) => {
    event.preventDefault();
    setPwError('');
    setPwSuccess(false);

    if (!currentPw || !newPw || !confirmPw) return;
    if (newPw.length < 8) return setPwError(t('security.passwordTooShort'));
    if (newPw !== confirmPw) return setPwError(t('security.passwordConfirmMismatch'));
    if (currentPw === newPw) return setPwError(t('security.passwordReuse'));

    setPwLoading(true);

    try {
      const response = await fetch('/api/account/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: currentPw,
          newPassword: newPw,
          confirmPassword: confirmPw,
        }),
      });

      const result = (await response.json().catch(() => null)) as
 | { error?: string; success?: boolean }
 | null;

      if (!response.ok || !result?.success) {
        setPwError(getPasswordErrorMessage(result?.error ?? t('security.passwordUpdateFailed')));
        return;
      }

      setPwSuccess(true);
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
      window.setTimeout(() => setPwSuccess(false), 3000);
    } catch {
      setPwError(t('security.passwordUpdateFailed'));
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <AuthShell
      badge={t('settings.security')}
      brandTagline={t('auth.login.brandTagline')}
      description={t('security.subtitle')}
      maxWidthClassName="max-w-3xl"
      title={t('security.title')}
    >
      <div className="space-y-6">
        <div>
          <h1 className="mb-1 text-3xl font-black" style={{ color: theme.title }}>
            {t('settings.security')}
          </h1>
          <p className="text-sm" style={{ color: theme.body }}>
            {t('security.subtitle')}
          </p>
        </div>

        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[1.75rem] p-6"
          initial={{ opacity: 0, y: 16 }}
          style={{
            background: theme.panelBg,
            border: `1px solid ${theme.panelBorder}`,
            boxShadow: theme.isLight ? '0 18px 44px rgba(15,23,42,0.08)' : 'none',
          }}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: theme.successText }}>
                Security Center
              </p>
              <p className="mt-2 max-w-2xl text-sm leading-6" style={{ color: theme.body }}>
                Review your sign-in protection, trusted devices, protected downloads, and privacy rights in one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Pill active>Subscription active</Pill>
              <Pill active>Content protected</Pill>
            </div>
          </div>
        </motion.section>

        <StatusListCard
          footer={
            <p className="text-sm" style={{ color: theme.body }}>
              Use the tools below to update two-factor authentication, backup codes, or your password.
            </p>
          }
          icon=""
          rows={[
            { label: 'Password security', value: 'Strong | Last changed 30 days ago', good: true },
            { label: 'Two-factor authentication', value: 'Enabled (Authenticator app)', good: true },
            { label: 'Active sessions', value: '2 devices', good: true },
            { label: 'Login history', value: 'Essen, DE | 2 hours ago' },
          ]}
          title="Your account protection"
        />

        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[1.75rem] p-6"
          initial={{ opacity: 0, y: 16 }}
          style={{
            background: theme.panelBg,
            border: `1px solid ${theme.panelBorder}`,
            boxShadow: theme.isLight ? '0 16px 40px rgba(15,23,42,0.08)' : 'none',
          }}
        >
          <h2 className="mb-4 flex items-center gap-2 text-sm font-black" style={{ color: theme.title }}>
            Your trusted devices
          </h2>
          <DeviceCard current detail="Essen, Germany | Active now" name="MacBook Pro | Chrome" />
          <DeviceCard actionLabel={t('settings.remove')} detail="Essen, Germany | Last used 1 day ago" name="iPhone 15 | ZStream App" />
          <div className="mt-4 rounded-2xl p-4 text-sm leading-7" style={{ background: 'rgba(0,128,255,0.08)', border: '1px solid rgba(0,128,255,0.2)', color: theme.body }}>
            Your content can play on up to 4 devices simultaneously with Premium. Your account is currently using 2.
          </div>
        </motion.section>

        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[1.75rem] p-6"
          initial={{ opacity: 0, y: 16 }}
          style={{
            background: theme.panelBg,
            border: `1px solid ${theme.panelBorder}`,
            boxShadow: theme.isLight ? '0 16px 40px rgba(15,23,42,0.08)' : 'none',
          }}
        >
          <h2 className="mb-4 flex items-center gap-2 text-sm font-black" style={{ color: theme.title }}>
            Your downloads
          </h2>
          <DownloadCard detail="HD 1080p | Downloaded Apr 1 | Expires Apr 15" title="Naatu Naatu (Official)" />
          <DownloadCard detail="HD 1080p | Downloaded Mar 28 | Expires Apr 11" title="ZStream Original S01E03" />
          <div className="mt-4 rounded-2xl p-4 text-sm leading-7" style={{ background: theme.softBg, border: `1px solid ${theme.panelBorder}`, color: theme.body }}>
            Downloads are protected and can only play on this device. They expire after 14 days.
          </div>
        </motion.section>

        <motion.section
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[1.75rem] p-6"
          initial={{ opacity: 0, y: 16 }}
          style={{
            background: theme.panelBg,
            border: `1px solid ${theme.panelBorder}`,
            boxShadow: theme.isLight ? '0 16px 40px rgba(15,23,42,0.08)' : 'none',
          }}
        >
          <h2 className="mb-4 flex items-center gap-2 text-sm font-black" style={{ color: theme.title }}>
            Content protection
          </h2>
          <div className="space-y-4">
            <div className="rounded-2xl p-4 text-sm leading-7" style={{ background: 'rgba(0,229,186,0.08)', border: '1px solid rgba(0,229,186,0.2)', color: theme.successText }}>
              Every video you stream or download is uniquely protected with your account ID. This helps us investigate unauthorized sharing and protect the creators you love.
            </div>
            <div className="rounded-2xl p-4" style={{ background: theme.softBg, border: `1px solid ${theme.panelBorder}` }}>
              <p className="text-sm" style={{ color: theme.body }}>Your protection ID for this session</p>
              <p className="mt-2 font-mono text-lg" style={{ color: theme.title }}>ZS-A1B2C3D4 | Expires in 14 min</p>
            </div>
            <Link href="/privacy-policy">
              <ActionButton variant="secondary">Read our privacy policy</ActionButton>
            </Link>
          </div>
        </motion.section>

        <StatusListCard
          footer={
            <div className="mt-1 flex flex-wrap gap-3">
              <ActionButton onClick={handleExport} variant="secondary">
                {dataExporting ? t('settings.preparing') : 'Request my data (DSAR)'}
              </ActionButton>
              <button className="rounded-2xl px-5 py-3 text-sm font-bold" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', color: 'rgb(239,68,68)' }} type="button">
                Delete my account
              </button>
            </div>
          }
          icon="⚖️"
          rows={[
            { label: 'Your data is stored in the EU', value: 'Frankfurt, Germany', good: true },
            { label: 'Download your data', value: 'Available within 30 days', good: true },
            { label: 'Delete your account', value: 'Processed within 72 hours', good: true },
          ]}
          title="Your rights (GDPR / DSGVO)"
        />

        <SectionCard icon="" title={t('security.setupAuthenticator', 'Authenticator App (TOTP)')}>
          <AnimatePresence mode="wait">
            {totpStage === 'idle' ? (
              <motion.div key="totp-idle" animate={{ opacity: 1 }} exit={{ opacity: 0 }} initial={{ opacity: 0 }}>
                <p className="mb-4 text-sm" style={{ color: theme.body }}>
                  {t('security.useAuthenticator')}
                </p>
                <div
                  className="mb-4 flex items-center gap-3 rounded-xl p-3"
                  style={{ background: theme.softBg, border: `1px solid ${theme.panelBorder}` }}
                >
                  <span className="text-xs" style={{ color: theme.muted }}>
                    {t('security.status')}
                  </span>
                  <span className="text-xs font-bold text-red-400">{t('security.notEnabled')}</span>
                </div>
                <ActionButton onClick={() => setTotpStage('scanning')}>
                  {t('security.setupAuthenticator')}
                </ActionButton>
              </motion.div>
            ) : null}

            {totpStage === 'scanning' ? (
              <motion.div key="totp-scan" animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} initial={{ opacity: 0, y: 8 }}>
                <p className="mb-1 text-sm font-semibold" style={{ color: theme.title }}>
                  {t('security.stepOne')}
                </p>
                <p className="mb-4 text-xs" style={{ color: theme.muted }}>
                  {t('security.stepOneDesc')}
                </p>

                <div className="mb-5 flex flex-col gap-5 sm:flex-row">
                  <div className="flex-shrink-0">
                    <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-2xl bg-white p-[10px]">
                      <div
                        className="grid h-full w-full grid-cols-7 gap-px rounded-xl p-1"
                        style={{ background: 'rgba(0,0,0,0.05)' }}
                      >
                        {Array.from({ length: 49 }).map((_, index) => (
                          <div
                            key={index}
                            className="rounded-sm"
                            style={{ background: Math.sin(index * 1.7 + 3) > 0 ? '#0a0f18' : 'transparent' }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-1.5 text-center text-[9px]" style={{ color: theme.muted }}>
                      {t('security.qrPlaceholder')}
                    </p>
                  </div>

                  <div className="flex-1">
                    <p className="mb-1.5 text-xs font-semibold" style={{ color: theme.body }}>
                      {t('security.manualSecret')}
                    </p>
                    <div
                      className="flex items-center gap-2 rounded-xl px-3 py-2 font-mono text-xs"
                      style={{ background: 'rgba(0,229,186,0.06)', border: '1px solid rgba(0,229,186,0.15)', color: 'rgb(0,229,186)' }}
                    >
                      <span className="flex-1 tracking-widest">{mockSecuritySecret}</span>
                      <button
                        aria-label={t('security.copySecret')}
                        className="flex-shrink-0 transition-colors"
                        onClick={() => navigator.clipboard?.writeText(mockSecuritySecret)}
                        style={{ color: theme.muted }}
                        type="button"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="mt-2 text-[10px]" style={{ color: theme.muted }}>
                      {t('security.algorithmDetails')}
                    </p>
                  </div>
                </div>

                <p className="mb-2 text-sm font-semibold" style={{ color: theme.title }}>
                  {t('security.stepTwo')}
                </p>
                <div className="mb-3 flex gap-3">
                  <SecurityInput
                    aria-label="TOTP verification code"
                    autoComplete="one-time-code"
                    centered
                    inputMode="numeric"
                    maxLength={6}
                    onChange={(event) => setTotpCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                    pattern="[0-9]*"
                    placeholder="000000"
                    type="text"
                    value={totpCode}
                  />
                  <ActionButton disabled={totpCode.length !== 6} onClick={handleTotpVerify}>
                    {t('security.verify')}
                  </ActionButton>
                </div>

                {totpError ? (
                  <p className="text-xs text-red-400" role="alert">
                    {totpError}
                  </p>
                ) : null}

                <button className="mt-1 text-xs transition-colors" onClick={() => setTotpStage('idle')} style={{ color: theme.muted }} type="button">
                  {t('security.cancel')}
                </button>
              </motion.div>
            ) : null}

            {totpStage === 'verifying' ? (
              <motion.div key="totp-verifying" animate={{ opacity: 1 }} className="py-6 text-center" initial={{ opacity: 0 }}>
                <svg className="mx-auto mb-3 h-8 w-8 animate-spin" fill="none" style={{ color: theme.successText }} viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
                </svg>
                <p className="text-sm" style={{ color: theme.body }}>
                  {t('security.verifyingCode')}
                </p>
              </motion.div>
            ) : null}

            {totpStage === 'active' ? (
              <motion.div key="totp-active" animate={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.95 }}>
                <SuccessBanner message={t('security.authenticatorEnabled')} />
                <p className="mt-3 text-xs" style={{ color: theme.body }}>
                  {t('security.authenticatorEnabledDesc')}
                </p>
                <button
                  className="mt-4 text-xs font-semibold text-red-400 transition-colors hover:text-red-300"
                  onClick={() => {
                    setTotpStage('idle');
                    setTotpCode('');
                  }}
                  type="button"
                >
                  {t('security.disableTotp')}
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </SectionCard>

        <SectionCard icon="" title={t('security.smsFallback')}>
          <p className="text-sm" style={{ color: theme.body }}>
            {t('security.smsFallbackDesc')}
          </p>

          {smsStage === 'idle' ? (
            <div className="space-y-3">
              <SecurityInput
                autoComplete="tel"
                onChange={(event) => setPhone(event.target.value)}
                placeholder="+49 151 2345 6789"
                type="tel"
                value={phone}
              />
              {smsError ? (
                <p className="text-xs text-red-400" role="alert">
                  {smsError}
                </p>
              ) : null}
              <ActionButton onClick={handleSendSms}>{t('security.sendCode')}</ActionButton>
            </div>
          ) : null}

          {smsStage === 'entering' ? (
            <div className="space-y-3">
              <div className="rounded-xl p-3" style={{ background: theme.softBg, border: `1px solid ${theme.panelBorder}` }}>
                <p className="text-xs" style={{ color: theme.muted }}>
                  {t('security.codeSentTo')}
                </p>
                <p className="mt-1 text-sm font-semibold" style={{ color: theme.title }}>
                  {phone}
                </p>
              </div>
              <SecurityInput
                aria-label="SMS verification code"
                autoComplete="one-time-code"
                centered
                inputMode="numeric"
                maxLength={6}
                onChange={(event) => setSmsCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                type="text"
                value={smsCode}
              />
              <p className="text-xs" style={{ color: theme.muted }}>
                {t('security.enterSmsCode')}
              </p>
              {smsError ? (
                <p className="text-xs text-red-400" role="alert">
                  {smsError}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <ActionButton disabled={smsCode.length < 4} onClick={handleSmsVerify}>
                  {t('security.verify')}
                </ActionButton>
                <ActionButton disabled={smsCooldown > 0} onClick={handleSendSms} variant="secondary">
                  {resendLabel}
                </ActionButton>
              </div>
            </div>
          ) : null}

          {smsStage === 'verifying' ? (
            <div className="py-4 text-center">
              <svg className="mx-auto mb-3 h-8 w-8 animate-spin" fill="none" style={{ color: theme.successText }} viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
              </svg>
              <p className="text-sm" style={{ color: theme.body }}>
                {t('security.verifyingCode')}
              </p>
            </div>
          ) : null}

          {smsStage === 'active' ? (
            <div className="space-y-3">
              <SuccessBanner message={t('security.smsEnabled')} />
              <div className="rounded-xl p-3" style={{ background: theme.softBg, border: `1px solid ${theme.panelBorder}` }}>
                <p className="text-xs" style={{ color: theme.muted }}>
                  {t('security.codeSentTo')}
                </p>
                <p className="mt-1 text-sm font-semibold" style={{ color: theme.title }}>
                  {phone}
                </p>
              </div>
              <button
                className="text-xs font-semibold text-red-400 transition-colors hover:text-red-300"
                onClick={() => {
                  setSmsStage('idle');
                  setPhone('');
                  setSmsCode('');
                  setSmsError('');
                  setSmsCooldown(0);
                }}
                type="button"
              >
                {t('security.removePhone')}
              </button>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard icon="" title={t('security.backupCodes')}>
          <p className="text-sm" style={{ color: theme.body }}>
            {t('security.backupCodesDesc')}
          </p>
          <p className="text-xs" style={{ color: theme.muted }}>
            {t('security.backupWarning')}
          </p>

          {backupStage === 'idle' ? (
            <ActionButton onClick={handleGenerateBackup}>{t('security.generateBackupCodes')}</ActionButton>
          ) : null}

          {backupStage === 'generating' ? (
            <div className="py-4 text-center">
              <svg className="mx-auto mb-3 h-8 w-8 animate-spin" fill="none" style={{ color: theme.successText }} viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
              </svg>
              <p className="text-sm" style={{ color: theme.body }}>
                {t('security.generatingCodes')}
              </p>
            </div>
          ) : null}

          {backupStage === 'ready' ? (
            <div className="space-y-4">
              <div className="rounded-2xl p-4" style={{ background: theme.softBg, border: `1px solid ${theme.panelBorder}` }}>
                <p className="mb-3 text-sm font-semibold" style={{ color: theme.title }}>
                  {t('security.yourBackupCodes')}
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {mockBackupCodes.map((code) => (
                    <div key={code} className="rounded-xl px-3 py-2 font-mono text-sm" style={{ background: theme.inputBg, border: `1px solid ${theme.inputBorder}`, color: theme.title }}>
                      {code}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <ActionButton onClick={handleDownloadCodes}>{downloaded ? t('security.downloaded') : t('security.downloadTxt')}</ActionButton>
                <ActionButton onClick={handleCopyAll} variant="secondary">{copiedAll ? t('security.copied') : t('security.copyAll')}</ActionButton>
                <ActionButton onClick={handleGenerateBackup} variant="secondary">{t('security.regenerate')}</ActionButton>
              </div>
              <p className="text-xs" style={{ color: theme.muted }}>
                {t('security.backupStoreDesc')}
              </p>
            </div>
          ) : null}
        </SectionCard>

        <SectionCard icon="" title={t('security.changePassword')}>
          <AnimatePresence>
            {pwSuccess ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mb-2"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0, y: -6 }}
                role="status"
              >
                <SuccessBanner message={t('security.passwordUpdated')} />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <form className="space-y-3" onSubmit={handleChangePw}>
            {[
              {
                id: 'cur-pw',
                label: t('security.currentPassword'),
                value: currentPw,
                setter: setCurrentPw,
                complete: 'current-password',
              },
              {
                id: 'new-pw',
                label: t('security.newPassword'),
                value: newPw,
                setter: setNewPw,
                complete: 'new-password',
              },
              {
                id: 'conf-pw',
                label: t('security.confirmPassword'),
                value: confirmPw,
                setter: setConfirmPw,
                complete: 'new-password',
              },
            ].map((field) => (
              <div key={field.id}>
                <label className="mb-1.5 block text-xs font-semibold" htmlFor={field.id} style={{ color: theme.body }}>
                  {field.label}
                </label>
                <SecurityInput
                  autoComplete={field.complete}
                  id={field.id}
                  onChange={(event) => field.setter(event.target.value)}
                  required
                  type="password"
                  value={field.value}
                />
              </div>
            ))}

            {pwError ? (
              <p className="text-xs text-red-400" role="alert">
                {pwError}
              </p>
            ) : null}

            <ActionButton disabled={!canSubmitPasswordChange} type="submit">
              {pwLoading ? '...' : t('security.changePassword')}
            </ActionButton>
          </form>
        </SectionCard>
      </div>
    </AuthShell>
  );
}
