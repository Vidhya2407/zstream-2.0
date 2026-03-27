import { motion } from 'framer-motion';
import Image from 'next/image';
import { contentImages } from '../../../lib/images/unsplash';

interface MediaSeriesBackgroundProps {
  isLight: boolean;
}

export default function MediaSeriesBackground({ isLight }: MediaSeriesBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image alt="" className="object-cover opacity-[0.04]" fill src={contentImages.hero[0].url} />
      <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to bottom, rgba(240,244,247,0.88), rgba(240,244,247,1))' : 'linear-gradient(to bottom, rgba(10,15,24,0.88), rgba(10,15,24,1))' }} />
      <motion.div animate={{ scale: [1, 1.08, 1] }} className="absolute rounded-full" style={{ width: '700px', height: '700px', top: '-20%', left: '-10%', background: 'radial-gradient(circle, rgba(0,128,255,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} transition={{ duration: 14, repeat: Infinity }} />
      <motion.div animate={{ scale: [1, 1.12, 1] }} className="absolute rounded-full" style={{ width: '500px', height: '500px', bottom: '-10%', right: '-5%', background: 'radial-gradient(circle, rgba(0,229,186,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} transition={{ duration: 11, repeat: Infinity, delay: 5 }} />
    </div>
  );
}

