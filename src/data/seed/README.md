# Seed Data Copies

These JSON files mirror `curriculum/website-data` for development preview and static shell helpers.

The app imports these local copies so Vite can build without coupling runtime code directly to the curriculum source folders. Phase 5 route content should read from Firestore after seeding, while these mirrors remain useful for local preview and non-sensitive navigation scaffolding.

`q1-unreal-lesson-schedule.json` mirrors `curriculum/calendar/q1-unreal-lesson-schedule.json` for the read-only teacher schedule preview route. Regenerate or recopy it whenever the source calendar schedule changes.
