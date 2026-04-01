'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useThemeStore } from '../../lib/stores/themeStore';
import { useHydrated } from '@/hooks/useHydrated';
import { useAppTranslations, useInstantTranslations } from '../../lib/utils/translations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const messages = useInstantTranslations();
  const { t } = useAppTranslations();

  const isLight = (hydrated ? theme : 'dark') === 'light';
  const footerBg = isLight ? 'rgba(240, 244, 247, 0.97)' : 'rgba(10, 15, 24, 0.97)';
  const footerBorder = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(0, 229, 186, 0.08)';
  const bottomBorder = isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.05)';
  const textColor = isLight ? '#1d1d1f' : 'rgb(255, 255, 255)';
  const mutedTextColor = isLight ? '#888888' : 'rgb(107, 114, 128)';
  const socialBg = isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.04)';
  const socialHoverBg = isLight ? 'rgba(0, 234, 175, 0.08)' : 'rgba(0, 229, 186, 0.1)';

  const platformLinks = [
    { label: messages.platform.music, href: '/music' },
    { label: messages.platform.shorts, href: '/shorts' },
    { label: t('platform.movies', 'Movies'), href: '/movies' },
    { label: messages.platform.sports, href: '/sports' },
    { label: messages.platform.gaming, href: '/gaming' },
    { label: messages.platform.live, href: '/live' },
  ];

  const aboutLinks = [
    { label: t('footer.methodology', 'Methodology'), href: '/methodology' },
    { label: t('footer.impactDashboard', 'Impact Dashboard'), href: '/dashboard' },
    { label: messages.platform.marketplace, href: '/marketplace' },
    { label: messages.platform.meetings, href: '/meetings' },
  ];

  const legalLinks = [
    { label: messages.footer.privacy, href: '/privacy-policy' },
    { label: messages.footer.terms, href: '/terms-of-service' },
    { label: messages.footer.cookies, href: '/cookie-policy' },
  ];

  const socialLinks = [
    {
      label: 'Twitter/X',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'GitHub',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      data-no-translate="true"
      className="relative border-t overflow-hidden"
      style={{ background: footerBg, backdropFilter: 'blur(20px)', borderColor: footerBorder }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 30% 0%, rgba(0, 229, 186, 0.04) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 app-container py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-4 mb-10 md:mb-12">
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/logo-z.svg"
                  alt="ZSTREAM"
                  width={32}
                  height={32}
                  className="drop-shadow-[0_0_10px_rgba(0,229,186,0.25)] group-hover:drop-shadow-[0_0_14px_rgba(0,229,186,0.35)] transition-all duration-300"
                />
              </div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-eco-green-bright to-eco-green bg-clip-text text-transparent">
                ZSTREAM
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-[220px]" style={{ color: mutedTextColor }}>
              {t('footer.tagline')}
            </p>
            <div
              className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(0, 229, 186, 0.06)', border: '1px solid rgba(0, 229, 186, 0.15)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-eco-green animate-pulse" />
              <span className="text-[11px] text-eco-green/70 font-medium">{t('footer.zeroCarbonBadge')}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-widest text-xs" style={{ color: textColor }}>{messages.footer.company}</h4>
            <ul className="space-y-2.5">
              {platformLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm hover:text-eco-green transition-colors duration-180" style={{ color: mutedTextColor }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-widest text-xs" style={{ color: textColor }}>{messages.footer.about}</h4>
            <ul className="space-y-2.5">
              {aboutLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm hover:text-eco-green transition-colors duration-180" style={{ color: mutedTextColor }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 uppercase tracking-widest text-xs" style={{ color: textColor }}>{messages.footer.legal}</h4>
            <ul className="space-y-2.5 mb-6">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm hover:text-eco-green transition-colors duration-180" style={{ color: mutedTextColor }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              {socialLinks.map(({ label, icon }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:text-eco-green transition-colors"
                  style={{ background: socialBg, color: mutedTextColor }}
                  whileHover={{ scale: 1.1, backgroundColor: socialHoverBg }}
                  whileTap={{ scale: 0.95 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-3" style={{ borderColor: bottomBorder, color: mutedTextColor }}>
          <p className="text-xs">Copyright {currentYear} ZSTREAM. {messages.footer.allRightsReserved}</p>
          <p className="text-xs">
            {t('footer.imagesBy', 'Images by')}{' '}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-eco-green/60 hover:text-eco-green transition-colors">
              Unsplash
            </a>
            {' '}| {t('footer.licensedUnder', 'Licensed under')}{' '}
            <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="text-eco-green/60 hover:text-eco-green transition-colors">
              Unsplash License
            </a>
          </p>
        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(0, 229, 186, 0.2), transparent)' }} />
    </footer>
  );
}


