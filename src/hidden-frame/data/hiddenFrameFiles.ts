import { hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

export type HiddenFrameFileState = 'locked' | 'available' | 'unlocked' | 'completed' | 'future';
export type HiddenFrameArcId = 'first-chain' | 'video-production';

export interface HiddenFrameFileRecord {
  id: string;
  fileNumber: string;
  phase: number;
  arcId: HiddenFrameArcId;
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
  unlocksFileIds?: string[];
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
    phase: 2,
    arcId: 'first-chain',
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
    phase: 2,
    arcId: 'first-chain',
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
    phase: 2,
    arcId: 'first-chain',
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
    phase: 2,
    arcId: 'first-chain',
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
    phase: 2,
    arcId: 'first-chain',
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
    unlocksFileId: '006',
    rewardFrameId: 'frame-005',
    recoveredMessage:
      'The Archivist turns the final door toward the light. The first chain is complete, and the recovered frames now remember the path.',
    completionMeta: {
      label: 'Frame 005 recovered',
      nextStep: 'The first Hidden Frame puzzle chain is complete. A timeline signal is now visible.',
    },
  },
  {
    id: '006',
    fileNumber: '006',
    phase: 3,
    arcId: 'video-production',
    title: 'The Timecode Drift',
    route: '/hidden-frame/file/006',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'A video-production record that opens after the first chain. It points toward the timeline.',
    clueText:
      'The signal does not begin with a title. It begins with an address in time. Hours, minutes, seconds, and frames hold the first drift in place.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
    background: hiddenFramePhase0Assets.backgrounds.vhsStatic,
    hintText: 'Editors use this numbered address to find an exact moment in a timeline.',
    passwordAnswer: 'TIMECODE',
    acceptedAnswers: ['TIME CODE'],
    prerequisiteFileId: '005',
    unlocksFileId: '007',
    rewardFrameId: 'frame-006',
    recoveredMessage:
      'The Archivist locks the drift to a frame address. Time is not only passing; it is being counted.',
    completionMeta: {
      label: 'Frame 006 recovered',
      nextStep: 'File 007 is now available in the archive.',
    },
  },
  {
    id: '007',
    fileNumber: '007',
    phase: 3,
    arcId: 'video-production',
    title: 'The Name Beneath the Frame',
    route: '/hidden-frame/file/007',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'A recovered graphics record about the text that identifies a person, place, or segment.',
    clueText:
      'The speaker was already visible, but the editor added a quiet label below the image. The clue lives in the part of the frame that tells viewers who they are seeing.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
    background: hiddenFramePhase0Assets.backgrounds.vhsStatic,
    hintText: 'Broadcast graphics often place this identifier in the lower part of the screen.',
    passwordAnswer: 'LOWER THIRD',
    acceptedAnswers: ['LOWERTHIRD'],
    prerequisiteFileId: '006',
    unlocksFileId: '008',
    rewardFrameId: 'frame-007',
    recoveredMessage:
      'The Archivist restores the label beneath the image. Names guide attention without stopping the story.',
    completionMeta: {
      label: 'Frame 007 recovered',
      nextStep: 'File 008 is now available in the archive.',
    },
  },
  {
    id: '008',
    fileNumber: '008',
    phase: 3,
    arcId: 'video-production',
    title: 'The Sound Before the Cut',
    route: '/hidden-frame/file/008',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'A recovered editing record about audio that carries meaning across two shots.',
    clueText:
      'The next scene arrived before the picture changed. Sound crossed the boundary first, making the cut feel less like a break and more like a path.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.vhsStatic,
    background: hiddenFramePhase0Assets.backgrounds.vhsStatic,
    hintText: 'When audio connects two shots, editors often call it a sound ______.',
    passwordAnswer: 'BRIDGE',
    acceptedAnswers: ['SOUND BRIDGE'],
    prerequisiteFileId: '007',
    rewardFrameId: 'frame-008',
    recoveredMessage:
      'The Archivist hears the bridge before the picture changes. The timeline remembers that sound can lead the eye.',
    completionMeta: {
      label: 'Frame 008 recovered',
      nextStep: 'The first video-production signal is complete.',
    },
  },
];

export const getHiddenFrameFileById = (id: string): HiddenFrameFileRecord | undefined =>
  hiddenFrameFiles.find((file) => file.id === id);

export const hiddenFrameFirstChainFiles = hiddenFrameFiles.filter(
  (file) => file.arcId === 'first-chain',
);

export const hiddenFrameVideoFiles = hiddenFrameFiles.filter(
  (file) => file.arcId === 'video-production',
);

export const hiddenFramePuzzleFiles = hiddenFrameFirstChainFiles;

export const hiddenFramePlayableFiles = hiddenFrameFiles.filter((file) => file.state !== 'future');
