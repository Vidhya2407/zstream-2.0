'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Hls from 'hls.js';
import { useSettingsStore } from '../../lib/stores/settingsStore';
import { useThemeStore } from '../../lib/stores/themeStore';

export interface DRMConfig {
  widevine?: string;
  playready?: string;
  fairplay?: string;
}

type QualityValue = 'auto' | '1080' | '720' | '480' | '360';

export interface ShakaPlayerProps {
  src: string;
  drm?: DRMConfig;
  isPremium?: boolean;
  showQualitySelector?: boolean;
  onQualityChange?: (quality: { label: string; resolution: number }) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

interface ShakaVariantTrack {
  id?: number;
  active?: boolean;
  height?: number;
  bandwidth?: number;
}

interface ShakaPlayerInstance {
  configure(config: Record<string, unknown>): void;
  load(url: string): Promise<void>;
  destroy(): Promise<void>;
  addEventListener(event: string, handler: (e: unknown) => void): void;
  getVariantTracks?: () => ShakaVariantTrack[];
  selectVariantTrack?: (track: ShakaVariantTrack, clearBuffer?: boolean) => void;
}

interface ShakaStatic {
  Player: {
    new (video: HTMLVideoElement): ShakaPlayerInstance;
    isBrowserSupported(): boolean;
  };
  polyfill: { installAll(): void };
}

const SHAKA_CDN =
  'https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.7.11/shaka-player.compiled.min.js';

const QUALITY_OPTIONS: { value: QualityValue; label: string; resolution: number }[] = [
  { value: 'auto', label: 'Auto', resolution: 720 },
  { value: '1080', label: '1080p', resolution: 1080 },
  { value: '720', label: '720p', resolution: 720 },
  { value: '480', label: '480p', resolution: 480 },
  { value: '360', label: '360p', resolution: 360 },
];

const MANUAL_QUALITY_OPTIONS = QUALITY_OPTIONS.filter((option) => option.value !== 'auto');

function getWindowShaka(): ShakaStatic | undefined {
  return (window as unknown as Record<string, unknown>)['shaka'] as ShakaStatic | undefined;
}

function loadShakaScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (getWindowShaka()) {
      resolve();
      return;
    }
    if (document.querySelector(`script[src="${SHAKA_CDN}"]`)) {
      const existing = document.querySelector(`script[src="${SHAKA_CDN}"]`);
      existing?.addEventListener('load', () => resolve());
      existing?.addEventListener('error', () => reject(new Error('Shaka CDN failed')));
      return;
    }
    const script = document.createElement('script');
    script.src = SHAKA_CDN;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Shaka CDN failed'));
    document.head.appendChild(script);
  });
}

const DRM_LABELS = [
  { name: 'Widevine', logo: 'W', color: 'rgb(0, 229, 186)', supported: true },
  { name: 'PlayReady', logo: 'P', color: 'rgb(0, 217, 255)', supported: true },
  { name: 'FairPlay', logo: 'F', color: 'rgb(147, 51, 234)', supported: true },
];

function getQualityDetails(value: QualityValue) {
  return QUALITY_OPTIONS.find((option) => option.value === value) ?? QUALITY_OPTIONS[0];
}

function pickClosestHeight<T extends { height?: number }>(tracks: T[], targetHeight: number) {
  return [...tracks]
    .filter((track) => typeof track.height === 'number' && Number(track.height) > 0)
    .sort((a, b) => Math.abs(Number(a.height) - targetHeight) - Math.abs(Number(b.height) - targetHeight))[0];
}

function mapHeightToQualityValue(height?: number): QualityValue | null {
  if (!height || height <= 0) return null;
  const match = [...MANUAL_QUALITY_OPTIONS].sort(
    (a, b) => Math.abs(a.resolution - height) - Math.abs(b.resolution - height),
  )[0];
  return match ? match.value : null;
}

function getAvailableQualityValues(heights: number[]): QualityValue[] {
  const values = new Set<QualityValue>(['auto']);
  heights.forEach((height) => {
    const mapped = mapHeightToQualityValue(height);
    if (mapped) values.add(mapped);
  });
  return QUALITY_OPTIONS.map((option) => option.value).filter((value) => values.has(value));
}

function applySelectedQuality(
  value: QualityValue,
  setSelectedQuality: React.Dispatch<React.SetStateAction<QualityValue>>,
  setPreferredVideoQuality: (quality: QualityValue) => void,
  onQualityChange?: (quality: { label: string; resolution: number }) => void,
) {
  setSelectedQuality(value);
  setPreferredVideoQuality(value);
  onQualityChange?.(getQualityDetails(value));
}

export default function ShakaPlayer({
  src,
  drm,
  isPremium,
  showQualitySelector = false,
  onQualityChange,
  onTimeUpdate,
  onPlay,
  onPause,
  onEnded,
}: ShakaPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const shakaRef = React.useRef<ShakaPlayerInstance | null>(null);
  const hlsRef = React.useRef<Hls | null>(null);
  const { theme } = useThemeStore();

  const [isLoading, setIsLoading] = React.useState(true);
  const [playerMode, setPlayerMode] = React.useState<'shaka' | 'hls' | 'native' | null>(null);
  const [drmActive, setDrmActive] = React.useState(false);
  const [playerError, setPlayerError] = React.useState<string | null>(null);
  const [showDrmInfo, setShowDrmInfo] = React.useState(false);
  const [availableQualities, setAvailableQualities] = React.useState<QualityValue[]>(['auto', '1080', '720', '480', '360']);
  const [appliedQuality, setAppliedQuality] = React.useState<QualityValue>('auto');
  const preferredVideoQuality = useSettingsStore((state) => state.preferredVideoQuality);
  const setPreferredVideoQuality = useSettingsStore((state) => state.setPreferredVideoQuality);
  const [selectedQuality, setSelectedQuality] = React.useState<QualityValue>(preferredVideoQuality);
  const isLight = theme === 'light';
  const selectedQualityRef = React.useRef<QualityValue>(preferredVideoQuality);
  const playerModeRef = React.useRef<'shaka' | 'hls' | 'native' | null>(null);
  const onQualityChangeRef = React.useRef(onQualityChange);

  React.useEffect(() => {
    selectedQualityRef.current = selectedQuality;
  }, [selectedQuality]);

  React.useEffect(() => {
    playerModeRef.current = playerMode;
  }, [playerMode]);

  React.useEffect(() => {
    onQualityChangeRef.current = onQualityChange;
  }, [onQualityChange]);

  React.useEffect(() => {
    setSelectedQuality(preferredVideoQuality);
    setAppliedQuality(preferredVideoQuality);
    onQualityChange?.(getQualityDetails(preferredVideoQuality));
  }, [src, preferredVideoQuality, onQualityChange]);

  const applyQualityPreference = React.useCallback(
    (value: QualityValue) => {
      const quality = getQualityDetails(value);
      onQualityChangeRef.current?.(quality);

      if (playerModeRef.current === 'hls' && hlsRef.current) {
        if (value === 'auto') {
          hlsRef.current.currentLevel = -1;
          hlsRef.current.nextLevel = -1;
          hlsRef.current.loadLevel = -1;
          setAppliedQuality('auto');
          return;
        }

        const matchingLevel = pickClosestHeight(hlsRef.current.levels, quality.resolution);
        if (matchingLevel) {
          const levelIndex = hlsRef.current.levels.findIndex((level) => level === matchingLevel);
          if (levelIndex >= 0) {
            hlsRef.current.currentLevel = levelIndex;
            hlsRef.current.nextLevel = levelIndex;
            hlsRef.current.loadLevel = levelIndex;
            setAppliedQuality(mapHeightToQualityValue(matchingLevel.height) ?? value);
          }
        }
        return;
      }

      if (playerModeRef.current === 'shaka' && shakaRef.current?.getVariantTracks && shakaRef.current.selectVariantTrack) {
        if (value === 'auto') {
          shakaRef.current.configure({ abr: { enabled: true } });
          setAppliedQuality('auto');
          return;
        }

        const tracks = shakaRef.current
          .getVariantTracks()
          .filter((track) => typeof track.height === 'number' && Number(track.height) > 0);
        const matchingTrack = pickClosestHeight(tracks, quality.resolution);
        if (matchingTrack) {
          shakaRef.current.configure({ abr: { enabled: false } });
          shakaRef.current.selectVariantTrack(matchingTrack, true);
          setAppliedQuality(mapHeightToQualityValue(matchingTrack.height) ?? value);
        }
      }
    },
    [],
  );

  React.useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const isHlsSource = src.includes('.m3u8');
    const isDashSource = src.includes('.mpd');

    const cleanup = () => {
      shakaRef.current?.destroy().catch(() => null);
      shakaRef.current = null;
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };

    const initShaka = async () => {
      try {
        await loadShakaScript();
        const shaka = getWindowShaka();
        if (!shaka?.Player?.isBrowserSupported()) throw new Error('Browser not supported');

        shaka.polyfill.installAll();
        const player = new shaka.Player(video);
        shakaRef.current = player;

        const config: Record<string, unknown> = {};
        const hasDRM = isDashSource && drm && (drm.widevine || drm.playready);
        if (hasDRM) {
          config['drm'] = {
            servers: {
              ...(drm?.widevine && { 'com.widevine.alpha': drm.widevine }),
              ...(drm?.playready && { 'com.microsoft.playready': drm.playready }),
            },
          };
          setDrmActive(true);
        } else {
          setDrmActive(false);
        }
        player.configure(config);

        player.addEventListener('error', () => {
          console.warn('[ShakaPlayer] DRM error, stream may not have DRM');
        });
        player.addEventListener('adaptation', () => {
          const activeTrack = player.getVariantTracks?.().find((track) => track.active);
          setAppliedQuality(mapHeightToQualityValue(activeTrack?.height) ?? 'auto');
        });
        player.addEventListener('variantchanged', () => {
          const activeTrack = player.getVariantTracks?.().find((track) => track.active);
          setAppliedQuality(mapHeightToQualityValue(activeTrack?.height) ?? 'auto');
        });

        await player.load(src);
        const variantTracks = player.getVariantTracks?.() ?? [];
        setAvailableQualities(
          getAvailableQualityValues(
            variantTracks
              .map((track) => Number(track.height))
              .filter((height) => Number.isFinite(height) && height > 0),
          ),
        );
        const activeTrack = variantTracks.find((track) => track.active);
        setAppliedQuality(mapHeightToQualityValue(activeTrack?.height) ?? 'auto');
        setPlayerMode('shaka');
        setIsLoading(false);
        requestAnimationFrame(() => applyQualityPreference(selectedQualityRef.current));
      } catch {
        initHLS();
      }
    };

    const initHLS = () => {
      if (isDashSource) {
        video.src = src;
        setPlayerMode('native');
        setIsLoading(false);
        return;
      }
      if (Hls.isSupported()) {
        const hls = new Hls({ startLevel: -1, capLevelToPlayerSize: true });
        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setAvailableQualities(
            getAvailableQualityValues(
              hls.levels
                .map((level) => Number(level.height))
                .filter((height) => Number.isFinite(height) && height > 0),
            ),
          );
          setPlayerMode('hls');
          setIsLoading(false);
          applyQualityPreference(selectedQualityRef.current);
        });
        hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
          const level = hls.levels[data.level];
          setAppliedQuality(mapHeightToQualityValue(level?.height) ?? 'auto');
        });
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) setPlayerError('Stream unavailable');
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        setAvailableQualities(['auto']);
        setPlayerMode('native');
        setIsLoading(false);
      } else {
        video.src = src;
        setAvailableQualities(['auto']);
        setPlayerMode('native');
        setIsLoading(false);
      }
    };

    setPlayerError(null);
    setIsLoading(true);
    if (isHlsSource) {
      initHLS();
    } else {
      initShaka();
    }
    return cleanup;
  }, [src, drm, applyQualityPreference]);

  React.useEffect(() => {
    applyQualityPreference(selectedQuality);
  }, [selectedQuality, applyQualityPreference]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => onTimeUpdate?.(video.currentTime, video.duration || 0);
    const onPlayEv = () => onPlay?.();
    const onPauseEv = () => onPause?.();
    const onEndedEv = () => onEnded?.();
    video.addEventListener('timeupdate', onTime);
    video.addEventListener('play', onPlayEv);
    video.addEventListener('pause', onPauseEv);
    video.addEventListener('ended', onEndedEv);
    return () => {
      video.removeEventListener('timeupdate', onTime);
      video.removeEventListener('play', onPlayEv);
      video.removeEventListener('pause', onPauseEv);
      video.removeEventListener('ended', onEndedEv);
    };
  }, [onTimeUpdate, onPlay, onPause, onEnded]);

  const selectedQualityDetails = getQualityDetails(selectedQuality);
  const appliedQualityDetails = getQualityDetails(appliedQuality);

  return (
    <div
      className="relative w-full bg-black rounded-2xl overflow-hidden group"
      style={{ aspectRatio: '16/9' }}
    >
      {isLoading && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4"
          style={{ background: 'rgba(10,15,24,0.96)' }}
        >
          <div className="relative w-14 h-14">
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: 'rgba(0,229,186,0.2)',
                borderTopColor: 'rgb(0,229,186)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <div
              className="absolute inset-2 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,229,186,0.15), transparent)' }}
            />
          </div>
          <div className="text-center">
            <p className="text-white text-xs font-semibold mb-1">Initialising player...</p>
            <p className="text-gray-500 text-[10px]">Shaka Player | Widevine | PlayReady | FairPlay</p>
          </div>
        </div>
      )}

      {playerError && (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center"
          style={{ background: 'rgba(10,15,24,0.96)' }}
        >
          <div className="text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
              style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-white text-sm font-semibold">{playerError}</p>
            <p className="text-gray-500 text-xs mt-1">Check your connection and try again</p>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        controls
        className="w-full h-full"
        playsInline
        style={{ display: isLoading ? 'none' : 'block' }}
      />

      {!isLoading && !playerError && (
        <>
          {drmActive && (
            <div className="absolute top-4 left-4 z-10">
              <motion.button
                onClick={() => setShowDrmInfo((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: isLight ? 'rgba(255,255,255,0.88)' : 'rgba(10,15,24,0.85)',
                  border: isLight ? '1px solid rgba(15,23,42,0.12)' : '1px solid rgba(0,229,186,0.35)',
                  color: isLight ? '#0f172a' : 'rgb(0,229,186)',
                  backdropFilter: 'blur(12px)',
                }}
                whileHover={{ scale: 1.04 }}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                DRM Protected
              </motion.button>

              {showDrmInfo && (
                <motion.div
                  className="absolute top-10 left-0 rounded-xl p-4 min-w-[220px]"
                  style={{
                    background: isLight ? 'rgba(255,255,255,0.96)' : 'rgba(10,15,24,0.95)',
                    border: isLight ? '1px solid rgba(15,23,42,0.12)' : '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: isLight ? '0 20px 60px rgba(15,23,42,0.18)' : '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <p className="text-xs font-bold mb-3" style={{ color: isLight ? '#0f172a' : '#ffffff' }}>DRM Encryption Active</p>
                  {DRM_LABELS.map((label) => (
                    <div key={label.name} className="flex items-center gap-2.5 mb-2">
                      <div
                        className="w-5 h-5 rounded text-[9px] font-black flex items-center justify-center flex-shrink-0"
                        style={{ background: `${label.color}20`, color: label.color }}
                      >
                        {label.logo}
                      </div>
                      <span className="text-[11px]" style={{ color: isLight ? '#334155' : '#d1d5db' }}>{label.name}</span>
                      <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: 'rgb(0,229,186)' }} />
                    </div>
                  ))}
                  <p className="text-[10px] mt-3 leading-relaxed" style={{ color: isLight ? '#64748b' : '#6b7280' }}>
                    Content encrypted with multi-DRM. License verified per session.
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {showQualitySelector && (
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full px-2 py-2" style={{ background: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(10,15,24,0.78)', border: isLight ? '1px solid rgba(15,23,42,0.12)' : '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', boxShadow: isLight ? '0 16px 40px rgba(15,23,42,0.14)' : 'none' }}>
              <span className="pl-1 text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: isLight ? '#334155' : 'rgba(255,255,255,0.65)' }}>Quality</span>
              <div className="flex items-center gap-1">
                {QUALITY_OPTIONS.map((option) => (
                  (() => {
                    const isAvailable = availableQualities.includes(option.value);
                    return (
                  <button
                    key={option.value}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => applySelectedQuality(option.value, setSelectedQuality, setPreferredVideoQuality, onQualityChange)}
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors"
                    style={{
                      background: selectedQuality === option.value ? 'rgba(0,229,186,0.18)' : 'transparent',
                      border: selectedQuality === option.value ? '1px solid rgba(0,229,186,0.4)' : '1px solid transparent',
                      color: !isAvailable ? (isLight ? '#94a3b8' : 'rgba(255,255,255,0.28)') : selectedQuality === option.value ? 'rgb(0,229,186)' : isLight ? '#475569' : 'rgba(255,255,255,0.72)',
                      opacity: isAvailable ? 1 : 0.55,
                      cursor: isAvailable ? 'pointer' : 'not-allowed',
                    }}
                  >
                    {option.label}
                  </button>
                    );
                  })()
                ))}
              </div>
            </div>
          )}

          {isPremium && !showQualitySelector && (
            <div
              className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{
                background: 'linear-gradient(135deg, rgba(147,51,234,0.85), rgba(79,70,229,0.85))',
                backdropFilter: 'blur(8px)',
              }}
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-white">Premium</span>
            </div>
          )}

          {isPremium && showQualitySelector && (
            <div
              className="absolute bottom-16 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{
                background: 'linear-gradient(135deg, rgba(147,51,234,0.85), rgba(79,70,229,0.85))',
                backdropFilter: 'blur(8px)',
              }}
            >
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-white">Premium</span>
            </div>
          )}

          <div
            className="absolute bottom-16 right-4 z-10 px-2.5 py-1 rounded text-[9px]"
            style={{ background: isLight ? 'rgba(255,255,255,0.88)' : 'rgba(0,0,0,0.5)', color: isLight ? '#475569' : 'rgba(255,255,255,0.72)', border: isLight ? '1px solid rgba(15,23,42,0.12)' : 'none' }}
          >
            {playerMode && playerMode !== 'shaka'
              ? `${playerMode === 'hls' ? 'HLS.js' : 'Native'} | Selected ${selectedQualityDetails.label} | Applied ${appliedQualityDetails.label}`
              : `Adaptive stream | Selected ${selectedQualityDetails.label} | Applied ${appliedQualityDetails.label}`}
          </div>
        </>
      )}
    </div>
  );
}
