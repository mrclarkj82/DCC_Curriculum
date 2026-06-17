# Repository Instructions for Codex

## Project

DCC Creative Studio is a Firebase web app for a high school Digital Content Creators course.

## Current Phase

Phase 4 adds Firebase Google SSO, roles, classes, protected routes, and conservative Firebase Security Rules while preserving the source-of-truth curriculum and content infrastructure.

## Repository Workflow

- Do not open pull requests unless the teacher explicitly asks.
- Work from `main`.
- Commit working changes directly to `main` only after build, lint, and validation pass.
- Push `main` to GitHub.
- Deploy live to Firebase Hosting when the task affects the website.
- Return the live Firebase Hosting URL after deploys.
- Never commit `.env.local`, credentials, service account keys, or student data.

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
- Auth uses Google SSO through Firebase.
- Do not weaken Firebase Auth, Firestore rules, or Storage rules to make local testing easier.
- Visual design rule: DCC Creative Studio uses a colorful retro 80s synthwave design system. Future tasks must preserve neon cyan, magenta, purple, blue, and orange accents, glowing cards, synthwave gradients, and the creative media studio look. Do not regress the app into a plain dark command-center UI.
- `src/styles/theme.css` contains the core design tokens. `src/styles/synthwave.css` contains the visual identity layer.
- Use TypeScript when app code is introduced.
- Keep student privacy and role-based access in mind for future phases.
- Do not expose student data across accounts.
- Add acceptance criteria to major task summaries.
- Preserve existing useful project instructions.

