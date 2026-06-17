# DCC Creative Studio

DCC Creative Studio is a Firebase-based classroom portal for a high school Digital Content Creators course. It supports multiple program areas, beginning with Unreal Engine Studio and Video Production Studio.

The app is intended to become a data-driven curriculum and media project player. Lessons, assignments, video production projects, Broadcast Desk Updates, submissions, quizzes, and portfolio work should render from structured data instead of hardcoded one-off pages.

## Current Phase

Phase 3 - Scaffold Firebase React App

## Local Development

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

Validate curriculum seed data:

```bash
npm run validate:curriculum
```

## Environment Variables

Create a local `.env.local` file using `.env.example` as the template:

```text
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Do not commit `.env.local` or real Firebase credentials.

## Firebase Setup

Firebase Hosting is configured for Vite output in `dist` with single-page app rewrites to `index.html`.

Firestore and Storage rules deny all reads and writes for now. Google SSO, roles, Firestore access, and upload rules will be implemented in later phases.

## Routes

Public:

- `/`
- `/login`

Temporary demo-protected scaffold routes:

- `/today`
- `/areas`
- `/areas/unreal-engine`
- `/areas/video-production`
- `/lessons/:lessonId`
- `/assignments/:assignmentId`
- `/media-projects/:projectId`
- `/broadcast-updates/:updateId`
- `/teacher`
- `/admin`

## Demo Data

Phase 3 imports local seed copies from `src/data/seed/`. These files mirror `curriculum/website-data/` for scaffold preview only. A later phase should replace this data loader with Firestore-backed loading.

## Program Areas

- Unreal Engine Studio
- Video Production Studio

## Phase 4 Preview

Phase 4 should add Firebase Google SSO, user roles, and real protected-route behavior while preserving the multi-program-area structure.

