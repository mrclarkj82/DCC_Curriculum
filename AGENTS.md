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
