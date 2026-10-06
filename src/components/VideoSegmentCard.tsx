import type { Lesson } from '../types';
import { hasVideoSegment, timecodeToSeconds } from '../utils/lessonVideo';

interface VideoSegmentCardProps {
  video?: Lesson['video'] | null;
  className?: string;
}

function getYouTubeVideoId(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace(/^www\./, '');

    if (hostname === 'youtu.be') {
      return parsedUrl.pathname.split('/').filter(Boolean)[0] ?? null;
    }

    if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
      if (parsedUrl.pathname === '/watch') {
        return parsedUrl.searchParams.get('v');
      }

      const [, route, videoId] = parsedUrl.pathname.split('/');
      if (route === 'embed' || route === 'shorts') {
        return videoId ?? null;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function getExactSegmentUrl(url: string, startTimecode: string, endTimecode: string) {
  const videoId = getYouTubeVideoId(url);
  const start = timecodeToSeconds(startTimecode);
  const end = timecodeToSeconds(endTimecode);

  if (!videoId || start === null || end === null || end <= start) {
    return null;
  }

  const params = new URLSearchParams({
    start: String(start),
    end: String(end),
    autoplay: '1',
  });

  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`;
}

export function VideoSegmentCard({ video, className = '' }: VideoSegmentCardProps) {
  if (!video || !hasVideoSegment(video)) {
    return null;
  }

  const exactSegmentUrl = getExactSegmentUrl(video.url, video.start, video.end);

  return (
    <section className={`card mission-panel ${className}`.trim()}>
      <h2>Video Segment</h2>
      <p>{video.source}</p>
      <p className="meta-line">
        {video.start}-{video.end}
      </p>
      <div className="button-row">
        {exactSegmentUrl && (
          <a
            className="secondary-button"
            href={exactSegmentUrl}
            target="_blank"
            rel="noopener"
            referrerPolicy="strict-origin-when-cross-origin"
          >
            Play assigned segment
          </a>
        )}
        <a className="outline-button" href={video.url} target="_blank" rel="noreferrer">
          Open on YouTube at {video.start}
        </a>
      </div>
      <p className="muted">
        {exactSegmentUrl
          ? `Assigned playback stops at ${video.end}. The standard YouTube page may continue beyond that point.`
          : `Start at ${video.start} and stop at ${video.end}.`}
      </p>
    </section>
  );
}
