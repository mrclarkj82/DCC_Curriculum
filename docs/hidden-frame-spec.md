# The Hidden Frame Technical Specification

The Hidden Frame is an optional, school-appropriate ARG layer for the DCC Creative Studio website. This document is the living technical design bible for how the system is built, extended, styled, validated, and documented.

Before implementing any future Hidden Frame feature, read this specification first. After implementation, update this document so it continues to reflect the real architecture, components, assets, routes, systems, and design decisions.

## Purpose

The Hidden Frame should add curiosity, observation, media literacy, and creative problem solving to the DCC site without distracting from class workflows or compromising student privacy. It must stay inside the DCC website, approved class materials, and future approved project files.

Phase 0 imports the official visual identity only. It does not create gameplay systems, archive entries, passwords, progression, puzzles, unlock logic, lore, hidden routes, achievements, or story content.

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
- `archive-bg-render-room.png`: future Render Room hub or Unreal-themed immersive locations.

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
  hidden-frame-spec.md
  hidden-frame-canon.md
  hidden-frame/
    phase0/
      CODEX_PHASE0_IMPLEMENTATION_NOTES.md
      README_HIDDEN_FRAME_PHASE0.md
      hidden-frame-phase0-manifest.json
      previews/
        phase0-contact-sheet.png
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
src/
  hidden-frame/
    hiddenFramePhase0Assets.ts
    index.ts
```

Update this section whenever new Hidden Frame directories are introduced.

## Routing Conventions

Future routes are reserved but not implemented in Phase 0:

- `/hidden-frame`
- `/hidden-frame/archive`
- `/hidden-frame/file/:id`
- `/hidden-frame/frame/:id`
- `/hidden-frame/progress`
- `/hidden-frame/render-room`

Routes must be protected or public according to the learning purpose and privacy implications. Do not expose student data or teacher/admin data through Hidden Frame routes.

## Reusable Components

Future components should be modular, reusable, and data-driven. Suggested Phase 1 foundation components:

- `HiddenFrameIcon`
- `HiddenFrameBackground`
- `HiddenFrameTitleCard`
- `HiddenFrameStyleTokens`
- `HiddenFrameArchiveCard`
- `HiddenFrameSafetyNote`

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

1. Read `docs/hidden-frame-spec.md` and `docs/hidden-frame-canon.md`.
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

Technical implementation belongs in this specification. Lore, story continuity, puzzle answers, characters, and narrative events belong in `docs/hidden-frame-canon.md`.

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

## Future Expansion

Future archive entries, recovered files, puzzles, frame cards, Compression logs, Unreal locations, Blender clues, cinematography clues, video clues, collectibles, achievements, progression systems, admin tools, and hidden routes should inherit the visual language established by the Phase 0 Asset Kit.

New systems should reuse the broken frame symbol, archive and Compression backgrounds, token palette, UI tone, animation vocabulary, and registry-based asset loading. Future phases should add data structures and reusable components before adding bespoke screens.

## Component Library

No reusable Hidden Frame React components have been created in Phase 0.

When components are added, document:

- Purpose
- Inputs
- Outputs
- Dependencies
- Intended reuse
- Accessibility notes
- Extension strategy

## Design Decisions

Phase 0 imports the asset kit without student-facing UI so the visual foundation is stable before gameplay, story, or progression work begins.

Assets are stored in `public/hidden-frame` because Vite serves this folder as static public content and the provided registry paths already expect `/hidden-frame/...` URLs.

The original kit manifest is preserved as `hidden-frame-phase0-manifest.json`, while `manifest.json` provides an app-facing alias with public URL paths. This keeps the source artifact intact and gives future components a clean registry.

Documentation lives in `docs` because the repository already has a documentation directory and the JSONL command requested persistent specification and canon files.

## Technical Debt & TODO

- Create reusable Phase 1 components only when a future phase requests visible Hidden Frame UI.
- Define structured data schemas for archive entries, recovered files, frame cards, puzzles, achievements, and progression before adding content at scale.
- Decide whether future Hidden Frame content should be static JSON, Firestore-backed under `apps/dcc`, or a hybrid.
- Add automated route/component tests when Hidden Frame has interactive screens.
- Add visual QA snapshots after future pages are introduced.

## Version History

### Phase 0 - 2026-07-08

Imported the official Phase 0 Asset Kit, established `public/hidden-frame` static assets, added app and source manifests, added the TypeScript asset registry, created repeatable asset validation, and created the technical specification and canon document. No gameplay, routes, puzzles, progression, passwords, achievements, or lore events were implemented.

## Acceptance Criteria

- The Phase 0 assets are imported without modifying artwork.
- Original filenames are preserved wherever practical.
- `manifest.json` and `hiddenFramePhase0Assets.ts` are available as primary registries.
- `hidden-frame-design-tokens.json` is available as the default Hidden Frame styling reference.
- The technical specification and canon documents exist under `docs`.
- Hidden Frame is prepared for Phase 1 without requiring another architectural reorganization.
