import { motion } from 'framer-motion';

interface MarketplaceHeaderProps {
  isLight: boolean;
  subtitle: string;
  title: string;
}

export default function MarketplaceHeader({ isLight, subtitle, title }: MarketplaceHeaderProps) {
  return (
    <motion.div animate={{ opacity: 1, y: 0 }} className="mb-10" initial={{ opacity: 0, y: -20 }}>
      <div className="flex items-center gap-5 mb-6"><div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0, 229, 186, 0.4), rgba(147, 51, 234, 0.3))', border: '1px solid rgba(0, 229, 186, 0.3)', boxShadow: '0 0 28px rgba(0, 229, 186, 0.15)' }}><svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div><h1 className="text-4xl font-black tracking-tight" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{title}</h1><p className="mt-0.5" style={{ color: isLight ? '#64748b' : '#9ca3af' }}>{subtitle}</p></div></div>
    </motion.div>
  );
}
