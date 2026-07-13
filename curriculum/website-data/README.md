# Website Data

This folder contains starter seed data and JSON schemas for the future DCC Creative Studio website.

Seed files should stay valid JSON and should be treated as draft source data until Firebase import tooling exists.

## Current Seed Files

- `programAreas.seed.json`: major areas of the DCC Creative Studio portal
- `lessons.seed.json`: starter Unreal Engine and Video Production lesson records
- `assignments.seed.json`: starter Unreal Engine and Video Production assignment records
- `quizzes.seed.json`: Unreal and Video Production quiz records
- `quizAnswerKeys.seed.json`: private quiz answer keys for server-side grading and teacher-only seed workflows
- `mediaProjects.seed.json`: starter Video Production Studio project placeholders
- `broadcastUpdates.seed.json`: starter Broadcast Desk Update placeholders
- `classes.seed.json`: starter class records for Phase 4 auth/class routing
- `lessonSchedule.seed.json`: website-ready A/B lesson schedule records generated from the school calendar
- `blockLessonCalendars.seed.json`: combined teacher/admin schedule preview data for Q1 Unreal, Q2 Studio Organization + DaVinci Resolve, and Q3 Unreal Castle Documentary

## Validation Notes

Run `npm run validate:curriculum` from the repository root to verify:

- all seed files parse as valid JSON
- IDs are unique within each collection
- lessons, assignments, quizzes, media projects, and broadcast updates include `programAreaId`
- every `programAreaId` matches a record in `programAreas.seed.json`
- starter class records reference valid program areas and supported active item types
- class `teacherIds` and `studentIds` fields remain arrays
- lesson schedule records reference existing lessons and valid instructional days
- block calendar records use Monday-Friday cells, quarter lesson headings such as `Q1 L#` or `Q2 L#`, and weekday-only no-school dates
- public quiz records do not expose private answer keys or explanations


## Relationship Checks

Validation also checks that:

- every Unreal assignment references an existing Unreal lesson
- quiz `lessonIds` reference existing lessons
- broadcast update `relatedProjectIds` reference existing media projects
- class `activeItemId` values reference existing lessons, assignments, quizzes, media projects, or broadcast updates when those active item types are used
- lesson schedule dates do not fall on weekends or calendar no-school days
- block calendar instructional cells do not fall on weekends or no-school weekdays
- no-school lists do not contain Saturdays or Sundays
- pilot batch `lesson-data.json`, `project-data.json`, `update-data.json`, and `quiz-data.json` remain aligned with the seed files

## Phase 9 Notes

- Q3 Unreal Castle Documentary lessons 01-16 now have matching local lesson folders under `curriculum/pilot-batch/unreal/q3/`.
- Q3 quiz checkpoints are draft-pilot records with public questions in `quizzes.seed.json` and private answers in `quizAnswerKeys.seed.json`.
- Missing presentation decks use `slides.status: "ready-for-chatgpt"` with an empty URL until the teacher creates and supplies a real Drive or PowerPoint link.
- Slide handoff metadata lives in `curriculum/slide-handoff/`; those files are planning artifacts only, not completed decks.
