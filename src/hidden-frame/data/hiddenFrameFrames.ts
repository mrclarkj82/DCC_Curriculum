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
  {
    id: 'frame-006',
    frameNumber: '006',
    title: 'TIMECODE',
    signalWord: 'TIMECODE',
    sourceFileId: '006',
    description: 'A frame for finding the exact moment a signal begins.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
  },
  {
    id: 'frame-007',
    frameNumber: '007',
    title: 'LOWER THIRD',
    signalWord: 'LOWER THIRD',
    sourceFileId: '007',
    description: 'A frame for naming what appears beneath the image.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
  },
  {
    id: 'frame-008',
    frameNumber: '008',
    title: 'BRIDGE',
    signalWord: 'BRIDGE',
    sourceFileId: '008',
    description: 'A frame for hearing the edit before seeing it.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
  },
  {
    id: 'frame-009',
    frameNumber: '009',
    title: 'THIRDS',
    signalWord: 'THIRDS',
    sourceFileId: '009',
    description: 'A frame for dividing the image with intention.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
  {
    id: 'frame-010',
    frameNumber: '010',
    title: 'LEADING LINES',
    signalWord: 'LEADING LINES',
    sourceFileId: '010',
    description: 'A frame for following the path the image creates.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
  {
    id: 'frame-011',
    frameNumber: '011',
    title: 'LOOK SPACE',
    signalWord: 'LOOK SPACE',
    sourceFileId: '011',
    description: 'A frame for leaving room in the direction of attention.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
  {
    id: 'frame-012',
    frameNumber: '012',
    title: 'VECTOR',
    signalWord: 'VECTOR',
    sourceFileId: '012',
    description: 'A frame for placing the clue with coordinates and direction.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
  {
    id: 'frame-013',
    frameNumber: '013',
    title: 'BLUEPRINT',
    signalWord: 'BLUEPRINT',
    sourceFileId: '013',
    description: 'A frame for making a scene respond through visible logic.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
  {
    id: 'frame-014',
    frameNumber: '014',
    title: 'TRIGGER',
    signalWord: 'TRIGGER',
    sourceFileId: '014',
    description: 'A frame for noticing the invisible boundary that starts an event.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
  {
    id: 'frame-015',
    frameNumber: '015',
    title: 'MESH',
    signalWord: 'MESH',
    sourceFileId: '015',
    description: 'A frame for reading the object name and the model structure beneath it.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
  {
    id: 'frame-016',
    frameNumber: '016',
    title: 'UV MAP',
    signalWord: 'UV MAP',
    sourceFileId: '016',
    description: 'A frame for unfolding a surface before a texture can return to it.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveDark,
  },
  {
    id: 'frame-017',
    frameNumber: '017',
    title: 'SHADOW',
    signalWord: 'SHADOW',
    sourceFileId: '017',
    description: 'A frame for grounding a model with scale, material, and light.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
];

export const getHiddenFrameRewardFrameById = (
  id: string,
): HiddenFrameRewardFrame | undefined => hiddenFrameRewardFrames.find((frame) => frame.id === id);
