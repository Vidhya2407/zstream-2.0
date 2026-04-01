import { motion } from 'framer-motion';
import Image from 'next/image';
import { musicText } from '../../../lib/data/musicCatalog';
import type { SupportedLanguage } from '../../../lib/types/content';
import type { Track } from '../../../types/media';

interface MusicLibraryListProps {
  currentTrack: Track | null;
  filteredTracks: Track[];
  handlePlay: (track: Track) => void;
  isLight: boolean;
  isPlaying: boolean;
  language: SupportedLanguage;
  pageTextMuted: string;
  pageTextPrimary: string;
  pageTextSecondary: string;
}

export default function MusicLibraryList({ currentTrack, filteredTracks, handlePlay, isLight, isPlaying, language, pageTextMuted, pageTextPrimary, pageTextSecondary }: MusicLibraryListProps) {
  return (
    <div className="space-y-2">
      {filteredTracks.map((track, index) => {
        const playing = currentTrack?.id === track.id && isPlaying;
        return (
          <motion.div key={track.id} animate={{ opacity: 1, x: 0 }} className="group relative rounded-2xl overflow-hidden cursor-pointer" initial={{ opacity: 0, x: -16 }} onClick={() => handlePlay(track)} style={{ background: playing ? (isLight ? 'rgba(147,51,234,0.12)' : 'rgba(147,51,234,0.08)') : (isLight ? 'rgba(255,255,255,0.72)' : 'rgba(15,25,35,0.7)'), backdropFilter: 'blur(16px)', border: `1px solid ${playing ? 'rgba(147,51,234,0.3)' : isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)'}` }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.005 }}>
            <div className="flex items-center gap-4 p-4">
              <div className="w-8 text-center flex-shrink-0">
                {playing ? (
                  <motion.div animate={{ opacity: [1, 0.7, 1] }} className="flex items-end justify-center gap-0.5 h-5" transition={{ duration: 1.5, repeat: Infinity }}>
                    {[1, 2, 3].map((bar) => <motion.div key={bar} animate={{ height: [8, 16, 8, 12, 8] }} className="w-0.5 rounded-full" style={{ background: 'rgb(196,132,252)' }} transition={{ duration: 0.8, repeat: Infinity, delay: bar * 0.15 }} />)}
                  </motion.div>
                ) : (
                  <>
                    <span className="text-sm group-hover:hidden" style={{ color: isLight ? '#6b7280' : 'rgb(107,114,128)' }}>{index + 1}</span>
                    <svg className="w-4 h-4 hidden group-hover:block mx-auto" fill="currentColor" style={{ color: isLight ? '#111827' : 'white' }} viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </>
                )}
              </div>
              <div className="w-11 h-11 rounded-xl overflow-hidden relative flex-shrink-0">
                <Image alt={musicText(track.title, language)} className="object-cover" fill sizes="44px" src={track.imageUrl} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate" style={{ color: playing ? 'rgb(196,132,252)' : pageTextPrimary }}>{musicText(track.title, language)}</p>
                <p className="text-xs mt-0.5" style={{ color: pageTextSecondary }}>{musicText(track.artist, language)} | {musicText(track.album, language)}</p>
              </div>
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full hidden sm:block flex-shrink-0" style={{ background: 'rgba(0,229,186,0.06)', color: 'rgba(0,229,186,0.7)' }}>{track.genre}</span>
              <span className="text-xs flex-shrink-0 w-10 text-right" style={{ color: pageTextMuted }}>{track.duration}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}



