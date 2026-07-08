# DCC Creative Studio

DCC Creative Studio is a Firebase-based classroom portal for a high school Digital Content Creators course. It supports multiple program areas, beginning with Unreal Engine Studio and Video Production Studio.

The app is intended to become a data-driven curriculum and media project player. Lessons, assignments, video production projects, Broadcast Desk Updates, submissions, quizzes, and portfolio work should render from structured data instead of hardcoded one-off pages.

## Current Phase

Phase 8 + Quiz 1 Self-Grading Pilot

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
- `apps/dcc/submissions` (Phase 8 evidence links)
- `apps/dcc/quizAttempts` (Quiz 1 self-grading scores)
- `apps/dcc/quizAnswerKeys` (private answer keys used by Cloud Functions)

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
5. Lessons, assignments, media projects, Broadcast Desk Updates, and published quizzes render as active items. Portfolio checkpoints show polished placeholders until later phases.

Not implemented yet:

- Assignment uploads.
- Media uploads.
- Full gradebook workflows beyond quiz score collection.
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

Phase 6.5 does not implement uploads, grading, quiz attempts, or portfolios.

## Phase 7 Bell Ringers And Exit Tickets

Phase 7 adds the first student response workflow while keeping assignment uploads, media uploads, grading, quiz attempts, and portfolios out of scope.

What Phase 7 adds:

- Student bell ringer responses on `/today`.
- Student exit ticket responses on `/today`.
- Saved response loading and editing for the active class item.
- Completion badges for students.
- Teacher/admin daily response completion tables on `/teacher`.
- Light response collection status counts on `/admin`.

Firestore collections:

- `apps/dcc/bellRingerResponses`
- `apps/dcc/exitTicketResponses`

Response document IDs are deterministic in the client:

```text
{classId}_{activeItemId}_{uid}
```

Student workflow:

1. Sign in with an approved Google account.
2. Join or be assigned to a class.
3. Go to `/today`.
4. Submit or edit the bell ringer and exit ticket for the class active item.
5. Refreshing `/today` reloads the saved response and completion status.

Teacher workflow:

1. Sign in as a teacher or admin.
2. Go to `/teacher`.
3. Review assigned class active items.
4. Use Daily Response Completion to see roster counts, completion status, timestamps, and submitted text.

Security notes:

- Students can create and update only their own response docs.
- Students cannot read classmates' responses.
- Students can submit only for the active item in a class where they are on the roster.
- Teachers can read responses only for classes they teach.
- Admins can read response status across DCC.
- Response deletes are closed by default.
- Storage remains closed.

Phase 7 still does not implement assignment uploads, media uploads, grading, quiz attempts, portfolio submissions, or video editor features.

## Phase 7.5 Teacher Student Preview Mode

Phase 7.5 adds a teacher/admin-only Student Preview Mode for testing the student-facing Today workflow for a specific class.

What Student Preview Mode does:

- Lets teachers open an assigned class and view it like a student would.
- Does not require a teacher to have an `@student.doralacademynv.org` account.
- Does not add the teacher to `classes/{classId}.studentIds`.
- Does not add the class to the teacher profile as a student membership.
- Does not impersonate a real student account.
- Shows a clear Teacher Student Preview Mode banner.
- Saves preview bell ringer and exit ticket responses separately in `apps/dcc/teacherPreviewResponses`.

Teacher workflow:

1. Sign in as a teacher or admin.
2. Go to `/teacher`.
3. Find an Assigned Class Card.
4. Click `Open Student Preview`.
5. Review the selected class's active item using the same student-facing layout as `/today`.

Security notes:

- Teachers can preview only classes where their uid is in `classes/{classId}.teacherIds`.
- Admins can preview any DCC class.
- Students cannot access preview pages because the route is teacher/admin protected.
- Preview responses are isolated from `bellRingerResponses` and `exitTicketResponses`.
- Preview responses do not count toward student completion tables.
- Firestore rules protect `teacherPreviewResponses` separately.

Phase 7.5 still does not implement assignment uploads, media uploads, grading, quiz attempts, portfolio submissions, or video editor features.

## Phase 8 Google Drive Link Submissions

Phase 8 adds the first student evidence submission workflow without adding raw uploads, Firebase Storage uploads, grading, quiz attempts, portfolios, video hosting, transcoding, or video editor features.

What Phase 8 adds:

- A reusable submission panel for `/today`, assignment detail pages, media project detail pages, and Broadcast Desk Update detail pages.
- Google Drive, Google Docs, YouTube, and youtu.be evidence link submission.
- Student reflection text and an evidence checklist before submission.
- Saved submission status, teacher feedback display, and resubmission after a revision request.
- Teacher/admin review tables on `/teacher` for assigned class active items.
- Light submission collection status on `/admin`.

Firestore collection:

- `apps/dcc/submissions`

Submission document IDs are deterministic in the client:

```text
{classId}_{targetType}_{targetId}_{uid}
```

Student workflow:

1. Sign in with an approved Google account.
2. Join or be assigned to a class.
3. Open `/today` or a supported detail page.
4. Upload evidence to Google Drive first and set sharing so the teacher can view it.
5. Paste the Drive, Docs, or YouTube link, complete the checklist, write a reflection, and submit.
6. If the teacher marks the submission as needing revision, update the evidence and resubmit.

Teacher workflow:

1. Sign in as a teacher or admin.
2. Go to `/teacher`.
3. Review Google Drive evidence submissions for assigned class active items.
4. Open submitted links, read reflections, leave feedback, mark accepted, or request revision.

Admin workflow:

1. Go to `/admin`.
2. Confirm the submission system is enabled.
3. Review total and recent submission status.

Security notes:

- Students can create and update only their own submission documents.
- Students cannot read classmates' submissions.
- Assigned teachers can read and review submissions only for classes they teach.
- Admins can read and review DCC submissions.
- Submission deletes are closed.
- Firebase Storage remains closed; Phase 8 stores evidence links only.
- Teacher Student Preview Mode shows the submission panel read-only and does not write real submissions.

Phase 8 still does not implement raw assignment uploads, media uploads, portfolio submissions, media hosting, transcoding, or video editor features. The Quiz 1 pilot below adds narrow quiz score collection only, not a full gradebook.

## Quiz 1 Self-Grading Pilot

The Quiz 1 pilot turns published quiz records into a real student workflow on `/today`.

What it adds:

- A student-facing quiz panel for active quiz items.
- Server-side quiz grading through the callable Cloud Function `submitQuizAttempt`.
- Score-only student results after submission.
- A `Grades` tab on `/teacher` showing quiz scores by class roster.
- Private answer keys in `apps/dcc/quizAnswerKeys`, separate from public quiz question records.

Student workflow:

1. Sign in and join or be assigned to a class.
2. The teacher sets the class active item to `quiz / ue-q1-quiz-01`.
3. Go to `/today`.
4. Answer every question and submit once.
5. View the score only; answer keys are not shown.

Teacher workflow:

1. Sign in as a teacher or admin.
2. Go to `/teacher`.
3. Use `Controls` to set the class active item to a published quiz.
4. Open the `Grades` tab to see submitted scores, missing students, and class averages.

Security notes:

- Students cannot write `quizAttempts` directly from the client.
- Students can read only their own score document.
- Teachers can read quiz scores only for classes they teach.
- Admins can read DCC quiz scores.
- Public quiz records must not contain `correctAnswer` or `explanation`.
- Private answer keys are used only by Cloud Functions.

Quiz-only seeding avoids touching live class rosters:

```bash
npm run seed:quizzes -- --dry-run
```

Windows PowerShell real quiz seed:

```powershell
$env:CONFIRM_SEED="true"; npm run seed:quizzes
```

This pilot does not add full gradebook categories, grade exports, retake management, item analysis, portfolio scoring, raw uploads, media uploads, or quiz answer review pages.

## Calendar-Based Lesson Scheduling

The 2026-2027 Doral list-form calendar is used as the source of truth for A/B lesson scheduling data in `curriculum/calendar/`.

For the Q1 Unreal schedule:

- Scheduling starts on August 13, 2026.
- The source calendar does not explicitly mark A/B days, so August 13 is inferred as `A`.
- A/B days alternate across valid instructional weekdays only.
- Saturdays and Sundays are always excluded from instructional scheduling.
- Weekends are not listed in `noSchoolDates` or skipped-date lists.
- Holidays, breaks, staff development days, structured teacher planning days, and other weekday no-school days in the source calendar are skipped and listed as `noSchoolDates`.
- Each Q1 Unreal lesson runs for two instructional class days: one A day and one B day.

For the Q2 Studio Organization + DaVinci Resolve schedule:

- Scheduling starts on October 12, 2026, the first instructional weekday after the Q1 grading period ends on October 9, 2026.
- October 12, 2026 is an inferred `B` day, so Q2 lesson records store A-day and B-day dates separately.
- Q2 now opens with two file organization lessons: Video Production File Organization and Video Game Development File Organization.
- The trimmed DaVinci Resolve sequence starts after those two openers.
- The full nine-lesson Q2 schedule runs through November 6, 2026.
- October 16 and October 30 are skipped as weekday no-school dates.
- The DaVinci portion still contains seven A/B lessons and two draft quiz checkpoints before later group projects.

For the Q3 Unreal Castle Documentary schedule:

- Scheduling starts on January 5, 2027, the first instructional weekday after winter break and the January 4 structured teacher planning day.
- January 5, 2027 is an inferred `B` day, so Q3 lesson records store A-day and B-day dates separately.
- The formal sixteen-lesson Q3 sequence runs through February 22, 2027.
- January 18, February 12, and February 15 are skipped as weekday no-school dates during the formal lesson sequence.
- The Q3 grading period continues through March 11, 2027 for open Unreal production, critique, documentary editing, final polish, and export/submission work.
- Every Q3 instructional day should include Unreal castle project work, camera or screen recording, and a production log update so students can build a documentary about the castle being made.

Generated files:

- `curriculum/calendar/instructional-days.json`
- `curriculum/calendar/q1-unreal-block-calendar.json`
- `curriculum/calendar/q1-unreal-block-calendar.md`
- `curriculum/calendar/q1-unreal-lesson-schedule.json`
- `curriculum/calendar/q1-unreal-lesson-schedule.md`
- `curriculum/calendar/q2-davinci-resolve-block-calendar.json`
- `curriculum/calendar/q2-davinci-resolve-block-calendar.md`
- `curriculum/calendar/q2-davinci-resolve-lesson-schedule.json`
- `curriculum/calendar/q2-davinci-resolve-lesson-schedule.md`
- `curriculum/calendar/q3-unreal-castle-documentary-block-calendar.json`
- `curriculum/calendar/q3-unreal-castle-documentary-block-calendar.md`
- `curriculum/calendar/q3-unreal-castle-documentary-lesson-schedule.json`
- `curriculum/calendar/q3-unreal-castle-documentary-lesson-schedule.md`
- `curriculum/website-data/lessonSchedule.seed.json`
- `curriculum/website-data/blockLessonCalendars.seed.json`

The teacher/admin route `/teacher/schedule` shows Q1 Unreal, Q2 Studio Organization + DaVinci, and Q3 Castle Documentary schedules as Monday-Friday block calendars. Instructional day cells use short labels such as `Q1 L1` as the main heading, with the long lesson title, lesson ID, program area, A/B day, and calendar notes inside the block. No-school weekday cells show `No School` and the reason from the source calendar.

The schedule data is website-ready and can later drive or suggest class `activeItemId` values by date and cycle day. It does not replace the existing `/today` active item workflow.

## Q2 DaVinci Resolve Curriculum

The Q2 Video Production Studio DaVinci Resolve mini-unit lives in `curriculum/pilot-batch/video-production/q2/davinci-resolve/`.

It includes:

- 7 lesson folders with lesson pages, slide briefs, premium presentation briefs, assignment sheets, bell ringer/exit tickets, teacher notes, and `lesson-data.json`.
- 2 Q2 file organization opener lessons:
  - Video Production File Organization in `curriculum/pilot-batch/video-production/q2/file-organization/`.
  - Video Game Development File Organization in `curriculum/pilot-batch/unreal/q2/file-organization/`.
- 2 draft quiz folders with public quiz seed records and private answer-key seed records. The Color page and Fairlight page transcript span, approximately `02:50:00-04:53:05`, is excluded from this plan.
- A/B lesson schedule records in `curriculum/website-data/lessonSchedule.seed.json`.
- Link-based evidence expectations only. Raw uploads, in-browser video editing, portfolio workflows, and group project workflows are not part of this batch.

## Q3 Unreal Castle Documentary Curriculum

The Q3 Unreal Engine Studio sequence is represented in the Firestore seed data and generated calendar files. It focuses on a sustained Unreal castle environment project paired with daily process documentation.

It includes:

- 16 draft-pilot Unreal lesson records in `curriculum/website-data/lessons.seed.json`.
- 16 matching assignment records in `curriculum/website-data/assignments.seed.json`.
- 4 draft quiz checkpoints in `curriculum/website-data/quizzes.seed.json`.
- A/B lesson schedule records in `curriculum/website-data/lessonSchedule.seed.json`.
- A teacher schedule block calendar in `curriculum/website-data/blockLessonCalendars.seed.json`.
- Daily evidence expectations for screen recording, camera footage, behind-the-scenes clips, and production log updates.

Students should treat the Q3 castle build as both a game environment project and a documentary production. As castles move from blockout to materials, lighting, walkthroughs, and final polish, the daily captured evidence becomes the source material for the making-of documentary.

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
- `/teacher/schedule`
- `/teacher/classes/:classId/student-preview`

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
firebase deploy --only hosting,firestore:rules
```

GitHub Pages mirror build:

```bash
npm run build:github-pages
```

The GitHub Pages mirror uses Vite base path `/dcccs/` and React Router basename `/dcccs`.

Use `npm install`, `npm run build`, `npm run lint`, and `npm run validate:curriculum` before deploying. Build functions too when Cloud Functions change. The app builds from local `.env.local` values, but `.env.local` is ignored by git and must never be committed. Deploy Storage rules only in a future phase when Firebase Storage is initialized and upload workflows are designed.

Google Authentication must be enabled in Firebase Console for live sign-in testing. The Firebase Hosting domains should be authorized for Authentication, including `dcc-creative-studio.web.app` and `dcc-creative-studio.firebaseapp.com`; keep `localhost` authorized for local testing.

The first teacher or admin must sign in once, then be manually promoted in Firestore by changing their `apps/dcc/users/{uid}.role` to `teacher` or `admin` and assigning the correct `classIds`.

## Later Phase Preview

Later phases should build raw upload workflows, media submission organization, quiz attempts, grading, and portfolio workflows while preserving the multi-program-area structure.
