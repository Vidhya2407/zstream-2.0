'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { AuthError, AuthField, AuthInput, AuthShell, PrimaryAction, SecondaryAction } from '../../components/auth/AuthShell';
import { useAppTranslations } from '../../lib/utils/translations';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '@/lib/stores/themeStore';

type Stage = 'form' | 'sent';

export default function ForgotPasswordPage() {
  const { t } = useAppTranslations();
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';
  const [email, setEmail] = React.useState('');
  const [stage, setStage] = React.useState<Stage>('form');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [resendCooldown, setResendCooldown] = React.useState(0);
  const muted = isLight ? '#64748b' : '#9ca3af';
  const title = isLight ? '#0f172a' : '#ffffff';
  const panelBg = isLight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.03)';
  const panelBorder = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)';

  const resendLabel = resendCooldown > 0
    ? t('auth.forgotPassword.resendIn').replace('{seconds}', String(resendCooldown))
    : t('auth.forgotPassword.resendResetLink');

  const startCooldown = () => {
    setResendCooldown(60);
    const interval = setInterval(() => {
      setResendCooldown((current) => {
        if (current <= 1) {
          clearInterval(interval);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('auth.forgotPassword.validEmailError'));
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage('sent');
      startCooldown();
    }, 1400);
  };

  const handleResend = () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      startCooldown();
    }, 1000);
  };

  return (
    <AuthShell
      badge={t('auth.forgotPassword.resetLink')}
      brandTagline={t('auth.login.brandTagline')}
      description={stage === 'form' ? t('auth.forgotPassword.intro') : t('auth.forgotPassword.checkEmail')}
      icon={<KeyIcon />}
      title={stage === 'form' ? t('auth.forgotPassword.title') : t('auth.forgotPassword.checkEmail')}
      footer={stage === 'form' ? (
        <p className="text-center text-xs" style={{ color: muted }}>
          <Link className="font-bold" href="/login" style={{ color: 'rgb(0,229,186)' }}>
            {t('auth.forgotPassword.backToLogin')}
          </Link>
        </p>
      ) : null}
    >
      <AnimatePresence mode="wait">
        {stage === 'form' ? (
          <motion.form key="form" animate={{ opacity: 1 }} className="space-y-5" exit={{ opacity: 0 }} initial={{ opacity: 0 }} onSubmit={handleSubmit}>
            <AuthField htmlFor="email" label={t('auth.forgotPassword.email')}>
              <AuthInput autoComplete="email" id="email" onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" value={email} />
            </AuthField>
            {error ? <AuthError message={error} /> : null}
            <PrimaryAction disabled={loading} type="submit">{loading ? <LoadingLabel label={t('auth.login.signingIn')} /> : t('auth.forgotPassword.resetLink')}</PrimaryAction>
          </motion.form>
        ) : (
          <motion.div key="sent" animate={{ opacity: 1, scale: 1 }} className="space-y-4" initial={{ opacity: 0, scale: 0.96 }}>
            <div className="rounded-[1.5rem] border px-5 py-8 text-center" style={{ borderColor: panelBorder, background: panelBg }}>
              <div className="mb-4 text-5xl" style={{ color: 'rgb(0,229,186)' }}>@</div>
              <p className="mb-2 text-sm" style={{ color: muted }}>{t('auth.forgotPassword.resetLinkSentTo')}</p>
              <p className="inline-block rounded-2xl px-4 py-2 text-sm font-semibold" style={{ background: isLight ? 'rgba(15,23,42,0.05)' : 'rgba(255,255,255,0.05)', color: title }}>{email}</p>
              <p className="mt-4 text-xs" style={{ color: muted }}>{t('auth.forgotPassword.linkExpires')}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <PrimaryAction disabled={resendCooldown > 0 || loading} onClick={handleResend}>{loading ? <LoadingLabel label={t('auth.login.signingIn')} /> : resendLabel}</PrimaryAction>
              <SecondaryAction className="w-full" onClick={() => setStage('form')}>{t('auth.forgotPassword.backToLogin')}</SecondaryAction>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}

function LoadingLabel({ label }: { label: string }) {
  return <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" /></svg>{label}</>;
}

function KeyIcon() {
  return <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
