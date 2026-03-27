import { motion } from 'framer-motion';

interface MarketplaceCategoryFilterProps {
  activeCategory: string;
  categories: readonly string[];
  translate: (value: string) => string;
  onChange: (value: string) => void;
}

export default function MarketplaceCategoryFilter({ activeCategory, categories, onChange, translate }: MarketplaceCategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {categories.map((category) => <motion.button key={category} className="px-4 py-1.5 rounded-full text-sm font-medium" onClick={() => onChange(category)} style={{ background: activeCategory === category ? 'rgba(0, 229, 186, 0.15)' : 'rgba(255, 255, 255, 0.04)', border: `1px solid ${activeCategory === category ? 'rgba(0, 229, 186, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`, color: activeCategory === category ? 'rgb(0, 229, 186)' : 'rgb(156, 163, 175)' }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>{translate(category)}</motion.button>)}
    </div>
  );
}
