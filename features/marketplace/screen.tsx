'use client';
import { useSearchParams } from 'next/navigation';
import MarketplaceBackground from './components/MarketplaceBackground';
import MarketplaceCategoryFilter from './components/MarketplaceCategoryFilter';
import MarketplaceFeaturedBanner from './components/MarketplaceFeaturedBanner';
import MarketplaceHeader from './components/MarketplaceHeader';
import MarketplaceItemGrid from './components/MarketplaceItemGrid';
import { useMarketplaceScreen } from './hooks/useMarketplaceScreen';

export default function MarketplacePage() {
  const { activeCategory, categories, filtered, isLight, setActiveCategory, tr } = useMarketplaceScreen();
  const searchParams = useSearchParams();
  const checkoutState = searchParams.get('checkout');
  const itemId = searchParams.get('item');
  const bgGradient = isLight ? 'linear-gradient(135deg, #f0f4f7 0%, #eef2f6 55%, #f0f4f7 100%)' : 'linear-gradient(135deg, #0A0F18 0%, #0D1B2A 55%, #0A0F18 100%)';
  const checkoutMessage = checkoutState === 'success'
    ? { title: tr('Checkout ready'), detail: itemId ? `${tr('Buy')}: ${itemId}` : tr('Checkout ready'), tone: 'success' as const }
    : checkoutState === 'cancel'
      ? { title: tr('Payment canceled'), detail: tr('You can continue browsing and try again anytime.'), tone: 'muted' as const }
      : null;

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: bgGradient }}>
      <MarketplaceBackground isLight={isLight} />
      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 py-10">
        <MarketplaceHeader isLight={isLight} subtitle={tr('Carbon credits, eco merch, and sustainable digital goods')} title={tr('Green Marketplace')} />
        {checkoutMessage ? (
          <div className="mb-6 rounded-2xl px-4 py-3" style={checkoutMessage.tone === 'success' ? { background: 'rgba(0,229,186,0.12)', border: '1px solid rgba(0,229,186,0.25)' } : { background: isLight ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.04)', border: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-sm font-bold" style={{ color: checkoutMessage.tone === 'success' ? 'rgb(0,229,186)' : (isLight ? '#0f172a' : '#ffffff') }}>{checkoutMessage.title}</p>
            <p className="text-xs mt-1" style={{ color: isLight ? '#64748b' : '#9ca3af' }}>{checkoutMessage.detail}</p>
          </div>
        ) : null}
        <MarketplaceCategoryFilter activeCategory={activeCategory} categories={categories} onChange={setActiveCategory} translate={tr} />
        <MarketplaceFeaturedBanner description={tr('Offset 10 tonnes of CO2 - enough for one average household')} label={tr('Featured Drop')} title={tr('Annual Carbon Offset Bundle')} />
        <MarketplaceItemGrid isLight={isLight} items={filtered} title={activeCategory === 'All' ? tr('All Items') : tr(activeCategory)} translate={tr} />
      </div>
    </main>
  );
}
