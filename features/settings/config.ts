export const playbackQualities = ['Auto', '4K Ultra HD', '1080p Full HD', '720p HD', '480p SD', '360p'] as const;
export const interfaceLanguages = ['English', 'Deutsch', 'Francais', 'Espanol', 'Japanese', 'Korean'] as const;

export const drmDevices = [
  { id: 'd1', name: 'Chrome on Windows', type: 'Widevine L1', lastUsed: '2 days ago', current: true },
  { id: 'd2', name: 'iPhone 14 Pro', type: 'FairPlay', lastUsed: '5 days ago', current: false },
  { id: 'd3', name: 'Samsung Smart TV', type: 'PlayReady', lastUsed: '1 week ago', current: false },
] as const;
