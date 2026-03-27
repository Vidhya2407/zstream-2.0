import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { contentImages } from '../../../lib/images/unsplash';
import type { MarketplaceItem } from '../types';

interface MarketplaceItemCardProps {
  isLight: boolean;
  item: MarketplaceItem;
  translate: (value: string) => string;
}

function MarketplaceItemCard({ isLight, item, translate }: MarketplaceItemCardProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleBuy = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      const response = await fetch('/api/payments/marketplace/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: item.id }),
      });
      const payload = await response.json();
      if (!response.ok || !payload?.success || !payload?.data?.checkoutUrl) {
        throw new Error(payload?.error || 'Unable to start checkout.');
      }
      window.location.href = payload.data.checkoutUrl as string;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start checkout.');
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div animate={{ opacity: 1, scale: 1 }} className="group relative rounded-2xl overflow-hidden cursor-pointer flex flex-col" initial={{ opacity: 0, scale: 0.9 }} style={{ background: item.color, border: `1px solid ${item.borderColor}`, backdropFilter: 'blur(12px)', transition: 'all 0.25s ease' }} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <div className="relative h-36 overflow-hidden">{item.imageIdx !== null && contentImages.merchandise[item.imageIdx] ? <><Image alt={item.title} className="object-cover group-hover:scale-110 transition-transform duration-500" fill src={contentImages.merchandise[item.imageIdx].url} /><div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,15,24,0.8)] to-transparent" /></> : <div className="w-full h-full flex items-center justify-center" style={{ background: item.color }}><div style={{ color: 'rgb(0, 229, 186)' }}>{item.icon}</div></div>}{item.badge && <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg text-[10px] font-bold" style={{ background: 'rgba(0, 229, 186, 0.2)', border: '1px solid rgba(0, 229, 186, 0.4)', color: 'rgb(0, 229, 186)' }}>{translate(item.badge)}</div>}</div>
      <div className="p-4 flex flex-col flex-1">
        <p className="font-semibold text-sm mb-0.5" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{translate(item.title)}</p>
        <p className="text-xs mb-3" style={{ color: isLight ? '#64748b' : '#6b7280' }}>{translate(item.description)}</p>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="font-bold text-sm" style={{ color: isLight ? '#0f172a' : 'rgb(0,229,186)' }}>{item.price}</span>
          <motion.button className="text-xs px-3 py-1 rounded-full font-medium disabled:opacity-70" disabled={isSubmitting} onClick={handleBuy} style={{ background: 'rgba(0, 229, 186, 0.1)', border: '1px solid rgba(0, 229, 186, 0.25)', color: 'rgb(0, 229, 186)' }} whileHover={{ scale: isSubmitting ? 1 : 1.05 }}>
            {isSubmitting ? translate('Buying') : translate('Buy')}
          </motion.button>
        </div>
        {error ? <p className="mt-2 text-[10px] font-medium text-red-400">{translate(error)}</p> : null}
      </div>
    </motion.div>
  );
}

interface MarketplaceItemGridProps {
  isLight: boolean;
  items: MarketplaceItem[];
  title: string;
  translate: (value: string) => string;
}

export default function MarketplaceItemGrid({ isLight, items, title, translate }: MarketplaceItemGridProps) {
  return (
    <>
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{items.map((item) => <MarketplaceItemCard isLight={isLight} item={item} key={item.id} translate={translate} />)}</div>
    </>
  );
}
