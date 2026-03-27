'use client';

import Link from 'next/link';
import { useHydrated } from '@/hooks/useHydrated';
import { useLanguageStore } from '@/lib/stores/languageStore';
import { useThemeStore } from '@/lib/stores/themeStore';

type LocalizedText = {
  en: string;
  de: string;
};

type LegalSection = {
  title: LocalizedText;
  paragraphs?: LocalizedText[];
  bullets?: LocalizedText[];
};

type LegalDocumentProps = {
  eyebrow: LocalizedText;
  title: LocalizedText;
  intro: LocalizedText;
  sourceNote: LocalizedText;
  lastUpdated: LocalizedText;
  sections: LegalSection[];
};

export default function LegalDocument({
  eyebrow,
  title,
  intro,
  sourceNote,
  lastUpdated,
  sections,
}: LegalDocumentProps) {
  const hydratedLanguage = useHydrated(useLanguageStore);
  const hydratedTheme = useHydrated(useThemeStore);
  const { language } = useLanguageStore();
  const { theme } = useThemeStore();
  const resolvedLanguage = hydratedLanguage ? language : 'en';
  const isLight = (hydratedTheme ? theme : 'dark') === 'light';
  const copy = (value: LocalizedText) => value[resolvedLanguage];

  const pageBg = isLight
    ? 'linear-gradient(180deg, #eef5f8 0%, #f8fbfd 42%, #eef8f4 100%)'
    : 'linear-gradient(180deg, #07101a 0%, #08131d 42%, #07131a 100%)';
  const shellBg = isLight
    ? 'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(247,250,252,0.92) 100%)'
    : 'rgba(8,19,29,0.9)';
  const shellBorder = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.1)';
  const shellShadow = isLight ? '0 24px 80px rgba(15,23,42,0.12)' : '0 24px 80px rgba(0,0,0,0.35)';
  const eyebrowColor = isLight ? 'rgba(0,148,114,0.85)' : 'rgba(110,231,183,0.85)';
  const titleColor = isLight ? '#0f172a' : '#ffffff';
  const bodyColor = isLight ? '#475569' : '#cbd5e1';
  const sectionBg = isLight ? 'rgba(248,250,252,0.9)' : 'rgba(255,255,255,0.03)';
  const sectionBorder = isLight ? 'rgba(15,23,42,0.07)' : 'rgba(255,255,255,0.08)';
  const sourceBg = isLight ? 'rgba(0,229,186,0.08)' : 'rgba(0,229,186,0.06)';
  const sourceBorder = isLight ? 'rgba(0,229,186,0.16)' : 'rgba(52,211,153,0.15)';
  const pillBg = isLight ? 'rgba(255,255,255,0.9)' : 'transparent';
  const pillBorder = isLight ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.1)';
  const pillText = isLight ? '#334155' : '#e2e8f0';

  return (
    <div className="min-h-screen px-6 pb-24 pt-32" style={{ background: pageBg }}>
      <div className="mx-auto max-w-4xl">
        <div
          className="rounded-[32px] border p-8 backdrop-blur-xl md:p-10"
          style={{
            background: shellBg,
            borderColor: shellBorder,
            boxShadow: shellShadow,
          }}
        >
          <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: eyebrowColor }}>
            <span>{copy(eyebrow)}</span>
            <span className="h-1 w-1 rounded-full" style={{ background: isLight ? 'rgba(0,148,114,0.6)' : 'rgba(52,211,153,0.7)' }} />
            <span>
              {resolvedLanguage === 'de' ? 'Aktualisiert' : 'Last updated'} {copy(lastUpdated)}
            </span>
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl" style={{ color: titleColor }}>
            {copy(title)}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 md:text-lg" style={{ color: bodyColor }}>
            {copy(intro)}
          </p>

          <div className="mt-6 rounded-3xl border p-5 text-sm leading-7" style={{ background: sourceBg, borderColor: sourceBorder, color: bodyColor }}>
            <p>{copy(sourceNote)}</p>
          </div>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section
                key={section.title.en}
                className="rounded-3xl border p-6"
                style={{ background: sectionBg, borderColor: sectionBorder }}
              >
                <h2 className="text-2xl font-semibold" style={{ color: titleColor }}>
                  {copy(section.title)}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 md:text-[15px]" style={{ color: bodyColor }}>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph.en}>{copy(paragraph)}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet.en} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-400" />
                          <span>{copy(bullet)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t pt-6" style={{ borderColor: sectionBorder }}>
            <Link
              href="/privacy-policy"
              className="rounded-full border px-4 py-2 text-sm font-medium transition"
              style={{ background: pillBg, borderColor: pillBorder, color: pillText }}
            >
              {resolvedLanguage === 'de' ? 'Datenschutz' : 'Privacy Policy'}
            </Link>
            <Link
              href="/terms-of-service"
              className="rounded-full border px-4 py-2 text-sm font-medium transition"
              style={{ background: pillBg, borderColor: pillBorder, color: pillText }}
            >
              {resolvedLanguage === 'de' ? 'Nutzungsbedingungen' : 'Terms of Service'}
            </Link>
            <Link
              href="/cookie-policy"
              className="rounded-full border px-4 py-2 text-sm font-medium transition"
              style={{ background: pillBg, borderColor: pillBorder, color: pillText }}
            >
              {resolvedLanguage === 'de' ? 'Cookie-Richtlinie' : 'Cookie Policy'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
