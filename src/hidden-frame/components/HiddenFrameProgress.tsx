import type { HiddenFrameProgressSummary } from '../progress/hiddenFrameProgress';

interface HiddenFrameProgressProps {
  summary: HiddenFrameProgressSummary;
  className?: string;
}

export function HiddenFrameProgress({ summary, className }: HiddenFrameProgressProps) {
  const statusText =
    summary.unlockedFileCount > 0
      ? `${summary.unlockedFileCount} recovered file unlocked`
      : summary.archiveInitialized
        ? 'Archive initialized'
        : 'Archive waiting';

  return (
    <p className={['hidden-frame-progress', className].filter(Boolean).join(' ')} aria-live="polite">
      {statusText}
    </p>
  );
}
