import { motion } from 'framer-motion';
import Image from 'next/image';

interface HomeCommitmentBannerProps {
  body: string;
  buttonLabel: string;
  highlight: string;
  imageUrl: string;
  isLight: boolean;
  label: string;
  titlePrefix: string;
}

export default function HomeCommitmentBanner({ body, buttonLabel, highlight, imageUrl, isLight, label, titlePrefix }: HomeCommitmentBannerProps) {
  return (
    <section className="relative overflow-hidden py-4">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div className="relative overflow-hidden rounded-3xl" initial={{ opacity: 0, scale: 0.97 }} style={{ height: '280px' }} viewport={{ once: true }} whileInView={{ opacity: 1, scale: 1 }}>
          <Image alt="Climate action" className="object-cover" fill src={imageUrl} />
          <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(135deg, rgba(248,250,252,0.96) 0%, rgba(248,250,252,0.8) 42%, rgba(0,229,186,0.12) 100%)' : 'linear-gradient(135deg, rgba(10,15,24,0.95) 0%, rgba(10,15,24,0.6) 40%, rgba(0,229,186,0.1) 100%)' }} />
          <div className="absolute inset-0 flex items-center" style={{ padding: '0 3rem' }}>
            <motion.div className="max-w-lg" initial={{ opacity: 0, x: -20 }} transition={{ delay: 0.2 }} viewport={{ once: true }} whileInView={{ opacity: 1, x: 0 }}>
              <span className="mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ background: 'rgba(0, 229, 186, 0.15)', border: '1px solid rgba(0, 229, 186, 0.3)', color: 'rgb(0, 229, 186)' }}>
                {label}
              </span>
              <h3 className="mb-3 text-3xl font-black leading-tight" style={{ color: 'var(--app-title-color)' }}>
                {titlePrefix}<br />
                <span className="bg-gradient-to-r from-eco-green-bright to-cyan-neon bg-clip-text text-transparent">{highlight}</span>
              </h3>
              <p className="mb-5 max-w-sm text-sm leading-relaxed opacity-80" style={{ color: 'var(--app-body-color)' }}>{body}</p>
              <motion.button className="rounded-full px-6 py-2.5 text-sm font-semibold" style={{ background: 'rgba(0, 229, 186, 0.15)', border: '1px solid rgba(0, 229, 186, 0.35)', color: 'rgb(0, 229, 186)' }} whileHover={{ scale: 1.04, backgroundColor: 'rgba(0, 229, 186, 0.22)' }} whileTap={{ scale: 0.97 }}>
                {buttonLabel}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
