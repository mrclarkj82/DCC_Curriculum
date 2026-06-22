# DCC Creative Studio

DCC Creative Studio is a Firebase-based classroom portal for a high school Digital Content Creators course. It supports multiple program areas, beginning with Unreal Engine Studio and Video Production Studio.

The app is intended to become a data-driven curriculum and media project player. Lessons, assignments, video production projects, Broadcast Desk Updates, submissions, quizzes, and portfolio work should render from structured data instead of hardcoded one-off pages.

## Current Phase

Phase 6.5 - Student class join codes

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
VITE_ALLOWED_EMAILS=
VITE_FIRESTORE_NAMESPACE=apps/dcc
```

`VITE_ALLOWED_EMAILS` is for specific trusted teacher/admin bootstrap accounts that are not on the school domain. The same account must also be present in `apps/dcc/config/access.allowedAdminEmails` for Firestore rules to allow the profile. Do not commit `.env.local` or real Firebase credentials.

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
8. If a trusted bootstrap admin uses a non-school email, add it to `VITE_ALLOWED_EMAILS` and to `apps/dcc/config/access.allowedAdminEmails`.

Firestore rules now enforce authenticated school-domain users, a narrow bootstrap admin email allowlist, safe default student profile creation, role boundaries, class membership checks, authenticated curriculum reads, and admin-only curriculum writes under the DCC namespace `apps/dcc`. Storage remains closed until a later upload phase.

## Phase 5 Firestore Content

Phase 5 adds:

- Firestore-backed curriculum and project content.
- A safe curriculum seed importer.
- A class active item model for Today's Mission.
- Firestore services for program areas, lessons, assignments, quizzes, media projects, Broadcast Desk Updates, classes, and users.

Expected Firestore collections:

- `apps/dcc/programAreas`
- `apps/dcc/lessons`
- `apps/dcc/assignments`
- `apps/dcc/quizzes`
- `apps/dcc/mediaProjects`
- `apps/dcc/broadcastUpdates`
- `apps/dcc/classes`
- `apps/dcc/users`

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

The real write path uses the Firebase Admin SDK and writes to `apps/dcc` by default. Prefer Application Default Credentials for local admin access, such as `gcloud auth application-default login`, or set `FIREBASE_SERVICE_ACCOUNT_PATH` to a service account JSON file stored outside this repository. Never commit service account files, `.env.local`, private school links, rosters, student media, or Firebase secrets.

`/today` works like this:

1. The user signs in with an approved Google account.
2. The app reads `apps/dcc/users/{uid}` and checks `classIds`.
3. The app loads the first assigned `apps/dcc/classes/{classId}` record.
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

## Phase 6 Teacher/Admin Management

Phase 6 adds the minimum in-site controls needed to run DCC Creative Studio with real classes:

- User management from the `apps/dcc/users` collection.
- Role management for admins.
- Class creation and basic class info editing.
- Student and teacher class assignment controls that keep `apps/dcc/users/{uid}.classIds` synchronized with `apps/dcc/classes/{classId}.studentIds` and `apps/dcc/classes/{classId}.teacherIds`.
- Active item controls for lessons, assignments, media projects, Broadcast Desk Updates, quizzes, and portfolio checkpoint placeholders.

Admin workflow:

1. Sign in with an approved school Google account.
2. Manually promote the first trusted admin in Firestore/Firebase Console after their first login.
3. Go to `/admin`.
4. Assign user roles and class memberships.
5. Create class records as needed.
6. Set each class active item for `/today`.

Teacher workflow:

1. Sign in with an approved school Google account.
2. An admin must assign the account to a class as a teacher.
3. Go to `/teacher`.
4. View assigned classes and current active items.
5. Set active items only for assigned classes.

Student workflow:

1. Sign in with an approved school Google account.
2. An admin must assign the account to a class as a student.
3. Go to `/today`.
4. The page loads the active item from the assigned class record.

Phase 6 does not implement bell ringer submissions, exit ticket submissions, assignment uploads, media uploads, grading, quiz attempts, or portfolio submissions. It is management plumbing only, not a full CMS and not a video editor.

Security notes:

- Role and class writes are protected by Firestore rules, not only hidden by the UI.
- Students cannot promote themselves or assign themselves to classes.
- Teachers cannot change roles or class rosters.
- Assigned teachers can update only active item fields for their own classes.
- `.env.local`, service account keys, Firebase secrets, rosters, student data, private links, and student media must not be committed.

## Phase 6.5 Student Class Join Codes

Phase 6.5 adds a secure class-code enrollment workflow:

- Teachers can generate, view, copy, regenerate, and disable join codes from `/teacher`.
- Admins can manage join codes for every class from `/admin`.
- Students can enter a teacher-provided code on `/today` when they have no class or on `/join-class`.
- The callable Cloud Function `joinClassWithCode` verifies the student account and updates both `apps/dcc/users/{uid}.classIds` and `apps/dcc/classes/{classId}.studentIds`.

Teacher workflow:

1. Sign in with an approved teacher/admin account.
2. Go to `/teacher`.
3. Open an assigned class card.
4. Generate a class code.
5. Share the code only with students in that class.
6. Regenerate or disable the code if needed.

Student workflow:

1. Sign in with an `@student.doralacademynv.org` Google account.
2. Go to `/today` or `/join-class`.
3. Enter the class code from the teacher.
4. Join the class.
5. Return to `/today` to load the class active item.

Admin workflow:

1. Go to `/admin`.
2. Review which classes have active codes.
3. Generate, copy, regenerate, or disable codes for any class.

Security notes:

- Students cannot read or list `classJoinCodes`.
- Students cannot directly update class rosters or their own `classIds`.
- Students can join only through `joinClassWithCode` and only with an `@student.doralacademynv.org` account.
- Teacher/admin code management is protected by Firestore rules.
- Role changes remain admin-only.

Cloud Functions are required for the secure student join action. Deploy Phase 6.5 with:

```bash
firebase deploy --only hosting,firestore:rules,functions
```

Phase 6.5 does not implement bell ringer submissions, exit tickets, uploads, grading, quiz attempts, or portfolios.

## Shared Firebase Project And Namespacing

DCC Creative Studio uses the shared Blaze Firebase project `dragonmath-f6f56`, but DCC app data is namespaced under `apps/dcc` so it does not collide with DragonMath data.

Shared project services:

- Firebase Authentication users are shared at the Firebase project level.
- DCC Firestore app data lives under `apps/dcc`.
- DCC user profiles live under `apps/dcc/users`; existing shared Authentication users are not automatically copied into DCC.
- DCC Hosting deploys to the separate Hosting site target `dcc`.
- DCC live site URL is `https://dcccs.web.app`.

Do not deploy this app to the default DragonMath Hosting site. Use the configured `dcc` Hosting target.

## Routes

Public:

- `/`
- `/login`

Signed-in student routes:

- `/today`
- `/join-class`
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

On first approved Google sign-in, the app creates `apps/dcc/users/{uid}` with role `student` and an empty `classIds` array. The client never assigns itself `teacher` or `admin`, and it never updates its own `classIds`.

To bootstrap the first admin or teacher:

1. Sign in once with an approved school Google account.
2. Open Firebase Console.
3. If the first admin uses a non-school email, add that exact email to `apps/dcc/config/access.allowedAdminEmails` and `VITE_ALLOWED_EMAILS` before building.
4. Find the created `apps/dcc/users/{uid}` document.
5. Manually change `role` to `admin` or `teacher`.
6. After the first admin is promoted, use `/admin` to assign roles and class memberships.

There is no insecure "make me admin" client button. Self-promotion remains intentionally blocked.

Local Demo Mode is available only while running the Vite dev server. It is hidden in production and does not bypass Firebase Authentication or Firebase Security Rules.

## Security Notes

- Client route guards are not enough by themselves.
- Firestore rules enforce school-domain access, safe user creation, role boundaries, and class membership.
- Storage denies all reads and writes until upload and media submission workflows are designed.
- Do not commit `.env.local`, real Firebase credentials, real rosters, or student data.

## Live Deployment

Firebase project ID: `dragonmath-f6f56`

Live URLs:

- `https://dcccs.web.app`
- `https://mrclarkj82.github.io/dcccs`

Deploy command:

```bash
firebase deploy --only hosting,firestore:rules,functions
```

GitHub Pages mirror build:

```bash
npm run build:github-pages
```

The GitHub Pages mirror uses Vite base path `/dcccs/` and React Router basename `/dcccs`.

Use `npm install`, `npm run build`, `npm run lint`, `npm run validate:curriculum`, and `npm --prefix functions run build` before deploying. The app builds from local `.env.local` values, but `.env.local` is ignored by git and must never be committed. Deploy Storage rules only in a future phase when Firebase Storage is initialized and upload workflows are designed.

Google Authentication must be enabled in Firebase Console for live sign-in testing. The Firebase Hosting domains should be authorized for Authentication, including `dcc-creative-studio.web.app` and `dcc-creative-studio.firebaseapp.com`; keep `localhost` authorized for local testing.

The first teacher or admin must sign in once, then be manually promoted in Firestore by changing their `apps/dcc/users/{uid}.role` to `teacher` or `admin` and assigning the correct `classIds`.

## Later Phase Preview

Later phases should build bell ringer responses, exit tickets, assignment submissions, media submissions, quiz attempts, grading, and portfolio workflows while preserving the multi-program-area structure.
