import { Suspense } from 'react';
import type { Metadata } from 'next';
import MarketplaceScreen from '../../features/marketplace/screen';

export const metadata: Metadata = {
  title: 'Marketplace',
};

export default function MarketplacePage() {
  return (
    <Suspense fallback={null}>
      <MarketplaceScreen />
    </Suspense>
  );
}
