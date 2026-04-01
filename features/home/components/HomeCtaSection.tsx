import { motion } from 'framer-motion';

interface HomeCtaSectionProps {
  badge: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  titlePrefix: string;
  highlight: string;
}

export default function HomeCtaSection({ badge, body, primaryLabel, secondaryLabel, titlePrefix, highlight }: HomeCtaSectionProps) {
  return (
    <section className="relative overflow-hidden py-[var(--page-section-space)]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(0, 229, 186, 0.07) 0%, transparent 60%)' }} />
      </div>
      <motion.div className="relative z-10 app-container-narrow text-center" initial={{ opacity: 0, y: 20 }} viewport={{ once: true }} whileInView={{ opacity: 1, y: 0 }}>
        <span className="mb-6 inline-block rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ background: 'rgba(0, 229, 186, 0.08)', border: '1px solid rgba(0, 229, 186, 0.2)', color: 'rgb(0, 229, 186)' }}>
          {badge}
        </span>
        <h2 className="mb-4 text-3xl font-black leading-tight sm:text-4xl" style={{ color: 'var(--app-title-color)' }}>
          {titlePrefix}{' '}
          <span className="bg-gradient-to-r from-eco-green-bright to-eco-green bg-clip-text text-transparent">{highlight}</span>
        </h2>
        <p className="mb-10 md:mb-12 text-sm leading-relaxed" style={{ color: 'var(--app-body-color)' }}>{body}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.button className="rounded-full px-8 py-3.5 text-sm font-semibold" style={{ background: 'rgba(0, 229, 186, 0.9)', color: '#0A0F18', boxShadow: '0 0 32px rgba(0, 229, 186, 0.2)' }} whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0, 229, 186, 0.3)' }} whileTap={{ scale: 0.97 }}>
            {primaryLabel}
          </motion.button>
          <motion.button className="rounded-full px-8 py-3.5 text-sm font-semibold" style={{ border: '1px solid var(--app-border)', color: 'var(--app-body-color)' }} whileHover={{ scale: 1.04, borderColor: 'rgba(0, 229, 186, 0.4)', color: 'rgb(0, 229, 186)' }} whileTap={{ scale: 0.97 }}>
            {secondaryLabel}
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}


