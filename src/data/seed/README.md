# Seed Data Copies

These JSON files mirror `curriculum/website-data` for development preview and static shell helpers.

The app imports these local copies so Vite can build without coupling runtime code directly to the curriculum source folders. Phase 5 route content should read from Firestore after seeding, while these mirrors remain useful for local preview and non-sensitive navigation scaffolding.
