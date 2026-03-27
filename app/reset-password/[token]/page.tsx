'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AuthError, AuthField, AuthInput, AuthShell, PrimaryAction } from '../../../components/auth/AuthShell';
import { useAppTranslations } from '../../../lib/utils/translations';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '@/lib/stores/themeStore';

type Stage = 'form' | 'success';

function calcStrength(pw: string, t: (key: string, fallback?: string) => string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = [
    { label: '', color: 'transparent' },
    { label: t('auth.resetPassword.veryWeak'), color: 'rgb(239,68,68)' },
    { label: t('auth.resetPassword.weak'), color: 'rgb(251,146,60)' },
    { label: t('auth.resetPassword.fair'), color: 'rgb(251,191,36)' },
    { label: t('auth.resetPassword.strong'), color: 'rgb(52,211,153)' },
    { label: t('auth.resetPassword.veryStrong'), color: 'rgb(0,229,186)' },
  ];
  return { score, ...levels[score] };
}

export default function ResetPasswordPage() {
  const { t } = useAppTranslations();
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';
  const params = useParams();
  const token = (params?.token as string) ?? '';
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [showPw, setShowPw] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [stage, setStage] = React.useState<Stage>('form');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [countdown, setCountdown] = React.useState(5);
  const muted = isLight ? '#64748b' : '#9ca3af';
  const title = isLight ? '#0f172a' : '#ffffff';
  const panelBg = isLight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.03)';
  const panelBorder = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)';

  const strength = calcStrength(password, t);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) return setError(t('auth.resetPassword.passwordTooShort'));
    if (strength.score < 2) return setError(t('auth.resetPassword.passwordTooWeak'));
    if (password !== confirm) return setError(t('auth.resetPassword.passwordsDoNotMatch'));

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStage('success');
      let current = 5;
      const timer = setInterval(() => {
        current -= 1;
        setCountdown(current);
        if (current <= 0) clearInterval(timer);
      }, 1000);
    }, 1600);
  };

  const redirectingText = t('auth.resetPassword.redirecting').replace('{seconds}', String(countdown));

  return (
    <AuthShell
      badge={t('auth.resetPassword.resetButton')}
      brandTagline={t('auth.login.brandTagline')}
      description={stage === 'form' ? t('auth.resetPassword.subtitle') : redirectingText}
      icon={<LockIcon />}
      title={stage === 'form' ? t('auth.resetPassword.title') : t('auth.resetPassword.updatedTitle')}
    >
      <AnimatePresence mode="wait">
        {stage === 'form' ? (
          <motion.form key="form" animate={{ opacity: 1 }} className="space-y-5" exit={{ opacity: 0 }} initial={{ opacity: 0 }} onSubmit={handleSubmit}>
            {token ? <p className="rounded-2xl border px-4 py-3 font-mono text-[11px]" style={{ borderColor: panelBorder, background: panelBg, color: muted }}>{t('auth.resetPassword.tokenLabel')}: {token.slice(0, 12)}...</p> : null}

            <AuthField htmlFor="new-password" label={t('auth.resetPassword.password')}>
              <div className="relative">
                <AuthInput autoComplete="new-password" id="new-password" onChange={(e) => setPassword(e.target.value)} placeholder={t('auth.resetPassword.passwordTooShort')} type={showPw ? 'text' : 'password'} value={password} />
                <button aria-label={showPw ? t('auth.resetPassword.hidePassword') : t('auth.resetPassword.showPassword')} className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors" onClick={() => setShowPw(!showPw)} style={{ color: muted }} type="button"><EyeIcon show={showPw} /></button>
              </div>
              {password.length > 0 ? <div className="mt-3" id="strength-meter"><div className="mb-1 flex gap-1">{[1, 2, 3, 4, 5].map((i) => <motion.div key={i} animate={{ background: i <= strength.score ? strength.color : (isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)') }} className="h-1 flex-1 rounded-full" initial={false} />)}</div><p className="text-[10px] font-semibold" style={{ color: strength.color }}>{strength.label}</p></div> : null}
            </AuthField>

            <AuthField htmlFor="confirm-password" label={t('auth.resetPassword.confirmPassword')}>
              <div className="relative">
                <AuthInput autoComplete="new-password" id="confirm-password" onChange={(e) => setConfirm(e.target.value)} placeholder={t('auth.resetPassword.confirmPassword')} style={{ borderColor: confirm.length > 0 && confirm !== password ? 'rgba(239,68,68,0.4)' : undefined }} type={showConfirm ? 'text' : 'password'} value={confirm} />
                <button aria-label={showConfirm ? t('auth.resetPassword.hidePassword') : t('auth.resetPassword.showPassword')} className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors" onClick={() => setShowConfirm(!showConfirm)} style={{ color: muted }} type="button"><EyeIcon show={showConfirm} /></button>
              </div>
              {confirm.length > 0 && confirm !== password ? <p className="mt-1 text-[10px] text-red-400">{t('auth.resetPassword.passwordsDoNotMatch')}</p> : null}
            </AuthField>

            <ul className="space-y-2 rounded-[1.5rem] border px-4 py-4" style={{ borderColor: panelBorder, background: panelBg }}>
              {[
                { ok: password.length >= 8, text: t('auth.resetPassword.atLeast8') },
                { ok: /[A-Z]/.test(password), text: t('auth.resetPassword.oneUppercase') },
                { ok: /[0-9]/.test(password), text: t('auth.resetPassword.oneNumber') },
                { ok: /[^A-Za-z0-9]/.test(password), text: t('auth.resetPassword.oneSpecial') },
              ].map((requirement) => (
                <li key={requirement.text} className="flex items-center gap-2 text-[11px]">
                  <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full" style={{ background: requirement.ok ? 'rgba(0,229,186,0.18)' : isLight ? 'rgba(15,23,42,0.06)' : 'rgba(255,255,255,0.06)' }}>
                    {requirement.ok ? <svg className="h-2.5 w-2.5" fill="none" stroke="rgb(0,229,186)" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg> : null}
                  </span>
                  <span style={{ color: requirement.ok ? 'rgb(0,229,186)' : muted }}>{requirement.text}</span>
                </li>
              ))}
            </ul>

            {error ? <AuthError message={error} /> : null}
            <PrimaryAction disabled={loading} type="submit">{loading ? <LoadingLabel label={t('security.updating')} /> : t('auth.resetPassword.resetButton')}</PrimaryAction>
          </motion.form>
        ) : (
          <motion.div key="success" animate={{ opacity: 1, scale: 1 }} className="space-y-5 text-center" initial={{ opacity: 0, scale: 0.96 }}>
            <div className="rounded-[1.5rem] border px-5 py-8" style={{ borderColor: 'rgba(0,229,186,0.15)', background: 'rgba(0,229,186,0.05)' }}>
              <div className="mb-4 text-5xl" style={{ color: 'rgb(0,229,186)' }}>#</div>
              <p className="text-sm" style={{ color: isLight ? '#334155' : '#d1d5db' }}>{redirectingText}</p>
            </div>
            <div className="h-1 overflow-hidden rounded-full" style={{ background: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(31,41,55,1)' }}><motion.div animate={{ width: '0%' }} className="h-full rounded-full" initial={{ width: '100%' }} style={{ background: 'rgb(0,229,186)' }} transition={{ duration: 5, ease: 'linear' }} /></div>
            <Link className="block w-full rounded-2xl py-3 text-sm font-black" href="/" style={{ background: '#00e5ba', color: '#060c14' }}>{t('auth.resetPassword.goHome')}</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthShell>
  );
}

function LoadingLabel({ label }: { label: string }) {
  return <><svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" /></svg>{label}</>;
}

function LockIcon() {
  return <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function EyeIcon({ show }: { show: boolean }) {
  return show ? <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

