import { hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

export interface HiddenFrameRewardFrame {
  id: string;
  frameNumber: string;
  title: string;
  signalWord: string;
  sourceFileId: string;
  description: string;
  thumbnail: string;
}

export const hiddenFrameRewardFrames: HiddenFrameRewardFrame[] = [
  {
    id: 'frame-001',
    frameNumber: '001',
    title: 'LUMEN',
    signalWord: 'LUMEN',
    sourceFileId: '001',
    description: 'A frame for seeing the edge once light reaches it.',
    thumbnail: hiddenFramePhase0Assets.ui.titleCard,
  },
  {
    id: 'frame-002',
    frameNumber: '002',
    title: 'CUT',
    signalWord: 'CUT',
    sourceFileId: '002',
    description: 'A frame for noticing the decision between two shots.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
  },
  {
    id: 'frame-003',
    frameNumber: '003',
    title: 'BORDER',
    signalWord: 'BORDER',
    sourceFileId: '003',
    description: 'A frame for remembering what the camera leaves outside.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveDark,
  },
  {
    id: 'frame-004',
    frameNumber: '004',
    title: 'RENDER',
    signalWord: 'RENDER',
    sourceFileId: '004',
    description: 'A frame for bringing the final image into view.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.compression,
  },
  {
    id: 'frame-005',
    frameNumber: '005',
    title: 'ROTATION',
    signalWord: 'ROTATION',
    sourceFileId: '005',
    description: 'A frame for turning the door toward the light.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
];

export const getHiddenFrameRewardFrameById = (
  id: string,
): HiddenFrameRewardFrame | undefined => hiddenFrameRewardFrames.find((frame) => frame.id === id);
