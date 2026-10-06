import type { Lesson } from '../types';

export function timecodeToSeconds(timecode: string) {
  const parts = timecode.split(':');

  if (parts.length < 2 || parts.length > 3 || parts.some((part) => !/^\d+$/.test(part))) {
    return null;
  }

  const values = parts.map(Number);
  const seconds = values.at(-1) ?? 0;
  const minutes = values.at(-2) ?? 0;
  const hours = values.length === 3 ? values[0] : 0;

  if (minutes > 59 || seconds > 59) {
    return null;
  }

  return hours * 3600 + minutes * 60 + seconds;
}

export function hasVideoSegment(video: Lesson['video'] | null | undefined): boolean {
  if (!video?.url || !video.start || !video.end) {
    return false;
  }

  try {
    const { protocol } = new URL(video.url);
    if (protocol !== 'https:' && protocol !== 'http:') {
      return false;
    }
  } catch {
    return false;
  }

  const start = timecodeToSeconds(video.start);
  const end = timecodeToSeconds(video.end);

  return start !== null && end !== null && end > start;
}
