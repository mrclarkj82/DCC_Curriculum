import { hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

export type HiddenFrameObjectConcept =
  | 'object-name'
  | 'model-detail'
  | 'material'
  | 'uv-map'
  | 'shadow'
  | 'scale'
  | 'camera-view'
  | 'engraved-text';

export interface HiddenFrameObjectClue {
  id: string;
  title: string;
  concept: HiddenFrameObjectConcept;
  relatedFileId?: string;
  objectLabel: string;
  inspectionNote: string;
  observation: string;
  prompt: string;
  thumbnail: string;
}

export const hiddenFrameObjectClues: HiddenFrameObjectClue[] = [
  {
    id: 'hf-object-name',
    title: 'Outliner Name',
    concept: 'object-name',
    relatedFileId: '015',
    objectLabel: 'HF_Door_Frame_Mesh',
    inspectionNote: 'Name carries intent',
    observation: 'The first clue is not on the model surface. It is in the way the object is named.',
    prompt: 'Check whether the artist organized the scene before checking the texture.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
  {
    id: 'hf-object-model-detail',
    title: 'Beveled Edge',
    concept: 'model-detail',
    objectLabel: 'Small bevel visible on the broken corner',
    inspectionNote: 'Detail changes silhouette',
    observation: 'A tiny edge makes the object catch light and feel less flat.',
    prompt: 'Inspect the model detail that affects the outline before the material does.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
  {
    id: 'hf-object-material',
    title: 'Material Memory',
    concept: 'material',
    objectLabel: 'Material: archive_glass_warm_edge',
    inspectionNote: 'Surface response differs',
    observation: 'The mesh did not change, but the material made it read as glass instead of metal.',
    prompt: 'Notice whether color, roughness, or emission is carrying the signal.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveDark,
  },
  {
    id: 'hf-object-uv-map',
    title: 'Folded Surface',
    concept: 'uv-map',
    relatedFileId: '016',
    objectLabel: 'UV islands aligned to frame edge',
    inspectionNote: 'Texture returns through coordinates',
    observation: 'The texture looks intentional because the surface was unfolded with care.',
    prompt: 'Look for the flat map that tells the texture where to land.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
  {
    id: 'hf-object-shadow',
    title: 'Ground Contact',
    concept: 'shadow',
    relatedFileId: '017',
    objectLabel: 'Contact shadow visible below mesh',
    inspectionNote: 'Light proves placement',
    observation: 'The model feels present because the shadow agrees with the floor.',
    prompt: 'Use the shadow to check whether the object belongs in the scene.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
  {
    id: 'hf-object-scale',
    title: 'Measured Door',
    concept: 'scale',
    objectLabel: 'Scale compares to player-height reference',
    inspectionNote: 'Proportion confirms the scene',
    observation: 'The object becomes believable when its size matches the world around it.',
    prompt: 'Compare the model to a doorway, grid unit, or camera-height reference.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveGrid,
  },
  {
    id: 'hf-object-camera-view',
    title: 'View Through the Lens',
    concept: 'camera-view',
    objectLabel: 'Camera view reveals hidden underside mark',
    inspectionNote: 'Perspective changes evidence',
    observation: 'The clue appears from the camera view, not from the default editor angle.',
    prompt: 'Check what the final camera can see before rotating the object again.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.renderRoom,
  },
  {
    id: 'hf-object-engraved-text',
    title: 'Small Engraving',
    concept: 'engraved-text',
    objectLabel: 'Engraved text: CHECK THE FRAME',
    inspectionNote: 'Tiny text remains in-site',
    observation: 'The text is part of the object detail, not a request to search elsewhere.',
    prompt: 'Read only the object detail shown inside the DCC site.',
    thumbnail: hiddenFramePhase0Assets.backgrounds.archiveDark,
  },
];

export const getHiddenFrameObjectClueById = (
  id: string,
): HiddenFrameObjectClue | undefined => hiddenFrameObjectClues.find((clue) => clue.id === id);
