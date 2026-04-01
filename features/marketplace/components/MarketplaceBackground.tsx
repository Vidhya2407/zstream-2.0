import { motion } from 'framer-motion';
import Image from 'next/image';
import { contentImages } from '../../../lib/images/unsplash';

interface MarketplaceBackgroundProps {
  isLight: boolean;
}

export default function MarketplaceBackground({ isLight }: MarketplaceBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image alt="" className="object-cover opacity-[0.05]" fill src={contentImages.climate[0].url} />
      <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to bottom, rgba(240,244,247,0.78), rgba(240,244,247,0.92), rgba(240,244,247,1))' : 'linear-gradient(to bottom, rgba(10,15,24,0.8), rgba(10,15,24,0.9), rgba(10,15,24,1))' }} />
      <motion.div animate={{ scale: [1, 1.12, 1] }} className="absolute rounded-full" style={{ width: '500px', height: '500px', top: '-15%', right: '-8%', background: 'radial-gradient(circle, rgba(0, 229, 186, 0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} transition={{ duration: 12, repeat: Infinity }} />
      <motion.div animate={{ scale: [1, 1.15, 1] }} className="absolute rounded-full" style={{ width: '380px', height: '380px', bottom: '-8%', left: '-5%', background: 'radial-gradient(circle, rgba(147, 51, 234, 0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} transition={{ duration: 10, repeat: Infinity, delay: 4 }} />
    </div>
  );
}



