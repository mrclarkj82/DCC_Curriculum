import { hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

export type HiddenFrameFileState = 'locked' | 'available' | 'unlocked' | 'completed';

export interface HiddenFrameFileRecord {
  id: string;
  fileNumber: string;
  title: string;
  route: string;
  state: HiddenFrameFileState;
  statusLabel: string;
  description: string;
  thumbnail?: string;
  hintText?: string;
  passwordAnswer?: string;
  recoveredMessage?: string;
}

export const hiddenFrameFiles: HiddenFrameFileRecord[] = [
  {
    id: '001',
    fileNumber: '001',
    title: 'The Edge of the Page',
    route: '/hidden-frame/file/001',
    state: 'available',
    statusLabel: 'Available',
    description:
      'A recovered edge marker from the first public Hidden Frame entry point. The page is open, but the file still needs a signal word.',
    thumbnail: hiddenFramePhase0Assets.ui.titleCard,
    hintText:
      'The answer is a word from Unreal lighting: the system that helps a scene carry bounced light instead of staying flat.',
    passwordAnswer: 'LUMEN',
    recoveredMessage:
      "The Archivist says, 'You found the edge of the page. Most people never check the border. The first clue is not hidden far away. It is hidden in what the frame chooses to show.'",
  },
  {
    id: '002',
    fileNumber: '002',
    title: 'Signal Drift',
    route: '/hidden-frame/file/002',
    state: 'locked',
    statusLabel: 'Locked',
    description: 'A future video signal record. No puzzle content is active in Phase 1.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
  },
  {
    id: '003',
    fileNumber: '003',
    title: 'Render Room Index',
    route: '/hidden-frame/file/003',
    state: 'locked',
    statusLabel: 'Locked',
    description: 'A future Render Room reference. The index is reserved for a later phase.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
  {
    id: '004',
    fileNumber: '004',
    title: 'Compression Trace',
    route: '/hidden-frame/file/004',
    state: 'locked',
    statusLabel: 'Locked',
    description: 'A future Compression log placeholder. It is inactive and contains no solution yet.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.compression,
  },
  {
    id: '005',
    fileNumber: '005',
    title: 'Viewport Artifact',
    route: '/hidden-frame/file/005',
    state: 'locked',
    statusLabel: 'Locked',
    description: 'A future Unreal viewport clue placeholder. It is reserved for Phase 2 or later.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
];

export const getHiddenFrameFileById = (id: string): HiddenFrameFileRecord | undefined =>
  hiddenFrameFiles.find((file) => file.id === id);
