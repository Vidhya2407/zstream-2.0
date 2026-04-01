import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { HomeFeatureDisplay, HomeFeatureIconKey } from '../config';

interface HomeFeatureSectionProps {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  features: Array<{ title: string; description: string }>;
  display: HomeFeatureDisplay[];
}

function FeatureIcon({ iconKey }: { iconKey: HomeFeatureIconKey }): ReactNode {
  switch (iconKey) {
    case 'leaf':
      return <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'spark':
      return <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case 'globe':
      return <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    default:
      return null;
  }
}

export default function HomeFeatureSection({ badge, title, highlight, description, features, display }: HomeFeatureSectionProps) {
  return (
    <section className="relative overflow-hidden py-[var(--page-section-space)]">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 229, 186, 0.05), transparent 60%)' }} />
      <div className="relative z-10 app-container">
        <motion.div className="mb-16 md:mb-20 text-center" initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }}>
          <span className="mb-4 inline-block rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ background: 'rgba(0, 229, 186, 0.08)', border: '1px solid rgba(0, 229, 186, 0.2)', color: 'rgb(0, 229, 186)' }}>
            {badge}
          </span>
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl" style={{ color: 'var(--app-title-color)' }}>
            {title}{' '}
            <span className="bg-gradient-to-r from-eco-green-bright to-cyan-neon bg-clip-text text-transparent">{highlight}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed" style={{ color: 'var(--app-body-color)' }}>{description}</p>
        </motion.div>

        <div className="grid gap-8 md:gap-10 md:grid-cols-3">
          {features.map((feature, index) => {
            const card = display[index];
            if (!card) return null;

            return (
              <motion.div key={feature.title} className="glass-card group relative overflow-hidden rounded-3xl p-8" initial={{ opacity: 0, y: 30 }} transition={{ delay: index * 0.12 }} viewport={{ once: true }} whileHover={{ y: -8, transition: { duration: 0.3 } }} whileInView={{ opacity: 1, y: 0 }}>
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10" style={{ background: card.hoverGradient }} />
                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: card.iconBackground, color: card.iconColor, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <FeatureIcon iconKey={card.iconKey} />
                </div>
                <h3 className="relative mb-3 text-xl font-bold" style={{ color: 'var(--app-title-color)' }}>{feature.title}</h3>
                <p className="relative text-[15px] leading-relaxed opacity-70" style={{ color: 'var(--app-body-color)' }}>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


