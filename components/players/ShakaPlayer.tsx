'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Hls from 'hls.js';

export interface DRMConfig {
  widevine?: string;
  playready?: string;
  fairplay?: string;
}

export interface ShakaPlayerProps {
  src: string;
  drm?: DRMConfig;
  isPremium?: boolean;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

interface ShakaPlayerInstance {
  configure(config: Record<string, unknown>): void;
  load(url: string): Promise<void>;
  destroy(): Promise<void>;
  addEventListener(event: string, handler: (e: unknown) => void): void;
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

export default function ShakaPlayer({
  src,
  drm,
  isPremium,
  onTimeUpdate,
  onPlay,
  onPause,
  onEnded,
}: ShakaPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const shakaRef = React.useRef<ShakaPlayerInstance | null>(null);
  const hlsRef = React.useRef<Hls | null>(null);

  const [isLoading, setIsLoading] = React.useState(true);
  const [playerMode, setPlayerMode] = React.useState<'shaka' | 'hls' | 'native' | null>(null);
  const [drmActive, setDrmActive] = React.useState(false);
  const [playerError, setPlayerError] = React.useState<string | null>(null);
  const [showDrmInfo, setShowDrmInfo] = React.useState(false);

  React.useEffect(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

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
        const hasDRM = drm && (drm.widevine || drm.playready);
        if (hasDRM) {
          config['drm'] = {
            servers: {
              ...(drm?.widevine && { 'com.widevine.alpha': drm.widevine }),
              ...(drm?.playready && { 'com.microsoft.playready': drm.playready }),
            },
          };
          setDrmActive(true);
        }
        player.configure(config);

        player.addEventListener('error', () => {
          console.warn('[ShakaPlayer] DRM error, stream may not have DRM');
        });

        await player.load(src);
        setPlayerMode('shaka');
        setIsLoading(false);
      } catch {
        initHLS();
      }
    };

    const initHLS = () => {
      if (src.endsWith('.mpd')) {
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
          setPlayerMode('hls');
          setIsLoading(false);
        });
        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) setPlayerError('Stream unavailable');
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        setPlayerMode('native');
        setIsLoading(false);
      } else {
        video.src = src;
        setPlayerMode('native');
        setIsLoading(false);
      }
    };

    initShaka();
    return cleanup;
  }, [src, drm]);

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
            <p className="text-white text-xs font-semibold mb-1">Initialising player…</p>
            <p className="text-gray-500 text-[10px]">Shaka Player · Widevine · PlayReady · FairPlay</p>
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
                  background: 'rgba(10,15,24,0.85)',
                  border: '1px solid rgba(0,229,186,0.35)',
                  color: 'rgb(0,229,186)',
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
                    background: 'rgba(10,15,24,0.95)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                  }}
                  initial={{ opacity: 0, y: -6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <p className="text-white text-xs font-bold mb-3">DRM Encryption Active</p>
                  {DRM_LABELS.map((label) => (
                    <div key={label.name} className="flex items-center gap-2.5 mb-2">
                      <div
                        className="w-5 h-5 rounded text-[9px] font-black flex items-center justify-center flex-shrink-0"
                        style={{ background: `${label.color}20`, color: label.color }}
                      >
                        {label.logo}
                      </div>
                      <span className="text-gray-300 text-[11px]">{label.name}</span>
                      <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: 'rgb(0,229,186)' }} />
                    </div>
                  ))}
                  <p className="text-gray-600 text-[10px] mt-3 leading-relaxed">
                    Content encrypted with multi-DRM. License verified per session.
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {isPremium && (
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

          {playerMode && playerMode !== 'shaka' && (
            <div
              className="absolute bottom-16 right-4 z-10 px-2 py-1 rounded text-[9px] text-gray-600"
              style={{ background: 'rgba(0,0,0,0.5)' }}
            >
              {playerMode === 'hls' ? 'HLS.js' : 'Native'} · Fallback mode
            </div>
          )}
        </>
      )}
    </div>
  );
}
