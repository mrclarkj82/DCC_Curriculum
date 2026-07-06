# Pilot Batch

## Purpose

This pilot batch prepares the first classroom-ready content set for testing the future DCC Creative Studio workflow with real students while keeping the work content-only.

## Included Content

- Unreal Engine Studio Q1 Lessons 01-12
- Unreal Engine Studio Q1 Quiz 01 covering Lessons 01-04
- Video Production Studio VP Project 01 and VP Project 02
- Broadcast Desk Update 001 and Broadcast Desk Update 002
- Media submission guidelines, naming conventions, and reflection template

## Ready for ChatGPT Pro

The Unreal slide briefs include complete ChatGPT Pro PowerPoint prompt blocks for creating downloadable .pptx decks.

## Needs Teacher Review

- All student-facing directions should be checked for local class routines.
- Video Production equipment/software notes should be replaced with teacher-approved tools.
- Broadcast Desk Updates need real publish dates, due dates, and approved links.
- Quiz wording should be reviewed before publishing to students.

## Future App Phase Use

Future app phases should load this content from structured data and Firestore-ready records instead of hardcoded pages. The pilot batch can test how lessons, assignments, quizzes, Broadcast Desk Updates, media projects, and submission requirements should appear in the eventual website.

## Validation Instructions

Run `npm run validate:curriculum` from the repository root to validate current seed and curriculum data. The validator checks that:

- seed JSON files parse successfully
- IDs are unique within each seed file
- every `programAreaId` matches `programAreas.seed.json`
- every Unreal assignment references an existing Unreal lesson
- quiz `lessonIds` reference existing lessons
- broadcast update `relatedProjectIds` reference existing media projects

## Boundary

Do not build Firebase Authentication, Firestore, React routes, uploads, teacher dashboards, portfolios, or an in-browser video editor in this phase.
