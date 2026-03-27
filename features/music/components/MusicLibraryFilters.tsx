import { motion } from 'framer-motion';

interface MusicLibraryFiltersProps {
  activeGenre: string;
  genres: string[];
  isLight: boolean;
  onGenreChange: (genre: string) => void;
}

export default function MusicLibraryFilters({ activeGenre, genres, isLight, onGenreChange }: MusicLibraryFiltersProps) {
  return (
    <div className="flex items-center gap-2 mb-5 flex-wrap">
      {genres.map((genre) => (
        <motion.button key={genre} className="px-3 py-1.5 rounded-full text-xs font-medium transition-all" onClick={() => onGenreChange(genre)} style={{ background: activeGenre === genre ? 'rgba(147,51,234,0.2)' : (isLight ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.04)'), border: `1px solid ${activeGenre === genre ? 'rgba(147,51,234,0.5)' : (isLight ? 'rgba(15,23,42,0.1)' : 'rgba(255,255,255,0.08)')}`, color: activeGenre === genre ? 'rgb(196,132,252)' : 'rgb(156,163,175)' }} whileHover={{ scale: 1.04 }}>
          {genre}
        </motion.button>
      ))}
    </div>
  );
}
