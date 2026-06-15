# DCC Creative Studio

DCC Creative Studio is a Firebase-based class portal for the high school Digital Content Creators course.

The app is designed to support multiple program areas rather than a single Unreal-only experience. The first two required areas are Unreal Engine Studio and Video Production Studio.

ChatGPT Pro will help create slides, assignments, quizzes, lesson copy, video production project materials, broadcast updates, and JSON-ready content data. Codex will build the Firebase website from structured data. Firebase will later provide hosting, Google Authentication, Firestore, Storage, and Security Rules.

Phase 1 is only the source-of-truth infrastructure for curriculum, content data, schemas, prompt templates, and project documentation.

## Current Phase

Phase 1 - Establish Source of Truth

## Program Areas

- Unreal Engine Studio
- Video Production Studio

## How This Repository Should Grow

The website should become a curriculum and media project player. Lessons, assignments, quizzes, video production projects, broadcast updates, and student submission workflows should eventually render from structured data instead of hardcoded one-off pages.

The Unreal Engine content should be generated from structured lesson data, using the Unreal Engine 5 tutorial transcript as the curriculum spine for the Unreal Engine Studio area. Video Production content should be generated from structured project, update, and submission data.

## Next Phases

- Phase 2: Firebase/React app scaffold
- Phase 3: Google SSO and roles
- Phase 4: Student Today Page and Program Area Navigation
- Phase 5: Assignment and Media Evidence Uploads
- Phase 6: Teacher Dashboard
- Phase 7: Quiz and Checkpoint System
- Phase 8: Portfolio and Showcase System
- Phase 9: Video Production / Broadcast Desk workflow expansion

