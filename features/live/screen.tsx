'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import LiveChannelGrid from './components/LiveChannelGrid';
import LiveChatPanel from './components/LiveChatPanel';
import LiveHeader from './components/LiveHeader';
import LiveHeroCard from './components/LiveHeroCard';
import { LIVE_LOADING_COPY } from './config';
import { useLiveScreen } from './hooks/useLiveScreen';
import { getLiveWatchId, getWatchHref } from '@/lib/navigation/playbackRoutes';

export default function LivePage() {
  const {
    activeStream,
    bgGradient,
    cardBg,
    cardBorder,
    carbonOffset,
    chatInput,
    chatMessages,
    encryptedLabel,
    generateHealthMetrics,
    heroMetaBg,
    heroMetaBorder,
    heroOverlay,
    inputBg,
    inputBorder,
    isLight,
    isLoading,
    labels,
    loadError,
    minutesLive,
    pageTextMuted,
    pageTextPrimary,
    pageTextSecondary,
    sendChat,
    setActiveStream,
    setChatInput,
    showHealth,
    statusButtonBg,
    stream,
    streams,
    surfaceBg,
    surfaceBorder,
    toggleHealth,
    watchStatText,
  } = useLiveScreen();

  return (
    <main className="min-h-screen" style={{ background: bgGradient }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image alt="" className="object-cover opacity-[0.05]" fill src={stream?.imageUrl ?? 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80'} />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-base/80 via-dark-base/90 to-dark-base" style={{ background: isLight ? 'linear-gradient(to bottom, rgba(240,244,247,0.9), rgba(232,236,240,0.95), rgba(240,244,247,1))' : 'linear-gradient(to bottom, rgba(18,18,18,0.8), rgba(18,18,18,0.9), rgba(18,18,18,1))' }} />
        <motion.div animate={{ scale: [1, 1.15, 1] }} className="absolute rounded-full" style={{ width: '500px', height: '500px', top: '-15%', left: '-8%', background: 'radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} transition={{ duration: 10, repeat: Infinity }} />
        <motion.div animate={{ scale: [1, 1.12, 1] }} className="absolute rounded-full" style={{ width: '400px', height: '400px', bottom: '-10%', right: '-5%', background: 'radial-gradient(circle, rgba(0,229,186,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} transition={{ duration: 8, repeat: Infinity, delay: 3 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 py-8">
        <div className="min-h-5 mb-3">
          {isLoading && <p className="text-xs" style={{ color: pageTextMuted }}>{LIVE_LOADING_COPY.en}</p>}
          {loadError && <p className="text-xs text-red-400">{loadError}</p>}
        </div>

        <LiveHeader carbonOffset={carbonOffset} minutesLive={minutesLive} offsetLabel={labels.offsetLabel} pageTextMuted={pageTextMuted} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} subtitle={labels.heroSubtitle} title={labels.heroTitle} />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          <div className="space-y-5">
            {stream && (
              <LiveHeroCard healthLabel={labels.healthLabel} healthMetrics={generateHealthMetrics(stream)} heroMetaBg={heroMetaBg} heroMetaBorder={heroMetaBorder} heroOverlay={heroOverlay} heroTitleColor="#ffffff" isLight={isLight} offsetLabel={labels.offsetLabel} showHealth={showHealth} statusButtonBg={statusButtonBg} stream={stream} streamHealthLabel={labels.streamHealthLabel} toggleHealth={toggleHealth} watchLiveLabel={labels.watchLiveLabel} watchHref={getWatchHref(getLiveWatchId(stream.id))} />
            )}
            <LiveChannelGrid activeStream={activeStream} cardBg={cardBg} cardBorder={cardBorder} pageTextMuted={pageTextMuted} pageTextPrimary={pageTextPrimary} streams={streams} title={labels.allChannelsLabel} onSelect={setActiveStream} />
          </div>

          <LiveChatPanel chatInput={chatInput} chatMessages={chatMessages} encryptedLabel={encryptedLabel} inputBg={inputBg} inputBorder={inputBorder} isLight={isLight} liveChatLabel={labels.liveChatLabel} pageTextMuted={pageTextMuted} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} saySomethingLabel={labels.saySomethingLabel} sendLabel={labels.sendLabel} surfaceBg={surfaceBg} surfaceBorder={surfaceBorder} watchStatText={watchStatText} onChatInputChange={setChatInput} onSend={sendChat} />
        </div>
      </div>
    </main>
  );
}

