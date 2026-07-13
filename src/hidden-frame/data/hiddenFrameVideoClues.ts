import { hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

export type HiddenFrameVideoClueType =
  | 'timecode'
  | 'cut'
  | 'lower-third'
  | 'sound-bridge';

export interface HiddenFrameVideoClue {
  id: string;
  title: string;
  clueType: HiddenFrameVideoClueType;
  timecode: string;
  frameNumber: number;
  relatedFileId: string;
  summary: string;
  prompt: string;
  visualLabel: string;
  thumbnail: string;
  lowerThirdText?: string;
  approvedVideoReference?: {
    label: string;
    note: string;
  };
}

export const hiddenFrameVideoClues: HiddenFrameVideoClue[] = [
  {
    id: 'hf-video-timecode-drift',
    title: 'Timecode Drift',
    clueType: 'timecode',
    timecode: '00:00:06:12',
    frameNumber: 162,
    relatedFileId: '006',
    summary: 'A signal marker pinned to one exact frame address.',
    prompt:
      'Look for the moment where the timeline stops being a blur and becomes a precise address.',
    visualLabel: 'Frame address visible',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
    approvedVideoReference: {
      label: 'Class timeline reference',
      note: 'Use only teacher-approved DCC video examples when this clue is paired with real media.',
    },
  },
  {
    id: 'hf-video-first-cut',
    title: 'Decision Between Shots',
    clueType: 'cut',
    timecode: '00:00:12:08',
    frameNumber: 296,
    relatedFileId: '002',
    summary: 'A clean edit point where meaning changes because the shot changes.',
    prompt:
      'The answer is not inside either shot. It lives where one shot ends and the next one starts.',
    visualLabel: 'Cut point selected',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
  },
  {
    id: 'hf-video-lower-third',
    title: 'Name Beneath the Frame',
    clueType: 'lower-third',
    timecode: '00:00:18:00',
    frameNumber: 432,
    relatedFileId: '007',
    summary: 'A quiet broadcast label that gives the viewer context without stopping the edit.',
    prompt:
      'The text does not cover the story. It supports it from the lower part of the frame.',
    visualLabel: 'Identifier graphic active',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
    lowerThirdText: 'ARCHIVE SOURCE / SIGNAL VERIFIED',
  },
  {
    id: 'hf-video-sound-bridge',
    title: 'Sound Before Picture',
    clueType: 'sound-bridge',
    timecode: '00:00:24:16',
    frameNumber: 592,
    relatedFileId: '008',
    summary: 'Audio crosses the edit before the image catches up.',
    prompt:
      'Listen to the path between scenes. The transition begins before the picture changes.',
    visualLabel: 'Audio bridge detected',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
  },
];

export const getHiddenFrameVideoClueById = (id: string): HiddenFrameVideoClue | undefined =>
  hiddenFrameVideoClues.find((clue) => clue.id === id);
