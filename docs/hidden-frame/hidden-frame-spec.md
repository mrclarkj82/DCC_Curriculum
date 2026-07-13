# The Hidden Frame Technical Specification

The Hidden Frame is an optional, school-appropriate ARG layer for the DCC Creative Studio website. This document is the living technical design bible for how the system is built, extended, styled, validated, and documented.

Before implementing any future Hidden Frame feature, read this specification first. After implementation, update this document so it continues to reflect the real architecture, components, assets, routes, systems, and design decisions.

## Purpose

The Hidden Frame should add curiosity, observation, media literacy, and creative problem solving to the DCC site without distracting from class workflows or compromising student privacy. It must stay inside the DCC website, approved class materials, and future approved project files.

Phase 0 imports the official visual identity only. Phase 1 adds the first small public-facing hidden route experience with a landing page, archive hub, one password-gated recovered file, reusable components, and local-only progress tracking. Phase 2 expands that foundation into the first optional puzzle chain with five recovered files, local unlock sequencing, collectible frame rewards, hint reveals, and a local collection page. Phase 3 adds the first video-production timeline route with structured timecode, cut, lower-third, and sound-bridge clues. Phase 4 adds the first cinematography route with composition clue data and CSS guide overlays. Phase 5 adds the first web-based Unreal/Render Room routes with structured viewport clue data. Phase 6 adds the first object inspection route with Blender/modeling clue data. Phase 7 adds local signal badges, schema version 3 progress, and local reset support. Phase 8 adds the safe Compression event route with data-driven logs, glitch/redaction UI, and corrupted card states. Phase 9 adds the Final Export ending and Frame 000 reveal.

## Core Principles

Hidden Frame should always feel cinematic, mysterious, polished, professional, technology-focused, minimalist, immersive, and school appropriate.

It should reward curiosity, observation, critical thinking, creativity, media literacy, and exploration.

It must avoid horror, gore, occult imagery, real-world conspiracy themes, hacking real systems, or directing students outside the DCC website.

## Philosophy

The system should feel like students are noticing traces inside media and production artifacts, not like they are being pulled into a separate game platform. Clues, future interactions, and future unlocks should be subtle, intentional, and respectful of classroom time.

Every future phase should preserve the DCC app's Firebase Auth, role protection, class access checks, student privacy rules, and Firestore namespace requirements. Hidden Frame content must not weaken existing security or create access to student data.

## Visual Identity

The Phase 0 Asset Kit is the canonical art direction. Do not redesign, reinterpret, recolor, trace, crop into a new logo, or replace the artwork unless a future specification update explicitly supersedes Phase 0.

The broken frame symbol is the official icon and logo of Hidden Frame. Use it consistently for archive pages, password gates, recovered files, collectible frame cards, progress pages, Easter egg links, unlock screens, developer tools, admin interfaces, and future Hidden Frame experiences.

Background meanings:

- `archive-bg-dark.png`: forgotten digital records, archive landings, recovered files, and quiet mystery states.
- `archive-bg-grid.png`: Unreal Engine, viewport, level design, and spatial clue contexts.
- `archive-bg-vhs-static.png`: video production, timeline, broadcast, signal, and media artifact contexts.
- `archive-bg-compression.png`: Compression states, warning states, corrupt logs, blocked records, and antagonist-adjacent interfaces.
- `archive-bg-render-room.png`: Render Room hub, Unreal-themed clue indexes, viewport readouts, and future spatial clue locations.

## Design Tokens

Use `public/hidden-frame/ui/hidden-frame-design-tokens.json` as the default styling reference for Hidden Frame interfaces. Colors, typography, spacing, glow effects, borders, shadows, transitions, animation timing, corner radii, overlays, and UI effects should inherit from these tokens or documented derivatives.

Palette:

- `ink`: `#05070B`
- `deep_archive`: `#08111F`
- `archive_blue`: `#0B1F36`
- `cold_blue`: `#6CEAFF`
- `signal_cyan`: `#8DF7FF`
- `ghost_white`: `#EAFBFF`
- `dim_text`: `#8BA8B7`
- `compression_red`: `#FF3155`
- `warning_amber`: `#FFB84D`
- `grid_blue`: `#214B68`
- `void_black`: `#000000`
- `flat_gray`: `#8E969B`

Hidden Frame styling may harmonize with the existing DCC synthwave system, but it should keep the colder archive tone from Phase 0 instead of becoming a generic neon card layout.

## Typography

Use a bold geometric sans or existing display font for titles and short labels. Use monospace for file IDs, timestamps, logs, archive metadata, Compression text, and technical fragments.

Do not require font downloads beyond the app's existing font strategy unless a future phase intentionally adds and documents a licensed font asset.

## UI Language

Prefer concise labels such as archive, recovered file, frame, signal, render room, compression, original, artifact, check the frame, and source. Keep copy calm and professional. Avoid horror language, occult references, real-world conspiracy framing, or commands that imply students should leave the site.

Hidden controls must be discoverable through pointer affordances, hover states, focus states, and accessible labels. Mystery should come from observation, not inaccessible UI.

## Animation Guidelines

Use restrained scanlines, flicker, compression blocks, glow shifts, and short reveal transitions. Motion should support atmosphere and state changes.

Respect reduced-motion preferences. Future animation systems should provide non-motion equivalents for clues and avoid relying on timing alone for puzzle logic.

## Accessibility Expectations

All interactive Hidden Frame elements must support keyboard focus, visible focus indicators, descriptive `aria-label` text, readable contrast, and non-color-only state communication.

Images used as functional controls need accessible names. Decorative textures should be hidden from assistive technology. Future puzzles must not depend only on color, sound, or fine motor interaction.

## Canonical Assets And Registries

Primary app registry:

- `public/hidden-frame/manifest.json`
- `src/hidden-frame/hiddenFramePhase0Assets.ts`

Preserved Phase 0 source references:

- `public/hidden-frame/hidden-frame-phase0-manifest.json`
- `docs/hidden-frame/phase0/hidden-frame-phase0-manifest.json`
- `docs/hidden-frame/phase0/README_HIDDEN_FRAME_PHASE0.md`
- `docs/hidden-frame/phase0/CODEX_PHASE0_IMPLEMENTATION_NOTES.md`
- `docs/hidden-frame/phase0/previews/phase0-contact-sheet.png`

Whenever practical, future components should import from `src/hidden-frame` instead of hardcoding static paths.

## Asset Usage Rules

Preserve original filenames whenever possible. If project conventions require a different path, create aliases, registry entries, or mappings instead of renaming the original asset.

Use the transparent or white broken-frame symbol for dark archive surfaces. Use the black symbol only on light surfaces. Use the glitch symbol for hover, corruption, Compression, or unlock states. Use SVG variants when small, crisp UI marks are needed.

Do not use Phase 0 backgrounds as generic decoration for unrelated DCC features. They are reserved for Hidden Frame or clearly documented future integration points.

## Folder Structure

Current Hidden Frame structure:

```text
docs/
  hidden-frame/
    ACCEPTANCE_CRITERIA.md
    PROGRESS.md
    changelog.md
    decisions.md
    hidden-frame-canon.md
    hidden-frame-spec.md
    roadmap.md
    phase0/
      CODEX_PHASE0_IMPLEMENTATION_NOTES.md
      README_HIDDEN_FRAME_PHASE0.md
      hidden-frame-phase0-manifest.json
      previews/
        phase0-contact-sheet.png
  hidden-frame-spec.md
  hidden-frame-canon.md
public/
  hidden-frame/
    manifest.json
    hidden-frame-phase0-manifest.json
    backgrounds/
    previews/
    symbols/
    ui/
scripts/
  validate-hidden-frame-assets.mjs
  validate-hidden-frame-phase1.mjs
  validate-hidden-frame-phase2.mjs
  validate-hidden-frame-phase3.mjs
  validate-hidden-frame-phase4.mjs
  validate-hidden-frame-phase5.mjs
  validate-hidden-frame-phase6.mjs
  validate-hidden-frame-phase7.mjs
  validate-hidden-frame-phase8.mjs
  validate-hidden-frame-phase9.mjs
src/
  hidden-frame/
    components/
      AchievementBadge.tsx
      AchievementGrid.tsx
      CameraClueCard.tsx
      CameraClueGrid.tsx
      CompressionLog.tsx
      CompressionWarningPanel.tsx
      CompositionGuideFrame.tsx
      CorruptedFileCard.tsx
      FinalExportPanel.tsx
      FrameCard.tsx
      Frame000Reveal.tsx
      FrameCollectionGrid.tsx
      GlitchText.tsx
      HiddenFrameIcon.tsx
      HiddenFrameProgress.tsx
      HiddenFrameResetPanel.tsx
      LowerThirdClueCard.tsx
      ObjectClueCard.tsx
      ObjectClueGrid.tsx
      ObjectInspectionFrame.tsx
      PasswordGate.tsx
      RedactedText.tsx
      RecoveredFileCard.tsx
      TimelineClueCard.tsx
      TimelineTrack.tsx
      UnrealClueCard.tsx
      UnrealSignalGrid.tsx
      UnrealViewportReadout.tsx
      VideoStillClueCard.tsx
    data/
      hiddenFrameAchievements.ts
      hiddenFrameCameraClues.ts
      hiddenFrameCompressionLogs.ts
      hiddenFrameFinalExport.ts
      hiddenFrameFrames.ts
      hiddenFrameFiles.ts
      hiddenFrameObjectClues.ts
      hiddenFrameUnrealClues.ts
      hiddenFrameVideoClues.ts
    hooks/
      useHiddenFrameProgress.ts
    hiddenFramePhase0Assets.ts
    index.ts
    pages/
      HiddenFrameArchivePage.tsx
      HiddenFrameCameraPage.tsx
      HiddenFrameCollectionPage.tsx
      HiddenFrameCompressionPage.tsx
      HiddenFrameFilePage.tsx
      HiddenFrameFinalExportPage.tsx
      HiddenFrameFrame000Page.tsx
      HiddenFrameLandingPage.tsx
      HiddenFrameObjectsPage.tsx
      HiddenFrameRenderRoomPage.tsx
      HiddenFrameTimelinePage.tsx
      HiddenFrameUnrealPage.tsx
    progress/
      hiddenFrameProgress.ts
      hiddenFrameProgressCore.ts
    utils/
      passwordGate.ts
  styles/
    hidden-frame.css
```

Update this section whenever new Hidden Frame directories are introduced.

## Routing Conventions

Implemented routes:

- `/hidden-frame`
- `/hidden-frame/archive`
- `/hidden-frame/file/001`
- `/hidden-frame/file/:fileId`
- `/hidden-frame/collection`
- `/hidden-frame/timeline`
- `/hidden-frame/camera`
- `/hidden-frame/render-room`
- `/hidden-frame/unreal`
- `/hidden-frame/objects`
- `/hidden-frame/compression`
- `/hidden-frame/final-export`
- `/hidden-frame/frame-000`

Reserved future routes:

- `/hidden-frame/frame/:id`
- `/hidden-frame/progress`

The Hidden Frame routes live inside the existing authenticated app shell so they remain contained inside DCC Creative Studio and preserve normal access controls. They are intentionally not added to the normal public student navigation menu.

`/hidden-frame/file/001` remains registered for backwards compatibility. `/hidden-frame/file/:fileId` is the data-driven route used for Files 001 through 017.

Routes must be protected or public according to the learning purpose and privacy implications. Do not expose student data or teacher/admin data through Hidden Frame routes.

## Reusable Components

Future components should be modular, reusable, and data-driven. Phase 1 created these foundation components:

- `HiddenFrameIcon`
- `RecoveredFileCard`
- `PasswordGate`
- `HiddenFrameProgress`
- `HiddenFrameResetPanel`
- `CompressionLog`
- `CompressionWarningPanel`
- `CorruptedFileCard`
- `FinalExportPanel`
- `Frame000Reveal`
- `GlitchText`
- `RedactedText`
- `AchievementBadge`
- `AchievementGrid`
- `FrameCard`
- `FrameCollectionGrid`
- `TimelineTrack`
- `TimelineClueCard`
- `VideoStillClueCard`
- `LowerThirdClueCard`
- `CompositionGuideFrame`
- `CameraClueCard`
- `CameraClueGrid`
- `ObjectInspectionFrame`
- `ObjectClueCard`
- `ObjectClueGrid`
- `UnrealViewportReadout`
- `UnrealClueCard`
- `UnrealSignalGrid`

Document every reusable component in the Component Library section when it is created.

## Architectural Principles

Design the architecture so future phases can support hundreds of archive entries, puzzles, collectibles, achievements, locations, and media assets without a major rewrite.

Favor configuration over hardcoding. Future archive entries, puzzles, collectibles, dialogue, achievements, unlock requirements, and progression should come from structured JSON, Firestore-backed records, or typed TypeScript data modules rather than one-off component logic.

Keep curriculum/content data separate from app code. If future Hidden Frame content becomes Firestore-backed, it must stay namespaced under `apps/dcc`.

## Extension Strategy

Future content packs should add structured data and assets first, then reusable components if the current component library cannot express the new experience.

Each new reusable system must document its public interface, expected input shape, output behavior, dependencies, and extension strategy.

## Developer Workflow

All future Hidden Frame features should be implemented using modular, reusable, data-driven components.

Avoid one-off implementations, duplicated UI, duplicated logic, or hardcoded puzzles whenever practical.

Workflow:

1. Read `docs/hidden-frame/hidden-frame-spec.md` and `docs/hidden-frame/hidden-frame-canon.md`.
2. Check `src/hidden-frame/hiddenFramePhase0Assets.ts` and `public/hidden-frame/manifest.json` for canonical assets.
3. Add or update structured data before component-specific branching.
4. Preserve Firebase Auth, role protections, class access checks, and student privacy rules.
5. Run lint, build, curriculum validation when relevant, and `npm run validate:hidden-frame`.
6. Update this specification and the canon document as needed.

## Naming Standards

Assets:

- Preserve kit filenames.
- New static assets use lowercase kebab-case: `archive-bg-location-name.png`, `frame-card-id.png`, `compression-log-id.png`.

Folders:

- Use lowercase kebab-case under `public/hidden-frame`, `src/hidden-frame`, and future content folders.

Components:

- Use PascalCase with the `HiddenFrame` prefix: `HiddenFrameIcon`, `HiddenFrameArchiveCard`.

Pages:

- Use PascalCase with the route purpose: `HiddenFrameArchivePage`, `HiddenFrameFilePage`.

Routes:

- Use lowercase kebab-case: `/hidden-frame/render-room`, `/hidden-frame/file/:id`.

JSON data:

- Use lowercase kebab-case filenames and camelCase properties.

TypeScript modules:

- Use camelCase filenames for utilities and registries, PascalCase for components.

Identifiers:

- Puzzle IDs: `hf-puzzle-phase-slug`
- Frame IDs: `hf-frame-slug`
- Archive IDs: `hf-archive-slug`
- Achievement IDs: `hf-achievement-slug`
- Content pack IDs: `hf-pack-phase-slug`

## Coding Standards

Use TypeScript for app code. Keep public interfaces typed. Keep reusable data schemas explicit and documented.

Do not hardcode Firebase credentials, private links, rosters, student names, student media, passwords, or unpublished solutions in client code.

Do not add raw file uploads, Firebase Storage uploads, media hosting, grading, quiz attempts, or portfolio workflows as part of Hidden Frame unless a later phase explicitly requests them.

## Documentation Standards

Technical implementation belongs in this specification. Lore, story continuity, puzzle answers, characters, and narrative events belong in `docs/hidden-frame/hidden-frame-canon.md`.

Record future architectural improvements, deferred features, known limitations, and implementation notes in the Technical Debt & TODO section instead of scattering TODO comments throughout the codebase.

Every future Hidden Frame implementation should append a dated Version History entry.

## Testing Expectations

Run:

```bash
npm run validate:hidden-frame
npm run lint
npm run build
```

Run `npm run validate:curriculum` when a change touches curriculum, seed data, lesson content, schedules, assignments, or Firestore-backed content data.

Future interactive routes should include manual accessibility checks for keyboard focus, reduced motion, readable contrast, and discoverable hidden controls.

`npm run validate:hidden-frame` currently runs the Phase 0 asset resolver, the Phase 1 route/data/password validation script, the Phase 2 puzzle-chain validation script, the Phase 3 timeline/video validation script, the Phase 4 camera/composition validation script, the Phase 5 Unreal/Render Room validation script, the Phase 6 object inspection validation script, the Phase 7 progression validation script, the Phase 8 Compression validation script, and the Phase 9 Final Export validation script.

## Future Expansion

Future archive entries, recovered files, puzzles, frame cards, Compression logs, Unreal locations, Blender clues, cinematography clues, video clues, collectibles, achievements, progression systems, admin tools, and hidden routes should inherit the visual language established by the Phase 0 Asset Kit.

New systems should reuse the broken frame symbol, archive and Compression backgrounds, token palette, UI tone, animation vocabulary, and registry-based asset loading. Future phases should add data structures and reusable components before adding bespoke screens.

## Component Library

### HiddenFrameIcon

Purpose: renders the official broken frame symbol as a small optional clue link.

Inputs: `destinationPath`, `label`, `variant`, `size`, and optional `className`.

Outputs: a keyboard-accessible React Router link with an accessible label and decorative symbol image.

Dependencies: Phase 0 asset registry and React Router.

Intended reuse: assignment pages, archive links, unlock screens, future hidden markers, admin tools, and developer utilities.

Accessibility notes: uses `aria-label`, visible focus, and a decorative `alt=""` image because the link label provides the name.

Extension strategy: add variants through typed props and CSS, not one-off image paths.

### RecoveredFileCard

Purpose: displays recovered file entries in archive grids and lists.

Inputs: a `HiddenFrameFileRecord` and optional visual state override.

Outputs: an interactive link for `available`, `unlocked`, and `completed` files, or an inactive locked article for `locked` files.

Dependencies: `hiddenFrameFiles.ts`, React Router, and Hidden Frame CSS.

Intended reuse: archive hubs, progress pages, future file indexes, and collectible-adjacent views.

Accessibility notes: locked cards are non-interactive, while active cards have route-specific accessible names.

Extension strategy: expand `HiddenFrameFileRecord` before adding bespoke card branches.

### PasswordGate

Purpose: provides a simple password-gated reveal for optional, ungraded Hidden Frame content.

Inputs: `correctAnswer`, `successContent`, optional `acceptedAnswers`, optional `hintText`, optional `failureFeedback`, optional `initiallyUnlocked`, and optional `onUnlock`.

Outputs: a semantic form while locked, a hidden-by-default hint reveal when available, accessible feedback, and success content after the answer matches.

Dependencies: `isHiddenFrameAnswerCorrect` from `utils/passwordGate.ts`.

Intended reuse: future low-stakes recovered files and training gates.

Accessibility notes: uses a label, submit button, status feedback, `aria-invalid`, `aria-describedby`, and keyboard-friendly form behavior. Hint reveal is a real button and does not affect grades or scoring.

Extension strategy: replace or wrap the validation source if future phases need authenticated persistence or server-side checks.

### HiddenFrameProgress

Purpose: displays subtle local progress such as archive status, recovered frames, and recovered local signals.

Inputs: `HiddenFrameProgressSummary` and optional `className`.

Outputs: a small text status with polite live updates.

Dependencies: `hiddenFrameProgress.ts` summary data.

Intended reuse: archive pages, file pages, and future progress panels.

Accessibility notes: uses `aria-live="polite"` and avoids grade-like language.

Extension strategy: keep the component bound to a summary interface so persistence can change without rewriting UI.

### HiddenFrameResetPanel

Purpose: lets a user clear only this browser's local Hidden Frame progress.

Inputs: `onReset`.

Outputs: a two-step reset confirmation panel with local-only safety copy.

Dependencies: `useHiddenFrameProgress`, `hiddenFrameProgress.ts`, and Hidden Frame CSS.

Intended reuse: collection route and future local progress views.

Accessibility notes: uses real buttons and visible confirmation/cancel controls.

Extension strategy: keep reset behavior behind the progress adapter so future persistence can replace the implementation safely.

### CompressionLog

Purpose: renders short atmospheric system messages.

Inputs: optional `title`, `children`, and `tone`.

Outputs: a labeled message panel.

Dependencies: Hidden Frame CSS.

Intended reuse: archive notices, recovered files, Compression states, and future system messages.

Accessibility notes: uses a labeled `aside` and avoids content that implies danger, threats, or real-world action.

Extension strategy: add tone variants through the typed `tone` prop and CSS.

### GlitchText

Purpose: renders short Compression-flavored text with a static glitch treatment.

Inputs: text children.

Outputs: inline text with decorative pseudo-layering.

Dependencies: Hidden Frame CSS.

Intended reuse: Compression headings, corrupted cards, and future system messages.

Accessibility notes: the readable text remains present; the glitch layer is decorative.

Extension strategy: keep effects CSS-only and reduced-motion-safe unless future accessibility review approves motion.

### RedactedText

Purpose: renders a redacted phrase while preserving an accessible label for context.

Inputs: `label`.

Outputs: inline redaction bars with `aria-label`.

Dependencies: Hidden Frame CSS.

Intended reuse: Compression logs and future redacted records.

Accessibility notes: redaction is visual; the label remains available to assistive technology.

Extension strategy: use for atmosphere only, not for security or graded secrecy.

### CompressionWarningPanel

Purpose: displays safe Compression event warnings about creative flattening.

Inputs: `title`, optional `tone`, and children.

Outputs: a labeled warning panel using `GlitchText`.

Dependencies: `GlitchText`, Compression data tone values, and Hidden Frame CSS.

Intended reuse: Compression route, final export setup, and future system notices.

Accessibility notes: copy must clearly avoid real malware, breach, threat, or horror language.

Extension strategy: add new tone values through typed data and CSS only when future logs need them.

### CorruptedFileCard

Purpose: displays one data-driven Compression log as a corrupted archive card.

Inputs: a `HiddenFrameCompressionLog`.

Outputs: a semantic article with timestamp, tone, visible text, redactions, and restoration prompt.

Dependencies: `hiddenFrameCompressionLogs.ts`, `GlitchText`, `RedactedText`, and Hidden Frame CSS.

Intended reuse: Compression route and future Compression log indexes.

Accessibility notes: decorative corruption layers do not carry the only meaningful information.

Extension strategy: add new log records through data before adding card variants.

### FinalExportPanel

Purpose: displays final export readiness based on the local prerequisite frame set.

Inputs: `canRevealFinalFrame`, `recoveredPrerequisiteCount`, and `totalPrerequisiteCount`.

Outputs: a final export panel with either a Frame 000 link or a collection link.

Dependencies: `hiddenFrameFinalExport.ts`, React Router, and Hidden Frame CSS.

Intended reuse: final export route and future ending variants.

Accessibility notes: prerequisite status is visible text and is not conveyed by color alone.

Extension strategy: keep prerequisite logic in data/helpers rather than hardcoding inside page markup.

### Frame000Reveal

Purpose: displays the Frame 000 ending and final story statement.

Inputs: none.

Outputs: a final reveal section with title art, ending copy, and return links.

Dependencies: Phase 0 title-card asset, React Router, and Hidden Frame CSS.

Intended reuse: Frame 000 route and future final export summaries.

Accessibility notes: the title-card image has meaningful alt text and the final message is real text.

Extension strategy: future ending variants should be data-driven before adding branches.

### FrameCard

Purpose: displays one collectible frame in the local collection route.

Inputs: a `HiddenFrameRewardFrame` and `isRecovered`.

Outputs: an article that shows recovered frame art/copy or a locked silhouette placeholder.

Dependencies: `hiddenFrameFrames.ts` and Hidden Frame CSS.

Intended reuse: collection pages, future progress views, and frame reward summaries.

Accessibility notes: uses an article with an accessible label and keeps decorative thumbnail art hidden from assistive technology.

Extension strategy: add new frame metadata to `hiddenFrameFrames.ts` before branching component logic.

### FrameCollectionGrid

Purpose: renders a data-driven grid of collectible frame cards.

Inputs: `recoveredFrameIds`.

Outputs: a responsive frame collection grid for Frames 001 through 005 and future frames.

Dependencies: `FrameCard`, `hiddenFrameFrames.ts`, and Hidden Frame CSS.

Intended reuse: collection route, future progress routes, and post-unlock reward panels.

Accessibility notes: provides an `aria-label` for the collection grid and delegates card labels to `FrameCard`.

Extension strategy: the grid maps over `hiddenFrameRewardFrames`, so future phases can add more frames without changing the component.

### AchievementBadge

Purpose: displays one local Hidden Frame signal badge.

Inputs: a `HiddenFrameAchievement` and `isEarned`.

Outputs: an article showing earned copy or a waiting state.

Dependencies: `hiddenFrameAchievements.ts` and Hidden Frame CSS.

Intended reuse: collection route and future progress views.

Accessibility notes: uses visible text and an `aria-label` that avoids points, grades, or ranking language.

Extension strategy: add new achievement records through data before changing component logic.

### AchievementGrid

Purpose: renders local signal badges from the achievement data module.

Inputs: `earnedAchievementIds`.

Outputs: a labeled grid of `AchievementBadge` entries.

Dependencies: `hiddenFrameAchievements.ts` and `AchievementBadge`.

Intended reuse: collection route and future progress views.

Accessibility notes: provides a group `aria-label` and delegates card semantics to `AchievementBadge`.

Extension strategy: map over data so new badges can be added without page changes.

### TimelineTrack

Purpose: renders a sequence of video-production clues along an in-app timeline.

Inputs: an array of `HiddenFrameVideoClue` records.

Outputs: a responsive list of `TimelineClueCard` entries with a decorative timeline rail.

Dependencies: `hiddenFrameVideoClues.ts`, `TimelineClueCard`, and Hidden Frame CSS.

Intended reuse: timeline routes, future video-production arcs, and approved class-video clue sequences.

Accessibility notes: the rail is decorative, while each clue is rendered as semantic article content.

Extension strategy: add new timeline clue records or clue types before branching component logic.

### TimelineClueCard

Purpose: displays one video-production clue with timecode, frame number, visual still, copy, optional lower third, optional approved video reference, and a link to a related recovered file.

Inputs: a `HiddenFrameVideoClue`.

Outputs: a semantic article with accessible text and route links.

Dependencies: `VideoStillClueCard`, `LowerThirdClueCard`, `hiddenFrameFiles.ts`, and React Router.

Intended reuse: timeline, broadcast, editing, and future video clue pages.

Accessibility notes: visible text carries the clue; decorative thumbnails are hidden from assistive technology.

Extension strategy: add typed clue variants to `HiddenFrameVideoClueType` and CSS state classes.

### VideoStillClueCard

Purpose: displays an in-app video-still placeholder or approved image reference for a timeline clue.

Inputs: a `HiddenFrameVideoClue`.

Outputs: a figure with decorative thumbnail and text caption for visual label and timecode.

Dependencies: Phase 0 asset registry through clue data.

Intended reuse: video still cards, timeline clue rows, and future approved media references.

Accessibility notes: the thumbnail is decorative because the caption and card body provide the meaningful text.

Extension strategy: support real approved still assets through data without changing component structure.

### LowerThirdClueCard

Purpose: previews a lower-third broadcast graphic clue.

Inputs: lower-third text.

Outputs: a labeled aside styled as a broadcast lower-third.

Dependencies: Hidden Frame CSS.

Intended reuse: broadcast update clues, timeline clues, and video-production puzzle arcs.

Accessibility notes: uses a labeled `aside` with visible text.

Extension strategy: add style variants through props only after future clue data needs them.

### CompositionGuideFrame

Purpose: displays a composition clue thumbnail with a CSS guide overlay.

Inputs: `imageLabel`, `principle`, and `thumbnail`.

Outputs: a figure with decorative image, decorative guide overlay, and visible caption.

Dependencies: `hiddenFrameCameraClues.ts`, Phase 0 assets, and Hidden Frame CSS.

Intended reuse: camera/composition routes, future cinematography clues, and approved still-image clue cards.

Accessibility notes: the visual guide is decorative; the card body and caption carry the meaningful clue text.

Extension strategy: add new `HiddenFrameCompositionPrinciple` values and CSS guide classes as new composition concepts are introduced.

### CameraClueCard

Purpose: displays one cinematography clue with composition principle, observation copy, prompt copy, guide frame, and optional recovered-file link.

Inputs: a `HiddenFrameCameraClue`.

Outputs: a semantic article.

Dependencies: `CompositionGuideFrame`, `hiddenFrameCameraClues.ts`, `hiddenFrameFiles.ts`, and React Router.

Intended reuse: camera route, future cinematography arcs, and approved still-image clue sequences.

Accessibility notes: visible text describes the composition concept; guide overlays are not the only source of information.

Extension strategy: use typed clue data instead of branching per clue.

### CameraClueGrid

Purpose: renders a responsive grid of camera/composition clue cards.

Inputs: an array of `HiddenFrameCameraClue` records.

Outputs: a labeled grid section.

Dependencies: `CameraClueCard`.

Intended reuse: camera route and future composition indexes.

Accessibility notes: provides an `aria-label` for the clue group and delegates card semantics to `CameraClueCard`.

Extension strategy: map over data so new composition clues can be added without new page code.

### ObjectInspectionFrame

Purpose: displays a Blender/object-style inspection thumbnail with a simplified model marker, visible object label, and inspection note.

Inputs: `concept`, `label`, `note`, and `thumbnail`.

Outputs: a figure with decorative image/model marker and visible caption text.

Dependencies: `hiddenFrameObjectClues.ts`, Phase 0 assets, and Hidden Frame CSS.

Intended reuse: object inspection route, future Blender/modeling clues, and approved object-detail references.

Accessibility notes: the decorative model marker is not the only clue source; label and note remain visible text.

Extension strategy: add new `HiddenFrameObjectConcept` values and CSS classes as future object clue categories are introduced.

### ObjectClueCard

Purpose: displays one object clue with concept label, inspection frame, observation copy, prompt copy, and optional recovered-file link.

Inputs: a `HiddenFrameObjectClue`.

Outputs: a semantic article.

Dependencies: `ObjectInspectionFrame`, `hiddenFrameObjectClues.ts`, `hiddenFrameFiles.ts`, and React Router.

Intended reuse: object route, future Blender/object arcs, and approved model-inspection clue sequences.

Accessibility notes: visible text describes the modeling concept; inspection decoration is supplemental.

Extension strategy: use typed clue data instead of branching per clue.

### ObjectClueGrid

Purpose: renders a responsive grid of Blender/object clue cards.

Inputs: an array of `HiddenFrameObjectClue` records.

Outputs: a labeled grid section.

Dependencies: `ObjectClueCard`.

Intended reuse: object route and future model-inspection indexes.

Accessibility notes: provides an `aria-label` for the clue group and delegates card semantics to `ObjectClueCard`.

Extension strategy: map over data so new object clues can be added without new page code.

### UnrealViewportReadout

Purpose: displays an Unreal-styled viewport thumbnail with a reticle, visible transform/status label, and readout.

Inputs: `concept`, `label`, `readout`, and `thumbnail`.

Outputs: a figure with decorative image/reticle and visible caption text.

Dependencies: `hiddenFrameUnrealClues.ts`, Phase 0 assets, and Hidden Frame CSS.

Intended reuse: Render Room, Unreal clue index, and future spatial/engine clue routes.

Accessibility notes: the image and reticle are decorative; caption text carries the meaningful readout.

Extension strategy: add new `HiddenFrameUnrealConcept` values and CSS classes as future Unreal clue categories are introduced.

### UnrealClueCard

Purpose: displays one Unreal Engine clue with concept label, viewport readout, observation copy, prompt copy, and optional recovered-file link.

Inputs: a `HiddenFrameUnrealClue`.

Outputs: a semantic article.

Dependencies: `UnrealViewportReadout`, `hiddenFrameUnrealClues.ts`, `hiddenFrameFiles.ts`, and React Router.

Intended reuse: Render Room, Unreal index, future engine/spatial arcs, and approved project-file clue references.

Accessibility notes: visible text describes the engine concept; viewport decoration is not the only source of information.

Extension strategy: use typed clue data instead of branching per clue.

### UnrealSignalGrid

Purpose: renders a responsive grid of Unreal Engine clue cards.

Inputs: an array of `HiddenFrameUnrealClue` records.

Outputs: a labeled grid section.

Dependencies: `UnrealClueCard`.

Intended reuse: Render Room, Unreal index, and future engine concept indexes.

Accessibility notes: provides an `aria-label` for the clue group and delegates card semantics to `UnrealClueCard`.

Extension strategy: map over data so new Unreal clues can be added without new page code.

## Design Decisions

Phase 0 imports the asset kit without student-facing UI so the visual foundation is stable before gameplay, story, or progression work begins.

Assets are stored in `public/hidden-frame` because Vite serves this folder as static public content and the provided registry paths already expect `/hidden-frame/...` URLs.

The original kit manifest is preserved as `hidden-frame-phase0-manifest.json`, while `manifest.json` provides an app-facing alias with public URL paths. This keeps the source artifact intact and gives future components a clean registry.

Documentation lives in `docs` because the repository already has a documentation directory and the JSONL command requested persistent specification and canon files.

Phase 1 routes are implemented inside the existing authenticated app shell instead of a separate public shell so Hidden Frame remains inside the DCC access model and does not weaken authentication. The routes are direct-addressable but intentionally absent from the normal top navigation.

Phase 1 uses a localStorage progress adapter with a small summary interface so future persistence can move to an authenticated data layer without rewriting the UI components.

Phase 1 uses client-side password validation because File 001 is optional, ungraded, non-sensitive content. The answer is therefore visible to anyone inspecting bundled client code. This is acceptable for Phase 1 but should not be used for graded, private, or security-sensitive gates.

Phase 2 keeps client-side password validation and localStorage progress because the chain is optional, ungraded, and non-sensitive. Passwords and accepted variants are intentionally documented in canon and visible in bundled code. This remains inappropriate for graded, private, or security-sensitive content.

Phase 2 kept the existing `dcc.hiddenFrame.phase1Progress` localStorage key to preserve prior local progress. Phase 7 still uses that key, but the stored payload now has schema version `3`, preserves schema 2 completed/recovered state, migrates legacy Phase 1 `unlockedFileIds` only when the source schema is older than 2, and derives `achievementIds` from local progress.

Phase 2 uses CSS-driven placeholders and existing Phase 0 backgrounds for frame cards and recovered file art. No new image assets were generated.

Phase 3 uses in-app timeline abstractions before attaching real media. `hiddenFrameVideoClues.ts` can reference approved class video examples later, but Phase 3 only ships safe internal metadata, CSS-driven timeline UI, and Phase 0 VHS/signal assets.

Phase 4 uses CSS guide overlays on existing Phase 0 backgrounds before introducing custom still images. Future approved stills can be added through `hiddenFrameCameraClues.ts`.

Phase 5 uses web-first Render Room and Unreal clue abstractions instead of a playable Unreal build. `hiddenFrameUnrealClues.ts` can reference approved project-file concepts later, but Phase 5 only ships safe internal metadata, viewport readouts, and Phase 0 Render Room assets.

Phase 6 uses in-site object inspection panels instead of uploaded or private project files. `hiddenFrameObjectClues.ts` can reference approved model examples later, but Phase 6 only ships safe internal metadata, simplified model markers, and Phase 0 backgrounds.

Phase 7 adds local signal badges and reset support without Firestore persistence, teacher dashboards, public comparison, grades, or leaderboards. Achievement IDs are derived locally from archive visits, completed files, and recovered frame counts.

Phase 8 introduces The Compression as creative flattening, template drift, and loss of specific human choices. It must not be framed as real malware, a breach, a threat, a monster, or a horror escalation.

Phase 9 gates Frame 000 behind the local prerequisite frame set and recovers it locally when opened. The ending is thematic and optional, not a score, grade, or class credit.

## Technical Debt & TODO

- Expand structured data schemas for Compression logs, final export entries, admin preview tooling, and future content packs before adding content at larger scale.
- Decide whether future Hidden Frame content should stay static, move to Firestore under `apps/dcc`, or use a hybrid content pack model.
- Replace localStorage progress with authenticated persistence only if future phases need cross-device continuity.
- Replace client-side password validation if future gates become sensitive, graded, or tied to authenticated progression.
- Add automated route/component tests when Hidden Frame has interactive screens.
- Add visual QA snapshots after future pages are introduced.
- Revisit reset placement if future authenticated persistence is added. Phase 7 reset is intentionally local-only and two-step confirmed.
- Real embedded video media, playable Unreal builds, real Blender project embeds, admin tools, account sync, and larger media assets remain postponed.

## Version History

### Phase 0 - 2026-07-08

Imported the official Phase 0 Asset Kit, established `public/hidden-frame` static assets, added app and source manifests, added the TypeScript asset registry, created repeatable asset validation, and created the technical specification and canon document. No gameplay, routes, puzzles, progression, passwords, achievements, or lore events were implemented.

### Phase 1 - 2026-07-08

Implemented the Hidden Page MVP with authenticated hidden routes for `/hidden-frame`, `/hidden-frame/archive`, and `/hidden-frame/file/001`; added reusable `HiddenFrameIcon`, `RecoveredFileCard`, `PasswordGate`, `HiddenFrameProgress`, and `CompressionLog` components; added `hiddenFrameFiles.ts`; added a localStorage progress adapter; placed the first subtle `HiddenFrameIcon` on assignment detail pages; documented File 001 and the Phase 1 password in canon; and expanded `npm run validate:hidden-frame` to include Phase 1 route, data, state, and password checks.

### Phase 2 - 2026-07-08

Implemented the First Puzzle Chain with Files 001 through 005, dynamic recovered file routing, data-driven clue/hint/password/reward metadata, local unlock sequencing, collectible Frames 001 through 005, a `/hidden-frame/collection` page, hidden-by-default hints, accessible password feedback, a schema-versioned localStorage progress adapter with Phase 1 migration, `FrameCard` and `FrameCollectionGrid`, and a Phase 2 validation script. Firestore persistence, account sync, grades, leaderboards, admin tools, public navigation links, external scavenger hunts, Unreal gameplay, video-production integration, and new media assets were intentionally postponed.

### Phase 3 - 2026-07-13

Implemented the first video-production timeline signal with `/hidden-frame/timeline`, Files 006 through 008, Frames 006 through 008, `hiddenFrameVideoClues.ts`, `TimelineTrack`, `TimelineClueCard`, `VideoStillClueCard`, `LowerThirdClueCard`, VHS/signal styling, and a Phase 3 validation script. The first-chain completion boundary remains Files 001 through 005 even though File 005 can now reveal File 006.

### Phase 4 - 2026-07-13

Implemented the first cinematography/composition signal with `/hidden-frame/camera`, Files 009 through 011, Frames 009 through 011, `hiddenFrameCameraClues.ts`, `CompositionGuideFrame`, `CameraClueCard`, `CameraClueGrid`, CSS guide overlays for composition principles, and a Phase 4 validation script.

### Phase 5 - 2026-07-13

Implemented the first Unreal/Render Room signal with `/hidden-frame/render-room`, `/hidden-frame/unreal`, Files 012 through 014, Frames 012 through 014, `hiddenFrameUnrealClues.ts`, `UnrealViewportReadout`, `UnrealClueCard`, `UnrealSignalGrid`, Render Room viewport/readout styling, and a Phase 5 validation script.

### Phase 6 - 2026-07-13

Implemented the first Blender/object inspection signal with `/hidden-frame/objects`, Files 015 through 017, Frames 015 through 017, `hiddenFrameObjectClues.ts`, `ObjectInspectionFrame`, `ObjectClueCard`, `ObjectClueGrid`, object inspection styling, and a Phase 6 validation script.

### Phase 7 - 2026-07-13

Implemented the local progression layer with schema version 3 progress, `achievementIds`, `hiddenFrameAchievements.ts`, `AchievementBadge`, `AchievementGrid`, `HiddenFrameResetPanel`, richer `HiddenFrameProgress` summary copy, local-only reset behavior, and a Phase 7 validation script.

### Phase 8 - 2026-07-13

Implemented the first Compression event with `/hidden-frame/compression`, `hiddenFrameCompressionLogs.ts`, `GlitchText`, `RedactedText`, `CompressionWarningPanel`, `CorruptedFileCard`, safe creative-flattening copy, corrupted/redacted styles, and a Phase 8 validation script.

### Phase 9 - 2026-07-13

Implemented the Final Export ending with `/hidden-frame/final-export`, `/hidden-frame/frame-000`, `hiddenFrameFinalExport.ts`, Frame 000 / `FINAL EXPORT`, `FinalExportPanel`, `Frame000Reveal`, local final-frame recovery, and a Phase 9 validation script.

## Acceptance Criteria

- The Phase 0 assets are imported without modifying artwork.
- Original filenames are preserved wherever practical.
- `manifest.json` and `hiddenFramePhase0Assets.ts` are available as primary registries.
- `hidden-frame-design-tokens.json` is available as the default Hidden Frame styling reference.
- The technical specification and canon documents exist under `docs`.
- Hidden Frame is prepared for Phase 1 without requiring another architectural reorganization.
- Phase 1 hidden routes are direct-addressable for authenticated users without appearing in the standard navigation.
- File 001 can be unlocked with a trimmed, case-insensitive answer.
- Progress is local-only and does not affect grades, class records, Firestore, submissions, or student response data.
- Files 001 through 005 are structured in `hiddenFrameFiles.ts`.
- Completing each active file unlocks the next file in the chain and adds the matching recovered frame.
- `/hidden-frame/collection` shows recovered and locked frame states from local progress.
- Phase 2 remains optional, ungraded, localStorage-based, and contained inside the DCC website.
- `/hidden-frame/timeline` presents video-production clues without external scavenger hunt behavior.
- Files 006 through 008 extend the recovered-file system with video-production vocabulary and rewards.
- `/hidden-frame/camera` presents cinematography/composition clues without external scavenger hunt behavior.
- Files 009 through 011 extend the recovered-file system with composition vocabulary and rewards.
- `/hidden-frame/render-room` and `/hidden-frame/unreal` present Unreal Engine clues without requiring a playable Unreal build.
- Files 012 through 014 extend the recovered-file system with Unreal vocabulary and rewards.
- `/hidden-frame/objects` presents Blender/object clues without uploads, private project folders, or external scavenger hunt behavior.
- Files 015 through 017 extend the recovered-file system with object/modeling vocabulary and rewards.
- `/hidden-frame/collection` supports frame cards, local signal badges, progress summary, and optional local reset without grade or leaderboard presentation.
- Local progress schema version 3 preserves migration boundaries and keeps future persistence swappable behind the adapter.
- `/hidden-frame/compression` presents data-driven Compression logs and corrupted states without real-threat, malware, breach, horror, or unsafe scavenger-hunt framing.
- `/hidden-frame/final-export` and `/hidden-frame/frame-000` gate and reveal Frame 000 locally after the prerequisite frame set is recovered.
- The ending reinforces that the first frame was never missing and that human choices give tools creative meaning.
