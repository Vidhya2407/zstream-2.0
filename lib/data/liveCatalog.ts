import type { LocalizedText, SupportedLanguage } from '../types/content';

export type Stream = {
  id: number;
  title: string;
  viewers: number;
  category: string;
  imageIdx: number;
  bitrate: number;
  fps: number;
  latency: number;
  quality: string;
  carbonOffset: number;
};

export type ChatMessage = {
  id: number;
  user: string;
  msg: string;
  time: string;
  color: string;
};

export type BotMessage = {
  user: string;
  msg: string;
  color: string;
};

type LocalizedStream = Omit<Stream, 'title' | 'category'> & {
  title: LocalizedText;
  category: LocalizedText;
};

type LocalizedChatMessage = Omit<ChatMessage, 'msg'> & {
  msg: LocalizedText;
};

type LocalizedBotMessage = Omit<BotMessage, 'msg'> & {
  msg: LocalizedText;
};

export const LOCALIZED_STREAMS: LocalizedStream[] = [
  { id: 0, title: { en: 'Climate Summit 2026', de: 'Klimagipfel 2026' }, viewers: 125840, category: { en: 'Events', de: 'Veranstaltungen' }, imageIdx: 0, bitrate: 6.2, fps: 60, latency: 14, quality: '1080p', carbonOffset: 0.0 },
  { id: 1, title: { en: 'Pro Gaming Tournament', de: 'Profi-Gaming-Turnier' }, viewers: 89210, category: { en: 'Gaming', de: 'Gaming' }, imageIdx: 1, bitrate: 4.8, fps: 60, latency: 18, quality: '1080p', carbonOffset: 0.0 },
  { id: 2, title: { en: 'Live Music Festival', de: 'Live-Musikfestival' }, viewers: 67430, category: { en: 'Music', de: 'Musik' }, imageIdx: 0, bitrate: 3.6, fps: 30, latency: 22, quality: '720p', carbonOffset: 0.0 },
  { id: 3, title: { en: 'Football Championship', de: 'Fussballmeisterschaft' }, viewers: 234100, category: { en: 'Sports', de: 'Sport' }, imageIdx: 1, bitrate: 8.0, fps: 60, latency: 11, quality: '4K', carbonOffset: 0.0 },
];

export const LOCALIZED_SEED_CHAT: LocalizedChatMessage[] = [
  { id: 1, user: 'EcoWarrior99', msg: { en: 'This summit is incredible!', de: 'Dieser Gipfel ist unglaublich!' }, time: '14:23', color: 'rgb(0,229,186)' },
  { id: 2, user: 'GreenStreamer', msg: { en: 'Love the zero-carbon broadcast!', de: 'Ich liebe diese klimaneutrale Uebertragung!' }, time: '14:23', color: 'rgb(0,217,255)' },
  { id: 3, user: 'ClimateHero', msg: { en: 'Best panel discussion all year', de: 'Beste Podiumsdiskussion des ganzen Jahres' }, time: '14:24', color: 'rgb(167,139,250)' },
  { id: 4, user: 'NatureLover', msg: { en: 'Absolutely on fire tonight', de: 'Heute Abend ist es absolut stark' }, time: '14:24', color: 'rgb(251,146,60)' },
  { id: 5, user: 'SolarFuture', msg: { en: 'Carbon offset counter is amazing', de: 'Der CO2-Ausgleichszaehler ist fantastisch' }, time: '14:24', color: 'rgb(96,165,250)' },
  { id: 6, user: 'ZeroEmissioner', msg: { en: 'Can we get a replay?', de: 'Koennen wir eine Wiederholung bekommen?' }, time: '14:25', color: 'rgb(251,191,36)' },
  { id: 7, user: 'EcoBeats', msg: { en: 'Stream quality is amazing tonight', de: 'Die Stream-Qualitaet ist heute Abend grossartig' }, time: '14:25', color: 'rgb(0,229,186)' },
  { id: 8, user: 'GreenGrid', msg: { en: 'Watching from Berlin', de: 'Ich schaue aus Berlin zu' }, time: '14:25', color: 'rgb(167,139,250)' },
];

export const LOCALIZED_BOT_MESSAGES: LocalizedBotMessage[] = [
  { user: 'StreamBot', msg: { en: '100K viewers milestone reached!', de: 'Meilenstein von 100 Tsd. Zuschauern erreicht!' }, color: 'rgb(251,191,36)' },
  { user: 'EcoAlert', msg: { en: '500g CO2 offset this stream!', de: '500 g CO2 in diesem Stream ausgeglichen!' }, color: 'rgb(0,229,186)' },
  { user: 'Moderator', msg: { en: 'Keep chat eco-friendly!', de: 'Bitte haltet den Chat umweltfreundlich!' }, color: 'rgb(239,68,68)' },
  { user: 'ClimateWatch', msg: { en: 'Next panel starts in 5 min', de: 'Das naechste Panel beginnt in 5 Min' }, color: 'rgb(0,217,255)' },
  { user: 'GreenFuture', msg: { en: 'This is history in the making', de: 'Das ist ein historischer Moment' }, color: 'rgb(96,165,250)' },
  { user: 'EcoCitizen', msg: { en: 'Shared this with 50 friends!', de: 'Mit 50 Freunden geteilt!' }, color: 'rgb(167,139,250)' },
];

export const STREAMS_EN: Stream[] = LOCALIZED_STREAMS.map((stream) => ({ ...stream, title: stream.title.en, category: stream.category.en }));
export const STREAMS_DE: Stream[] = LOCALIZED_STREAMS.map((stream) => ({ ...stream, title: stream.title.de, category: stream.category.de }));
export const SEED_CHAT_EN: ChatMessage[] = LOCALIZED_SEED_CHAT.map((message) => ({ ...message, msg: message.msg.en }));
export const SEED_CHAT_DE: ChatMessage[] = LOCALIZED_SEED_CHAT.map((message) => ({ ...message, msg: message.msg.de }));
export const BOT_MESSAGES_EN: BotMessage[] = LOCALIZED_BOT_MESSAGES.map((message) => ({ ...message, msg: message.msg.en }));
export const BOT_MESSAGES_DE: BotMessage[] = LOCALIZED_BOT_MESSAGES.map((message) => ({ ...message, msg: message.msg.de }));

export const LIVE_UI_TEXT = {
  heroTitle: { en: 'Live Streams', de: 'Live-Streams' },
  heroSubtitle: { en: 'Real-time streaming - Carbon-offset per minute', de: 'Echtzeit-Streaming - CO2-Ausgleich pro Minute' },
  offsetLabel: { en: 'CO2 offset', de: 'CO2-Ausgleich' },
  minLiveLabel: { en: 'min live', de: 'Min live' },
  healthLabel: { en: 'Health', de: 'Status' },
  streamHealthLabel: { en: 'Stream Health', de: 'Stream-Status' },
  watchLiveLabel: { en: 'Watch Live', de: 'Live ansehen' },
  watchStatLabel: { en: 'watching', de: 'sehen zu' },
  allChannelsLabel: { en: 'All Live Channels', de: 'Alle Live-Kanaele' },
  liveChatLabel: { en: 'Live Chat', de: 'Live-Chat' },
  saySomethingLabel: { en: 'Say something...', de: 'Schreib etwas...' },
  sendLabel: { en: 'Send', de: 'Senden' },
  encryptedLabel: { en: 'WebSocket - End-to-end encrypted', de: 'WebSocket - Ende-zu-Ende verschluesselt' },
} as const;

export function fmtViewers(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export const resolveLiveText = (value: LocalizedText, language: SupportedLanguage) => value[language] ?? value.en;
