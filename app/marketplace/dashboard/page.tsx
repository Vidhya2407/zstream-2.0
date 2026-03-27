'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { contentImages } from '../../../lib/images/unsplash';

type DashTab = 'overview' | 'purchases' | 'nft' | 'seller' | 'sales' | 'payouts';
type ViewMode = 'buyer' | 'seller';

interface Purchase {
  id: number;
  name: string;
  category: 'carbon' | 'nft' | 'merch';
  price: string;
  date: string;
  status: 'completed' | 'processing' | 'shipped';
  imageIdx: number;
  quantity: number;
  co2Offset?: number;
}

interface NFT {
  id: number;
  name: string;
  collection: string;
  tokenId: string;
  value: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  imageIdx: number;
  mintDate: string;
  co2Saved: number;
}

interface Product {
  id: number;
  name: string;
  category: 'carbon' | 'nft' | 'merch';
  price: string;
  stock: number | 'unlimited';
  status: 'live' | 'draft' | 'sold_out';
  sold: number;
  revenue: string;
  imageIdx: number;
}

interface Review {
  id: number;
  product: string;
  reviewer: string;
  avatarIdx: number;
  rating: number;
  comment: string;
  date: string;
}

const PURCHASES: Purchase[] = [
  { id: 1, name: 'Verified Carbon Credit × 5', category: 'carbon', price: '€ 12.50', date: 'Mar 16, 2026', status: 'completed', imageIdx: 0, quantity: 5, co2Offset: 5 },
  { id: 2, name: 'Ocean Cleanup NFT #482', category: 'nft', price: '0.12 ETH', date: 'Mar 14, 2026', status: 'completed', imageIdx: 1, quantity: 1, co2Saved: 0.8 } as unknown as Purchase,
  { id: 3, name: 'ZStream Eco Hoodie (M)', category: 'merch', price: '€ 49.00', date: 'Mar 12, 2026', status: 'shipped', imageIdx: 0, quantity: 1 },
  { id: 4, name: 'Carbon Credit Bundle × 20', category: 'carbon', price: '€ 48.00', date: 'Mar 8, 2026', status: 'completed', imageIdx: 1, quantity: 20, co2Offset: 20 },
  { id: 5, name: 'Forest Guardian NFT #117', category: 'nft', price: '0.08 ETH', date: 'Mar 5, 2026', status: 'completed', imageIdx: 0, quantity: 1 },
  { id: 6, name: 'Bamboo Water Bottle', category: 'merch', price: '€ 24.00', date: 'Feb 28, 2026', status: 'completed', imageIdx: 1, quantity: 2 },
];

const NFTS: NFT[] = [
  { id: 1, name: 'Solar Sunrise', collection: 'Climate Art Vol.1', tokenId: '#0482', value: '0.18 ETH', rarity: 'epic', imageIdx: 0, mintDate: 'Mar 14, 2026', co2Saved: 1.2 },
  { id: 2, name: 'Forest Guardian', collection: 'Green NFT Series', tokenId: '#0117', value: '0.09 ETH', rarity: 'rare', imageIdx: 1, mintDate: 'Mar 5, 2026', co2Saved: 0.6 },
  { id: 3, name: 'Ocean Wave', collection: 'ZStream Genesis', tokenId: '#0031', value: '0.42 ETH', rarity: 'legendary', imageIdx: 0, mintDate: 'Feb 20, 2026', co2Saved: 2.4 },
  { id: 4, name: 'Wind Seeker', collection: 'Climate Art Vol.1', tokenId: '#0256', value: '0.05 ETH', rarity: 'common', imageIdx: 1, mintDate: 'Feb 10, 2026', co2Saved: 0.3 },
];

const PRODUCTS: Product[] = [
  { id: 1, name: 'ZStream Verified Carbon Credit', category: 'carbon', price: '€ 2.50/unit', stock: 'unlimited', status: 'live', sold: 1482, revenue: '€ 3,705', imageIdx: 0 },
  { id: 2, name: 'Eco Hoodie (Organic Cotton)', category: 'merch', price: '€ 49.00', stock: 48, status: 'live', sold: 152, revenue: '€ 7,448', imageIdx: 0 },
  { id: 3, name: 'Solar Sunrise NFT Drop', category: 'nft', price: '0.18 ETH', stock: 'unlimited', status: 'live', sold: 91, revenue: '16.38 ETH', imageIdx: 1 },
  { id: 4, name: 'ZStream Bamboo Bottle', category: 'merch', price: '€ 24.00', stock: 0, status: 'sold_out', sold: 200, revenue: '€ 4,800', imageIdx: 1 },
  { id: 5, name: 'Green Bundle NFT', category: 'nft', price: '0.05 ETH', stock: 'unlimited', status: 'draft', sold: 0, revenue: '—', imageIdx: 0 },
];

const REVIEWS: Review[] = [
  { id: 1, product: 'Eco Hoodie', reviewer: 'EcoWarrior99', avatarIdx: 0, rating: 5, comment: 'Best quality eco merch I\'ve ever bought! Worth every cent.', date: 'Mar 15, 2026' },
  { id: 2, product: 'Carbon Credits', reviewer: 'GreenStreamer', avatarIdx: 1, rating: 5, comment: 'TÜV certified offsets — transparent and trustworthy.', date: 'Mar 12, 2026' },
  { id: 3, product: 'Solar Sunrise NFT', reviewer: 'ClimateHero', avatarIdx: 2, rating: 4, comment: 'Gorgeous artwork. Wish there were more in the collection!', date: 'Mar 10, 2026' },
  { id: 4, product: 'Bamboo Bottle', reviewer: 'NatureLover', avatarIdx: 3, rating: 5, comment: 'Zero waste packaging. Exactly what I expected.', date: 'Mar 8, 2026' },
];

const PAYOUT_HISTORY = [
  { date: 'Feb 28, 2026', amount: '€ 5,420.00', status: 'paid', method: 'Stripe Connect' },
  { date: 'Jan 31, 2026', amount: '€ 3,890.50', status: 'paid', method: 'Stripe Connect' },
  { date: 'Dec 31, 2025', amount: '€ 6,142.00', status: 'paid', method: 'Stripe Connect' },
];

const TABS: { id: DashTab; label: string; icon: string; mode: ViewMode | 'both' }[] = [
  { id: 'overview', label: 'Overview', icon: '📊', mode: 'both' },
  { id: 'purchases', label: 'My Purchases', icon: '🛍️', mode: 'buyer' },
  { id: 'nft', label: 'NFT Wallet', icon: '🖼️', mode: 'buyer' },
  { id: 'seller', label: 'Products', icon: '📦', mode: 'seller' },
  { id: 'sales', label: 'Sales & Reviews', icon: '⭐', mode: 'seller' },
  { id: 'payouts', label: 'Payouts', icon: '💶', mode: 'seller' },
];

const catConfig = {
  carbon: { label: 'Carbon Credit', color: 'rgb(0,229,186)', bg: 'rgba(0,229,186,0.08)', border: 'rgba(0,229,186,0.2)', icon: '🌿' },
  nft: { label: 'NFT', color: 'rgb(196,132,252)', bg: 'rgba(196,132,252,0.08)', border: 'rgba(196,132,252,0.2)', icon: '🖼️' },
  merch: { label: 'Merch', color: 'rgb(251,191,36)', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.2)', icon: '👕' },
};

const rarityConfig = {
  common: { color: 'rgb(156,163,175)', glow: 'rgba(156,163,175,0.2)' },
  rare: { color: 'rgb(96,165,250)', glow: 'rgba(96,165,250,0.2)' },
  epic: { color: 'rgb(196,132,252)', glow: 'rgba(196,132,252,0.2)' },
  legendary: { color: 'rgb(251,191,36)', glow: 'rgba(251,191,36,0.2)' },
};

const statusConfig = {
  live: { label: 'Live', color: 'rgb(0,229,186)', bg: 'rgba(0,229,186,0.08)', border: 'rgba(0,229,186,0.2)' },
  draft: { label: 'Draft', color: 'rgb(156,163,175)', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.1)' },
  sold_out: { label: 'Sold Out', color: 'rgb(251,113,133)', bg: 'rgba(251,113,133,0.08)', border: 'rgba(251,113,133,0.2)' },
};

const purchaseStatusConfig = {
  completed: { label: 'Completed', color: 'rgb(0,229,186)' },
  processing: { label: 'Processing', color: 'rgb(251,191,36)' },
  shipped: { label: 'Shipped', color: 'rgb(96,165,250)' },
};

function OverviewTab({ mode, setMode }: { mode: ViewMode; setMode: (m: ViewMode) => void }) {
  const totalCarbonCredits = PURCHASES.filter(p => p.category === 'carbon').reduce((s, p) => s + (p.co2Offset ?? 0), 0);
  const totalRevenue = '€ 21,157.50';

  return (
    <div className="space-y-5">
      {/* Mode switcher */}
      <div className="flex gap-2 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        {(['buyer', 'seller'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} className="px-5 py-2 rounded-lg text-xs font-bold transition-all capitalize" style={mode === m ? { background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' } : { color: 'rgb(107,114,128)' }}>
            {m === 'buyer' ? '🛍️ Buyer' : '🏪 Seller'}
          </button>
        ))}
      </div>

      {mode === 'buyer' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Carbon Credits', value: `${totalCarbonCredits} t`, icon: '🌿', color: 'rgb(0,229,186)' },
              { label: 'NFTs Owned', value: NFTS.length, icon: '🖼️', color: 'rgb(196,132,252)' },
              { label: 'Total Spent', value: '€ 133.50', icon: '💶', color: 'rgb(251,191,36)' },
              { label: 'Orders', value: PURCHASES.length, icon: '📦', color: 'rgb(96,165,250)' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-black text-xl" style={{ color: s.color }}>{s.value}</div>
                <div className="text-gray-500 text-[10px] mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="p-5 rounded-2xl" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🌿</span>
              <h3 className="text-white font-bold text-sm">Carbon Credit Balance</h3>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p className="font-black text-4xl" style={{ color: 'rgb(0,229,186)' }}>{totalCarbonCredits}</p>
                <p className="text-gray-400 text-xs mt-0.5">Tonnes CO₂ offset</p>
              </div>
              <div className="flex-1">
                <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((totalCarbonCredits / 100) * 100, 100)}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, rgb(0,229,186), rgb(0,200,80))' }} />
                </div>
                <div className="flex justify-between mt-1 text-[10px] text-gray-500">
                  <span>0 t</span>
                  <span>{totalCarbonCredits}/{100} t used</span>
                  <span>100 t</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' }}>+ Buy Credits</button>
              <button className="px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.1)' }}>Redeem Credits</button>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-3">Recent Orders</h3>
            <div className="space-y-2">
              {PURCHASES.slice(0, 3).map((p, i) => {
                const cc = catConfig[p.category];
                const sc = purchaseStatusConfig[p.status];
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={contentImages.merchandise[p.imageIdx % contentImages.merchandise.length].url} alt={p.name} width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold truncate">{p.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: cc.bg, color: cc.color }}>{cc.icon} {cc.label}</span>
                        <span className="text-[10px]" style={{ color: sc.color }}>{sc.label}</span>
                      </div>
                    </div>
                    <span className="text-white text-xs font-bold flex-shrink-0">{p.price}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {mode === 'seller' && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total Revenue', value: totalRevenue, icon: '💶', color: 'rgb(251,191,36)' },
              { label: 'Active Products', value: PRODUCTS.filter(p => p.status === 'live').length, icon: '📦', color: 'rgb(0,229,186)' },
              { label: 'Total Units Sold', value: PRODUCTS.reduce((s, p) => s + p.sold, 0).toLocaleString(), icon: '🛍️', color: 'rgb(96,165,250)' },
              { label: 'Avg. Rating', value: '4.8 ⭐', icon: '⭐', color: 'rgb(251,191,36)' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="font-black text-xl text-white">{s.value}</div>
                <div className="text-gray-500 text-[10px] mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 className="text-white font-bold text-sm mb-3">Top Products</h3>
              <div className="space-y-3">
                {PRODUCTS.filter(p => p.status === 'live').map(p => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={contentImages.merchandise[p.imageIdx % contentImages.merchandise.length].url} alt={p.name} width={32} height={32} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[10px] font-semibold truncate">{p.name}</p>
                      <p className="text-gray-500 text-[9px]">{p.sold} sold · {p.revenue}</p>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: statusConfig.live.bg, color: statusConfig.live.color }}>Live</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <h3 className="text-white font-bold text-sm mb-3">Recent Reviews</h3>
              <div className="space-y-3">
                {REVIEWS.slice(0, 3).map(r => (
                  <div key={r.id} className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={contentImages.creators[r.avatarIdx % contentImages.creators.length].url} alt={r.reviewer} width={28} height={28} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-white text-[10px] font-semibold">{r.reviewer}</span>
                        <span className="text-yellow-400 text-[9px]">{'★'.repeat(r.rating)}</span>
                      </div>
                      <p className="text-gray-400 text-[9px] leading-snug line-clamp-1">{r.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function PurchasesTab() {
  const [catFilter, setCatFilter] = React.useState<'all' | 'carbon' | 'nft' | 'merch'>('all');
  const filtered = catFilter === 'all' ? PURCHASES : PURCHASES.filter(p => p.category === catFilter);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="text-white font-bold text-sm">My Purchases</h3>
        <div className="flex gap-1 ml-auto">
          {(['all', 'carbon', 'nft', 'merch'] as const).map(c => (
            <button key={c} onClick={() => setCatFilter(c)} className="px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all capitalize" style={catFilter === c ? { background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' } : { background: 'rgba(255,255,255,0.04)', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {c === 'all' ? 'All' : catConfig[c].icon + ' ' + catConfig[c].label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {filtered.map((p, i) => {
          const cc = catConfig[p.category];
          const sc = purchaseStatusConfig[p.status];
          return (
            <motion.div key={p.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <Image src={contentImages.merchandise[p.imageIdx % contentImages.merchandise.length].url} alt={p.name} width={48} height={48} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{p.name}</p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: cc.bg, color: cc.color, border: `1px solid ${cc.border}` }}>{cc.icon} {cc.label}</span>
                  <span className="text-gray-500 text-[9px]">{p.date}</span>
                  {p.co2Offset && <span className="text-[9px] font-bold" style={{ color: 'rgb(0,229,186)' }}>🌿 {p.co2Offset}t CO₂</span>}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-white font-bold text-sm">{p.price}</p>
                <p className="text-[10px] font-semibold mt-0.5" style={{ color: sc.color }}>{sc.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function NFTTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-sm">NFT Wallet ({NFTS.length} items)</h3>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-purple-400 inline-block" />
          Connected: MetaMask
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {NFTS.map((nft, i) => {
          const rc = rarityConfig[nft.rarity];
          return (
            <motion.div key={nft.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} className="rounded-2xl overflow-hidden group cursor-pointer" style={{ border: `2px solid ${rc.color}30`, boxShadow: `0 0 20px ${rc.glow}` }}>
              <div className="relative h-36 overflow-hidden">
                <Image src={contentImages.abstract[nft.imageIdx % contentImages.abstract.length].url} alt={nft.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,15,24,0.9) 0%, transparent 60%)' }} />
                <span className="absolute top-2 right-2 text-[9px] font-black px-2 py-0.5 rounded-full capitalize" style={{ background: `${rc.color}25`, color: rc.color, border: `1px solid ${rc.color}50` }}>{nft.rarity}</span>
                <p className="absolute bottom-2 left-2 right-2 text-white font-bold text-xs truncate">{nft.name}</p>
              </div>
              <div className="p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-gray-500 text-[9px] mb-1">{nft.collection} · {nft.tokenId}</p>
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-white">{nft.value}</span>
                  <span className="text-[9px] font-bold" style={{ color: 'rgb(0,229,186)' }}>🌿 {nft.co2Saved}t</span>
                </div>
                <p className="text-gray-600 text-[8px] mt-1">Minted {nft.mintDate}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SellerProductsTab() {
  const [showAddModal, setShowAddModal] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-bold text-sm">Product Manager ({PRODUCTS.length} products)</h3>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setShowAddModal(true)} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(0,229,186,0.85)', color: '#0A0F18' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
          List Product
        </motion.button>
      </div>

      <div className="overflow-x-auto rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              {['Product', 'Category', 'Price', 'Stock', 'Sold', 'Revenue', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-gray-500 font-bold text-[10px] px-4 py-3 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p, i) => {
              const cc = catConfig[p.category];
              const sc = statusConfig[p.status];
              return (
                <motion.tr key={p.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={contentImages.merchandise[p.imageIdx % contentImages.merchandise.length].url} alt={p.name} width={32} height={32} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-white font-medium truncate max-w-[120px]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: cc.bg, color: cc.color }}>{cc.icon} {cc.label}</span></td>
                  <td className="px-4 py-3 text-white font-medium">{p.price}</td>
                  <td className="px-4 py-3 text-gray-400">{p.stock === 'unlimited' ? '∞' : p.stock === 0 ? <span className="text-red-400">0</span> : p.stock}</td>
                  <td className="px-4 py-3 text-white">{p.sold.toLocaleString()}</td>
                  <td className="px-4 py-3 font-bold" style={{ color: 'rgb(0,229,186)' }}>{p.revenue}</td>
                  <td className="px-4 py-3"><span className="text-[9px] font-bold px-2 py-1 rounded-full" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{sc.label}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-gray-400 hover:text-white text-[10px] transition-colors">Edit</button>
                      <button className="text-gray-400 hover:text-yellow-400 text-[10px] transition-colors">{p.status === 'live' ? 'Unpublish' : 'Publish'}</button>
                      <button className="text-gray-400 hover:text-red-400 text-[10px] transition-colors">Delete</button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }} className="relative w-full max-w-md rounded-3xl p-6" style={{ background: 'rgba(10,15,24,0.98)', border: '1px solid rgba(0,229,186,0.2)' }}>
              <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors" aria-label="Close">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h2 className="text-white font-black text-lg mb-5">📦 List New Product</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-gray-400 text-xs block mb-1.5">Product Name <span className="text-red-400">*</span></label>
                  <input placeholder="e.g. Verified Carbon Credit" className="w-full bg-transparent border rounded-xl px-3 py-2 text-white text-sm outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
                </div>
                <div>
                  <label className="text-gray-400 text-xs block mb-1.5">Category</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['carbon', 'nft', 'merch'] as const).map(c => {
                      const cc = catConfig[c];
                      return (
                        <button key={c} className="p-2.5 rounded-xl text-xs font-bold transition-all" style={{ background: cc.bg, color: cc.color, border: `1px solid ${cc.border}` }}>
                          {cc.icon} {cc.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 text-xs block mb-1.5">Price <span className="text-red-400">*</span></label>
                    <input placeholder="€ 0.00" className="w-full bg-transparent border rounded-xl px-3 py-2 text-white text-sm outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs block mb-1.5">Stock</label>
                    <input placeholder="Unlimited" type="number" className="w-full bg-transparent border rounded-xl px-3 py-2 text-white text-sm outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
                  </div>
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setShowAddModal(false)} className="w-full mt-5 py-3 rounded-xl text-sm font-black" style={{ background: 'rgba(0,229,186,0.85)', color: '#0A0F18' }}>
                List Product
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SalesTab() {
  const salesBars = [42, 58, 71, 64, 88, 76, 92, 84, 96, 88, 94, 100];
  const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  return (
    <div className="space-y-5">
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm mb-4">Revenue Over Time</h3>
        <div className="flex items-end gap-1.5 h-28">
          {salesBars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.04, duration: 0.5 }} className="w-full rounded-t-md" style={{ background: i === salesBars.length - 1 ? 'rgb(0,229,186)' : 'rgba(0,229,186,0.3)' }} />
              <span className="text-[8px] text-gray-600">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Units Sold', value: PRODUCTS.reduce((s, p) => s + p.sold, 0).toLocaleString(), icon: '📦', color: 'rgb(96,165,250)' },
          { label: 'Avg. Rating', value: '4.8 / 5', icon: '⭐', color: 'rgb(251,191,36)' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-black text-2xl" style={{ color: s.color }}>{s.value}</div>
            <div className="text-gray-500 text-[10px]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-white font-bold text-sm">Buyer Reviews</h3>
        {REVIEWS.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image src={contentImages.creators[r.avatarIdx % contentImages.creators.length].url} alt={r.reviewer} width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-semibold">{r.reviewer}</span>
                  <span className="text-yellow-400 text-[10px]">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <p className="text-gray-500 text-[9px]">{r.product} · {r.date}</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">{r.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PayoutsTab() {
  return (
    <div className="space-y-5 max-w-2xl">
      <div className="p-5 rounded-2xl" style={{ background: 'rgba(0,229,186,0.05)', border: '1px solid rgba(0,229,186,0.15)' }}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">💶</span>
          <h3 className="text-white font-bold text-sm">Stripe Connect</h3>
          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full ml-auto" style={{ background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' }}>✓ Connected</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Next Payout', value: '€ 1,940.00', sub: 'Mar 31, 2026' },
            { label: 'This Month', value: '€ 5,242.50', sub: '+18% vs last month' },
            { label: 'Lifetime', value: '€ 21,157.50', sub: 'All time earnings' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p className="font-black text-lg text-white">{s.value}</p>
              <p className="text-gray-500 text-[9px] mt-0.5">{s.label}</p>
              <p className="text-[9px] mt-0.5" style={{ color: 'rgb(0,229,186)' }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm mb-3">Tax Documents (Germany)</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-gray-400 text-xs block mb-1.5">Steuernummer</label>
            <input type="text" placeholder="DE123456789" className="w-full bg-transparent border rounded-xl px-3 py-2 text-white text-xs outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-1.5">USt-IdNr.</label>
            <input type="text" placeholder="DE123456789" className="w-full bg-transparent border rounded-xl px-3 py-2 text-white text-xs outline-none" style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
          </div>
        </div>
        <button className="px-4 py-2 rounded-xl text-[10px] font-bold" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.1)' }}>Save Tax Info</button>
      </div>

      <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <h3 className="text-white font-bold text-sm mb-3">Payout History</h3>
        <div className="space-y-2">
          {PAYOUT_HISTORY.map((p, i) => (
            <motion.div key={p.date} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="flex items-center justify-between p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div>
                <p className="text-white text-xs font-semibold">{p.amount}</p>
                <p className="text-gray-500 text-[9px]">{p.date} · {p.method}</p>
              </div>
              <span className="text-[9px] font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(0,229,186,0.1)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.2)' }}>✓ {p.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MarketplaceDashboardPage() {
  const [activeTab, setActiveTab] = React.useState<DashTab>('overview');
  const [viewMode, setViewMode] = React.useState<ViewMode>('buyer');

  const visibleTabs = TABS.filter(t => t.mode === 'both' || t.mode === viewMode);

  return (
    <main className="min-h-screen relative overflow-x-hidden" style={{ background: '#0A0F18' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute rounded-full" style={{ width: '600px', height: '600px', top: '-15%', right: '-5%', background: 'radial-gradient(circle, rgba(0,229,186,0.07) 0%, transparent 70%)', filter: 'blur(70px)' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 14, repeat: Infinity }} />
        <motion.div className="absolute rounded-full" style={{ width: '400px', height: '400px', bottom: '-10%', left: '-5%', background: 'radial-gradient(circle, rgba(196,132,252,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 10, repeat: Infinity, delay: 5 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">
        <motion.div className="flex flex-wrap items-center justify-between gap-4 mb-7" initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(0,229,186,0.4), rgba(196,132,252,0.3))', border: '1px solid rgba(0,229,186,0.3)' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 2.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" /></svg>
            </div>
            <div>
              <h1 className="text-white font-black text-2xl">Marketplace Dashboard</h1>
              <p className="text-gray-500 text-xs">Carbon Credits · NFTs · Eco Merch</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              {(['buyer', 'seller'] as const).map(m => (
                <button key={m} onClick={() => { setViewMode(m); setActiveTab('overview'); }} className="px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all" style={viewMode === m ? { background: 'rgba(0,229,186,0.15)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.3)' } : { color: 'rgb(107,114,128)' }}>
                  {m === 'buyer' ? '🛍️ Buyer' : '🏪 Seller'}
                </button>
              ))}
            </div>
            <Link href="/marketplace">
              <button className="px-4 py-2 rounded-xl text-xs font-bold" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgb(156,163,175)', border: '1px solid rgba(255,255,255,0.08)' }}>← Marketplace</button>
            </Link>
          </div>
        </motion.div>

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1" role="tablist">
          {visibleTabs.map(t => (
            <button key={t.id} role="tab" aria-selected={activeTab === t.id} onClick={() => setActiveTab(t.id)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex-shrink-0" style={activeTab === t.id ? { background: 'rgba(0,229,186,0.12)', color: 'rgb(0,229,186)', border: '1px solid rgba(0,229,186,0.25)' } : { background: 'transparent', color: 'rgb(107,114,128)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab + viewMode} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.16 }}>
            {activeTab === 'overview' && <OverviewTab mode={viewMode} setMode={setViewMode} />}
            {activeTab === 'purchases' && <PurchasesTab />}
            {activeTab === 'nft' && <NFTTab />}
            {activeTab === 'seller' && <SellerProductsTab />}
            {activeTab === 'sales' && <SalesTab />}
            {activeTab === 'payouts' && <PayoutsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
