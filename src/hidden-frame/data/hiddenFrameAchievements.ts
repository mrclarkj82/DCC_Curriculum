export type HiddenFrameAchievementCriteria =
  | {
      type: 'archive-visited';
    }
  | {
      type: 'completed-files';
      fileIds: string[];
    }
  | {
      type: 'recovered-frame-count';
      count: number;
    };

export interface HiddenFrameAchievement {
  id: string;
  title: string;
  signalLabel: string;
  description: string;
  criteria: HiddenFrameAchievementCriteria;
}

export interface HiddenFrameAchievementProgressState {
  archiveVisited: boolean;
  completedFileIds: string[];
  recoveredFrameIds: string[];
}

export const hiddenFrameAchievements: HiddenFrameAchievement[] = [
  {
    id: 'archive-opened',
    title: 'Archive Opened',
    signalLabel: 'Discovery',
    description: 'The archive was found without leaving DCC Creative Studio.',
    criteria: { type: 'archive-visited' },
  },
  {
    id: 'first-chain-recovered',
    title: 'First Chain Recovered',
    signalLabel: 'Files 001-005',
    description: 'The first five recovered files have been completed locally.',
    criteria: { type: 'completed-files', fileIds: ['001', '002', '003', '004', '005'] },
  },
  {
    id: 'timeline-signal-recovered',
    title: 'Timeline Signal',
    signalLabel: 'Files 006-008',
    description: 'The video-production signal has been recovered.',
    criteria: { type: 'completed-files', fileIds: ['006', '007', '008'] },
  },
  {
    id: 'camera-signal-recovered',
    title: 'Camera Signal',
    signalLabel: 'Files 009-011',
    description: 'The cinematography signal has been recovered.',
    criteria: { type: 'completed-files', fileIds: ['009', '010', '011'] },
  },
  {
    id: 'render-room-signal-recovered',
    title: 'Render Room Signal',
    signalLabel: 'Files 012-014',
    description: 'The Unreal/Render Room signal has been recovered.',
    criteria: { type: 'completed-files', fileIds: ['012', '013', '014'] },
  },
  {
    id: 'object-signal-recovered',
    title: 'Object Signal',
    signalLabel: 'Files 015-017',
    description: 'The object inspection signal has been recovered.',
    criteria: { type: 'completed-files', fileIds: ['015', '016', '017'] },
  },
  {
    id: 'ten-frames-recovered',
    title: 'Ten Frames Recovered',
    signalLabel: 'Collection',
    description: 'Ten optional local frame cards have been recovered.',
    criteria: { type: 'recovered-frame-count', count: 10 },
  },
  {
    id: 'current-archive-recovered',
    title: 'Current Archive Recovered',
    signalLabel: 'Phase 7',
    description: 'All currently available Hidden Frame files have been recovered locally.',
    criteria: {
      type: 'completed-files',
      fileIds: [
        '001',
        '002',
        '003',
        '004',
        '005',
        '006',
        '007',
        '008',
        '009',
        '010',
        '011',
        '012',
        '013',
        '014',
        '015',
        '016',
        '017',
      ],
    },
  },
];

export function isHiddenFrameAchievementEarned(
  achievement: HiddenFrameAchievement,
  progress: HiddenFrameAchievementProgressState,
): boolean {
  switch (achievement.criteria.type) {
    case 'archive-visited':
      return progress.archiveVisited;
    case 'completed-files':
      return achievement.criteria.fileIds.every((fileId) =>
        progress.completedFileIds.includes(fileId),
      );
    case 'recovered-frame-count':
      return progress.recoveredFrameIds.length >= achievement.criteria.count;
  }
}

export function getEarnedHiddenFrameAchievementIds(
  progress: HiddenFrameAchievementProgressState,
): string[] {
  return hiddenFrameAchievements
    .filter((achievement) => isHiddenFrameAchievementEarned(achievement, progress))
    .map((achievement) => achievement.id);
}

export const getHiddenFrameAchievementById = (
  id: string,
): HiddenFrameAchievement | undefined =>
  hiddenFrameAchievements.find((achievement) => achievement.id === id);
