import type { MeetingTabOption, MeetingTypeCard, RecordingItem, UpcomingMeeting, WebinarItem } from './types';

export const IN_PERSON_CO2_KG_PER_HOUR = 2.8;

export const MEETING_TYPE_CARDS: MeetingTypeCard[] = [
  { accentColor: 'rgba(0,229,186,0.08)', border: 'rgba(0,229,186,0.2)', capacity: '10,000 attendees', co2: '0 kg CO2', description: 'Host large-scale climate education sessions with up to 10,000 attendees.', iconLabel: 'CW', iconText: 'Climate Webinar', textColor: 'rgb(0,229,186)', title: 'Climate Webinar' },
  { accentColor: 'rgba(0,128,255,0.08)', border: 'rgba(0,128,255,0.18)', capacity: '250 participants', co2: '0.002 kg CO2', description: 'Eco-optimized video calls with real-time carbon tracking per participant.', iconLabel: 'TM', iconText: 'Team Meeting', textColor: 'rgb(96,165,250)', title: 'Team Meeting' },
  { accentColor: 'rgba(147,51,234,0.08)', border: 'rgba(147,51,234,0.18)', capacity: '1,000 attendees', co2: '0.01 kg CO2', description: 'Full-featured virtual conferences with sustainability impact reports.', iconLabel: 'GC', iconText: 'Green Conference', textColor: 'rgb(196,132,252)', title: 'Green Conference' },
];

export const UPCOMING_MEETINGS: UpcomingMeeting[] = [
  { attendees: 842, co2Saved: '0.38 kg', id: 1, status: 'Starting Soon', time: 'Today, 3:00 PM', title: 'Climate Policy Q&A', type: 'Webinar' },
  { attendees: 124, co2Saved: '0.12 kg', id: 2, status: 'Scheduled', time: 'Tomorrow, 10:00 AM', title: 'Zero Waste Workshop', type: 'Workshop' },
  { attendees: 3280, co2Saved: '1.24 kg', id: 3, status: 'Scheduled', time: 'Jan 28, 2:00 PM', title: 'Solar Energy Summit', type: 'Conference' },
  { attendees: 18, co2Saved: '0.04 kg', id: 4, status: 'Starting Soon', time: 'Today, 5:30 PM', title: 'Eco Dev Team Sync', type: 'Team Meeting' },
];

export const RECORDINGS: RecordingItem[] = [
  { attendees: 1280, co2Saved: '4.2 kg', date: 'Oct 14, 2025', duration: '1h 42m', id: 1, thumbnail: 'Ocean', title: 'Annual Climate Review 2025' },
  { attendees: 45, co2Saved: '0.8 kg', date: 'Oct 12, 2025', duration: '58m', id: 2, thumbnail: 'Workshop', title: 'Tech Sustainability Workshop' },
  { attendees: 3200, co2Saved: '12.4 kg', date: 'Oct 10, 2025', duration: '2h 15m', id: 3, thumbnail: 'Market', title: 'Global Carbon Market Trends' },
];

export const WEBINARS: WebinarItem[] = [
  { date: 'In 2 days', icon: 'Solar', id: 1, registered: 4200, speaker: 'Dr. Sarah Chen', time: '14:00 GMT', title: 'The Future of Renewable Energy' },
  { date: 'Oct 28', icon: 'Build', id: 2, registered: 1850, speaker: 'Marcus Webb', time: '10:00 GMT', title: 'Sustainable Architecture 101' },
  { date: 'Nov 2', icon: 'AI', id: 3, registered: 840, speaker: 'Prof. Erik Larsen', time: '16:00 GMT', title: 'AI for Climate Prediction' },
];

export const MEETING_TABS: MeetingTabOption[] = [
  { id: 'schedule', labelKey: 'tabs.schedule' },
  { id: 'join', labelKey: 'tabs.join' },
  { id: 'recordings', labelKey: 'tabs.recordings' },
  { id: 'webinars', labelKey: 'tabs.webinars' },
];
