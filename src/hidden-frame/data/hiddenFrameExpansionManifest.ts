export interface HiddenFrameExpansionPoint {
  id: string;
  label: string;
  ownerArea: 'archive' | 'video' | 'camera' | 'unreal' | 'objects' | 'compression' | 'final';
  description: string;
  extensionPath: string;
  safetyNote: string;
}

export interface HiddenFrameAssetRequest {
  id: string;
  label: string;
  assetType: 'image' | 'data' | 'copy' | 'component';
  priority: 'low' | 'medium' | 'high';
  status: 'requested' | 'ready' | 'deferred';
  note: string;
}

export const hiddenFrameExpansionPoints: HiddenFrameExpansionPoint[] = [
  {
    id: 'expansion-recovered-files',
    label: 'Recovered Files',
    ownerArea: 'archive',
    description: 'Add new optional recovered files through `hiddenFrameFiles.ts`.',
    extensionPath: 'src/hidden-frame/data/hiddenFrameFiles.ts',
    safetyNote: 'Do not use client-side answers for graded or private gates.',
  },
  {
    id: 'expansion-frame-cards',
    label: 'Frame Cards',
    ownerArea: 'archive',
    description: 'Add new local collectible frames through `hiddenFrameFrames.ts`.',
    extensionPath: 'src/hidden-frame/data/hiddenFrameFrames.ts',
    safetyNote: 'Keep frames optional and local; do not present them as grades or points.',
  },
  {
    id: 'expansion-video-clues',
    label: 'Video Clues',
    ownerArea: 'video',
    description: 'Add approved timeline and broadcast clues through `hiddenFrameVideoClues.ts`.',
    extensionPath: 'src/hidden-frame/data/hiddenFrameVideoClues.ts',
    safetyNote: 'Use only DCC-approved media references that stay inside the site or class materials.',
  },
  {
    id: 'expansion-composition-clues',
    label: 'Composition Clues',
    ownerArea: 'camera',
    description: 'Add camera/composition clues through `hiddenFrameCameraClues.ts`.',
    extensionPath: 'src/hidden-frame/data/hiddenFrameCameraClues.ts',
    safetyNote: 'Do not use student images or identifying media without explicit approved handling.',
  },
  {
    id: 'expansion-engine-clues',
    label: 'Engine Clues',
    ownerArea: 'unreal',
    description: 'Add Unreal concepts through `hiddenFrameUnrealClues.ts`.',
    extensionPath: 'src/hidden-frame/data/hiddenFrameUnrealClues.ts',
    safetyNote: 'Do not require installing tools, opening private projects, or leaving the DCC site.',
  },
  {
    id: 'expansion-object-clues',
    label: 'Object Clues',
    ownerArea: 'objects',
    description: 'Add Blender/object concepts through `hiddenFrameObjectClues.ts`.',
    extensionPath: 'src/hidden-frame/data/hiddenFrameObjectClues.ts',
    safetyNote: 'Use approved in-site object references; do not ask for uploads or private files.',
  },
  {
    id: 'expansion-compression-logs',
    label: 'Compression Logs',
    ownerArea: 'compression',
    description: 'Add safe Compression logs through `hiddenFrameCompressionLogs.ts`.',
    extensionPath: 'src/hidden-frame/data/hiddenFrameCompressionLogs.ts',
    safetyNote: 'Keep Compression metaphorical: no real malware, threats, or breach language.',
  },
  {
    id: 'expansion-final-export',
    label: 'Final Export',
    ownerArea: 'final',
    description: 'Adjust final prerequisite logic through `hiddenFrameFinalExport.ts`.',
    extensionPath: 'src/hidden-frame/data/hiddenFrameFinalExport.ts',
    safetyNote: 'Keep final progress local and optional unless a future security review approves more.',
  },
];

export const hiddenFrameAssetRequests: HiddenFrameAssetRequest[] = [
  {
    id: 'asset-approved-video-stills',
    label: 'Approved Video Still Set',
    assetType: 'image',
    priority: 'medium',
    status: 'requested',
    note: 'Optional future stills for timeline clues using approved class-safe media only.',
  },
  {
    id: 'asset-object-detail-pack',
    label: 'Object Detail Pack',
    assetType: 'image',
    priority: 'medium',
    status: 'requested',
    note: 'Optional stills or generated images for object inspection clues.',
  },
  {
    id: 'asset-expansion-content-template',
    label: 'Expansion Content Template',
    assetType: 'data',
    priority: 'high',
    status: 'ready',
    note: 'Use existing typed data modules and validation scripts as the content template.',
  },
  {
    id: 'asset-future-compression-copy',
    label: 'Compression Copy Review',
    assetType: 'copy',
    priority: 'low',
    status: 'deferred',
    note: 'Review future Compression copy for calm, metaphorical, school-safe language.',
  },
];
