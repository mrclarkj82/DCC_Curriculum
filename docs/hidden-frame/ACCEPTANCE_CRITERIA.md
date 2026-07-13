# Hidden Frame Acceptance Criteria

## Overall Goal

Build The Hidden Frame as a complete optional ARG / Easter egg system inside the DCC curriculum website.

The finished system should let students discover hidden entry points, enter a polished archive experience, solve contained puzzles, unlock recovered files, collect frame cards, explore video production clues, cinematography clues, Unreal Engine clues, Blender/object clues, experience The Compression event, and reach a final Frame 000 / Final Export ending.

The ARG must be optional, ungraded, school-safe, and fully contained inside the DCC website and approved class materials.

## Global Acceptance Criteria

### Safety

The Hidden Frame must:

- Remain optional and ungraded.
- Never be represented as required coursework.
- Never ask students to leave the DCC website.
- Never ask students to contact strangers.
- Never ask students to share personal information.
- Never ask students to access private systems.
- Never simulate hacking real systems.
- Never require social media, email, phone numbers, or real-world investigation.
- Avoid horror, gore, occult imagery, threats, real-world conspiracy themes, and unsafe scavenger hunt behavior.

### Architecture

The implementation must:

- Be modular and data-driven.
- Use reusable route templates, cards, gates, progress displays, clue components, and collection UI.
- Use the Phase 0 asset registry where practical.
- Avoid hardcoded puzzle chains where practical.
- Keep lore content separated from implementation details.
- Keep progress persistence behind an adapter.
- Support future expansion to many archive entries, frame cards, clues, and locations.

### Documentation

Every implemented phase must update:

- `docs/hidden-frame/hidden-frame-spec.md`
- `docs/hidden-frame/hidden-frame-canon.md`
- `docs/hidden-frame/PROGRESS.md`
- `docs/hidden-frame/changelog.md`
- `docs/hidden-frame/decisions.md` when architecture changes
- `docs/hidden-frame/roadmap.md` when future plans change

### Accessibility

Every Hidden Frame page and component must:

- Use semantic HTML.
- Support keyboard navigation.
- Have visible focus states.
- Maintain sufficient contrast.
- Include alt text for meaningful images.
- Respect reduced-motion settings where animations exist.
- Work on mobile and desktop.
- Avoid relying on color alone.

### Validation

After each phase, run available project checks:

- Typecheck via `npm.cmd run build` unless a separate typecheck script exists later.
- `npm.cmd run lint`
- Test suite if one exists.
- `npm.cmd run build`
- `npm.cmd run validate:hidden-frame`
- `npm.cmd run validate:curriculum` when curriculum, seed data, schedules, or Firestore-backed content are touched.

Fix errors caused by Hidden Frame work. Document commands that cannot be run.

## Phase 0 Acceptance Criteria: Visual Foundation

Status: Complete.

Phase 0 includes:

- Official symbol assets.
- Background assets.
- Title card.
- Style board.
- Design tokens.
- Asset manifest.
- TypeScript asset registry.
- Documentation foundation.

Do not redo Phase 0 unless something is broken.

## Phase 1 Acceptance Criteria: Hidden Page MVP

Status: Complete.

Phase 1 is complete when:

- Routes exist for `/hidden-frame`, `/hidden-frame/archive`, and `/hidden-frame/file/001`.
- Reusable components exist for `HiddenFrameIcon`, recovered file cards, password gates, progress display, and Compression/system messages.
- At least one subtle Hidden Frame icon is placed safely in the DCC curriculum UI.
- The landing page explains the optional, ungraded, contained, school-safe nature of the mystery.
- The archive shows File 001 as available and future files as locked placeholders.
- File 001 is titled `The Edge of the Page`, accepts `LUMEN`, trims whitespace, and matches case-insensitively.
- Progress uses localStorage and is not presented as a grade or class requirement.

## Phase 2 Acceptance Criteria: First Puzzle Chain

Status: Complete.

Phase 2 is complete when:

- Files 001 through 005 exist as data-driven recovered files.
- File 001: `The Edge of the Page`, password `LUMEN`, reward Frame `LUMEN`.
- File 002: `The First Cut`, password `CUT`, reward Frame `CUT`.
- File 003: `The Cropped Student`, password `BORDER`, reward Frame `BORDER`.
- File 004: `Render Failed`, password `RENDER`, reward Frame `RENDER`.
- File 005: `The Door Facing Light`, password `ROTATION`, reward Frame `ROTATION`.
- Completing each file unlocks the next file.
- Completing File 005 marks the first chain complete.
- `/hidden-frame/collection` exists.
- The collection page shows recovered frame cards and locked placeholders from local progress.
- The progress schema supports schema version, unlocked file IDs, completed file IDs, recovered frame IDs, archive visit state, and migration.
- Each file supports optional hint reveal, gentle failure feedback, and calm success messages.

## Phase 3 Acceptance Criteria: Video Production Integration

Status: Complete.

Phase 3 is complete when:

- `/hidden-frame/timeline` exists.
- Additional video-themed recovered files or timeline clue entries exist in structured data.
- Reusable timeline/video clue components support timestamp-based clues, video still clue cards, lower-third clue references, timeline graphics, and optional embedded approved class video references.
- The video arc reinforces timecode, frame numbers, cuts, J-cuts/L-cuts, lower thirds, B-roll, pacing, sound bridges, and editing decisions.
- Video clues remain inside the website or approved class materials.

## Phase 4 Acceptance Criteria: Cinematography Mystery Arc

Phase 4 is complete when:

- `/hidden-frame/camera` exists.
- Reusable cinematography clue components support image/composition puzzles.
- The arc supports rule of thirds, leading lines, symmetry, headroom, look space, repetition, and central framing.
- Puzzles reward noticing composition choices without feeling like graded assignments.

## Phase 5 Acceptance Criteria: Unreal Engine Integration

Phase 5 is complete when:

- `/hidden-frame/render-room` exists.
- `/hidden-frame/unreal` exists.
- Unreal-themed clue support exists for coordinates, rotation, scale, lighting, materials, Blueprints, trigger volumes, collision, and camera/player perspective.
- The Render Room page feels like an Unreal-themed digital space using the Phase 0 Render Room visual identity.
- The web implementation does not require a playable Unreal build unless explicitly requested later.

## Phase 6 Acceptance Criteria: Blender/Object Mystery Arc

Phase 6 is complete when:

- `/hidden-frame/objects` exists.
- Object clue support exists for object names, shadows, materials, UV maps, scale, camera view, engraved/hidden text, and model details.
- The arc reinforces attention to object construction, material choices, and camera perspective.

## Phase 7 Acceptance Criteria: Student Progression System

Phase 7 is complete when:

- The collection system supports many frame cards, locked/unlocked/completed states, achievement badges, progress summary, optional reset, and schema migration.
- Progress feels like ARG discovery.
- Progress never appears as a grade and never compares students publicly.
- A persistence adapter boundary exists so localStorage can later be swapped for authenticated persistence.
- Database persistence is not implemented unless explicitly requested.

## Phase 8 Acceptance Criteria: The Compression Event

Phase 8 is complete when:

- `/hidden-frame/compression` exists.
- Compression log routes or data-driven pages exist.
- The system supports glitch text, redacted text, corrupted file cards, Compression warning panels, generic/template visual states, and atmospheric but safe antagonist language.
- The Compression represents creative flattening, generic output, and loss of originality.
- The Compression never feels like real malware, a real security breach, a monster attack, or a threat to students.

## Phase 9 Acceptance Criteria: Final Export

Phase 9 is complete when:

- `/hidden-frame/final-export` exists.
- `/hidden-frame/frame-000` exists.
- The final page requires completion of the intended prerequisite frame set.
- Frame 000 is revealed.
- The ending reinforces that creativity begins with human choice and that tools matter, but human decisions give a project life.

## Phase 10 Acceptance Criteria: Admin and Expansion Tools

Phase 10 is complete when:

- Future expansion is supported through data files, reusable components, optional dev/admin preview tools, clear documentation, and asset request tracking.
- Any admin tools avoid exposing hidden answers publicly, creating security risks, or exposing student private data.
- Student-facing pages remain separate from dev/admin tooling.
- New archive files, frame cards, and puzzle types have documented extension points.

## Final Completion Criteria

The Hidden Frame concept is complete when:

1. The full route structure exists.
2. The first complete ARG arc can be played from start to finish.
3. Archive, file, password, progress, collection, video, cinematography, Unreal, Blender/object, Compression, and final export systems work.
4. The implementation is data-driven and documented.
5. The visual style remains consistent with Phase 0.
6. All content remains optional, ungraded, school-safe, and contained.
7. The code passes the project's normal validation commands.
8. The docs accurately describe the final state.
