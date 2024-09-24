import { SupportedVideoFormats } from '@/constants';

export function validVideoUrl(url?: string): boolean {
  if (!url) {
    return false;
  }

  const fileExtension = url.slice(url.lastIndexOf('.') + 1);

  return !!SupportedVideoFormats.find((format) => format === fileExtension);
}
