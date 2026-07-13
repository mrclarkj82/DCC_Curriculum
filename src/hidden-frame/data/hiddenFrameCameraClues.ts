import { hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

export type HiddenFrameCompositionPrinciple =
  | 'rule-of-thirds'
  | 'leading-lines'
  | 'symmetry'
  | 'headroom'
  | 'look-space'
  | 'repetition'
  | 'central-framing';

export interface HiddenFrameCameraClue {
  id: string;
  title: string;
  principle: HiddenFrameCompositionPrinciple;
  relatedFileId?: string;
  imageLabel: string;
  observation: string;
  prompt: string;
  thumbnail: string;
}

export const hiddenFrameCameraClues: HiddenFrameCameraClue[] = [
  {
    id: 'hf-camera-thirds',
    title: 'Third Line Marker',
    principle: 'rule-of-thirds',
    relatedFileId: '009',
    imageLabel: 'Three-by-three guide visible',
    observation: 'The subject sits near an intersection instead of the exact center.',
    prompt: 'Notice how dividing the frame changes where attention lands.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
  {
    id: 'hf-camera-leading-lines',
    title: 'Hallway Vector',
    principle: 'leading-lines',
    relatedFileId: '010',
    imageLabel: 'Lines converging toward the subject',
    observation: 'Edges in the image point toward the same destination.',
    prompt: 'Follow the direction created by rails, shadows, walls, or paths.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
  {
    id: 'hf-camera-symmetry',
    title: 'Mirror Center',
    principle: 'symmetry',
    imageLabel: 'Balanced left and right halves',
    observation: 'The frame feels intentional because both sides answer each other.',
    prompt: 'Look for balance across the center line.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveDark,
  },
  {
    id: 'hf-camera-headroom',
    title: 'Quiet Space Above',
    principle: 'headroom',
    imageLabel: 'Space above the subject marked',
    observation: 'Too much or too little space above a head changes the feeling of the shot.',
    prompt: 'Check the top edge before deciding the shot is finished.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveDark,
  },
  {
    id: 'hf-camera-look-space',
    title: 'Room for the Gaze',
    principle: 'look-space',
    relatedFileId: '011',
    imageLabel: 'Open space in front of the subject',
    observation: 'The empty side of the frame gives the subject somewhere to look.',
    prompt: 'Ask where the subject is facing, then check whether the frame leaves space there.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
  {
    id: 'hf-camera-repetition',
    title: 'Pattern Echo',
    principle: 'repetition',
    imageLabel: 'Repeated shapes detected',
    observation: 'A repeated shape turns background detail into rhythm.',
    prompt: 'Find the pattern that makes the frame feel designed.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveDark,
  },
  {
    id: 'hf-camera-central-framing',
    title: 'Center Hold',
    principle: 'central-framing',
    imageLabel: 'Subject held in center frame',
    observation: 'Center framing can feel direct, formal, or confrontational.',
    prompt: 'Notice when the center is a choice instead of a default.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
];

export const getHiddenFrameCameraClueById = (id: string): HiddenFrameCameraClue | undefined =>
  hiddenFrameCameraClues.find((clue) => clue.id === id);
