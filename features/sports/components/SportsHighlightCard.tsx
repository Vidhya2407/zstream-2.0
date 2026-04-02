import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { contentImages } from '../../../lib/images/unsplash';
import type { HighlightCard } from '../../../lib/data/sportsCatalog';
import EstimatedFootprintBadge from '../../../components/impact/EstimatedFootprintBadge';

interface SportsHighlightCardProps {
  isGerman: boolean;
  isWatchlisted: boolean;
  item: HighlightCard;
  onToggleWatchlist: (id: string) => void;
}






