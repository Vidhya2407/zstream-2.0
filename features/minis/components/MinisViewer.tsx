import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ClimateActions from '../../../components/shorts/ClimateActions';
import CreatorInfoOverlay from '../../../components/shorts/CreatorInfoOverlay';
import CreatorImpactPanel from '../../../components/shorts/CreatorImpactPanel';
import EcoSavingsMicroCard from '../../../components/shorts/EcoSavingsMicroCard';
import { contentImages } from '../../../lib/images/unsplash';
import { MINIS_SIDEBAR_WIDTH } from '../config';
import type { MiniInteractions, MiniItem } from '../types';

interface MinisViewerProps {
  currentIndex: number;
  currentMini: MiniItem;
  interactions: MiniInteractions;
  isLight: boolean;
  minisCount: number;
  onInteraction: (type: keyof MiniInteractions) => void;
  onSwipe: (direction: 'up' | 'down') => void;
  watchProgress: number;
  watchTime: number;
}

export default function MinisViewer({ currentIndex, currentMini, interactions, isLight, minisCount, onInteraction, onSwipe, watchProgress, watchTime }: MinisViewerProps) {
  return (
    <div className="relative h-full flex">
      <div className="flex-1 flex items-center justify-center min-h-0 px-8 lg:px-12">
        <AnimatePresence mode="wait">
          <motion.div key={currentMini.id} animate={{ y: 0, scale: 1, opacity: 1 }} className="relative w-full h-full flex items-center justify-center" exit={{ y: '-100%', scale: 0.9, opacity: 0 }} initial={{ y: '100%', scale: 0.9, opacity: 0 }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}>
            <motion.div className="relative rounded-[28px] overflow-hidden" drag="y" dragConstraints={{ top: -100, bottom: 100 }} onDragEnd={(_, info) => {
              if (info.offset.y > 100 && info.velocity.y > 0) onSwipe('down');
              if (info.offset.y < -100 && info.velocity.y < 0) onSwipe('up');
            }} style={{ aspectRatio: '9/16', height: '100%', maxHeight: 'calc(100vh - 140px)', maxWidth: 'calc((100vh - 140px) * 9 / 16)', boxShadow: '0 0 0 1px rgba(0, 229, 186, 0.1), 0 8px 16px rgba(0, 0, 0, 0.4), 0 16px 48px rgba(0, 0, 0, 0.3), 0 24px 80px rgba(0, 229, 186, 0.15)' }} whileHover={{ scale: 1.01 }}>
              <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} />
              <div className="absolute inset-0 rounded-[28px] z-0" style={{ background: 'linear-gradient(135deg, rgba(0,229,186,0.08), transparent 50%, rgba(0,217,255,0.08))', opacity: 0.5 }} />
              <div className="absolute inset-0 z-0"><Image alt="Mini background" className="object-cover" fill priority src={contentImages.videoBackgrounds[currentIndex % contentImages.videoBackgrounds.length].url} /><div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30" /><div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" /></div>
              <div className="absolute inset-0 flex items-center justify-center z-10"><motion.div animate={{ scale: [1, 1.05, 1] }} className="text-center" transition={{ duration: 3, repeat: Infinity }}><div className="mb-4 flex justify-center"><svg className="w-24 h-24 text-eco-green-bright drop-shadow-2xl" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 20v-8m0 0c-2-2-4-4-4-6a4 4 0 018 0c0 2-2 4-4 6z" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 12c2-2 4-4 6-4a3 3 0 010 6c-2 0-4-1-6-2z" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="20" r="1.5" /></svg></div><div className="text-white font-bold text-xl drop-shadow-2xl px-4">{currentMini.title}</div><div className="text-eco-green text-sm mt-2 font-medium tracking-widest uppercase">Minis</div></motion.div></div>
              <div className="absolute z-20 hidden md:block" style={{ right: '20px', top: '50%', transform: 'translateY(-50%)' }}><ClimateActions appreciations={currentMini.appreciations} interactions={interactions} onInteraction={onInteraction} recycles={currentMini.recycles} shares={currentMini.shares} /></div>
              <EcoSavingsMicroCard co2Saved={(watchTime / 60) * 0.0043} watchProgress={watchProgress} waterSaved={(watchTime / 60) * 0.11} />
              <CreatorInfoOverlay avatarUrl={contentImages.creators[currentIndex % contentImages.creators.length].url} creator={currentMini.creator} description={currentMini.description} hashtags={currentMini.hashtags} music={currentMini.music} title={currentMini.title} verified={currentMini.verified} />
            </motion.div>
            <motion.div animate={{ opacity: 1, x: 0 }} className="absolute bottom-8 right-4 space-y-2.5 pointer-events-none z-30" initial={{ opacity: 0, x: 20 }} transition={{ delay: 0.5 }}>
              {Array.from({ length: minisCount }).map((_, index) => <motion.div key={index} animate={{ height: index === currentIndex ? 40 : 12 }} className="relative" transition={{ type: 'spring', damping: 20, stiffness: 300 }}><motion.div animate={{ boxShadow: index === currentIndex ? '0 0 16px rgba(0,229,186,0.6), 0 0 4px rgba(0,229,186,0.8)' : 'none' }} className="w-1 h-full rounded-full overflow-hidden" style={{ background: index === currentIndex ? 'linear-gradient(180deg, rgba(0,229,186,1), rgba(0,201,167,0.8))' : 'rgba(255,255,255,0.2)' }} />{index === currentIndex && <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }} className="absolute inset-0 rounded-full" style={{ background: 'rgba(0,229,186,0.3)', filter: 'blur(8px)' }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />}</motion.div>)}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="hidden xl:block flex-shrink-0 h-full" style={{ width: MINIS_SIDEBAR_WIDTH.desktop, borderLeft: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,229,186,0.1)', boxShadow: isLight ? 'inset 8px 0 16px rgba(0,0,0,0.04)' : 'inset 8px 0 16px rgba(0,0,0,0.3)' }}><div className="h-full overflow-y-auto py-6 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}><CreatorImpactPanel appreciations={currentMini.appreciations} co2SavedTotal={currentMini.co2SavedTotal} creator={currentMini.creator} energySavedTotal={currentMini.energySavedTotal} recycles={currentMini.recycles} shares={currentMini.shares} verified={currentMini.verified} views={currentMini.views} waterSavedTotal={currentMini.waterSavedTotal} /></div></div>
      <div className="hidden lg:block xl:hidden flex-shrink-0 h-full" style={{ width: MINIS_SIDEBAR_WIDTH.tablet, borderLeft: isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(0,229,186,0.1)', boxShadow: isLight ? 'inset 8px 0 16px rgba(0,0,0,0.04)' : 'inset 8px 0 16px rgba(0,0,0,0.3)' }}><div className="h-full overflow-y-auto py-6 px-3" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}><CreatorImpactPanel appreciations={currentMini.appreciations} co2SavedTotal={currentMini.co2SavedTotal} creator={currentMini.creator} energySavedTotal={currentMini.energySavedTotal} recycles={currentMini.recycles} shares={currentMini.shares} verified={currentMini.verified} views={currentMini.views} waterSavedTotal={currentMini.waterSavedTotal} /></div></div>
    </div>
  );
}
