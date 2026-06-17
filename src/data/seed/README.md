# Seed Data Copies

These JSON files mirror `curriculum/website-data` for the scaffold preview.

The app imports these local copies so Vite can build without coupling runtime code directly to the curriculum source folders. Phase 4 reads authenticated user and class records from Firestore, while curriculum preview data still uses these local JSON copies until a later Firestore-backed content loader is built.
