'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import JoinModal from './components/JoinModal';
import MeetingSetupPanel from './components/MeetingSetupPanel';
import MeetingTypesGrid from './components/MeetingTypesGrid';
import MeetingsHeader from './components/MeetingsHeader';
import MeetingsImpactSidebar from './components/MeetingsImpactSidebar';
import MeetingsTabBar from './components/MeetingsTabBar';
import RecordingsList from './components/RecordingsList';
import WebinarsGrid from './components/WebinarsGrid';
import { useMeetingsScreen } from './hooks/useMeetingsScreen';

export default function MeetingsPage() {
  const {
    bgGradient,
    impactStats,
    inputBg,
    inputBorder,
    isLight,
    joinCode,
    meetingTitle,
    pageTextMuted,
    pageTextPrimary,
    pageTextSecondary,
    recordings,
    roomCode,
    savedCO2,
    savedPct,
    setJoinCode,
    setMeetingTitle,
    setSubCategory,
    setShowJoin,
    showJoin,
    startMeeting,
    submitJoin,
    surfaceBg,
    surfaceBorder,
    t,
    tab,
    tabs,
    translate,
    typeCards,
    virtualCO2,
    webinars,
    generateCode,
  } = useMeetingsScreen();

  const inPersonCO2 = savedCO2 + virtualCO2;

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: bgGradient }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image alt="" className="object-cover opacity-[0.04]" fill src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80" />
        <div className="absolute inset-0" style={{ background: isLight ? 'linear-gradient(to bottom, rgba(240,244,247,0.9), rgba(238,241,245,0.92), rgba(240,244,247,1))' : 'linear-gradient(to bottom, rgba(18,18,18,0.8), rgba(18,18,18,0.9), rgba(18,18,18,1))' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 py-12 space-y-8">
        <MeetingsHeader joinLabel={t.meetings.joinWithCode} onJoinClick={() => setShowJoin(true)} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} subtitle={t.meetings.subtitle} title={t.meetings.title} />
        <MeetingsTabBar activeTab={tab} onTabChange={setSubCategory} tabs={tabs} translate={translate} />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              {tab === 'schedule' && (
                <motion.div key="schedule" animate={{ opacity: 1, x: 0 }} className="space-y-6" exit={{ opacity: 0, x: 20 }} initial={{ opacity: 0, x: -20 }}>
                  <MeetingSetupPanel
                    generateCode={generateCode}
                    inPersonCO2={inPersonCO2}
                    inPersonLabel={t.meetings.inPersonEquivalent}
                    inputBg={inputBg}
                    inputBorder={inputBorder}
                    meetingTitle={meetingTitle}
                    pageTextMuted={pageTextMuted}
                    pageTextPrimary={pageTextPrimary}
                    pageTextSecondary={pageTextSecondary}
                    roomCode={roomCode}
                    saveLabel={t.meetings.youSave}
                    savedCO2={savedCO2}
                    savedPct={savedPct}
                    setMeetingTitle={setMeetingTitle}
                    shareCodeLabel={t.meetings.shareCode}
                    startLabel={t.meetings.startMeeting}
                    startMeeting={startMeeting}
                    surfaceBg={surfaceBg}
                    surfaceBorder={surfaceBorder}
                    title={t.meetings.roomSetup}
                    virtualCO2={virtualCO2}
                    virtualLabel={t.meetings.virtualMeeting}
                  />
                  <MeetingTypesGrid cards={typeCards} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} />
                </motion.div>
              )}

              {tab === 'join' && (
                <motion.div key="join" animate={{ opacity: 1, x: 0 }} className="rounded-3xl p-12 flex flex-col items-center text-center space-y-8" exit={{ opacity: 0, x: 20 }} initial={{ opacity: 0, x: -20 }} style={{ background: surfaceBg, border: `1px solid ${surfaceBorder}` }}>
                  <div className="w-24 h-24 rounded-full bg-eco-green/10 flex items-center justify-center text-2xl font-black animate-pulse">Join</div>
                  <div className="space-y-3 max-w-sm">
                    <h2 className="text-2xl font-black" style={{ color: pageTextPrimary }}>{t.meetings.joinARoom}</h2>
                    <p className="text-sm opacity-60" style={{ color: pageTextSecondary }}>{t.meetings.secureConnection}</p>
                  </div>
                  <div className="flex flex-col w-full max-w-xs gap-4">
                    <input className="w-full h-14 rounded-2xl text-center font-mono text-lg tracking-widest focus:outline-none focus:ring-2 ring-eco-green/30" onChange={(event) => setJoinCode(event.target.value.toUpperCase())} placeholder="ECO-XXXX-XXXX" style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: pageTextPrimary }} type="text" value={joinCode} />
                    <button className="h-14 rounded-2xl bg-eco-green text-[#0A0F18] font-black text-sm shadow-xl shadow-eco-green/20 hover:scale-105 transition-transform" onClick={() => setShowJoin(true)}>{t.meetings.joinNow}</button>
                  </div>
                </motion.div>
              )}

              {tab === 'recordings' && <motion.div key="recordings" animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} initial={{ opacity: 0, x: -20 }}><RecordingsList items={recordings} pageTextMuted={pageTextMuted} pageTextPrimary={pageTextPrimary} surfaceBg={surfaceBg} surfaceBorder={surfaceBorder} /></motion.div>}
              {tab === 'webinars' && <motion.div key="webinars" animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} initial={{ opacity: 0, x: -20 }}><WebinarsGrid items={webinars} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} surfaceBg={surfaceBg} surfaceBorder={surfaceBorder} /></motion.div>}
            </AnimatePresence>
          </div>

          <MeetingsImpactSidebar activeRooms={impactStats.activeRooms} co2Offset={impactStats.co2Offset} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} renewable={impactStats.renewable} surfaceBg={surfaceBg} surfaceBorder={surfaceBorder} width={impactStats.activeWidth} />
        </div>
      </div>

      <JoinModal inputBg={inputBg} inputBorder={inputBorder} joinCode={joinCode} joinLabel={t.meetings.joinNow} onClose={() => setShowJoin(false)} onJoinCodeChange={setJoinCode} onSubmit={submitJoin} pageTextPrimary={pageTextPrimary} pageTextSecondary={pageTextSecondary} show={showJoin} surfaceBg={surfaceBg} surfaceBorder={surfaceBorder} title={t.meetings.joinARoom} />
    </main>
  );
}
