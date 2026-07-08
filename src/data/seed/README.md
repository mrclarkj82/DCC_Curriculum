# Seed Data Copies

These JSON files mirror `curriculum/website-data` for development preview and static shell helpers.

The app imports these local copies so Vite can build without coupling runtime code directly to the curriculum source folders. Phase 5 route content should read from Firestore after seeding, while these mirrors remain useful for local preview and non-sensitive navigation scaffolding.

`blockLessonCalendar.seed.json` mirrors `curriculum/website-data/blockLessonCalendar.seed.json` for the original Q1 read-only teacher/admin schedule preview data. Regenerate it from `scripts/generate-block-calendar.mjs` whenever the Q1 source calendar schedule changes.

`blockLessonCalendars.seed.json` mirrors `curriculum/website-data/blockLessonCalendars.seed.json` and is the combined site preview feed used by `/teacher/schedule` for Q1 Unreal, Q2 Studio Organization + DaVinci, and Q3 Castle Documentary calendar previews.
