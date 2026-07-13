# Hidden Frame Extension Guide

Use this guide when adding future Hidden Frame content.

## Safe Expansion Rules

- Keep all clues inside DCC Creative Studio or approved class materials.
- Do not expose puzzle answers in admin preview pages.
- Do not show student progress, submissions, rosters, responses, names, or private media.
- Do not add uploads, account sync, or Firestore persistence without a new documented security decision.
- Keep the experience optional, ungraded, and non-competitive.

## Add Content Through Data First

- Recovered files: `src/hidden-frame/data/hiddenFrameFiles.ts`
- Frame cards: `src/hidden-frame/data/hiddenFrameFrames.ts`
- Video clues: `src/hidden-frame/data/hiddenFrameVideoClues.ts`
- Camera clues: `src/hidden-frame/data/hiddenFrameCameraClues.ts`
- Unreal clues: `src/hidden-frame/data/hiddenFrameUnrealClues.ts`
- Object clues: `src/hidden-frame/data/hiddenFrameObjectClues.ts`
- Compression logs: `src/hidden-frame/data/hiddenFrameCompressionLogs.ts`
- Final export prerequisites: `src/hidden-frame/data/hiddenFrameFinalExport.ts`
- Expansion manifest: `src/hidden-frame/data/hiddenFrameExpansionManifest.ts`

## Validation

After adding content, update or add a phase/content validator and run:

- `npm.cmd run validate:hidden-frame`
- `npm.cmd run lint`
- `npm.cmd run build`
- `npm.cmd run validate:curriculum` if curriculum-facing content changed

## Documentation

Update these files when behavior, canon, or expansion patterns change:

- `docs/hidden-frame/hidden-frame-spec.md`
- `docs/hidden-frame/hidden-frame-canon.md`
- `docs/hidden-frame/PROGRESS.md`
- `docs/hidden-frame/changelog.md`
- `docs/hidden-frame/decisions.md`
- `docs/hidden-frame/asset-requests.md`
