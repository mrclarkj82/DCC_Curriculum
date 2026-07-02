# Website Data

This folder contains starter seed data and JSON schemas for the future DCC Creative Studio website.

Seed files should stay valid JSON and should be treated as draft source data until Firebase import tooling exists.

## Current Seed Files

- `programAreas.seed.json`: major areas of the DCC Creative Studio portal
- `lessons.seed.json`: starter Unreal Engine lesson records
- `assignments.seed.json`: starter Unreal Engine assignment records
- `quizzes.seed.json`: placeholder Unreal quiz records
- `mediaProjects.seed.json`: starter Video Production Studio project placeholders
- `broadcastUpdates.seed.json`: starter Broadcast Desk Update placeholders
- `classes.seed.json`: starter class records for Phase 4 auth/class routing
- `lessonSchedule.seed.json`: website-ready A/B lesson schedule records generated from the school calendar

## Validation Notes

Run `npm run validate:curriculum` from the repository root to verify:

- all seed files parse as valid JSON
- IDs are unique within each collection
- lessons, assignments, quizzes, media projects, and broadcast updates include `programAreaId`
- every `programAreaId` matches a record in `programAreas.seed.json`
- starter class records reference valid program areas and supported active item types
- class `teacherIds` and `studentIds` fields remain arrays
- lesson schedule records reference existing lessons and valid instructional days


## Relationship Checks

Validation also checks that:

- every Unreal assignment references an existing Unreal lesson
- quiz `lessonIds` reference existing lessons
- broadcast update `relatedProjectIds` reference existing media projects
- class `activeItemId` values reference existing lessons, assignments, quizzes, media projects, or broadcast updates when those active item types are used
- lesson schedule dates do not fall on weekends or calendar no-school days
- pilot batch `lesson-data.json`, `project-data.json`, `update-data.json`, and `quiz-data.json` remain aligned with the seed files
