# Calendar Scheduling

This folder contains the data source and generated schedule files used to map DCC Creative Studio lessons onto the 2026-2027 Doral school calendar.

## Source Of Truth

The source calendar is the attached PDF `2026-2027 Doral Calendar (List Form).pdf`. The normalized source text is preserved in `school-calendar.source.md`.

## Generated Files

- `instructional-days.json`: every date from 2026-08-03 through 2027-05-26 with instructional status, source notes, excluded reasons, and inferred A/B cycle days.
- `q1-unreal-block-calendar.json`: machine-readable Monday-Friday block calendar for the Q1 Unreal schedule.
- `q1-unreal-block-calendar.md`: human-readable block calendar view with lesson labels as calendar cell headings.
- `q1-unreal-lesson-schedule.json`: machine-readable Q1 Unreal lesson schedule with metadata and weekday no-school notes.
- `q1-unreal-lesson-schedule.md`: human-readable Q1 Unreal lesson schedule table.
- `q2-davinci-resolve-block-calendar.json`: machine-readable Monday-Friday block calendar for the Q2 file organization plus trimmed DaVinci Resolve schedule.
- `q2-davinci-resolve-block-calendar.md`: human-readable block calendar view for the Q2 file organization plus DaVinci Resolve schedule.
- `q2-davinci-resolve-lesson-schedule.json`: machine-readable Q2 file organization plus trimmed DaVinci Resolve lesson schedule with metadata and weekday no-school notes.
- `q2-davinci-resolve-lesson-schedule.md`: human-readable Q2 file organization plus DaVinci Resolve lesson schedule table.
- `q3-unreal-castle-documentary-block-calendar.json`: machine-readable Monday-Friday block calendar for the Q3 Unreal castle documentary schedule.
- `q3-unreal-castle-documentary-block-calendar.md`: human-readable block calendar view for the Q3 Unreal castle documentary schedule.
- `q3-unreal-castle-documentary-lesson-schedule.json`: machine-readable Q3 Unreal castle documentary lesson schedule with metadata and weekday no-school notes.
- `q3-unreal-castle-documentary-lesson-schedule.md`: human-readable Q3 Unreal castle documentary lesson schedule table.
- `../website-data/lessonSchedule.seed.json`: website-ready seed data for future Firestore import.
- `../website-data/blockLessonCalendars.seed.json`: website-ready block calendar seed used by the teacher/admin schedule preview.

## A/B Rules

The source calendar does not explicitly mark A/B days. For this schedule, A/B days are inferred as follows:

1. Q1 Unreal scheduling starts on 2026-08-13.
2. 2026-08-13 is `A`.
3. The next valid instructional day is `B`.
4. The sequence alternates across valid instructional weekdays only.
5. Saturdays, Sundays, and no-school days never count in the A/B sequence.

## Block Calendar Rules

The website schedule view should render as a Monday-Friday block calendar. Instructional day cells use short lesson labels like `Q1 L1`, `Q1 L2`, and `Q1 L3` as the main heading. The long lesson title, lesson ID, program area, A/B day, and calendar notes appear below that heading.

`noSchoolDates` means actual weekday non-student days from the source calendar only. Saturdays and Sundays are excluded from scheduling but must not appear in `noSchoolDates` or skipped-date lists. No-school weekday cells should say `No School` and include the source reason.

## Q1 Unreal Pairing Rule

Each Q1 Unreal lesson runs across two valid instructional class days: one A day and one B day. `ue-q1-l01` starts on the first valid A/B pair beginning 2026-08-13. `ue-q1-l02` uses the next valid A/B pair, and so on through `ue-q1-l16`.

## Q2 File Organization + DaVinci Resolve Pairing Rule

The Q2 schedule begins on Monday, October 12, 2026, the first instructional weekday after the Q1 grading period ends on Friday, October 9, 2026. That date is an inferred `B` day, so each lesson stores its A-day and B-day dates separately. The first two Q2 lesson blocks are file organization openers, and the DaVinci Resolve sequence starts after those openers. The nine-lesson sequence runs through Friday, November 6, 2026, skips October 16 and October 30 no-school days, and continues the existing A/B cycle without resetting it.

## Q3 Unreal Castle Documentary Pairing Rule

The Q3 Unreal Castle Documentary schedule begins on Tuesday, January 5, 2027, the first instructional weekday after winter break and the January 4 structured teacher planning day. That date is an inferred `B` day, so each lesson stores its A-day and B-day dates separately. The formal sixteen-lesson sequence runs through Monday, February 22, 2027, skips January 18, February 12, and February 15 no-school days, and continues the existing A/B cycle without resetting it.

Every Q3 instructional day should keep the dual focus: students build their Unreal castle project while also recording screen capture, camera footage, production log notes, and behind-the-scenes evidence for a making-of documentary about the castle being created. After the formal sixteen-lesson sequence, the rest of Q3 remains open Unreal production, critique, documentary editing, final polish, and export/submission time through March 11, 2027.

## Known Calendar Notes

- Staff development days, structured teacher planning days, holidays, and breaks are excluded.
- Universal Test Day is listed as Tuesday, TBD and is not assigned to a fixed date yet. When announced, it should be noted, but it does not pause or renumber the A/B cycle unless the teacher explicitly changes that rule.
- October 15, 2026 is listed as no school for ES/MS students only. DCC high school scheduling treats it as instructional unless the teacher changes that later.
- The source calendar's stated summary counts do not exactly match the fixed dates listed in the PDF. Generated schedules follow the fixed date list.

## Q2 DaVinci Trim Note

The Color page and Fairlight page transcript span, approximately `02:50:00-04:53:05`, is excluded from the active Q2 DaVinci Resolve portion and website schedule preview.
