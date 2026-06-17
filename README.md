# DCC Creative Studio

DCC Creative Studio is a Firebase-based classroom portal for a high school Digital Content Creators course. It supports multiple program areas, beginning with Unreal Engine Studio and Video Production Studio.

The app is intended to become a data-driven curriculum and media project player. Lessons, assignments, video production projects, Broadcast Desk Updates, submissions, quizzes, and portfolio work should render from structured data instead of hardcoded one-off pages.

## Current Phase

Phase 5 - Firestore content seeding and active Today workflow

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

Dry-run curriculum seeding without Firebase credentials:

```bash
npm run seed:curriculum -- --dry-run
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
VITE_ALLOWED_EMAIL_DOMAINS=doralacademynv.org,student.doralacademynv.org
```

Do not commit `.env.local` or real Firebase credentials.

## Firebase Setup

Firebase Hosting is configured for Vite output in `dist` with single-page app rewrites to `index.html`.

For Firebase setup:

1. Create a Firebase project and add a web app.
2. Enable Authentication and turn on the Google provider.
3. Add the production and local development authorized domains in Firebase Authentication settings.
4. Create a Firestore database.
5. Apply `firestore.rules`.
6. Apply `storage.rules`.
7. Copy `.env.example` to `.env.local`, paste the Firebase web config values, and set `VITE_ALLOWED_EMAIL_DOMAINS`.

Firestore rules now enforce authenticated school-domain users, safe default student profile creation, role boundaries, class membership checks, authenticated curriculum reads, and admin-only curriculum writes. Storage remains closed until a later upload phase.

## Phase 5 Firestore Content

Phase 5 adds:

- Firestore-backed curriculum and project content.
- A safe curriculum seed importer.
- A class active item model for Today's Mission.
- Firestore services for program areas, lessons, assignments, quizzes, media projects, Broadcast Desk Updates, classes, and users.

Expected Firestore collections:

- `programAreas`
- `lessons`
- `assignments`
- `quizzes`
- `mediaProjects`
- `broadcastUpdates`
- `classes`
- `users`

Seed files live in `curriculum/website-data/` and should remain the local source used by the importer. The live app reads Firestore route content after records are seeded.

Seed dry run:

```bash
npm run seed:curriculum -- --dry-run
```

Real seed write on macOS/Linux:

```bash
CONFIRM_SEED=true npm run seed:curriculum
```

Real seed write in Windows PowerShell:

```powershell
$env:CONFIRM_SEED="true"; npm run seed:curriculum
```

Real seed write in Windows Command Prompt:

```bat
set CONFIRM_SEED=true && npm run seed:curriculum
```

The real write path uses the Firebase Admin SDK. Prefer Application Default Credentials for local admin access, such as `gcloud auth application-default login`, or set `FIREBASE_SERVICE_ACCOUNT_PATH` to a service account JSON file stored outside this repository. Never commit service account files, `.env.local`, private school links, rosters, student media, or Firebase secrets.

`/today` works like this:

1. The user signs in with an approved Google account.
2. The app reads `users/{uid}` and checks `classIds`.
3. The app loads the first assigned `classes/{classId}` record.
4. The class record's `activeProgramAreaId`, `activeItemType`, and `activeItemId` decide what Today's Mission renders.
5. Lessons, assignments, media projects, and Broadcast Desk Updates render as active items. Quizzes and portfolio checkpoints show polished placeholders until later phases.

Not implemented yet:

- Bell ringer submissions.
- Exit ticket submissions.
- Assignment uploads.
- Media uploads.
- Quiz attempts.
- Grading workflows.
- Portfolio workflows.
- Full admin CMS editing.

## Routes

Public:

- `/`
- `/login`

Signed-in student routes:

- `/today`
- `/areas`
- `/areas/unreal-engine`
- `/areas/video-production`
- `/lessons/:lessonId`
- `/assignments/:assignmentId`
- `/media-projects/:projectId`
- `/broadcast-updates/:updateId`

Teacher/admin route:

- `/teacher`

Admin route:

- `/admin`

Client route guards improve the user experience, but Firestore security rules are the real access boundary.

## Local Seed Mirrors

Local seed copies in `src/data/seed/` mirror `curriculum/website-data/` for development preview and static shell helpers. Phase 5 route content should be read from Firestore after seeding.

Starter class records live in `curriculum/website-data/classes.seed.json`. They contain placeholder class IDs only and do not include real student names.

## Program Areas

- Unreal Engine Studio
- Video Production Studio

## Visual Design

The app uses a colorful retro 80s synthwave design system. Neon cyan, hot pink, electric purple, blue glow, and orange/yellow accents should remain visible across landing, login, program areas, lesson pages, Today, teacher, and admin views.

`src/styles/theme.css` contains the core design tokens. `src/styles/globals.css` contains base document styling and accessibility defaults. `src/styles/synthwave.css` contains the visual identity layer with gradients, glowing cards, badges, program-area accents, and synthwave grid energy.

Future phases should preserve the creative media studio look and should not replace it with a plain dark command-center UI. Cards, buttons, badges, tables, and route layouts use dark purple panels, neon accents, visible focus states, and accessible contrast. Motion is subtle, and animations are disabled automatically for users who prefer reduced motion.

## Phase 4 Auth And Roles

Phase 4 adds Firebase Google sign-in, allowed email-domain checks, user profile records, roles, class records, protected routes, and conservative security rules.

Supported roles:

- `student`
- `teacher`
- `admin`

On first approved Google sign-in, the app creates `users/{uid}` with role `student` and an empty `classIds` array. The client never assigns itself `teacher` or `admin`, and it never updates its own `classIds`.

To bootstrap the first admin or teacher:

1. Sign in once with an approved school Google account.
2. Open Firebase Console.
3. Find the created `users/{uid}` document.
4. Manually change `role` to `admin` or `teacher`.
5. Add class IDs to the user's `classIds` only for users who should see those class records.
6. Add the user's UID to the matching class record's `studentIds` or `teacherIds` array.

Future phases may add safer admin tooling or custom claims, but Phase 4 intentionally keeps role promotion out of the client.

Local Demo Mode is available only while running the Vite dev server. It is hidden in production and does not bypass Firebase Authentication or Firebase Security Rules.

## Security Notes

- Client route guards are not enough by themselves.
- Firestore rules enforce school-domain access, safe user creation, role boundaries, and class membership.
- Storage denies all reads and writes until upload and media submission workflows are designed.
- Do not commit `.env.local`, real Firebase credentials, real rosters, or student data.

## Live Deployment

Firebase Hosting project ID: `dcc-creative-studio`

Live URLs:

- `https://dcc-creative-studio.web.app`
- `https://dcc-creative-studio.firebaseapp.com`

Deploy command:

```bash
firebase deploy --only hosting,firestore:rules,storage
```

Use `npm run build`, `npm run lint`, and `npm run validate:curriculum` before deploying. The app builds from local `.env.local` values, but `.env.local` is ignored by git and must never be committed.

Google Authentication must be enabled in Firebase Console for live sign-in testing. The Firebase Hosting domains should be authorized for Authentication, including `dcc-creative-studio.web.app` and `dcc-creative-studio.firebaseapp.com`; keep `localhost` authorized for local testing.

The first teacher or admin must sign in once, then be manually promoted in Firestore by changing their `users/{uid}.role` to `teacher` or `admin` and assigning the correct `classIds`.

## Later Phase Preview

Later phases should build bell ringer responses, exit tickets, assignment submissions, media submissions, quiz attempts, grading, and portfolio workflows while preserving the multi-program-area structure.

