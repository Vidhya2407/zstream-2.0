import React from 'react';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { marketplaceCategories, marketplaceItems, translateMarketplace } from '../config';

export function useMarketplaceScreen() {
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const [activeCategory, setActiveCategory] = React.useState('All');
  const isGerman = language === 'de';
  const isLight = theme === 'light';
  const tr = React.useCallback((value: string) => translateMarketplace(value, isGerman), [isGerman]);
  const filtered = React.useMemo(() => activeCategory === 'All' ? marketplaceItems : marketplaceItems.filter((item) => item.category === activeCategory), [activeCategory]);

  return {
    activeCategory,
    categories: marketplaceCategories,
    filtered,
    isGerman,
    isLight,
    setActiveCategory,
    tr,
  };
}
