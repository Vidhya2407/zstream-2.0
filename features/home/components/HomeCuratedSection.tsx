import { motion } from 'framer-motion';
import PremiumContentCard from '../../../components/content/PremiumContentCard';

interface HomeCuratedSectionProps {
  badge: string;
  title: string;
  highlight: string;
  viewAllLabel: string;
  items: any[];
}

export default function HomeCuratedSection({ badge, title, highlight, viewAllLabel, items }: HomeCuratedSectionProps) {
  return (
    <section className="relative py-[var(--page-section-space)]">
      <div className="app-container">
        <motion.div className="mb-12 md:mb-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" initial={{ opacity: 0 }} viewport={{ once: true }} whileInView={{ opacity: 1 }}>
          <div>
            <span className="mb-3 inline-block rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ background: 'rgba(0, 229, 186, 0.08)', border: '1px solid rgba(0, 229, 186, 0.2)', color: 'rgb(0, 229, 186)' }}>
              {badge}
            </span>
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl" style={{ color: 'var(--app-title-color)' }}>
              {title}{' '}
              <span className="bg-gradient-to-r from-eco-green to-cyan-neon bg-clip-text text-transparent">{highlight}</span>
            </h2>
          </div>
          <motion.button className="flex items-center gap-1.5 text-sm transition-colors" style={{ color: 'var(--app-body-color)' }} whileHover={{ x: 3, color: 'rgb(0, 229, 186)' }}>
            {viewAllLabel}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </motion.button>
        </motion.div>
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {items.map((content, index) => (
            <PremiumContentCard key={content.id ?? index} index={index} {...content} />
          ))}
        </div>
      </div>
    </section>
  );
}


