'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAppTranslations } from '../../lib/utils/translations';
import { toast } from 'sonner';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '@/lib/stores/themeStore';

type Step = 'account' | 'tier' | 'consent' | 'goals' | 'onboarding' | 'done';
const STEPS: Step[] = ['account', 'tier', 'consent', 'goals', 'onboarding', 'done'];

function StepBar({ current, labels }: { current: Step; labels: string[] }) {
  const idx = STEPS.indexOf(current);
  const total = STEPS.length - 1;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-0">
        {labels.slice(0, total).map((label, i) => (
          <React.Fragment key={label || i}>
            <div className="flex flex-col items-center gap-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all"
                style={{
                  background: i < idx ? 'rgb(0,229,186)' : i === idx ? 'rgba(0,229,186,0.2)' : 'rgba(255,255,255,0.07)',
                  color: i < idx ? '#060c14' : i === idx ? 'rgb(0,229,186)' : 'rgba(255,255,255,0.3)',
                  border: i === idx ? '2px solid rgb(0,229,186)' : 'none',
                }}
              >
                {i < idx ? 'OK' : i + 1}
              </div>
              <span className="text-[9px] font-semibold" style={{ color: i === idx ? 'rgb(0,229,186)' : 'rgba(255,255,255,0.25)' }}>{label}</span>
            </div>
            {i < total - 1 && <div className="flex-1 h-px mb-4 mx-1 transition-all" style={{ background: i < idx ? 'rgb(0,229,186)' : 'rgba(255,255,255,0.08)' }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function calcStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const colors = ['transparent', 'rgb(239,68,68)', 'rgb(251,146,60)', 'rgb(251,191,36)', 'rgb(0,229,186)'];
  return { score: s, color: colors[Math.min(s, 4)] };
}

export default function RegisterPage() {
  const { t } = useAppTranslations();
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';
  const stepLabels = [
    t('auth.register.stepAccount'),
    t('auth.register.stepPlan'),
    t('auth.register.stepConsent'),
    t('auth.register.stepGoals'),
    t('auth.register.stepPrefs'),
    '',
  ];
  const tiers = [
    { id: 'free', label: 'Free', price: t('auth.register.planFreePrice'), co2: t('auth.register.planFreeCo2'), accent: 'rgb(156,163,175)', border: 'rgba(156,163,175,0.25)', bg: 'rgba(156,163,175,0.12)' },
    { id: 'green', label: 'Green', price: t('auth.register.planGreenPrice'), co2: t('auth.register.planGreenCo2'), accent: 'rgb(0,229,186)', border: 'rgba(0,229,186,0.3)', bg: 'rgba(0,229,186,0.08)', popular: true },
    { id: 'carbon-zero', label: 'Carbon Zero', price: t('auth.register.planCarbonZeroPrice'), co2: t('auth.register.planCarbonZeroCo2'), accent: 'rgb(0,200,255)', border: 'rgba(0,200,255,0.3)', bg: 'rgba(0,128,255,0.08)' },
  ];
  const genres = [t('auth.register.genreAction'), t('auth.register.genreDrama'), t('auth.register.genreComedy'), t('auth.register.genreSciFi'), t('auth.register.genreDocumentary'), t('auth.register.genreHorror'), t('auth.register.genreRomance'), t('auth.register.genreThriller'), t('auth.register.genreAnimation'), t('auth.register.genreSports'), t('auth.register.genreMusic'), t('auth.register.genreGaming')];
  const languages = [t('auth.register.languageEnglish'), t('auth.register.languageGerman'), t('auth.register.languageFrench'), t('auth.register.languageSpanish'), t('auth.register.languageJapanese'), t('auth.register.languageKorean'), t('auth.register.languageItalian'), t('auth.register.languagePolish')];
  const regions = [t('auth.register.regionGermany'), t('auth.register.regionAustria'), t('auth.register.regionSwitzerland'), t('auth.register.regionFrance'), t('auth.register.regionUnitedKingdom'), t('auth.register.regionUsa'), t('auth.register.regionJapan'), t('auth.register.regionSouthKorea'), t('auth.register.regionOther')];
  const goals = [
    { label: t('auth.register.goal100'), desc: t('auth.register.goalLightViewer') },
    { label: t('auth.register.goal500'), desc: t('auth.register.goalRegularWatcher') },
    { label: t('auth.register.goal1kg'), desc: t('auth.register.goalEcoChampion') },
    { label: t('auth.register.goalMax'), desc: t('auth.register.goalPlanetWarrior') },
  ];

  const [step, setStep] = React.useState<Step>('account');
  const [dir, setDir] = React.useState(1);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPw, setConfirmPw] = React.useState('');
  const [tier, setTier] = React.useState('green');
  const [consentAge, setConsentAge] = React.useState(false);
  const [consentDsgvo, setConsentDsgvo] = React.useState(false);
  const [consentMarketing, setConsentMarketing] = React.useState(false);
  const [co2Goal, setCo2Goal] = React.useState('');
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
  const [language, setLanguage] = React.useState(t('auth.register.languageEnglish'));
  const [region, setRegion] = React.useState(t('auth.register.regionGermany'));
  const [accountError, setAccountError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const strength = calcStrength(password);
  const canSubmitOnboarding = selectedGenres.length > 0 && language && region;

  const advance = (next: Step) => { setDir(1); setStep(next); };
  const back = (prev: Step) => { setDir(-1); setStep(prev); };
  const toggleGenre = (genre: string) => setSelectedGenres((prev) => prev.includes(genre) ? prev.filter((item) => item !== genre) : [...prev, genre]);

  const handleAccountNext = () => {
    setAccountError('');
    if (!fullName.trim()) { setAccountError(t('auth.register.enterFullName')); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setAccountError(t('auth.register.validEmailError')); return; }
    if (password.length < 8) { setAccountError(t('auth.register.passwordRequirements')); return; }
    if (password !== confirmPw) { setAccountError(t('auth.register.passwordMismatch')); return; }
    advance('tier');
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || t('common.error', 'Something went wrong'));
        return;
      }

      toast.success(t('auth.register.success', 'Account created successfully!'));
      advance('done');
    } catch (err: any) {
      toast.error(t('common.error', 'Something went wrong. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -32 : 32 }),
  };

  return (
    <div data-no-translate="true" className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: isLight ? 'linear-gradient(135deg, #eef5f8 0%, #f8fbfd 50%, #eef8f4 100%)' : 'linear-gradient(135deg, #060c14 0%, #0a1220 50%, #071814 100%)' }}>
      <motion.div className="register-page-scope w-full max-w-lg relative" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 28, stiffness: 300 }}>
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-1">
            <span className="text-3xl font-black tracking-tight" style={{ background: 'linear-gradient(135deg, rgb(0,229,186), rgb(0,201,167))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ZSTREAM</span>
            <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(0,229,186,0.45)' }}>{t('auth.login.brandTagline', 'Zero Carbon Streaming')}</span>
          </Link>
        </div>

        <div className="rounded-3xl p-8" style={{ background: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.04)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.09)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: isLight ? '0 28px 80px rgba(15,23,42,0.12)' : 'none' }}>
          {step !== 'done' && <StepBar current={step} labels={stepLabels} />}

          <AnimatePresence mode="wait" custom={dir}>
            {step === 'account' && (
              <motion.div key="account" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: 'easeInOut' }}>
                <h1 className="text-white font-black text-xl mb-1">{t('auth.register.createAccount', 'Create account')}</h1>
                <p className="text-gray-400 text-sm mb-6">{t('auth.register.subtitle', 'Join ZSTREAM today')}</p>
                <div className="mb-5 flex justify-center">
                  <motion.button type="button" className="rounded-xl px-4 py-2 text-xs font-semibold transition-all" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.09)' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {t('auth.register.uploadAvatar', 'Upload avatar')}
                  </motion.button>
                </div>
                <div className="space-y-4 mb-5">
                  <LabelField label={t('auth.register.fullName')} htmlFor="full-name">
                    <input id="full-name" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ada Lovelace" autoComplete="name" className="field-input" />
                  </LabelField>
                  <LabelField label={t('auth.register.email', 'Email address')} htmlFor="reg-email">
                    <input aria-label="Email address" id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ada@example.com" autoComplete="email" className="field-input" />
                  </LabelField>
                  <LabelField label={t('auth.register.password')} htmlFor="reg-pw">
                    <input id="reg-pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('auth.register.passwordRequirements')} autoComplete="new-password" className="field-input" />
                    {password.length > 0 && (
                      <div className="mt-2" aria-label={t('auth.register.passwordStrength')}>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => <div key={i} className="flex-1 h-1 rounded-full" style={{ background: i <= strength.score ? strength.color : 'rgba(255,255,255,0.08)' }} />)}
                        </div>
                      </div>
                    )}
                  </LabelField>
                  <LabelField label={t('auth.register.confirmPassword', 'Confirm password')} htmlFor="reg-confirm-pw">
                    <input id="reg-confirm-pw" type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder={t('auth.register.confirmPassword')} autoComplete="new-password" className="field-input" />
                  </LabelField>
                </div>
                {accountError && <div className="rounded-xl px-3.5 py-2.5 mb-4 text-xs text-red-400" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>{accountError}</div>}
                <BigButton onClick={handleAccountNext}>{t('auth.register.continue', 'Continue')} ?</BigButton>
                <p className="text-center text-xs text-gray-500 mt-4">{t('auth.register.alreadyHaveAccount', 'Already have an account?')} <Link href="/login" className="font-bold" style={{ color: 'rgb(0,229,186)' }}>{t('auth.register.signin', 'Sign in')}</Link></p>
              </motion.div>
            )}

            {step === 'tier' && (
              <motion.div key="tier" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: 'easeInOut' }}>
                <h2 className="text-white font-black text-xl mb-1">{t('auth.register.choosePlan', 'Choose your plan')}</h2>
                <p className="text-gray-400 text-sm mb-6">{t('auth.register.upgradeAnytime', 'Upgrade anytime')}</p>
                <div className="space-y-3 mb-6">
                  {tiers.map((option) => (
                    <button key={option.id} type="button" aria-pressed={tier === option.id} onClick={() => setTier(option.id)} className="w-full text-left rounded-2xl p-4 relative transition-all" style={{ background: tier === option.id ? option.bg : 'rgba(255,255,255,0.03)', border: `1px solid ${tier === option.id ? option.border : 'rgba(255,255,255,0.07)'}` }}>
                      {option.popular && <span className="absolute top-3 right-3 text-[9px] font-black px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,229,186,0.2)', color: 'rgb(0,229,186)' }}>{t('auth.register.popular', 'POPULAR')}</span>}
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <span className="text-white font-black text-base">{option.label}</span>
                        <span className="text-sm font-bold" style={{ color: option.accent }}>{option.price}</span>
                      </div>
                      <p className="text-[11px]" style={{ color: option.accent }}>{option.co2}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <OutlineButton onClick={() => back('account')}>? {t('auth.register.back', 'Back')}</OutlineButton>
                  <BigButton onClick={() => advance('consent')}>{t('auth.register.continue', 'Continue')} ?</BigButton>
                </div>
              </motion.div>
            )}

            {step === 'consent' && (
              <motion.div key="consent" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: 'easeInOut' }}>
                <h2 className="text-white font-black text-xl mb-1">{t('auth.register.privacyConsent', 'Privacy & Consent')}</h2>
                <p className="text-gray-400 text-sm mb-2">{t('auth.register.privacyConsentDesc')}</p>
                <div className="rounded-xl p-3 mb-5" style={{ background: 'rgba(0,229,186,0.04)', border: '1px solid rgba(0,229,186,0.1)' }}>
                  <p className="text-[11px]" style={{ color: 'rgba(0,229,186,0.7)' }}>{t('auth.register.controllerInfo')}</p>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { id: 'age', state: consentAge, setter: setConsentAge, required: true, label: t('auth.register.confirmAge', 'I confirm I am at least 16 years old'), desc: t('auth.register.confirmAgeDesc') },
                    { id: 'dsgvo', state: consentDsgvo, setter: setConsentDsgvo, required: true, label: t('auth.register.acceptPrivacyTerms', 'I accept the Privacy Policy'), desc: t('auth.register.acceptPrivacyTermsDesc') },
                    { id: 'marketing', state: consentMarketing, setter: setConsentMarketing, required: false, label: t('auth.register.marketingConsent', 'I agree to personalised emails'), desc: t('auth.register.marketingConsentDesc') },
                  ].map((item) => (
                    <button key={item.id} type="button" role="checkbox" aria-checked={item.state} aria-label={item.label} onClick={() => item.setter(!item.state)} className="w-full text-left flex items-start gap-3 p-3.5 rounded-xl" style={{ background: item.state ? 'rgba(0,229,186,0.05)' : 'rgba(255,255,255,0.02)', border: `1px solid ${item.state ? 'rgba(0,229,186,0.2)' : 'rgba(255,255,255,0.07)'}` }}>
                      <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: item.state ? 'rgb(0,229,186)' : 'rgba(255,255,255,0.06)' }}>
                        {item.state && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{item.label}{item.required && <span className="text-red-400 ml-1">*</span>}</p>
                        <p className="text-gray-500 text-[11px] mt-0.5">{item.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <OutlineButton onClick={() => back('tier')}>? {t('auth.register.back', 'Back')}</OutlineButton>
                  <BigButton onClick={() => { if (consentAge && consentDsgvo) advance('goals'); }} disabled={!consentAge || !consentDsgvo}>{t('auth.register.continue', 'Continue')} ?</BigButton>
                </div>
                <p className="text-gray-600 text-[10px] mt-3 text-center">{t('auth.register.requiredFieldsConsent')}</p>
              </motion.div>
            )}
            {step === 'goals' && (
              <motion.div key="goals" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: 'easeInOut' }}>
                <h2 className="text-white font-black text-xl mb-1">{t('auth.register.setGoalTitle', 'Set your CO2 goal')}</h2>
                <p className="text-gray-400 text-sm mb-6">{t('auth.register.setGoalDesc')}</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {goals.map((goal) => (
                    <button key={goal.label} type="button" aria-pressed={co2Goal === goal.label} onClick={() => setCo2Goal(goal.label)} className="rounded-2xl p-4 text-center transition-all" style={{ background: co2Goal === goal.label ? 'rgba(0,229,186,0.1)' : 'rgba(255,255,255,0.03)', border: `1px solid ${co2Goal === goal.label ? 'rgba(0,229,186,0.35)' : 'rgba(255,255,255,0.07)'}` }}>
                      <p className="text-white text-sm font-bold">{goal.label}</p>
                      <p className="text-gray-500 text-[11px] mt-0.5">{goal.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="flex gap-3">
                  <OutlineButton onClick={() => back('consent')}>? {t('auth.register.back', 'Back')}</OutlineButton>
                  <BigButton onClick={() => { if (co2Goal) advance('onboarding'); }} disabled={!co2Goal}>{t('auth.register.continue', 'Continue')} ?</BigButton>
                </div>
              </motion.div>
            )}

            {step === 'onboarding' && (
              <motion.div key="onboarding" custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25, ease: 'easeInOut' }}>
                <h2 className="text-white font-black text-xl mb-1">{t('auth.register.personaliseFeed', 'Personalise your feed')}</h2>
                <p className="text-gray-400 text-sm mb-5">{t('auth.register.personaliseFeedDesc')}</p>
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{t('auth.register.favouriteGenres')} ({t('auth.register.selectedCount').replace('{count}', String(selectedGenres.length))})</p>
                  <div className="flex flex-wrap gap-2">
                    {genres.map((genre) => (
                      <button key={genre} type="button" aria-pressed={selectedGenres.includes(genre)} onClick={() => toggleGenre(genre)} className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all" style={{ background: selectedGenres.includes(genre) ? 'rgba(0,229,186,0.15)' : 'rgba(255,255,255,0.05)', color: selectedGenres.includes(genre) ? 'rgb(0,229,186)' : 'rgba(255,255,255,0.55)', border: `1px solid ${selectedGenres.includes(genre) ? 'rgba(0,229,186,0.35)' : 'transparent'}` }}>
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{t('auth.register.preferredLanguage', 'Preferred language')}</p>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-white text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }} aria-label={t('auth.register.preferredLanguage')}>
                      {languages.map((item) => <option key={item} value={item} style={{ background: '#0a0f18' }}>{item}</option>)}
                    </select>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">{t('auth.register.region', 'Region')}</p>
                    <select value={region} onChange={(e) => setRegion(e.target.value)} className="w-full px-3 py-2.5 rounded-xl text-white text-sm outline-none" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }} aria-label={t('auth.register.region')}>
                      {regions.map((item) => <option key={item} value={item} style={{ background: '#0a0f18' }}>{item}</option>)}
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <OutlineButton onClick={() => back('goals')}>? {t('auth.register.back', 'Back')}</OutlineButton>
                  <BigButton onClick={handleFinalSubmit} disabled={!canSubmitOnboarding || loading}>{loading ? t('auth.register.creatingAccount', 'Creating account') : t('auth.register.createAccount', 'Create account')}</BigButton>
                </div>
              </motion.div>
            )}

            {step === 'done' && (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', damping: 18 }} className="text-center py-4">
                <div className="text-3xl mb-4 font-black">Z</div>
                <h2 className="text-white font-black text-2xl mb-2">{t('auth.register.welcomeTitle')}</h2>
                <p className="text-gray-400 text-sm mb-1">{t('auth.register.accountCreatedFor')} <strong className="text-white">{email}</strong></p>
                <p className="text-gray-500 text-xs mb-6">{t('auth.register.planLabel')} <span className="font-semibold" style={{ color: 'rgb(0,229,186)' }}>{tiers.find((item) => item.id === tier)?.label}</span> · {t('auth.register.monthlyGoal')} <span className="font-semibold" style={{ color: 'rgb(0,229,186)' }}>{co2Goal}</span></p>
                <div className="rounded-2xl p-4 mb-6 text-left" style={{ background: 'rgba(0,229,186,0.06)', border: '1px solid rgba(0,229,186,0.15)' }}>
                  <p className="text-white text-sm font-bold mb-2">{t('auth.register.sustainabilityProfile')}</p>
                  <p className="text-gray-400 text-xs">{t('auth.register.monthlyGoal')} <strong className="text-white">{co2Goal}</strong></p>
                  <p className="text-gray-400 text-xs mt-1">{t('auth.register.favouriteGenresLabel')} <strong className="text-white">{selectedGenres.slice(0, 3).join(', ')}{selectedGenres.length > 3 ? ` +${selectedGenres.length - 3}` : ''}</strong></p>
                  <p className="text-gray-400 text-xs mt-1">{t('auth.register.regionLabel')} <strong className="text-white">{region}</strong></p>
                </div>
                <Link href="/" className="block w-full py-3 rounded-xl text-sm font-black text-center transition-all" style={{ background: 'rgb(0,229,186)', color: '#060c14' }}>
                  {t('auth.register.startWatching')} -&gt;
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        .field-input { display: block; width: 100%; padding: 12px 16px; border-radius: 12px; color: white; font-size: 0.875rem; outline: none; transition: border-color 0.15s; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); }
        .field-input::placeholder { color: rgb(75,85,99); }
        [data-theme="light"] .register-page-scope .field-input { color: #0f172a; background: rgba(255,255,255,0.92); border-color: rgba(15,23,42,0.12); }
        [data-theme="light"] .register-page-scope .field-input::placeholder { color: rgba(100,116,139,0.75); }
        [data-theme="light"] .register-page-scope select { color: #0f172a !important; background: rgba(255,255,255,0.92) !important; border-color: rgba(15,23,42,0.12) !important; }
      `}</style>
    </div>
  );
}
function LabelField({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-xs font-semibold text-gray-400 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function BigButton({ onClick, children, disabled }: { onClick?: () => void; children: React.ReactNode; disabled?: boolean }) {
  return (
    <motion.button type="button" onClick={onClick} disabled={disabled} className="flex-1 py-3 rounded-xl text-sm font-black flex items-center justify-center transition-all" style={{ background: disabled ? 'rgba(0,229,186,0.15)' : 'rgb(0,229,186)', color: disabled ? 'rgba(0,0,0,0.35)' : '#060c14' }}>
      {children}
    </motion.button>
  );
}

function OutlineButton({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <motion.button type="button" onClick={onClick} className="px-5 py-3 rounded-xl text-sm font-bold flex-shrink-0 transition-all" style={{ background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.08)' }}>
      {children}
    </motion.button>
  );
}





