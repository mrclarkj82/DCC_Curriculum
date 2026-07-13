import type { HiddenFrameProgressSummary } from '../progress/hiddenFrameProgress';

interface HiddenFrameProgressProps {
  summary: HiddenFrameProgressSummary;
  className?: string;
}

export function HiddenFrameProgress({ summary, className }: HiddenFrameProgressProps) {
  const statusText =
    summary.allCurrentFramesRecovered
      ? `Current archive recovered / ${summary.achievementCount}/${summary.totalAchievementCount} signals`
      : summary.recoveredFrameCount > 0
        ? `${summary.recoveredFrameCount}/${summary.totalFrameCount} frames / ${summary.achievementCount}/${summary.totalAchievementCount} signals`
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
