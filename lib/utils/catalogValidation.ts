import type { WatchContent } from '../data/watchContent';

export function validateWatchContentRecord(value: WatchContent | null | undefined): value is WatchContent {
  if (!value) {
    return false;
  }

  if (!value.id || !value.title || !value.src) {
    return false;
  }

  if (!Array.isArray(value.relatedIds) || !Array.isArray(value.tags) || !Array.isArray(value.cast)) {
    return false;
  }

  if (!value.drmLicenseUrls?.widevine || !value.drmLicenseUrls?.playready || !value.drmLicenseUrls?.fairplay) {
    return false;
  }

  return true;
}
