import { motion } from 'framer-motion';
import { seriesGenres } from '../config';

interface MediaSeriesGenresProps {
  activeGenre: string;
  isLight: boolean;
  setActiveGenre: (value: string) => void;
}

export default function MediaSeriesGenres({ activeGenre, isLight, setActiveGenre }: MediaSeriesGenresProps) {
  return (
    <div className="mb-5 flex flex-wrap gap-2">
      {seriesGenres.map((genre) => (
        <motion.button
          className="rounded-full px-4 py-1.5 text-xs font-semibold"
          key={genre}
          onClick={() => setActiveGenre(genre)}
          style={{
            background: activeGenre === genre ? 'rgba(0,128,255,0.85)' : isLight ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)',
            color: activeGenre === genre ? 'white' : isLight ? '#6b7280' : 'rgb(107,114,128)',
            border: activeGenre === genre ? '1px solid rgba(0,128,255,0.4)' : isLight ? '1px solid rgba(0,0,0,0.08)' : '1px solid rgba(255,255,255,0.07)',
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {genre}
        </motion.button>
      ))}
    </div>
  );
}

