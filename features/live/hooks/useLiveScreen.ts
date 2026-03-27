import React from 'react';
import { contentImages } from '../../../lib/images/unsplash';
import { useLanguageStore } from '../../../lib/stores/languageStore';
import { useNavigationStore } from '../../../lib/stores/navigationStore';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { fmtViewers, type ChatMessage } from '../../../lib/data/liveCatalog';
import type { LiveApiResponse } from '../../../lib/api/contracts';
import { useApiResource } from '../../../hooks/useApiResource';
import { fetchLiveBrowser } from '../api';
import { LIVE_FILTER_MATCHERS, LIVE_HEALTH_THRESHOLDS } from '../config';
import type { LiveFilterKey, LiveHealthMetric, LiveScreenViewModel, LiveStreamView } from '../types';

function toFilterKey(value: string | null | undefined): LiveFilterKey {
  if (!value) return 'all';
  if (value === 'sports' || value === 'gaming' || value === 'music' || value === 'events') return value;
  return 'all';
}

function healthColor(value: number, good: number, bad: number) {
  if (value <= good) return 'rgb(0,229,186)';
  if (value <= bad) return 'rgb(251,191,36)';
  return 'rgb(239,68,68)';
}

export function useLiveScreen(): LiveScreenViewModel {
  const { activeSubCategory } = useNavigationStore();
  const { theme } = useThemeStore();
  const { language } = useLanguageStore();
  const tab = toFilterKey(activeSubCategory);
  const isLight = theme === 'light';

  const loadLive = React.useCallback((signal: AbortSignal) => fetchLiveBrowser(language, signal), [language]);
  const { data: liveResponse, isLoading, loadError } = useApiResource<LiveApiResponse>({ load: loadLive });
  const [activeStream, setActiveStream] = React.useState(0);
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = React.useState('');
  const [carbonOffset, setCarbonOffset] = React.useState(0);
  const [minutesLive, setMinutesLive] = React.useState(0);
  const [showHealth, setShowHealth] = React.useState(false);
  const msgIdRef = React.useRef(100);

  const liveContent = liveResponse?.data;
  const labels = liveContent?.labels;
  const rawStreams = React.useMemo(() => liveContent?.streams ?? [], [liveContent]);
  const streams = React.useMemo<LiveStreamView[]>(() => {
    const filtered = tab === 'all'
      ? rawStreams
      : rawStreams.filter((stream) => {
          const category = stream.category.toLowerCase();
          return LIVE_FILTER_MATCHERS[tab].some((token) => category.includes(token));
        });

    return filtered.map((stream) => ({
      ...stream,
      imageUrl: contentImages.live[stream.imageIdx]?.url ?? contentImages.live[0].url,
    }));
  }, [rawStreams, tab]);

  const seedChat = React.useMemo(() => liveContent?.seedChat ?? [], [liveContent]);
  const botMessages = React.useMemo(() => liveContent?.botMessages ?? [], [liveContent]);
  const stream = streams[activeStream] ?? streams[0] ?? null;

  React.useEffect(() => {
    setChatMessages(seedChat);
  }, [seedChat]);

  React.useEffect(() => {
    if (activeStream >= streams.length && streams.length > 0) {
      setActiveStream(0);
    }
  }, [activeStream, streams.length]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCarbonOffset((prev) => parseFloat((prev + 0.0023).toFixed(4)));
      setMinutesLive((prev) => prev + 1);
    }, 60000);

    const fastTimer = setInterval(() => {
      setCarbonOffset((prev) => parseFloat((prev + 0.00004).toFixed(4)));
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(fastTimer);
    };
  }, []);

  React.useEffect(() => {
    if (!botMessages.length) return;
    const timer = setInterval(() => {
      const msg = botMessages[Math.floor(Math.random() * botMessages.length)];
      const now = new Date();
      msgIdRef.current += 1;
      setChatMessages((prev) => [
        ...prev.slice(-40),
        {
          id: msgIdRef.current,
          user: msg.user,
          msg: msg.msg,
          time: `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`,
          color: msg.color,
        },
      ]);
    }, 4500);

    return () => clearInterval(timer);
  }, [botMessages]);

  const sendChat = React.useCallback(() => {
    if (!chatInput.trim()) return;
    const now = new Date();
    msgIdRef.current += 1;
    setChatMessages((prev) => [
      ...prev,
      {
        id: msgIdRef.current,
        user: language === 'de' ? 'Du' : 'You',
        msg: chatInput.trim(),
        time: `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`,
        color: 'rgb(0,229,186)',
      },
    ]);
    setChatInput('');
  }, [chatInput, language]);

  const generateHealthMetrics = React.useCallback((current: LiveStreamView): LiveHealthMetric[] => {
    const latencyColor = healthColor(current.latency, LIVE_HEALTH_THRESHOLDS.latency.good, LIVE_HEALTH_THRESHOLDS.latency.bad);
    return [
      { bar: (current.bitrate / LIVE_HEALTH_THRESHOLDS.maxBitrate) * 100, color: 'rgb(0,229,186)', label: 'Bitrate', value: `${current.bitrate} Mbps` },
      { bar: (current.fps / LIVE_HEALTH_THRESHOLDS.maxFps) * 100, color: 'rgb(0,217,255)', label: 'FPS', value: `${current.fps} fps` },
      { bar: Math.max(0, 100 - (current.latency / 100) * 100), color: latencyColor, label: language === 'de' ? 'Latenz' : 'Latency', value: `${current.latency} ms` },
      { bar: 100, color: 'rgb(167,139,250)', label: language === 'de' ? 'Qualitaet' : 'Quality', value: current.quality },
    ];
  }, [language]);

  const watchStatText = stream ? `${fmtViewers(stream.viewers)} ${labels?.watchStatLabel ?? 'watching'}` : labels?.watchStatLabel ?? 'watching';

  return {
    activeStream,
    bgGradient: isLight ? 'linear-gradient(135deg, #f0f4f7 0%, #e8ecf0 50%, #f0f4f7 100%)' : 'linear-gradient(135deg, #0A0F18 0%, #1A0A0A 50%, #0A0F18 100%)',
    cardBg: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(15,25,35,0.8)',
    cardBorder: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.05)',
    carbonOffset,
    chatInput,
    chatMessages,
    encryptedLabel: labels?.encryptedLabel ?? 'Messages are encrypted',
    generateHealthMetrics,
    healthLabel: labels?.healthLabel ?? 'Health',
    heroMetaBg: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(10,15,24,0.62)',
    heroMetaBorder: isLight ? '1px solid rgba(15,23,42,0.08)' : '1px solid rgba(255,255,255,0.12)',
    heroOverlay: isLight ? 'linear-gradient(to right, rgba(240,244,247,0.94) 0%, rgba(240,244,247,0.52) 55%, rgba(240,244,247,0.14) 100%)' : 'linear-gradient(to right, rgba(10,15,24,0.95) 0%, rgba(10,15,24,0.5) 55%, rgba(10,15,24,0.16) 100%)',
    inputBg: isLight ? 'rgba(15,23,42,0.04)' : 'rgba(255,255,255,0.04)',
    inputBorder: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)',
    impactStats: { activeRooms: '1,482', activeWidth: '74%', co2Offset: '248 kg', renewable: '100%' },
    isLight,
    isLoading,
    labels: {
      allChannelsLabel: labels?.allChannelsLabel ?? 'All channels',
      encryptedLabel: labels?.encryptedLabel ?? 'Messages are encrypted',
      healthLabel: labels?.healthLabel ?? 'Health',
      heroSubtitle: labels?.heroSubtitle ?? 'Live channels',
      heroTitle: labels?.heroTitle ?? 'Live',
      liveChatLabel: labels?.liveChatLabel ?? 'Live chat',
      minLiveLabel: labels?.minLiveLabel ?? 'min live',
      offsetLabel: labels?.offsetLabel ?? 'offset',
      saySomethingLabel: labels?.saySomethingLabel ?? 'Say something',
      sendLabel: labels?.sendLabel ?? 'Send',
      streamHealthLabel: labels?.streamHealthLabel ?? 'Stream health',
      watchLiveLabel: labels?.watchLiveLabel ?? 'Watch live',
      watchStatLabel: labels?.watchStatLabel ?? 'watching',
    },
    loadError,
    minutesLive,
    pageTextMuted: isLight ? '#64748b' : '#6b7280',
    pageTextPrimary: isLight ? '#0f172a' : '#ffffff',
    pageTextSecondary: isLight ? '#475569' : '#9ca3af',
    saySomethingLabel: labels?.saySomethingLabel ?? 'Say something',
    sendChat,
    sendLabel: labels?.sendLabel ?? 'Send',
    setActiveStream,
    setChatInput,
    setShowHealth,
    showHealth,
    statusButtonBg: isLight ? 'rgba(255,255,255,0.9)' : 'rgba(10,15,24,0.62)',
    stream,
    streams,
    surfaceBg: isLight ? 'rgba(255,255,255,0.86)' : 'rgba(10,16,28,0.95)',
    surfaceBorder: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.07)',
    toggleHealth: () => setShowHealth((value) => !value),
    watchStatText,
  };
}
