export interface MarketplaceCheckoutProduct {
  id: string;
  name: string;
  description: string;
  amountCents: number;
  currency: 'usd';
}

export const marketplaceCheckoutCatalog: Record<string, MarketplaceCheckoutProduct> = {
  'carbon-credits-pack': {
    id: 'carbon-credits-pack',
    name: 'Carbon Credits',
    description: 'Verified offset units for beta checkout.',
    amountCents: 7900,
    currency: 'usd',
  },
  'eco-hoodie': {
    id: 'eco-hoodie',
    name: 'Eco Hoodie',
    description: 'Organic cotton hoodie with plant dye finish.',
    amountCents: 4900,
    currency: 'usd',
  },
  'green-nft-drop': {
    id: 'green-nft-drop',
    name: 'Green NFTs',
    description: 'Climate art collection beta purchase.',
    amountCents: 14900,
    currency: 'usd',
  },
  'premium-plan-monthly': {
    id: 'premium-plan-monthly',
    name: 'Premium Plan',
    description: 'Monthly premium beta plan with 4K and carbon tracking.',
    amountCents: 999,
    currency: 'usd',
  },
  'bamboo-bottle': {
    id: 'bamboo-bottle',
    name: 'Bamboo Bottle',
    description: 'Reusable BPA-free bamboo bottle.',
    amountCents: 1900,
    currency: 'usd',
  },
  'offset-package-annual': {
    id: 'offset-package-annual',
    name: 'Offset Package',
    description: 'Annual 5-tonne offset package.',
    amountCents: 5900,
    currency: 'usd',
  },
  'zero-waste-kit': {
    id: 'zero-waste-kit',
    name: 'Zero Waste Kit',
    description: 'Complete zero-waste starter bundle.',
    amountCents: 3500,
    currency: 'usd',
  },
  'plantable-tshirt': {
    id: 'plantable-tshirt',
    name: 'Plantable T-Shirt',
    description: 'Plantable shirt that grows wildflowers.',
    amountCents: 2900,
    currency: 'usd',
  },
};

export function getMarketplaceCheckoutProduct(productId: string) {
  return marketplaceCheckoutCatalog[productId] ?? null;
}


