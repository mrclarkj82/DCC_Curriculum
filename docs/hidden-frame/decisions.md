# Hidden Frame Decisions

This document records architectural and product decisions for The Hidden Frame.

## Decision 001: Keep Hidden Frame Contained Inside DCC

Date: 2026-07-08

Decision: Hidden Frame clues, routes, copy, and interactions stay inside the DCC website or approved class materials.

Reason: The experience is for a high school curriculum site and must remain school-safe, optional, and easy to supervise.

Consequences:

- No social media, email, phone, real-world scavenger hunts, or external-contact mechanics.
- Hidden Frame routes live inside the authenticated DCC app shell.
- Future clues should use approved internal materials or static in-app content.

## Decision 002: Use Phase 0 Asset Kit As Canonical Visual Identity

Date: 2026-07-08

Decision: The Phase 0 broken-frame symbol, backgrounds, title card, style board, and design tokens are the canonical Hidden Frame visual identity.

Reason: A stable visual foundation prevents drift and keeps future phases coherent.

Consequences:

- Use `src/hidden-frame/hiddenFramePhase0Assets.ts` rather than scattering hardcoded paths.
- Do not redesign the symbol or replace the art direction without a documented future decision.

## Decision 003: Use LocalStorage For Early Progress

Date: 2026-07-08

Decision: Hidden Frame progress starts as localStorage-only.

Reason: The ARG is optional, ungraded, and non-sensitive. Local progress avoids new privacy, roster, Firestore rules, and account-sync risk.

Consequences:

- Progress is device-local.
- Progress is never a grade or leaderboard score.
- Future authenticated persistence requires a new documented decision and security review.

## Decision 004: Client-Side Passwords Are Acceptable For Optional Narrative Gates

Date: 2026-07-08

Decision: Early Hidden Frame passwords can live in client-side data.

Reason: Files 001 through 005 are optional, ungraded, school-safe narrative puzzles. Their answers are documented in canon and are not security boundaries.

Consequences:

- Students can inspect bundled code to see answers.
- Do not use client-visible answers for graded, private, or security-sensitive features.

## Decision 005: Canonical Docs Live Under `docs/hidden-frame`

Date: 2026-07-13

Decision: The canonical Hidden Frame spec, canon, acceptance criteria, progress, roadmap, changelog, and decisions documents live under `docs/hidden-frame/`.

Reason: The full ARG now needs one folder containing its governance, implementation plan, story bible, and progress tracking.

Consequences:

- Root-level `docs/hidden-frame-spec.md` and `docs/hidden-frame-canon.md` remain compatibility pointers only.
- Future Hidden Frame doc updates should target `docs/hidden-frame/`.

## Decision 006: Full ARG Work Uses `feature/hidden-frame-full-arg`

Date: 2026-07-13

Decision: The continuing full Hidden Frame ARG effort uses `feature/hidden-frame-full-arg` when branch management is available.

Reason: The goal spans multiple phases and should not be mixed directly into `main` until reviewed and ready.

Consequences:

- Phase-specific branches can still be used when the teacher explicitly requests a smaller slice.
- This branch is based on the current Phase 2 work so completed foundation is preserved.

## Decision 007: Video Clues Use In-App Timeline Abstractions First

Date: 2026-07-13

Decision: Phase 3 video-production clues are represented with in-app timeline data and reusable UI components before attaching real video media.

Reason: The ARG must stay contained, school-safe, and independent of external video accounts or unapproved media. Timeline abstractions can teach timecode, cuts, lower thirds, and sound bridges without requiring students to leave the site.

Consequences:

- `hiddenFrameVideoClues.ts` stores approved clue metadata.
- Timeline components can later render approved embedded class videos, but Phase 3 only records optional reference notes.
- Future real media references must be approved class materials and documented in canon/spec.

## Decision 008: Camera Clues Use CSS Guide Overlays First

Date: 2026-07-13

Decision: Phase 4 cinematography clues use CSS guide overlays on existing Phase 0 backgrounds before introducing custom still images.

Reason: The arc can teach composition principles immediately without generating or sourcing new student/media images.

Consequences:

- `hiddenFrameCameraClues.ts` stores composition metadata.
- `CompositionGuideFrame` displays decorative guide overlays for principles such as thirds, leading lines, headroom, look space, and central framing.
- Future approved still images can be added through data without changing the component structure.

## Decision 009: Render Room Is a Web-First Unreal Abstraction

Date: 2026-07-13

Decision: Phase 5 represents Unreal Engine clues through in-app Render Room pages, viewport readouts, and structured clue data rather than requiring a playable Unreal build.

Reason: The Hidden Frame must remain contained inside the DCC website, optional, and usable without installing software or opening private Unreal projects.

Consequences:

- `/hidden-frame/render-room` uses Phase 0 Render Room visuals and web UI panels.
- `/hidden-frame/unreal` indexes Unreal concepts through data in `hiddenFrameUnrealClues.ts`.
- Future playable Unreal content would require a separate documented approval and safety review.

## Decision 010: Object Clues Use In-Site Inspection Panels First

Date: 2026-07-13

Decision: Phase 6 represents Blender/object clues through in-app inspection panels and structured object clue data rather than asking students to upload files or open private project folders.

Reason: The Hidden Frame must remain optional, contained, and privacy-safe while still reinforcing modeling, materials, UVs, shadows, scale, and camera-view concepts.

Consequences:

- `/hidden-frame/objects` uses static in-site clue panels.
- `hiddenFrameObjectClues.ts` stores object inspection metadata.
- Future real model/project references must use approved class materials and stay documented in spec/canon.

## Decision 011: Achievements Are Local Signal Badges Only

Date: 2026-07-13

Decision: Phase 7 achievements are local signal badges derived from localStorage progress, not grades, points, public comparisons, or teacher-facing mastery data.

Reason: Hidden Frame is optional and ungraded. A lightweight progression layer can reward discovery without creating privacy, leaderboard, or grading risks.

Consequences:

- Progress schema version 3 stores `achievementIds`.
- `/hidden-frame/collection` displays signal badges and a two-step local reset panel.
- Reset clears only this browser's Hidden Frame progress and does not touch class records, submissions, responses, rosters, or Firestore data.
- Future account-based persistence still requires a new documented decision and security review.

## Decision 012: Compression Is Creative Flattening, Not Danger

Date: 2026-07-13

Decision: Phase 8 presents The Compression as a metaphor for generic output, template drift, and loss of specific human choices, not as malware, a real breach, a monster, or a threat.

Reason: The Hidden Frame must remain calm, school-safe, optional, and fully contained inside the DCC website.

Consequences:

- `/hidden-frame/compression` includes explicit safe-scope copy.
- Compression logs use redaction/glitch visuals for atmosphere only.
- Future Compression content must avoid real-world security language, threats, horror escalation, or unsafe instructions.
