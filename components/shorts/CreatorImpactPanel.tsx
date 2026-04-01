'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Eye, Leaf, Sprout, Recycle, Globe, Droplets, Zap, ShoppingBag, BadgeCheck } from 'lucide-react';
import { contentImages } from '../../lib/images/unsplash';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useThemeStore } from '../../lib/stores/themeStore';

interface CreatorImpactPanelProps {
  creator: string;
  verified: boolean;
  views: string;
  appreciations: number;
  shares: number;
  recycles: number;
  co2SavedTotal: number;
  waterSavedTotal: number;
  energySavedTotal: number;
}

interface MerchItem {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

function EyeIcon() {
  return <Eye className="w-5 h-5" strokeWidth={1.75} />;
}

function LeafIcon() {
  return <Leaf className="w-5 h-5" strokeWidth={1.75} />;
}

function SproutIcon() {
  return <Sprout className="w-5 h-5" strokeWidth={1.75} />;
}

function RecycleIcon() {
  return <Recycle className="w-5 h-5" strokeWidth={1.75} />;
}

function EarthIcon({ className }: { className?: string }) {
  return <Globe className={className ?? 'w-4 h-4'} strokeWidth={1.75} />;
}

function WaterIcon({ className }: { className?: string }) {
  return <Droplets className={className ?? 'w-4 h-4'} strokeWidth={1.75} />;
}

function EnergyIcon({ className }: { className?: string }) {
  return <Zap className={className ?? 'w-4 h-4'} strokeWidth={1.75} />;
}

function ShopIcon() {
  return <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />;
}

function VerifiedIcon() {
  return <BadgeCheck className="w-3 h-3" strokeWidth={2} />;
}

export default function CreatorImpactPanel({
  creator,
  verified,
  views,
  appreciations,
  shares,
  recycles,
  co2SavedTotal,
  waterSavedTotal,
  energySavedTotal
}: CreatorImpactPanelProps) {
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const isLight = theme === 'light';
  const isGerman = language === 'de';

  const formatCount = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const merchItems: MerchItem[] = [
    { id: 1, name: isGerman ? 'Eco-Hoodie' : 'Eco Hoodie', price: 'EUR 49', imageUrl: contentImages.merchandise[0].url },
    { id: 2, name: isGerman ? 'Bambusflasche' : 'Bamboo Bottle', price: 'EUR 19', imageUrl: contentImages.merchandise[1].url },
    { id: 3, name: isGerman ? 'Pflanzbares T-Shirt' : 'Plantable T-Shirt', price: 'EUR 29', imageUrl: contentImages.merchandise[2].url }
  ];

  const creatorAvatar = contentImages.creators[0];

  const glassBg = {
    background: isLight ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.86), rgba(248, 250, 252, 0.82))' : 'linear-gradient(135deg, rgba(15, 25, 35, 0.85), rgba(10, 20, 30, 0.75))',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: isLight ? '1px solid rgba(15, 23, 42, 0.08)' : '1px solid rgba(0, 229, 186, 0.2)',
    boxShadow: isLight ? '0 16px 38px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(255,255,255,0.6)' : '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 229, 186, 0.1)'
  };

  const glassHover = {
    boxShadow: isLight ? '0 18px 42px rgba(15, 23, 42, 0.16), 0 0 0 1px rgba(0, 229, 186, 0.16)' : '0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 229, 186, 0.2)'
  };

  const engagementStats = [
    { icon: <EyeIcon />, value: views, label: isGerman ? 'Aufrufe' : 'Views', color: 'text-gray-300', bg: 'rgba(255,255,255,0.03)' },
    { icon: <LeafIcon />, value: formatCount(appreciations), label: isGerman ? 'Likes' : 'Appreciations', color: 'text-eco-green-bright', bg: 'rgba(0,229,186,0.05)' },
    { icon: <SproutIcon />, value: formatCount(shares), label: isGerman ? 'Geteilt' : 'Shares', color: 'text-eco-green', bg: 'rgba(0,229,186,0.05)' },
    { icon: <RecycleIcon />, value: formatCount(recycles), label: 'Recycles', color: 'text-eco-green', bg: 'rgba(0,229,186,0.05)' }
  ];

  const impactRows = [
    {
      icon: <EarthIcon className="w-4 h-4 text-eco-green-bright" />,
      value: `${co2SavedTotal} kg`,
      label: isGerman ? 'CO2 eingespart' : 'CO2 Saved',
      bg: 'rgba(0,229,186,0.05)',
      hoverBg: 'rgba(0,229,186,0.08)',
      iconBg: 'rgba(0,229,186,0.15)',
      textColor: 'text-eco-green-bright'
    },
    {
      icon: <WaterIcon className="w-4 h-4 text-cyan-neon" />,
      value: `${waterSavedTotal} L`,
      label: isGerman ? 'Wasser gespart' : 'Water Saved',
      bg: 'rgba(0,217,255,0.05)',
      hoverBg: 'rgba(0,217,255,0.08)',
      iconBg: 'rgba(0,217,255,0.15)',
      textColor: 'text-cyan-neon'
    },
    {
      icon: <EnergyIcon className="w-4 h-4 text-electric-blue" />,
      value: `${energySavedTotal} kWh`,
      label: isGerman ? 'Energie gespart' : 'Energy Saved',
      bg: 'rgba(0,128,255,0.05)',
      hoverBg: 'rgba(0,128,255,0.08)',
      iconBg: 'rgba(0,128,255,0.15)',
      textColor: 'text-electric-blue'
    }
  ];

  return (
    <>
      <motion.div className="rounded-[20px] p-5 relative overflow-hidden" style={glassBg} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} whileHover={glassHover}>
        <div className="absolute inset-0 opacity-50" style={{ background: 'radial-gradient(circle at top right, rgba(0, 229, 186, 0.08), transparent 60%)' }} />

        <div className="flex items-center gap-3 mb-4 relative">
          <motion.div className="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden relative ring-2 ring-eco-green/40" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Image src={creatorAvatar.url} alt={`${creator} avatar`} width={56} height={56} className="w-full h-full object-cover" />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{creator}</span>
              {verified && <motion.div className="text-eco-green" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}><VerifiedIcon /></motion.div>}
            </div>
            <div className="text-xs font-medium" style={{ background: 'linear-gradient(90deg, rgba(0, 229, 186, 0.8), rgba(0, 217, 255, 0.6))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{isGerman ? 'Klima-Creator' : 'Climate Creator'}</div>
          </div>
        </div>

        <div className="space-y-2.5 relative">
          <motion.button className="w-full py-2.5 rounded-full font-bold text-sm relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0, 229, 186, 0.2), rgba(0, 201, 167, 0.15))', border: '1px solid rgba(0, 229, 186, 0.4)', color: 'rgb(0, 229, 186)' }} whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0, 229, 186, 0.3)' }} whileTap={{ scale: 0.98 }}>
            {isGerman ? 'Folgen' : 'Follow'}
          </motion.button>

          <motion.button className="w-full py-2.5 rounded-full font-bold text-sm" style={{ background: 'linear-gradient(135deg, rgba(0, 229, 186, 1), rgba(0, 201, 167, 0.9))', border: '1px solid rgba(0, 229, 186, 0.5)', color: 'rgba(10, 15, 24, 1)', boxShadow: '0 4px 20px rgba(0, 229, 186, 0.3)' }} whileHover={{ scale: 1.02, boxShadow: '0 6px 30px rgba(0, 229, 186, 0.5)' }} whileTap={{ scale: 0.98 }}>
            {isGerman ? 'Abonnieren EUR 5/Monat' : 'Subscribe EUR 5/month'}
          </motion.button>

          <motion.button className="w-full py-2.5 rounded-full font-semibold text-sm" style={{ background: isLight ? 'rgba(15, 23, 42, 0.04)' : 'rgba(255, 255, 255, 0.05)', border: isLight ? '1px solid rgba(15, 23, 42, 0.1)' : '1px solid rgba(255, 255, 255, 0.15)', color: isLight ? '#334155' : 'rgba(255, 255, 255, 0.9)' }} whileHover={{ scale: 1.02, backgroundColor: isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(0, 229, 186, 0.4)' }} whileTap={{ scale: 0.98 }}>
            {isGerman ? 'Klima-Kreis beitreten' : 'Join Climate Circle'}
          </motion.button>
        </div>
      </motion.div>

      <motion.div className="rounded-[20px] p-5 space-y-4 relative overflow-hidden" style={glassBg} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} whileHover={glassHover}>
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at bottom left, rgba(0, 217, 255, 0.08), transparent 70%)' }} />

        <div className="text-center pb-3 border-b border-white/5 relative">
          <h3 className="text-sm font-bold" style={{ color: isLight ? '#0f172a' : 'rgba(255,255,255,0.9)' }}>{isGerman ? 'Creator-Impact' : 'Creator Impact'}</h3>
          <div className="text-[10px] font-semibold uppercase tracking-wider mt-1" style={{ background: 'linear-gradient(90deg, rgba(0, 229, 186, 0.7), rgba(0, 217, 255, 0.5))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {isGerman ? 'Gesamter Community-Beitrag' : 'Total Community Contribution'}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 relative">
          {engagementStats.map((stat) => (
            <motion.div key={stat.label} className={`text-center p-3 rounded-xl ${stat.color}`} style={{ background: stat.bg }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.18 }}>
              <div className="flex justify-center mb-1">{stat.icon}</div>
              <div className="text-sm font-bold">{stat.value}</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-wide mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-2.5 pt-3 border-t border-white/5 relative">
          <div className="text-[10px] font-bold uppercase tracking-wider text-center mb-2" style={{ background: 'linear-gradient(90deg, rgba(0, 229, 186, 0.7), rgba(0, 217, 255, 0.5), rgba(0, 128, 255, 0.6))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {isGerman ? 'Umwelt-Einsparungen' : 'Environmental Savings'}
          </div>

          {impactRows.map((row) => (
            <motion.div key={row.label} className="flex items-center gap-2.5 p-2 rounded-xl" style={{ background: row.bg }} whileHover={{ backgroundColor: row.hoverBg }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: row.iconBg }}>{row.icon}</div>
              <div className="flex-1">
                <div className={`text-sm font-black ${row.textColor}`}>{row.value}</div>
                <div className="text-[8px] text-gray-400 uppercase tracking-wide">{row.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div className="rounded-[20px] p-5 space-y-4 relative overflow-hidden" style={glassBg} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} whileHover={glassHover}>
        <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at top left, rgba(0, 128, 255, 0.08), transparent 70%)' }} />

        <div className="flex items-center justify-between pb-3 border-b border-white/5 relative">
          <div>
            <h3 className="text-sm font-bold" style={{ color: isLight ? '#0f172a' : 'rgba(255,255,255,0.9)' }}>{isGerman ? 'Creator-Shop' : 'Creator Shop'}</h3>
            <div className="text-[10px] font-medium mt-0.5" style={{ background: 'linear-gradient(90deg, rgba(0, 229, 186, 0.6), rgba(0, 128, 255, 0.5))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{isGerman ? 'Nachhaltiger Merch' : 'Sustainable merch'}</div>
          </div>
          <span className="text-eco-green"><ShopIcon /></span>
        </div>

        <div className="space-y-2.5 relative">
          {merchItems.map((item, index) => (
            <motion.div key={item.id} className="flex items-center gap-3 p-3 rounded-[14px] cursor-pointer relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.08)' }} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.1 }} whileHover={{ scale: 1.02, borderColor: 'rgba(0,229,186,0.3)', boxShadow: '0 4px 16px rgba(0,229,186,0.15)' }} whileTap={{ scale: 0.98 }}>
              <div className="w-12 h-12 rounded-xl flex-shrink-0 overflow-hidden relative ring-1 ring-eco-green/20">
                <Image src={item.imageUrl} alt={item.name} width={48} height={48} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{item.name}</div>
                <div className="text-xs font-medium" style={{ background: 'linear-gradient(90deg, rgba(0,229,186,0.6), rgba(0,217,255,0.5))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{isGerman ? 'Umweltfreundlich' : 'Eco-friendly'}</div>
              </div>
              <div className="text-sm font-black text-eco-green-bright">{item.price}</div>
            </motion.div>
          ))}
        </div>

        <motion.button className="w-full py-2.5 rounded-full text-sm font-bold" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.12)', color: isLight ? '#475569' : 'rgba(255,255,255,0.8)' }} whileHover={{ borderColor: 'rgba(0,229,186,0.4)', color: 'rgb(0,229,186)', boxShadow: '0 4px 16px rgba(0,229,186,0.2)' }} whileTap={{ scale: 0.98 }}>
          {isGerman ? 'Alle Produkte ansehen' : 'View All Products'}
        </motion.button>
      </motion.div>
    </>
  );
}


