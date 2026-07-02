# Seed Data Copies

These JSON files mirror `curriculum/website-data` for development preview and static shell helpers.

The app imports these local copies so Vite can build without coupling runtime code directly to the curriculum source folders. Phase 5 route content should read from Firestore after seeding, while these mirrors remain useful for local preview and non-sensitive navigation scaffolding.

`blockLessonCalendar.seed.json` mirrors `curriculum/website-data/blockLessonCalendar.seed.json` for the read-only teacher/admin schedule preview route. Regenerate it from `scripts/generate-block-calendar.mjs` whenever the source calendar schedule changes.
