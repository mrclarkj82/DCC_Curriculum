import { hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

export type HiddenFrameFileState = 'locked' | 'available' | 'unlocked' | 'completed' | 'future';

export interface HiddenFrameFileRecord {
  id: string;
  fileNumber: string;
  title: string;
  route: string;
  state: HiddenFrameFileState;
  statusLabel: string;
  description: string;
  clueText: string;
  thumbnail?: string;
  background?: string;
  hintText?: string;
  passwordAnswer?: string;
  acceptedAnswers?: string[];
  prerequisiteFileId?: string;
  unlocksFileId?: string;
  rewardFrameId?: string;
  recoveredMessage?: string;
  completionMeta?: {
    label: string;
    nextStep: string;
  };
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
      'The first recovered file is available by default. It needs a signal word before the archive opens the next record.',
    clueText:
      'You found the edge of the page. Most people never check the border. The first clue is not hidden far away. It is hidden in what the frame chooses to show.',
    thumbnail: hiddenFramePhase0Assets.ui.titleCard,
    background: hiddenFramePhase0Assets.backgrounds.archiveGrid,
    hintText: 'A scene cannot be seen until it has light.',
    passwordAnswer: 'LUMEN',
    unlocksFileId: '002',
    rewardFrameId: 'frame-001',
    recoveredMessage:
      'The Archivist records the first edge. Light found the page, and Frame 001 now holds the signal LUMEN.',
    completionMeta: {
      label: 'Frame 001 recovered',
      nextStep: 'File 002 is now available in the archive.',
    },
  },
  {
    id: '002',
    fileNumber: '002',
    title: 'The First Cut',
    route: '/hidden-frame/file/002',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'A recovered video-production record. It opens after File 001 is completed.',
    clueText:
      'Motion becomes meaning only when someone chooses where to cut. The first editor did not hide the answer in the shot. They hid it in the decision between shots.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
    background: hiddenFramePhase0Assets.backgrounds.vhsStatic,
    hintText: 'What do editors call the moment one shot ends and another begins?',
    passwordAnswer: 'CUT',
    acceptedAnswers: ['THE CUT'],
    prerequisiteFileId: '001',
    unlocksFileId: '003',
    rewardFrameId: 'frame-002',
    recoveredMessage:
      'The Archivist marks the edit point. The story moved because you noticed where one frame gave way to the next.',
    completionMeta: {
      label: 'Frame 002 recovered',
      nextStep: 'File 003 is now available in the archive.',
    },
  },
  {
    id: '003',
    fileNumber: '003',
    title: 'The Cropped Student',
    route: '/hidden-frame/file/003',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'A recovered composition record. It opens after File 002 is completed.',
    clueText:
      'The student was not missing. The camera simply pointed elsewhere. What disappears outside the frame may still be part of the story.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
    background: hiddenFramePhase0Assets.backgrounds.archiveDark,
    hintText: 'Check the edge. Check what the image excludes.',
    passwordAnswer: 'BORDER',
    prerequisiteFileId: '002',
    unlocksFileId: '004',
    rewardFrameId: 'frame-003',
    recoveredMessage:
      'The Archivist restores the margin. What the frame excludes still matters to the story.',
    completionMeta: {
      label: 'Frame 003 recovered',
      nextStep: 'File 004 is now available in the archive.',
    },
  },
  {
    id: '004',
    fileNumber: '004',
    title: 'Render Failed',
    route: '/hidden-frame/file/004',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'A recovered production-output record. It opens after File 003 is completed.',
    clueText:
      'The project did not fail because nothing was made. It failed because the final image never finished becoming visible.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.compression,
    background: hiddenFramePhase0Assets.backgrounds.compression,
    hintText:
      'In Unreal and video production, what do we call the process of producing the final image?',
    passwordAnswer: 'RENDER',
    prerequisiteFileId: '003',
    unlocksFileId: '005',
    rewardFrameId: 'frame-004',
    recoveredMessage:
      'The Archivist steadies the output. The image was not gone; it was waiting to finish becoming visible.',
    completionMeta: {
      label: 'Frame 004 recovered',
      nextStep: 'File 005 is now available in the archive.',
    },
  },
  {
    id: '005',
    fileNumber: '005',
    title: 'The Door Facing Light',
    route: '/hidden-frame/file/005',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'The final recovered record in the first puzzle chain. It opens after File 004 is completed.',
    clueText:
      'The door is not locked. It is waiting to face the light. Position matters. Direction matters. A frame is not only where you are. It is where you are looking.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
    background: hiddenFramePhase0Assets.backgrounds.renderRoom,
    hintText: 'In Unreal, changing where an object faces is changing its ______.',
    passwordAnswer: 'ROTATION',
    acceptedAnswers: ['OBJECT ROTATION'],
    prerequisiteFileId: '004',
    rewardFrameId: 'frame-005',
    recoveredMessage:
      'The Archivist turns the final door toward the light. The first chain is complete, and the recovered frames now remember the path.',
    completionMeta: {
      label: 'Frame 005 recovered',
      nextStep: 'The first Hidden Frame puzzle chain is complete.',
    },
  },
];

export const getHiddenFrameFileById = (id: string): HiddenFrameFileRecord | undefined =>
  hiddenFrameFiles.find((file) => file.id === id);

export const hiddenFramePuzzleFiles = hiddenFrameFiles.filter((file) => file.state !== 'future');
