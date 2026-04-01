import { motion } from 'framer-motion';
import Image from 'next/image';
import { contentImages } from '../../../lib/images/unsplash';

interface MarketplaceFeaturedBannerProps {
  description: string;
  label: string;
  title: string;
}

export default function MarketplaceFeaturedBanner({ description, label, title }: MarketplaceFeaturedBannerProps) {
  return (
    <motion.div animate={{ opacity: 1, scale: 1 }} className="relative rounded-3xl overflow-hidden mb-10 cursor-pointer group" initial={{ opacity: 0, scale: 0.97 }} style={{ height: '200px' }} transition={{ delay: 0.15 }}>
      <Image alt="Marketplace featured" className="object-cover group-hover:scale-105 transition-transform duration-700" fill src={contentImages.climate[1].url} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,15,24,0.97) 0%, rgba(10,15,24,0.65) 60%, rgba(10,15,24,0.2) 100%)' }} />
      <div className="absolute inset-0 p-8 flex flex-col justify-center"><span className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full w-fit mb-3" style={{ background: 'rgba(0, 229, 186, 0.15)', border: '1px solid rgba(0, 229, 186, 0.3)', color: 'rgb(0, 229, 186)' }}>{label}</span><h2 className="text-3xl font-black text-white mb-1">{title}</h2><p className="text-gray-300 text-sm">{description}</p></div>
    </motion.div>
  );
}


