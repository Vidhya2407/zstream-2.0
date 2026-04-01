'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useMusicStore } from '../../lib/stores/musicStore';
import { useThemeStore } from '../../lib/stores/themeStore';
import { useLanguageStore } from '../../lib/stores/languageStore';
import { useAppTranslations } from '../../lib/utils/translations';
import { toast } from 'sonner';
import { calculateMusicImpact, formatMusicCo2, formatMusicEwaste, formatMusicWater } from '../../lib/impact/music';

const MUSIC_DE_TEXT: Record<string, string> = {
  'Carbon Neutral Vibes': 'Kohlenstofffreie Vibes',
  'Sustainable Rhythms': 'Nachhaltige Rhythmen',
  'Planet Harmony': 'Planetare Harmonie',
  'Solar Wind': 'Sonnenwind',
  'Ocean Waves Digital': 'Digitale Ozeanwellen',
  'Forest Morning': 'Waldmorgen',
  'Rewild Anthem': 'Rewild-Hymne',
  'Zero Emission Groove': 'Null-Emissions-Groove',
  'Electric Earth': 'Elektrische Erde',
  'Nature Calls': 'Die Natur ruft',
  'Deep Blue': 'Tiefblau',
  'Green Sessions': 'Green Sessions',
  'Lyrics': 'Songtext',
  'Tap outside to close': 'Aussen tippen zum Schliessen'
};

const musicText = (value: string, language: 'en' | 'de') => language === 'de' ? (MUSIC_DE_TEXT[value] ?? value) : value;

const LYRICS = [
  'In a world of silent rivers...',
  'Where the green still holds its ground...',
  'We build our beats from solar panels...',
  'And let the carbon sleep in ground...',
  'Feel the rhythm of the future...',
  'Hear the planet breathing free...',
  'Every note a step toward morning...',
  'Zero carbon, you and me...',
  'Rise together, never alone...',
  'Plant the seeds in sonic stone...',
];

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function MiniPlayer() {
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const { t } = useAppTranslations();
  const {
    currentTrack, isPlaying, isLoading, progress, volume,
    isShuffled, isRepeating, showLyrics,
    togglePlay, setProgress, setVolume,
    nextTrack, prevTrack, clearTrack,
    toggleShuffle, toggleRepeat, toggleLyrics,
    setLoading,
  } = useMusicStore();

  const isLight = theme === 'light';
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const progressRef = React.useRef(progress);
  progressRef.current = progress;
  const durationRef = React.useRef(currentTrack?.durationSeconds ?? 0);
  durationRef.current = currentTrack?.durationSeconds ?? 0;
  const isRepeatingRef = React.useRef(isRepeating);
  isRepeatingRef.current = isRepeating;

  // Sync audio element with store state
  React.useEffect(() => {
    if (!audioRef.current || !currentTrack) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(err => {
        console.error('Playback failed:', err);
        // Don't show toast for AbortError (common when switching tracks)
        if (err.name !== 'AbortError') {
          toast.error('Playback failed: Please interact with the page first or check your connection');
        }
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack]);

  // Sync volume
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle track end and progress
  const onTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(Math.floor(audioRef.current.currentTime));
    }
  };

  const onCanPlay = () => setLoading(false);
  const onWaiting = () => setLoading(true);
  const onError = () => {
    setLoading(false);
    toast.error('Error loading audio: ' + (currentTrack?.title || 'Unknown track'));
  };

  const onEnded = () => {
    if (isRepeating) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      nextTrack();
    }
  };

  if (!currentTrack) return null;

  const dur = currentTrack.durationSeconds;
  const pct = dur > 0 ? (progress / dur) * 100 : 0;
  const lyricIdx = Math.min(
    Math.floor((progress / Math.max(dur, 1)) * LYRICS.length),
    LYRICS.length - 1
  );
  const liveImpact = calculateMusicImpact(Math.max(progress, 1), currentTrack.audioQuality ?? 'high');
  const co2Estimate = formatMusicCo2(liveImpact.estimatedCo2Grams);
  const waterEstimate = formatMusicWater(liveImpact.waterMl);
  const ewasteEstimate = formatMusicEwaste(liveImpact.ewasteMicrograms);
  const playerBackground = isLight
    ? 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(240,244,247,0.98))'
    : 'linear-gradient(135deg, rgba(8,12,24,0.98), rgba(10,15,28,0.99))';
  const playerBorder = isLight ? 'rgba(0,129,167,0.14)' : 'rgba(255,255,255,0.06)';
  const progressTrack = isLight ? 'rgba(0,129,167,0.12)' : 'rgba(255,255,255,0.06)';
  const surfaceBorder = isLight ? 'rgba(0,129,167,0.16)' : 'rgba(255,255,255,0.1)';
  const surfaceTint = isLight ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.04)';
  const overlayBackdrop = isLight ? 'rgba(240,244,247,0.82)' : 'rgba(0,0,0,0.75)';
  const imageOverlay = isLight ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.5)';
  const primaryText = isLight ? 'rgb(17,24,39)' : 'rgb(255,255,255)';
  const secondaryText = isLight ? 'rgb(100,116,139)' : 'rgb(156,163,175)';
  const mutedText = isLight ? 'rgb(100,116,139)' : 'rgb(75,85,99)';
  const iconText = isLight ? 'rgb(71,85,105)' : 'rgb(209,213,219)';

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onCanPlay={onCanPlay}
        onWaiting={onWaiting}
        onError={onError}
      />
      <AnimatePresence>
        {showLyrics && (
          <motion.div
            className="fixed inset-0 z-40 flex items-end justify-center"
            data-no-translate="true"
            style={{ background: overlayBackdrop, backdropFilter: 'blur(16px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleLyrics}
          >
            <motion.div
              className="w-full max-w-lg mx-auto px-8 pb-28 text-center"
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] mb-8" style={{ color: mutedText }}>
                {t('player.lyrics', 'Lyrics')} - {musicText(currentTrack.title, language)}
              </p>
              <div className="space-y-5">
                {LYRICS.map((line, i) => (
                  <motion.p
                    key={i}
                    className="text-xl font-bold leading-relaxed"
                    animate={{
                      color: i === lyricIdx ? 'rgb(0,229,186)' : isLight ? 'rgba(15,23,42,0.3)' : 'rgba(255,255,255,0.18)',
                      scale: i === lyricIdx ? 1.06 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
              <p className="text-[9px] mt-8" style={{ color: mutedText }}>{t('player.tapOutsideToClose', 'Tap outside to close')}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50"
        data-no-translate="true"
        style={{
          background: playerBackground,
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          borderTop: `1px solid ${playerBorder}`,
          boxShadow: isLight ? '0 -14px 36px rgba(15, 23, 42, 0.1)' : '0 -14px 36px rgba(0, 0, 0, 0.35)',
        }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: 'spring', damping: 32, stiffness: 320 }}
      >
        <div
          className="w-full h-0.5 cursor-pointer group relative"
          style={{ background: progressTrack }}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const newTime = ((e.clientX - rect.left) / rect.width) * dur;
            if (audioRef.current) {
              audioRef.current.currentTime = newTime;
            }
            setProgress(Math.round(newTime));
          }}
        >
          <div
            className="h-full transition-all duration-300 group-hover:h-1"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, rgb(0,229,186), rgb(0,217,255))',
            }}
          />
        </div>

        <div className="flex items-center gap-3 px-4 py-3 max-w-screen-xl mx-auto">
          <div
            className="relative w-11 h-11 rounded-xl overflow-hidden flex-shrink-0"
            style={{ border: `1px solid ${surfaceBorder}` }}
          >
            <Image src={currentTrack.imageUrl} alt={musicText(currentTrack.title, language)} fill sizes="44px" className="object-cover" />
            {isPlaying && (
              <div className="absolute inset-0 flex items-end justify-center gap-0.5 pb-1.5" style={{ background: imageOverlay }}>
                {[1, 2, 3].map((b) => (
                  <motion.div
                    key={b}
                    className="w-0.5 rounded-full"
                    style={{ background: 'rgb(0,229,186)' }}
                    animate={{ height: [4, 11, 5, 9, 4] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: b * 0.14 }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate" style={{ color: primaryText }}>{musicText(currentTrack.title, language)}</p>
            <p className="text-[11px] truncate" style={{ color: secondaryText }}>
              {musicText(currentTrack.artist, language)} - {musicText(currentTrack.album, language)}
            </p>
          </div>

          <span className="text-[11px] flex-shrink-0 hidden sm:block" style={{ color: mutedText }}>
            {fmt(progress)} / {currentTrack.duration}
          </span>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <motion.button
              onClick={toggleShuffle}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ color: isShuffled ? 'rgb(0,229,186)' : mutedText }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </motion.button>
            <motion.button
              onClick={prevTrack}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ color: iconText }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
              </svg>
            </motion.button>
            <motion.button
              onClick={togglePlay}
              disabled={isLoading}
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 relative"
              style={{ background: 'rgb(0,229,186)', color: '#0A0F18', opacity: isLoading ? 0.7 : 1 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              {isLoading ? (
                <motion.div
                  className="w-4 h-4 border-2 border-[#0A0F18] border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              ) : isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </motion.button>
            <motion.button
              onClick={nextTrack}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ color: iconText }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </motion.button>
            <motion.button
              onClick={toggleRepeat}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ color: isRepeating ? 'rgb(0,229,186)' : mutedText }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5 3.358 7.5 7.5 7.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 10l2.5-2.5L17 5" />
              </svg>
            </motion.button>
          </div>

          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <motion.button
              onClick={toggleLyrics}
              className="text-[11px] font-bold px-2.5 py-1 rounded-full"
              style={{
                background: showLyrics ? 'rgba(0,229,186,0.15)' : surfaceTint,
                color: showLyrics ? 'rgb(0,229,186)' : mutedText,
                border: `1px solid ${showLyrics ? 'rgba(0,229,186,0.3)' : surfaceBorder}`,
              }}
              whileHover={{ scale: 1.05 }}
            >
              {t('player.lyrics', 'Lyrics')}
            </motion.button>

            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" style={{ color: mutedText }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-3.536-9.536a5 5 0 000 7.072" />
              </svg>
              <input
                type="range" min={0} max={1} step={0.01} value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16"
                style={{ accentColor: 'rgb(0,229,186)' }}
              />
            </div>

            <div className="hidden lg:flex items-center gap-2">
              {[
                { value: co2Estimate, label: t('player.co2Estimate', 'CO2 estimate'), color: 'rgb(0,229,186)' },
                { value: waterEstimate, label: t('player.waterEstimate', 'Water estimate'), color: 'rgb(0,217,255)' },
                { value: ewasteEstimate, label: t('player.ewasteEstimate', 'E-waste estimate'), color: 'rgb(96,165,250)' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold" style={{ background: 'rgba(0,229,186,0.07)', color: item.color, border: '1px solid rgba(0,229,186,0.15)' }}>
                  <span>{item.value}</span>
                  <span style={{ color: mutedText }}>{item.label}</span>
                </div>
              ))}
            </div>

            <motion.button
              onClick={clearTrack}
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ color: mutedText }}
              whileHover={{ scale: 1.1, color: 'rgb(239,68,68)' }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}


