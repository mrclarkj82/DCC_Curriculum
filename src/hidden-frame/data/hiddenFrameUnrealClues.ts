import { hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

export type HiddenFrameUnrealConcept =
  | 'coordinate'
  | 'rotation'
  | 'scale'
  | 'lighting'
  | 'material'
  | 'blueprint'
  | 'trigger-volume'
  | 'collision'
  | 'camera-perspective';

export interface HiddenFrameUnrealClue {
  id: string;
  title: string;
  concept: HiddenFrameUnrealConcept;
  relatedFileId?: string;
  viewportLabel: string;
  readout: string;
  observation: string;
  prompt: string;
  thumbnail: string;
}

export const hiddenFrameUnrealClues: HiddenFrameUnrealClue[] = [
  {
    id: 'hf-unreal-coordinate',
    title: 'Pinned Transform',
    concept: 'coordinate',
    relatedFileId: '012',
    viewportLabel: 'Transform panel: X 120, Y -40, Z 80',
    readout: 'Location vector stable',
    observation: 'The clue stays visible only because the object has a precise location.',
    prompt: 'Read the three values as placement, not as a secret code outside the site.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
  {
    id: 'hf-unreal-rotation',
    title: 'Door Facing Light',
    concept: 'rotation',
    viewportLabel: 'Yaw adjusted toward the key light',
    readout: 'Rotation changed attention',
    observation: 'A familiar door becomes readable when it faces the light source.',
    prompt: 'Notice how direction can reveal a surface without moving the camera.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
  {
    id: 'hf-unreal-scale',
    title: 'Too Large to Ignore',
    concept: 'scale',
    viewportLabel: 'Scale values normalized',
    readout: 'Size returns to believable space',
    observation: 'A prop feels wrong when its size ignores the world around it.',
    prompt: 'Compare the object to the doorway, floor grid, and player height.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
  {
    id: 'hf-unreal-lighting',
    title: 'Key Light Memory',
    concept: 'lighting',
    viewportLabel: 'Warm key, cool fill, visible rim',
    readout: 'Lighting directs the eye',
    observation: 'The room becomes readable when light separates foreground from background.',
    prompt: 'Find which light makes the important edge visible first.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
  {
    id: 'hf-unreal-material',
    title: 'Surface With a Signal',
    concept: 'material',
    viewportLabel: 'Material instance: archive_glass_signal',
    readout: 'Roughness and emissive values differ',
    observation: 'The same mesh can communicate different meaning when its material changes.',
    prompt: 'Check surface response before assuming the model changed.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveDark,
  },
  {
    id: 'hf-unreal-blueprint',
    title: 'Event Graph Echo',
    concept: 'blueprint',
    relatedFileId: '013',
    viewportLabel: 'Begin overlap routes to reveal signal',
    readout: 'Blueprint path restored',
    observation: 'The scene reacts because an event reaches a decision node.',
    prompt: 'Follow the logic from event to condition to result.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
  {
    id: 'hf-unreal-trigger-volume',
    title: 'Invisible Room Edge',
    concept: 'trigger-volume',
    relatedFileId: '014',
    viewportLabel: 'Trigger volume bounds visible in editor',
    readout: 'Entry event detected',
    observation: 'The room can respond without pretending anything unsafe is happening.',
    prompt: 'Look for the boundary that notices the player crossing into the space.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
  {
    id: 'hf-unreal-collision',
    title: 'Blocked Path, Open Story',
    concept: 'collision',
    viewportLabel: 'Collision preset changed from BlockAll to OverlapOnly',
    readout: 'Interaction rule altered',
    observation: 'The object does not need to be visible to change how the player moves.',
    prompt: 'Ask whether the surface blocks, overlaps, or ignores the player.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
  {
    id: 'hf-unreal-camera-perspective',
    title: 'Player Viewport Offset',
    concept: 'camera-perspective',
    viewportLabel: 'Camera boom shifted to reveal the missing corner',
    readout: 'Perspective reveals the frame',
    observation: 'The clue appears when the player view changes, not when the world changes.',
    prompt: 'Check what the camera can see from the player position.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
];

export const getHiddenFrameUnrealClueById = (
  id: string,
): HiddenFrameUnrealClue | undefined => hiddenFrameUnrealClues.find((clue) => clue.id === id);
