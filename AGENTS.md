# Repository Instructions for Codex

## Project

DCC Creative Studio is a Firebase web app for a high school Digital Content Creators course.

## Current Phase

Phase 3 scaffolds the Firebase React app shell while preserving the source-of-truth curriculum and content infrastructure.

## Repository Workflow

- Codex works on branches.
- The user reviews pull requests.
- `main` stays stable.
- Do not commit directly to `main` unless the user explicitly overrides this workflow.

## Required Program Areas

- Unreal Engine Studio
- Video Production Studio

## Future Stack

- React
- Vite
- TypeScript
- Firebase Authentication
- Cloud Firestore
- Cloud Storage for Firebase
- Firebase Hosting
- Firebase Security Rules

## Coding and Content Rules

- Do not hardcode Firebase credentials.
- Do not build features before the requested phase.
- Keep curriculum/content data separate from app code.
- The app must support multiple program areas.
- Do not assume the website is Unreal-only.
- Lesson pages should eventually render from Firestore/seed data.
- Video production projects and Broadcast Desk Updates should eventually render from structured data.
- Do not hardcode one-off lesson pages.
- Do not build an in-browser video editor unless explicitly requested in a future phase.
- Future video production functionality should focus on hosting, collecting, organizing, and reviewing media submissions.
- Future auth will use Google SSO through Firebase.
- Use TypeScript when app code is introduced.
- Keep student privacy and role-based access in mind for future phases.
- Do not expose student data across accounts.
- Add acceptance criteria to every PR.
- Preserve existing useful project instructions.

