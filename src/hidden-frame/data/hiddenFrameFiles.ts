import { hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

export type HiddenFrameFileState = 'locked' | 'available' | 'unlocked' | 'completed' | 'future';
export type HiddenFrameArcId =
  | 'first-chain'
  | 'video-production'
  | 'cinematography'
  | 'unreal-engine'
  | 'blender-object';

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
    unlocksFileId: '009',
    rewardFrameId: 'frame-008',
    recoveredMessage:
      'The Archivist hears the bridge before the picture changes. The timeline remembers that sound can lead the eye.',
    completionMeta: {
      label: 'Frame 008 recovered',
      nextStep: 'The first video-production signal is complete. A camera signal is now visible.',
    },
  },
  {
    id: '009',
    fileNumber: '009',
    phase: 4,
    arcId: 'cinematography',
    title: 'The Third Line',
    route: '/hidden-frame/file/009',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'A cinematography record about dividing the frame before deciding where attention belongs.',
    clueText:
      'The subject did not move. The frame moved around them. Two vertical lines and two horizontal lines quietly divided the image into choices.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
    background: hiddenFramePhase0Assets.backgrounds.archiveGrid,
    hintText: 'Many camera guides divide a frame into three columns and three rows.',
    passwordAnswer: 'THIRDS',
    acceptedAnswers: ['RULE OF THIRDS', 'THE RULE OF THIRDS'],
    prerequisiteFileId: '008',
    unlocksFileId: '010',
    rewardFrameId: 'frame-009',
    recoveredMessage:
      'The Archivist draws the guide lines. Attention shifts when the frame is divided with intention.',
    completionMeta: {
      label: 'Frame 009 recovered',
      nextStep: 'File 010 is now available in the archive.',
    },
  },
  {
    id: '010',
    fileNumber: '010',
    phase: 4,
    arcId: 'cinematography',
    title: 'The Line That Leads',
    route: '/hidden-frame/file/010',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'A cinematography record about paths that pull the viewer through the image.',
    clueText:
      'The hallway did not speak, but it pointed. Rails, shadows, and edges all leaned toward the same place in the frame.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
    background: hiddenFramePhase0Assets.backgrounds.archiveGrid,
    hintText: 'What do cinematographers call lines that guide the viewer through an image?',
    passwordAnswer: 'LEADING LINES',
    acceptedAnswers: ['LEADING', 'LINES'],
    prerequisiteFileId: '009',
    unlocksFileId: '011',
    rewardFrameId: 'frame-010',
    recoveredMessage:
      'The Archivist follows the path through the image. The frame was pointing before anyone noticed.',
    completionMeta: {
      label: 'Frame 010 recovered',
      nextStep: 'File 011 is now available in the archive.',
    },
  },
  {
    id: '011',
    fileNumber: '011',
    phase: 4,
    arcId: 'cinematography',
    title: 'The Space Ahead',
    route: '/hidden-frame/file/011',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'A cinematography record about leaving room in the direction a subject faces or moves.',
    clueText:
      'The character looked toward an empty part of the image. The empty space was not empty at all. It was the direction of the story.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
    background: hiddenFramePhase0Assets.backgrounds.archiveGrid,
    hintText: 'This is the space left in front of a subject who is looking or moving.',
    passwordAnswer: 'LOOK SPACE',
    acceptedAnswers: ['LOOKSPACE', 'LEAD ROOM', 'LEADROOM'],
    prerequisiteFileId: '010',
    unlocksFileId: '012',
    rewardFrameId: 'frame-011',
    recoveredMessage:
      'The Archivist leaves room for the gaze. The story can move because the frame makes space for it.',
    completionMeta: {
      label: 'Frame 011 recovered',
      nextStep: 'The first camera signal is complete. A Render Room signal is now visible.',
    },
  },
  {
    id: '012',
    fileNumber: '012',
    phase: 5,
    arcId: 'unreal-engine',
    title: 'The Coordinate That Stayed',
    route: '/hidden-frame/file/012',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'An Unreal Engine record about position, direction, and the numbers that hold a scene in place.',
    clueText:
      'The object was not lost. Its location was written in three quiet numbers. X pointed across the room, Y pulled the path sideways, and Z lifted the clue into view.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
    background: hiddenFramePhase0Assets.backgrounds.renderRoom,
    hintText: 'In Unreal, position and direction values are often stored as this three-number type.',
    passwordAnswer: 'VECTOR',
    acceptedAnswers: ['VECTORS'],
    prerequisiteFileId: '011',
    unlocksFileId: '013',
    rewardFrameId: 'frame-012',
    recoveredMessage:
      'The Archivist records the coordinate. The room was not hiding the clue; it was placing it.',
    completionMeta: {
      label: 'Frame 012 recovered',
      nextStep: 'File 013 is now available in the archive.',
    },
  },
  {
    id: '013',
    fileNumber: '013',
    phase: 5,
    arcId: 'unreal-engine',
    title: 'Blueprint Without Wires',
    route: '/hidden-frame/file/013',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'An Unreal Engine record about logic nodes, events, and the choices that make a scene respond.',
    clueText:
      'The door did not open because it was lucky. An event reached a node, a condition answered, and the room changed because someone built the logic.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
    background: hiddenFramePhase0Assets.backgrounds.renderRoom,
    hintText: 'Unreal visual scripting graphs are commonly called this.',
    passwordAnswer: 'BLUEPRINT',
    acceptedAnswers: ['BLUEPRINTS'],
    prerequisiteFileId: '012',
    unlocksFileId: '014',
    rewardFrameId: 'frame-013',
    recoveredMessage:
      'The Archivist reconnects the logic. A scene can react when its decisions are visible.',
    completionMeta: {
      label: 'Frame 013 recovered',
      nextStep: 'File 014 is now available in the archive.',
    },
  },
  {
    id: '014',
    fileNumber: '014',
    phase: 5,
    arcId: 'unreal-engine',
    title: 'The Room That Knows You Entered',
    route: '/hidden-frame/file/014',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'An Unreal Engine record about trigger volumes, collision, and a room responding to presence.',
    clueText:
      'Nothing chased you. Nothing broke. The room simply noticed when a player crossed an invisible boundary and used that moment to change the scene.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
    background: hiddenFramePhase0Assets.backgrounds.renderRoom,
    hintText: 'Designers often use this kind of volume to detect entry and fire an event.',
    passwordAnswer: 'TRIGGER',
    acceptedAnswers: ['TRIGGER VOLUME', 'TRIGGER BOX'],
    prerequisiteFileId: '013',
    unlocksFileId: '015',
    rewardFrameId: 'frame-014',
    recoveredMessage:
      'The Archivist labels the invisible boundary. Interaction begins when the scene knows what entered it.',
    completionMeta: {
      label: 'Frame 014 recovered',
      nextStep: 'The first Render Room signal is complete. An object signal is now visible.',
    },
  },
  {
    id: '015',
    fileNumber: '015',
    phase: 6,
    arcId: 'blender-object',
    title: 'The Name on the Mesh',
    route: '/hidden-frame/file/015',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'A Blender/object record about names, mesh details, and the clues artists leave in organized scenes.',
    clueText:
      'The object did not need to shout. Its name in the outliner remembered what the camera forgot: a simple mesh, labeled with intention.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
    background: hiddenFramePhase0Assets.backgrounds.archiveGrid,
    hintText: 'In Blender and 3D modeling, editable object geometry is commonly called a ______.',
    passwordAnswer: 'MESH',
    acceptedAnswers: ['OBJECT MESH'],
    prerequisiteFileId: '014',
    unlocksFileId: '016',
    rewardFrameId: 'frame-015',
    recoveredMessage:
      'The Archivist reads the object name. Organization is not decoration; it is a way to leave meaning where others can find it.',
    completionMeta: {
      label: 'Frame 015 recovered',
      nextStep: 'File 016 is now available in the archive.',
    },
  },
  {
    id: '016',
    fileNumber: '016',
    phase: 6,
    arcId: 'blender-object',
    title: 'The Folded Surface',
    route: '/hidden-frame/file/016',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'A Blender/object record about how textures wrap around a model through flattened surface coordinates.',
    clueText:
      'The surface looked seamless only because someone unfolded it first. A flat map told the image how to return to the model.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
    background: hiddenFramePhase0Assets.backgrounds.archiveDark,
    hintText: 'Texture coordinates on a model are often arranged in this kind of map.',
    passwordAnswer: 'UV MAP',
    acceptedAnswers: ['UV', 'UVS', 'U V MAP'],
    prerequisiteFileId: '015',
    unlocksFileId: '017',
    rewardFrameId: 'frame-016',
    recoveredMessage:
      'The Archivist unfolds the surface. A texture can only return home when the object remembers where each part belongs.',
    completionMeta: {
      label: 'Frame 016 recovered',
      nextStep: 'File 017 is now available in the archive.',
    },
  },
  {
    id: '017',
    fileNumber: '017',
    phase: 6,
    arcId: 'blender-object',
    title: 'The Shadow Under the Model',
    route: '/hidden-frame/file/017',
    state: 'locked',
    statusLabel: 'Locked',
    description:
      'A Blender/object record about scale, materials, shadows, and checking a model from the camera view.',
    clueText:
      'The model finally felt real when it touched the floor with a shadow. Scale, material, and camera view agreed for one quiet frame.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
    background: hiddenFramePhase0Assets.backgrounds.renderRoom,
    hintText: 'A model becomes grounded when light creates this beneath or beside it.',
    passwordAnswer: 'SHADOW',
    acceptedAnswers: ['CAST SHADOW', 'SHADOWS'],
    prerequisiteFileId: '016',
    rewardFrameId: 'frame-017',
    recoveredMessage:
      'The Archivist grounds the model. A shadow is not only darkness; it is evidence that the object belongs in the scene.',
    completionMeta: {
      label: 'Frame 017 recovered',
      nextStep: 'The first object signal is complete.',
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

export const hiddenFrameCameraFiles = hiddenFrameFiles.filter(
  (file) => file.arcId === 'cinematography',
);

export const hiddenFrameUnrealFiles = hiddenFrameFiles.filter(
  (file) => file.arcId === 'unreal-engine',
);

export const hiddenFrameObjectFiles = hiddenFrameFiles.filter(
  (file) => file.arcId === 'blender-object',
);

export const hiddenFramePuzzleFiles = hiddenFrameFirstChainFiles;

export const hiddenFramePlayableFiles = hiddenFrameFiles.filter((file) => file.state !== 'future');
