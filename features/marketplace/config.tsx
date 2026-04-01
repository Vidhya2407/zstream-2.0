import type { MarketplaceItem } from './types';

export const marketplaceCategories = ['All', 'Merch', 'Credits', 'NFT', 'Plan'] as const;

export const MARKET_TRANSLATIONS: Record<string, string> = {
  'Green Marketplace': 'Gruener Marktplatz',
  'Carbon credits, eco merch, and sustainable digital goods': 'CO2-Zertifikate, Oeko-Merch und nachhaltige digitale Gueter',
  All: 'Alle',
  Merch: 'Eco-Merch',
  Credits: 'CO2-Zertifikate',
  NFT: 'Gruene NFTs',
  Plan: 'Abos',
  'Featured Drop': 'Empfohlener Drop',
  'Annual Carbon Offset Bundle': 'Jahrespaket fuer CO2-Ausgleich',
  'Offset 10 tonnes of CO2 - enough for one average household': '10 Tonnen CO2 ausgleichen - genug fuer einen durchschnittlichen Haushalt',
  'All Items': 'Alle Artikel',
  'Carbon Credits': 'CO2-Zertifikate',
  'Verified offset units': 'Verifizierte Ausgleichseinheiten',
  Popular: 'Beliebt',
  'Eco Hoodie': 'Oeko-Hoodie',
  'Organic cotton, plant dye': 'Bio-Baumwolle, Pflanzenfarbe',
  'Green NFTs': 'Gruene NFTs',
  'Climate art collection': 'Klima-Kunstkollektion',
  New: 'Neu',
  'Premium Plan': 'Premium-Abo',
  '4K + Carbon tracking': '4K + CO2-Tracking',
  'Best Value': 'Bestes Angebot',
  'Bamboo Bottle': 'Bambusflasche',
  'BPA-free, reusable': 'BPA-frei, wiederverwendbar',
  'Offset Package': 'Ausgleichspaket',
  'Annual 5-tonne offset': 'Jaehrlicher 5-Tonnen-Ausgleich',
  'Zero Waste Kit': 'Zero-Waste-Kit',
  'Complete starter bundle': 'Komplettes Starter-Bundle',
  Bundle: 'Bundle',
  'Plantable T-Shirt': 'Pflanzbares T-Shirt',
  'Grows wildflowers': 'Laesst Wildblumen wachsen',
  Buy: 'Kaufen',
  Buying: 'Wird gekauft',
  'Checkout ready': 'Checkout bereit',
  'Payment canceled': 'Zahlung abgebrochen',
  'Stripe is not configured yet.': 'Stripe ist noch nicht konfiguriert.',
};

const globeIcon = (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const imageIcon = (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const sparklesIcon = (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const recycleIcon = (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const marketplaceItems: MarketplaceItem[] = [
  { id: 'carbon-credits-pack', title: 'Carbon Credits', description: 'Verified offset units', price: '$79', imageIdx: 0, category: 'Credits', badge: 'Popular', color: 'rgba(0, 229, 186, 0.15)', borderColor: 'rgba(0, 229, 186, 0.3)', icon: globeIcon },
  { id: 'eco-hoodie', title: 'Eco Hoodie', description: 'Organic cotton, plant dye', price: '$49', imageIdx: 0, category: 'Merch', badge: null, color: 'rgba(0, 128, 255, 0.1)', borderColor: 'rgba(0, 128, 255, 0.2)', icon: null },
  { id: 'green-nft-drop', title: 'Green NFTs', description: 'Climate art collection', price: '$149', imageIdx: 1, category: 'NFT', badge: 'New', color: 'rgba(147, 51, 234, 0.1)', borderColor: 'rgba(147, 51, 234, 0.25)', icon: imageIcon },
  { id: 'premium-plan-monthly', title: 'Premium Plan', description: '4K + Carbon tracking', price: '$9.99/mo', imageIdx: null, category: 'Plan', badge: 'Best Value', color: 'rgba(251, 191, 36, 0.1)', borderColor: 'rgba(251, 191, 36, 0.25)', icon: sparklesIcon },
  { id: 'bamboo-bottle', title: 'Bamboo Bottle', description: 'BPA-free, reusable', price: '$19', imageIdx: 1, category: 'Merch', badge: null, color: 'rgba(0, 229, 186, 0.08)', borderColor: 'rgba(0, 229, 186, 0.2)', icon: null },
  { id: 'offset-package-annual', title: 'Offset Package', description: 'Annual 5-tonne offset', price: '$59', imageIdx: null, category: 'Credits', badge: null, color: 'rgba(0, 229, 186, 0.08)', borderColor: 'rgba(0, 229, 186, 0.15)', icon: recycleIcon },
  { id: 'zero-waste-kit', title: 'Zero Waste Kit', description: 'Complete starter bundle', price: '$35', imageIdx: 2, category: 'Merch', badge: 'Bundle', color: 'rgba(0, 200, 80, 0.08)', borderColor: 'rgba(0, 200, 80, 0.2)', icon: null },
  { id: 'plantable-tshirt', title: 'Plantable T-Shirt', description: 'Grows wildflowers', price: '$29', imageIdx: 3, category: 'Merch', badge: null, color: 'rgba(0, 229, 186, 0.06)', borderColor: 'rgba(0, 229, 186, 0.12)', icon: null },
];

export function translateMarketplace(value: string, isGerman: boolean) {
  return isGerman ? (MARKET_TRANSLATIONS[value] ?? value) : value;
}



