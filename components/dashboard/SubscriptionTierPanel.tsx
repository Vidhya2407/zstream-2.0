'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHydrated } from '@/hooks/useHydrated';
import { useThemeStore } from '@/lib/stores/themeStore';

type TierId = 'free' | 'green' | 'carbon-zero';

interface Tier {
  id: TierId;
  name: string;
  priceMonthly: string;
  priceAnnual: string;
  periodMonthly: string;
  periodAnnual: string;
  tagline: string;
  color: string;
  border: string;
  glow: string;
  gradient: string;
  summary: string;
  features: string[];
  cta: string;
}

const TIERS: Tier[] = [
  {
    id: 'free',
    name: 'Free',
    priceMonthly: 'EUR0',
    priceAnnual: 'EUR0',
    periodMonthly: 'always free',
    periodAnnual: 'always free',
    tagline: 'A simple way to start watching on ZSTREAM.',
    color: 'rgb(156,163,175)',
    border: 'rgba(156,163,175,0.2)',
    glow: 'rgba(156,163,175,0.06)',
    gradient: 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.8))',
    summary: 'Best for casual viewing on one device.',
    features: ['480p playback', 'Ad-supported experience', 'Basic watch history'],
    cta: 'Current plan',
  },
  {
    id: 'green',
    name: 'Green',
    priceMonthly: 'EUR7.99',
    priceAnnual: 'EUR76.70',
    periodMonthly: '/ month',
    periodAnnual: '/ year',
    tagline: 'Our current plan with smoother playback and downloads.',
    color: 'rgb(0,229,186)',
    border: 'rgba(0,229,186,0.35)',
    glow: 'rgba(0,229,186,0.08)',
    gradient: 'linear-gradient(135deg, rgba(0,229,186,0.1), rgba(0,217,255,0.06))',
    summary: 'Best for regular watching across multiple devices.',
    features: ['1080p playback', 'Ad-free experience', 'Offline downloads', 'Up to 4 active devices'],
    cta: 'Current plan',
  },
  {
    id: 'carbon-zero',
    name: 'Carbon Zero',
    priceMonthly: 'EUR14.99',
    priceAnnual: 'EUR143.90',
    periodMonthly: '/ month',
    periodAnnual: '/ year',
    tagline: 'Premium playback quality and top-tier support.',
    color: 'rgb(167,139,250)',
    border: 'rgba(147,51,234,0.45)',
    glow: 'rgba(147,51,234,0.1)',
    gradient: 'linear-gradient(135deg, rgba(147,51,234,0.15), rgba(79,70,229,0.1))',
    summary: 'Best for households that want 4K and priority support.',
    features: ['4K playback where available', 'Priority support', 'Offline 4K downloads', 'Early access to selected releases'],
    cta: 'Upgrade plan',
  },
];

const CURRENT_TIER: TierId = 'green';

export default function SubscriptionTierPanel() {
  const hydrated = useHydrated(useThemeStore);
  const { theme } = useThemeStore();
  const isLight = (hydrated ? theme : 'dark') === 'light';
  const [expanded, setExpanded] = React.useState<TierId | null>(null);
  const [showAnnual, setShowAnnual] = React.useState(false);
  const title = isLight ? '#0f172a' : '#ffffff';
  const muted = isLight ? '#64748b' : '#6b7280';
  const chipBg = isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.04)';
  const chipBorder = isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.07)';

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-black" style={{ color: title }}>Subscription plan</h2>
          <p className="mt-0.5 text-[11px]" style={{ color: muted }}>
            You are currently on <span className="font-bold" style={{ color: 'rgb(0,229,186)' }}>Green</span>.
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-full p-0.5" style={{ background: chipBg, border: `1px solid ${chipBorder}` }}>
          {['Monthly', 'Annual'].map((label) => {
            const active = showAnnual ? label === 'Annual' : label === 'Monthly';
            return (
              <button
                key={label}
                onClick={() => setShowAnnual(label === 'Annual')}
                className="rounded-full px-3 py-1 text-[11px] font-semibold transition-all"
                style={{
                  background: active ? 'rgba(0,229,186,0.15)' : 'transparent',
                  color: active ? 'rgb(0,229,186)' : muted,
                }}
              >
                {label}
                {label === 'Annual' ? <span className="ml-1 text-[9px] font-black" style={{ color: 'rgb(0,229,186)' }}>save 20%</span> : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {TIERS.map((tier, i) => {
          const isCurrent = tier.id === CURRENT_TIER;
          const isExpanded = expanded === tier.id;
          const price = showAnnual ? tier.priceAnnual : tier.priceMonthly;
          const period = showAnnual ? tier.periodAnnual : tier.periodMonthly;

          return (
            <motion.div
              key={tier.id}
              className="relative cursor-pointer overflow-hidden rounded-2xl"
              style={{
                background: isLight ? 'rgba(255,255,255,0.9)' : tier.gradient,
                border: `1px solid ${isCurrent ? tier.border : chipBorder}`,
                boxShadow: isCurrent ? `0 0 32px ${tier.glow}` : isLight ? '0 16px 40px rgba(15,23,42,0.08)' : 'none',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.015 }}
              onClick={() => setExpanded(isExpanded ? null : tier.id)}
            >
              {isCurrent ? (
                <div
                  className="absolute left-0 right-0 top-0 h-0.5 rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${tier.color}, transparent)` }}
                />
              ) : null}
              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-black" style={{ color: tier.color }}>{tier.name}</span>
                      {isCurrent ? (
                        <span className="rounded-full px-2 py-0.5 text-[9px] font-black" style={{ background: `${tier.color}20`, color: tier.color }}>
                          ACTIVE
                        </span>
                      ) : null}
                    </div>
                    <p className="text-[10px] leading-tight" style={{ color: muted }}>{tier.tagline}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-base font-black" style={{ color: title }}>{price}</p>
                    <p className="text-[9px]" style={{ color: muted }}>{period}</p>
                  </div>
                </div>

                <div className="mb-3 rounded-xl px-3 py-2" style={{ background: `${tier.color}10`, border: `1px solid ${tier.color}20` }}>
                  <p className="text-[10px] font-semibold" style={{ color: title }}>{tier.summary}</p>
                </div>

                <AnimatePresence>
                  {isExpanded ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-3 overflow-hidden"
                    >
                      <div className="space-y-1.5 pt-1">
                        {tier.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke={tier.color} strokeWidth={2.5} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            <span className="text-[10px]" style={{ color: title }}>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <button
                  className="mb-3 flex items-center gap-1 text-[9px] transition-colors"
                  style={{ color: muted }}
                  onClick={(event) => {
                    event.stopPropagation();
                    setExpanded(isExpanded ? null : tier.id);
                  }}
                >
                  {isExpanded ? 'Hide details' : 'Show details'}
                  <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>+</motion.span>
                </button>

                <motion.button
                  className="w-full rounded-xl py-2 text-[11px] font-bold transition-all"
                  style={{
                    background: isCurrent ? `${tier.color}15` : `${tier.color}20`,
                    border: `1px solid ${isCurrent ? `${tier.color}35` : `${tier.color}40`}`,
                    color: isCurrent ? tier.color : title,
                    cursor: isCurrent ? 'default' : 'pointer',
                  }}
                  whileHover={!isCurrent ? { scale: 1.02 } : {}}
                  whileTap={!isCurrent ? { scale: 0.97 } : {}}
                  onClick={(event) => event.stopPropagation()}
                >
                  {isCurrent ? tier.cta : 'View plan'}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
