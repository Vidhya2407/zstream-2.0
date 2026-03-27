export type MeetingTab = 'schedule' | 'join' | 'recordings' | 'webinars';

export interface MeetingTypeCard {
  accentColor: string;
  border: string;
  capacity: string;
  co2: string;
  description: string;
  iconLabel: string;
  iconText: string;
  textColor: string;
  title: string;
}

export interface UpcomingMeeting {
  attendees: number;
  co2Saved: string;
  id: number;
  status: string;
  time: string;
  title: string;
  type: string;
}

export interface RecordingItem {
  attendees: number;
  co2Saved: string;
  date: string;
  duration: string;
  id: number;
  thumbnail: string;
  title: string;
}

export interface WebinarItem {
  date: string;
  icon: string;
  id: number;
  registered: number;
  speaker: string;
  time: string;
  title: string;
}

export interface MeetingTabOption {
  id: MeetingTab;
  labelKey: string;
}
