import type { HiddenFrameRewardFrame } from '../data/hiddenFrameFrames';

interface FrameCardProps {
  frame: HiddenFrameRewardFrame;
  isRecovered: boolean;
}

export function FrameCard({ frame, isRecovered }: FrameCardProps) {
  return (
    <article
      className={[
        'hidden-frame-frame-card',
        isRecovered ? 'hidden-frame-frame-card--recovered' : 'hidden-frame-frame-card--locked',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`Frame ${frame.frameNumber}: ${
        isRecovered ? `${frame.title} recovered` : 'locked'
      }`}
    >
      <div className="hidden-frame-frame-card__art" aria-hidden="true">
        {isRecovered ? <img src={frame.thumbnail} alt="" /> : <span />}
      </div>
      <div className="hidden-frame-frame-card__body">
        <p className="hidden-frame-kicker">Frame {frame.frameNumber}</p>
        <h2>{isRecovered ? frame.title : 'Signal unrecovered'}</h2>
        <p>
          {isRecovered
            ? frame.description
            : `Complete File ${frame.sourceFileId} to recover this optional frame.`}
        </p>
      </div>
    </article>
  );
}
