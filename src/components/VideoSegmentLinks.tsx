import type { Lesson } from '../types';

interface VideoSegmentLinksProps {
  video: Lesson['video'];
}

function timecodeToSeconds(timecode: string) {
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

export function VideoSegmentLinks({ video }: VideoSegmentLinksProps) {
  const exactSegmentUrl = video.url
    ? getExactSegmentUrl(video.url, video.start, video.end)
    : null;

  return (
    <>
      <p>{video.source}</p>
      <p className="meta-line">
        {video.start}-{video.end}
      </p>
      {video.url ? (
        <>
          <div className="button-row">
            {exactSegmentUrl && (
              <a
                className="secondary-button"
                href={exactSegmentUrl}
                target="_blank"
                rel="noreferrer"
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
        </>
      ) : (
        <p className="muted">Video link placeholder.</p>
      )}
    </>
  );
}
