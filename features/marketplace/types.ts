import type { ReactNode } from 'react';

export interface MarketplaceItem {
  id: string;
  badge: string | null;
  borderColor: string;
  category: string;
  color: string;
  description: string;
  icon: ReactNode;
  imageIdx: number | null;
  price: string;
  title: string;
}
