import React from 'react';
import { toast } from 'sonner';
import { useThemeStore } from '../../../lib/stores/themeStore';
import { useNavigationStore } from '../../../lib/stores/navigationStore';
import { useAppTranslations } from '../../../lib/utils/translations';
import { IN_PERSON_CO2_KG_PER_HOUR, MEETING_TABS, RECORDINGS, WEBINARS } from '../config';
import type { MeetingTab } from '../types';

export function useMeetingsScreen() {
  const { messages: t, t: translate } = useAppTranslations();
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
    toast.success(translate('meetings.toast.roomReadyTitle', 'ZSTREAM: Room Ready'), {
      description: translate('meetings.toast.roomReadyDescription', 'Starting your carbon-neutral meeting room...'),
    });
  }, [translate]);

  const submitJoin = React.useCallback(() => {
    if (joinCode.length <= 8) return;
    toast.info(translate('meetings.toast.connectingTitle', 'ZSTREAM: Connecting to Secure WebRTC'), {
      description: translate('meetings.toast.connectingDescription', 'Joining meeting {code} with zero-emission routing...').replace('{code}', joinCode),
    });
  }, [joinCode, translate]);

  const isLight = theme === 'light';

  const typeCards = React.useMemo(
    () => [
      {
        accentColor: 'rgba(0,229,186,0.08)',
        border: 'rgba(0,229,186,0.2)',
        capacity: translate('meetings.cards.webinar.capacity', '10,000 attendees'),
        co2: translate('meetings.cards.webinar.co2', '0 kg CO2'),
        description: translate('meetings.cards.webinar.description', 'Host large-scale climate education sessions with up to 10,000 attendees.'),
        iconLabel: 'CW',
        iconText: translate('meetings.cards.webinar.title', 'Climate Webinar'),
        textColor: 'rgb(0,229,186)',
        title: translate('meetings.cards.webinar.title', 'Climate Webinar'),
      },
      {
        accentColor: 'rgba(0,128,255,0.08)',
        border: 'rgba(0,128,255,0.18)',
        capacity: translate('meetings.cards.team.capacity', '250 participants'),
        co2: translate('meetings.cards.team.co2', '0.002 kg CO2'),
        description: translate('meetings.cards.team.description', 'Eco-optimized video calls with real-time carbon tracking per participant.'),
        iconLabel: 'TM',
        iconText: translate('meetings.cards.team.title', 'Team Meeting'),
        textColor: 'rgb(96,165,250)',
        title: translate('meetings.cards.team.title', 'Team Meeting'),
      },
      {
        accentColor: 'rgba(147,51,234,0.08)',
        border: 'rgba(147,51,234,0.18)',
        capacity: translate('meetings.cards.conference.capacity', '1,000 attendees'),
        co2: translate('meetings.cards.conference.co2', '0.01 kg CO2'),
        description: translate('meetings.cards.conference.description', 'Full-featured virtual conferences with sustainability impact reports.'),
        iconLabel: 'GC',
        iconText: translate('meetings.cards.conference.title', 'Green Conference'),
        textColor: 'rgb(196,132,252)',
        title: translate('meetings.cards.conference.title', 'Green Conference'),
      },
    ],
    [translate]
  );

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
    translate,
    typeCards,
    virtualCO2,
    webinars: WEBINARS,
    generateCode,
  };
}
