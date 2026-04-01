import { motion } from 'framer-motion';

interface MinisAmbientBackgroundProps {
  isLight: boolean;
}

export default function MinisAmbientBackground({ isLight }: MinisAmbientBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div animate={{ background: [
        'radial-gradient(circle at 20% 30%, rgba(0, 229, 186, 0.08) 0%, transparent 50%)',
        'radial-gradient(circle at 80% 70%, rgba(0, 128, 255, 0.08) 0%, transparent 50%)',
        'radial-gradient(circle at 50% 50%, rgba(0, 217, 255, 0.08) 0%, transparent 50%)',
        'radial-gradient(circle at 20% 30%, rgba(0, 229, 186, 0.08) 0%, transparent 50%)',
      ] }} className="absolute inset-0" transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
      {[...Array(8)].map((_, index) => (
        <motion.div key={index} animate={{ y: [0, -40, 0], opacity: [0.3, 0.6, 0.3], scale: [1, 1.5, 1] }} className="absolute rounded-full" style={{ width: index % 2 === 0 ? '2px' : '1px', height: index % 2 === 0 ? '2px' : '1px', left: `${15 + index * 12}%`, top: `${20 + (index * 10) % 60}%`, background: index % 3 === 0 ? 'rgba(0, 229, 186, 0.3)' : 'rgba(0, 217, 255, 0.2)' }} transition={{ duration: 5 + index * 0.8, repeat: Infinity, delay: index * 0.6, ease: 'easeInOut' }} />
      ))}
      <div className="absolute inset-0" style={{ background: isLight ? 'radial-gradient(ellipse at top, rgba(240,244,247,1) 0%, rgba(232,236,240,1) 50%, rgba(224,230,236,1) 100%)' : 'radial-gradient(ellipse at top, rgba(10,30,40,1) 0%, rgba(10,15,24,1) 50%, rgba(5,10,15,1) 100%)' }} />
    </div>
  );
}


