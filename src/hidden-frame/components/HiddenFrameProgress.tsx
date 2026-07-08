import type { HiddenFrameProgressSummary } from '../progress/hiddenFrameProgress';

interface HiddenFrameProgressProps {
  summary: HiddenFrameProgressSummary;
  className?: string;
}

export function HiddenFrameProgress({ summary, className }: HiddenFrameProgressProps) {
  const statusText =
    summary.chainComplete
      ? 'First chain complete'
      : summary.recoveredFrameCount > 0
        ? `${summary.recoveredFrameCount}/${summary.totalFrameCount} frames recovered`
        : summary.unlockedFileCount > 1
          ? `${summary.unlockedFileCount} files available`
          : summary.archiveInitialized
            ? 'Archive initialized'
            : 'Archive waiting';

  return (
    <p className={['hidden-frame-progress', className].filter(Boolean).join(' ')} aria-live="polite">
      {statusText}
    </p>
  );
}
