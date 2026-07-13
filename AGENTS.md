# Repository Instructions for Codex

## Project Identity

DCC Creative Studio is a multi-program-area classroom platform for a high school Digital Content Creators course.

Current major program areas include:

- Unreal Engine Studio
- Video Production Studio
- DaVinci Resolve curriculum
- Broadcast Desk workflows
- Future game and mission-map systems

Do not make the project Unreal-only.

## Current Phase

- Website Phase 8 is complete.
- Phase 9 is Curriculum Completion and ChatGPT Pro Slide Handoff.
- Phase 9 is a curriculum production, repository organization, website-data integration, and slide-handoff phase.
- Phase 9 does not include creating PowerPoint files, slide images, generated presentation backgrounds, or slide artwork.

## Assignment Game: The Ember Gate

The repository also contains an assignment-unlocked student game project called **The Ember Gate**.
The game lives inside the DCC Creative Studio app and must preserve the classroom workflow: students
complete required DCC assignment work first, then unlock the game from the student Today experience.

The Ember Gate is a top-down 2D medieval action-adventure game, not a side-scrolling platformer.
The intended game direction includes:

- Up, down, left, and right player movement.
- A short-range sword attack.
- A weaker ranged energy attack.
- NPC dialogue.
- Collectible items and inventory.
- Student-specific save/load progress.
- New areas unlocked by later assignment completion.
- Hidden Frame / Easter egg clue integration.

### Assignment Game Non-Negotiable Rules

- Do not work directly on `main` for assignment-game phases.
- Use small, reviewable branches and PRs, one branch and one PR per phase.
- Preserve the existing assignment access gate.
- Locked students must not reach gameplay by manually navigating to `/student/game`.
- Do not weaken Firebase Auth, role checks, class roster checks, assignment completion checks, Firestore rules, or Storage rules.
- Do not add Phaser, Pixi, Matter.js, or another heavy game engine.
- Do not add new dependencies unless absolutely necessary and justified in the PR.
- Keep gameplay modular and data-driven.
- Do not create Firestore game saves until the save-system phase.
- Do not create Firestore save rules until the save-system phase.
- Do not use Firebase Storage for saves.
- Do not hide failing checks.
- Update `docs/assignment-game/PROGRESS.md` after each meaningful assignment-game step.
- Classroom safety matters: the game unlocks only after required work and must always provide a clear Back to Today path.

### Assignment Game Stack And Routing

Known app stack:

- React
- Vite
- TypeScript
- Firebase Authentication
- Cloud Firestore
- React Router
- Existing CSS styling through `src/styles/theme.css`, `src/styles/synthwave.css`, and `src/styles/globals.css`

Relevant files and folders to inspect before assignment-game work:

- `docs/assignment-game/`
- `src/App.tsx`
- `src/pages/StudentGamePage.tsx`
- `src/hooks/useAssignmentGameAccess.ts`
- `src/services/assignmentGameAccessService.ts`
- `src/components/assignmentGame/AssignmentGameEntryCard.tsx`
- `src/components/today/StudentTodayExperience.tsx`
- `src/features/assignmentGame/`
- `src/styles/theme.css`
- `src/styles/synthwave.css`
- `src/styles/globals.css`
- `firestore.rules`
- `storage.rules`

The current route is `/student/game`. It must remain protected by the existing authenticated app shell,
the student-role `ProtectedRoute`, and the page-level assignment access gate unless a later approved
phase explicitly changes the route model while preserving equivalent or stronger protections.

### Assignment Game Assets

Use provided asset zips only when they are available in the Codex workspace. Read the asset manifests
before integrating files.

Expected zips:

- `assignment-game-player-sprites.zip`
- `assignment-game-tileset.zip`

Expected public asset locations:

- Player sprites: `public/assets/assignment-game/player/`
- Tiles: `public/assets/assignment-game/tiles/`

Use game-ready folders from the zips:

- Player pack: `game_ready_128/`
- Tileset pack: `game_ready_64/`

The game must not crash if an optional image asset is missing. Implement graceful fallback rendering
for missing images, missing manifests, or incomplete asset sets.

### Assignment Game PR Requirements

Every assignment-game PR description must include:

- Summary
- What changed
- Files added or modified
- Route behavior
- Access gate safety
- What is intentionally not implemented
- Testing notes
- Manual verification checklist
- Known limitations
- Next recommended phase

Before marking an assignment-game PR ready, run available checks:

- `npm run lint`
- `npm run build`
- `npm run validate:curriculum`
- `npm run validate:hidden-frame`

If a command does not exist, document that. If a command fails, document the exact failure.

### Future Save Security

Future persisted game saves must use Firestore, not Firebase Storage. Client-side checks are not
enough for persisted save data. The save-system phase must include reviewed Firestore rules that
prove students can read/write only their own game progress, teachers/admins have only approved
visibility, and assignment unlock/progression state cannot be forged by editing client data.

## Source-Of-Truth Priority

When sources disagree, use this priority:

1. Explicit current teacher instructions
2. `PROGRESS.md`
3. Current curriculum source files and transcripts
4. Current seed JSON
5. Lesson maps and schedules
6. Existing lesson artifacts
7. Older placeholder documentation

Do not preserve outdated content merely because it already exists.

## Repository Workflow

- Do not open pull requests unless the teacher explicitly asks.
- Work from `main`.
- Pull latest `origin/main` before changing files.
- Commit working changes directly to `main` only after build, lint, curriculum validation, and relevant dry runs pass.
- Push validated milestones to GitHub.
- Deploy Firebase Hosting only when live website behavior changes.
- Deploy DCC Hosting only to the configured `dcc` Hosting target, not the default DragonMath Hosting site.
- Return the live Firebase Hosting URL after deploys.
- Never commit `.env.local`, credentials, service account keys, student data, rosters, private links, or private media.

## Required Lesson Artifact Standard

Every completed lesson should contain the project-standard equivalents of:

- `lesson-page.md`
- `assignment-sheet.md`
- `bell-ringer-and-exit-ticket.md`
- `teacher-notes.md`
- `lesson-data.json`
- `slide-brief.md`
- `presentation-brief.md`

Where the existing structure uses additional files, preserve them.

## Presentation Rules

- `slide-brief.md` is the concise automation-oriented brief.
- `presentation-brief.md` is the premium instructional brief for ChatGPT Pro.
- Neither brief is student-facing.
- Codex must not create `.pptx` files.
- Codex must not use PowerPoint generation tools.
- Codex must not generate slide artwork or presentation background images.
- PowerPoint links stay blank until the teacher supplies real Drive links.
- Slide status must accurately reflect reality, such as `not-created`, `ready-for-chatgpt`, `created`, or another existing accurate enum.
- Do not mark a slide deck as completed when only a brief exists.
- Do not add fake Google Drive presentation links.

## Submission Policy

- Student evidence uses Google Drive, Google Docs, YouTube, or approved link submissions through the existing submission workflow.
- Do not add raw student upload requirements.
- Do not enable Firebase Storage uploads for student assignment media unless the teacher explicitly changes this later.
- Student Preview Mode must not create real student submissions.

## Curriculum Quality Rules

- Student-facing language must be clear and high-school appropriate.
- Teacher notes must be practical for a 90-minute A/B block.
- Assignments must be realistic for available class time.
- Bell ringers should be brief.
- Exit tickets must measure the learning target.
- Each lesson should include intervention and extension guidance.
- Lessons should follow the school calendar and A/B schedule where schedule files exist.
- Saturdays and Sundays are always off.
- Weekend dates must not appear as no-school or skipped dates.
- Only actual weekday no-school dates belong in `noSchoolDates`.
- Do not silently invent critical curriculum decisions when source material is missing; mark the item `needs-teacher-review` and document the blocker.

## Website And Data Rules

- Keep curriculum and content data separate from app code.
- DCC data in the shared Firebase project must stay namespaced under `apps/dcc`.
- Lesson pages should render from Firestore-backed seed data.
- Video production projects and Broadcast Desk Updates should render from structured Firestore-backed data.
- Do not hardcode one-off lesson pages.
- Do not build an in-browser video editor unless explicitly requested in a future phase.
- Future video production functionality should focus on hosting, collecting, organizing, and reviewing media submissions.
- Do not remove Firebase Auth, Google SSO, role protection, class-based access checks, Firestore-backed content services, or the active Today workflow.
- Do not weaken Firebase Auth, Firestore rules, or Storage rules to make local testing easier.

## Class And Response Security

- Preserve class-code security: students join classes by code through the callable Cloud Function, must use `@student.doralacademynv.org`, cannot read join-code records, and cannot directly edit rosters or `classIds`.
- Teachers may manage join codes only for assigned classes. Admins may manage all class join codes.
- Preserve student response security: students may submit and edit only their own bell ringer and exit ticket responses for the active item in their assigned class.
- Students cannot read classmates' responses.
- Teachers may read responses only for classes they teach.
- Admins may read response status across DCC.
- Student Preview Mode is teacher/admin only. Do not implement real student impersonation, do not add teachers to student rosters, and do not let preview responses count as real student work.
- Preserve submission security: students submit evidence links only to `apps/dcc/submissions`; students cannot read classmates' submissions; assigned teachers may review submissions only for classes they teach; admins may review all DCC submissions.

## Visual Identity Rules

- Preserve the colorful retro 80s synthwave design system in the website.
- Preserve neon cyan, magenta, purple, blue, and orange accents, glowing cards, synthwave gradients, and the creative media studio look.
- Do not regress the website into a plain dark command-center appearance.
- `src/styles/theme.css` contains the core design tokens.
- `src/styles/synthwave.css` contains the visual identity layer.
- Slide visual briefs should be compatible with the established premium deck style.

## Validation Rules

Before committing curriculum or website changes, run the relevant checks:

- `npm install` when dependencies may need refresh
- `npm run build`
- `npm run lint`
- `npm run validate:curriculum`
- `npm run seed:curriculum -- --dry-run` when seed files change
- `git diff --check`

Also confirm no `.pptx` files, generated slide image folders, fake Drive links, credentials, `.env.local`, service accounts, student data, rosters, or private media are staged.

## Acceptance Criteria Practice

- Add acceptance criteria to major task summaries.
- Keep `PROGRESS.md` current during Phase 9.
- Preserve existing useful project instructions.
