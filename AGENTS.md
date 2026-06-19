# Repository Instructions for Codex

## Project

DCC Creative Studio is a Firebase web app for a high school Digital Content Creators course.

## Current Phase

Phase 6.5 adds secure student class join codes while preserving teacher/admin class management, Firebase Google SSO, roles, protected routes, Firestore-backed content, and the active Today workflow.

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
- DCC data in the shared Firebase project must stay namespaced under `apps/dcc`.
- Deploy DCC Hosting only to the configured `dcc` Hosting target, not the default DragonMath Hosting site.
- The app must support multiple program areas.
- Do not assume the website is Unreal-only.
- Lesson pages should render from Firestore-backed seed data.
- Video production projects and Broadcast Desk Updates should render from structured Firestore-backed data.
- Do not hardcode one-off lesson pages.
- Do not build an in-browser video editor unless explicitly requested in a future phase.
- Future video production functionality should focus on hosting, collecting, organizing, and reviewing media submissions.
- Auth uses Google SSO through Firebase.
- Do not weaken Firebase Auth, Firestore rules, or Storage rules to make local testing easier.
- Do not remove Firebase Auth, Google SSO, role protection, or class-based access checks.
- Preserve class-code security: students join classes by code through the callable Cloud Function, must use `@student.doralacademynv.org`, cannot read join-code records, and cannot directly edit rosters or `classIds`.
- Teachers may manage join codes only for assigned classes. Admins may manage all class join codes.
- Seed imports must use local credentials only. Do not commit `.env.local`, service accounts, API secrets, rosters, private links, student names, or student media.
- Visual design rule: DCC Creative Studio uses a colorful retro 80s synthwave design system. Future tasks must preserve neon cyan, magenta, purple, blue, and orange accents, glowing cards, synthwave gradients, and the creative media studio look. Do not regress the app into a plain dark command-center UI.
- `src/styles/theme.css` contains the core design tokens. `src/styles/synthwave.css` contains the visual identity layer.
- Use TypeScript when app code is introduced.
- Keep student privacy and role-based access in mind for future phases.
- Do not expose student data across accounts.
- Add acceptance criteria to major task summaries.
- Preserve existing useful project instructions.
