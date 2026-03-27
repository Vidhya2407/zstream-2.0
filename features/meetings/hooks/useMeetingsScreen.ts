import React from 'react';
import { toast } from 'sonner';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { useNavigationStore } from '../../../lib/stores/navigationStore';
import { useInstantTranslations } from '../../../lib/utils/translations';
import { IN_PERSON_CO2_KG_PER_HOUR, MEETING_TABS, MEETING_TYPE_CARDS, RECORDINGS, WEBINARS } from '../config';
import type { MeetingTab } from '../types';

export function useMeetingsScreen() {
  const t = useInstantTranslations();
  const { activeSubCategory, setSubCategory } = useNavigationStore();
  const { theme } = useThemeStore();
  const tab = (activeSubCategory as MeetingTab) || 'schedule';
  const [meetingDuration] = React.useState(60);
  const [meetingParticipants] = React.useState(10);
  const [roomCode, setRoomCode] = React.useState('ECO-4829-XKZM');
  const [showJoin, setShowJoin] = React.useState(tab === 'join');
  const [joinCode, setJoinCode] = React.useState('');
  const [meetingTitle, setMeetingTitle] = React.useState('My Eco Meeting');

  React.useEffect(() => {
    if (tab === 'join') setShowJoin(true);
  }, [tab]);

  const virtualCO2 = ((meetingParticipants * meetingDuration) / 60) * 0.002;
  const inPersonCO2 = ((meetingParticipants * meetingDuration) / 60) * IN_PERSON_CO2_KG_PER_HOUR;
  const savedCO2 = inPersonCO2 - virtualCO2;
  const savedPct = Math.round((savedCO2 / inPersonCO2) * 100);

  const generateCode = React.useCallback(() => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const seg = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    setRoomCode(`ECO-${seg()}-${seg()}`);
  }, []);

  const startMeeting = React.useCallback(() => {
    toast.success('ZSTREAM: Room Ready', { description: 'Starting your carbon-neutral meeting room...' });
  }, []);

  const submitJoin = React.useCallback(() => {
    if (joinCode.length <= 8) return;
    toast.info('ZSTREAM: Connecting to Secure WebRTC', { description: `Joining meeting ${joinCode} with zero-emission routing...` });
  }, [joinCode]);

  const isLight = theme === 'light';

  return {
    bgGradient: isLight ? 'linear-gradient(135deg, #f0f4f7 0%, #eef1f5 55%, #f0f4f7 100%)' : 'linear-gradient(135deg, #0A0F18 0%, #0A0F1F 55%, #0A0F18 100%)',
    impactStats: { activeRooms: '1,482', activeWidth: '74%', co2Offset: '248 kg', renewable: '100%' },
    inputBg: isLight ? 'rgba(15,23,42,0.03)' : 'rgba(255,255,255,0.05)',
    inputBorder: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.08)',
    isLight,
    joinCode,
    meetingTitle,
    pageTextMuted: isLight ? '#64748b' : '#6b7280',
    pageTextPrimary: isLight ? '#0f172a' : '#ffffff',
    pageTextSecondary: isLight ? '#475569' : '#9ca3af',
    recordings: RECORDINGS,
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
    surfaceBg: isLight ? 'rgba(255,255,255,0.86)' : 'rgba(15,25,35,0.9)',
    surfaceBorder: isLight ? 'rgba(15,23,42,0.08)' : 'rgba(255,255,255,0.07)',
    t,
    tab,
    tabs: MEETING_TABS,
    typeCards: MEETING_TYPE_CARDS,
    virtualCO2,
    webinars: WEBINARS,
    generateCode,
  };
}



