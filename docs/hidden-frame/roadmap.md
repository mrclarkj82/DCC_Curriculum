# Hidden Frame Roadmap

This roadmap is the Goal-mode implementation plan for building The Hidden Frame from the current Phase 0 foundation through the complete first version of the ARG.

## Strategy

Build phase by phase. Each phase should add reusable systems first, then content. Avoid one-off pages, duplicated password logic, hardcoded asset paths, and undocumented lore. Keep progress localStorage-based until a later phase explicitly approves a different persistence model.

## Phase Plan

### Phase 1: Hidden Page MVP

Status: Complete.

Implemented landing, archive, File 001, icon placement, password gate, progress adapter, and foundation docs.

### Phase 2: First Puzzle Chain

Status: Complete.

Implemented Files 001 through 005, dynamic file routing, local unlock chain, frame rewards, collection page, hint reveal, and Phase 2 validation.

### Phase 3: Video Production Integration

Status: Complete.

Goal: add the first video-production clue arc and route.

Implemented work:

- Added `/hidden-frame/timeline`.
- Created video/timeline clue data.
- Added reusable components for timeline entries, timecode cards, lower-third clues, video still placeholders, and editing-decision clues.
- Kept references inside the DCC site or approved class materials.
- Added Phase 3 validation.

### Phase 4: Cinematography Mystery Arc

Status: Complete.

Goal: add composition-focused clue support.

Implemented work:

- Added `/hidden-frame/camera`.
- Added cinematography clue data and reusable image/composition clue components.
- Covered rule of thirds, leading lines, symmetry, headroom, look space, repetition, and central framing.

### Phase 5: Unreal Engine Integration

Status: Complete.

Goal: add Render Room and Unreal-themed clue support.

Implemented work:

- Added `/hidden-frame/render-room`.
- Added `/hidden-frame/unreal`.
- Used the Render Room background and viewport/grid language.
- Added reusable clue components for coordinates, rotation, scale, lighting, materials, Blueprints, trigger volumes, collision, and perspective.
- Added Files 012 through 014 and Frames 012 through 014.
- Added Phase 5 validation.

### Phase 6: Blender/Object Mystery Arc

Status: Complete.

Goal: add object-focused clue support.

Implemented work:

- Added `/hidden-frame/objects`.
- Added object clue data.
- Added reusable object inspection components.
- Supported object names, shadows, materials, UV maps, scale, camera view, engraved/hidden text, and model details.
- Added Files 015 through 017 and Frames 015 through 017.
- Added Phase 6 validation.

### Phase 7: Student Progression System

Status: Complete.

Goal: expand local progression without turning it into grades.

Implemented work:

- Supported larger frame collections through the existing frame data.
- Added achievement metadata and display components.
- Added optional local reset behind a two-step confirmation.
- Strengthened migration and adapter boundaries with schema version 3 and `achievementIds`.

### Phase 8: The Compression Event

Status: Next.

Goal: add the safe antagonist/event layer.

Planned work:

- Add `/hidden-frame/compression`.
- Add Compression log data/routes.
- Add glitch text, redaction, corrupted cards, warning panels, and Compression visual states.
- Keep tone about creative flattening, not threats or real malware.

### Phase 9: Final Export

Goal: complete the first ARG arc.

Planned work:

- Add `/hidden-frame/final-export`.
- Add `/hidden-frame/frame-000`.
- Gate the ending behind the intended prerequisite frame set.
- Reveal Frame 000 and close the first story arc around human creative choice.

### Phase 10: Admin and Expansion Tools

Goal: make future Hidden Frame content easier to maintain.

Planned work:

- Add data validation and content expansion docs.
- Add optional dev/admin preview tools only if they can be separated from student-facing routes safely.
- Track future asset requests.
- Document extension points for new files, frames, arcs, and puzzle types.

## Validation Gates

Each phase must pass or document:

- `git diff --check`
- `npm.cmd run lint`
- `npm.cmd run build`
- `npm.cmd run validate:hidden-frame`
- `npm.cmd run validate:curriculum` when curriculum content is touched
- Manual route/accessibility checks for newly added routes

## Deployment Note

Per repository workflow, website-affecting changes should only be deployed after the relevant branch is merged or the teacher explicitly directs deployment.
