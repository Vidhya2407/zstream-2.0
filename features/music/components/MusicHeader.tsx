import { motion } from 'framer-motion';

interface MusicHeaderProps {
  isLight: boolean;
  pageTextPrimary: string;
  pageTextSecondary: string;
  subtitle: string;
  title: string;
  onShowGema: () => void;
}

export default function MusicHeader({ isLight, pageTextPrimary, pageTextSecondary, subtitle, title, onShowGema }: MusicHeaderProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} className="flex items-center gap-5 mb-8" initial={{ opacity: 0, y: -20 }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(147,51,234,0.5), rgba(0,229,186,0.4))', border: '1px solid rgba(147,51,234,0.3)', boxShadow: '0 0 32px rgba(147,51,234,0.2)' }}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex-1">
        <h1 className="text-4xl font-black tracking-tight" style={{ color: pageTextPrimary }}>{title}</h1>
        <p className="mt-0.5" style={{ color: pageTextSecondary }}>{subtitle}</p>
      </div>
      <motion.button className="text-[10px] font-bold px-3 py-1.5 rounded-full" onClick={onShowGema} style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)', color: 'rgb(251,191,36)' }} whileHover={{ scale: 1.05 }}>
        {(isLight ? 'GEMA Licensed' : 'GEMA Licensed')} (Info)
      </motion.button>
    </motion.div>
  );
}


