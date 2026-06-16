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

## Validation Notes

This repository does not currently include a `package.json`, so Phase 1 does not add a Node validation script. When the app scaffold is introduced, add a `validate:curriculum` script that verifies:

- all seed files parse as valid JSON
- IDs are unique within each collection
- lessons, assignments, quizzes, media projects, and broadcast updates include `programAreaId`
- every `programAreaId` matches a record in `programAreas.seed.json`
- required lesson fields are present

Until then, use a JSON parser or editor validation before editing these files.


## Phase 2 Relationship Checks

When validation tooling is introduced, also check that:

- every Unreal assignment references an existing Unreal lesson
- quiz `lessonIds` reference existing lessons
- broadcast update `relatedProjectIds` reference existing media projects
- pilot batch `lesson-data.json`, `project-data.json`, `update-data.json`, and `quiz-data.json` remain aligned with the seed files
