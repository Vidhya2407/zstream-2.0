export const playbackQualities = [
  { value: 'auto', label: 'Auto' },
  { value: '1080', label: '1080p Full HD' },
  { value: '720', label: '720p HD' },
  { value: '480', label: '480p SD' },
  { value: '360', label: '360p Data Saver' },
] as const;

export const interfaceLanguages = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
] as const;

export const themeOptions = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
] as const;

export const drmDevices = [
  { id: 'd1', name: 'Chrome on Windows', type: 'Widevine L1', lastUsed: '2 days ago', current: true },
  { id: 'd2', name: 'iPhone 14 Pro', type: 'FairPlay', lastUsed: '5 days ago', current: false },
  { id: 'd3', name: 'Samsung Smart TV', type: 'PlayReady', lastUsed: '1 week ago', current: false },
] as const;
