# Calendar Scheduling

This folder contains the data source and generated schedule files used to map DCC Creative Studio lessons onto the 2026-2027 Doral school calendar.

## Source Of Truth

The date-list source is `2026-2027 Doral Calendar (List Form).pdf`. The teacher-provided `Doral_Red_Rock_26-27_Block_Calendar_(8_5_x_11_in)_(2).pdf` supplies the explicit A/B labels used by the Q2 and Q3 schedules. Source notes are preserved in `school-calendar.source.md`.

## Generated Files

- `instructional-days.json`: every date from 2026-08-03 through 2027-05-26 with instructional status, source notes, excluded reasons, and schedule cycle days. Q2 and Q3 dates use the explicit block-calendar labels.
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

1. The original Q1 schedule began from the prior inferred cycle anchored on 2026-08-13 as `A`.
2. The teacher-provided block calendar explicitly marks September 24 as a `C` day.
3. Q2 and Q3 use the printed block-calendar labels rather than continuing the earlier inference through that `C` day.
4. January 5, 2027 is `A`; January 6 is `B`.
5. Saturdays, Sundays, and no-school days are never scheduled as A/B class meetings.

## Block Calendar Rules

The website schedule view should render as a Monday-Friday block calendar. Instructional lesson cells use short labels like `Q1 L1`, `Q1 L2`, and `Q1 L3` as the main heading. Q2 project, material, make-up, and assessment cells show their activity title, A/B day, current timing guidance, and archived source timing without exposing private Classroom links.

`noSchoolDates` means actual weekday non-student days from the source calendar only. Saturdays and Sundays are excluded from scheduling but must not appear in `noSchoolDates` or skipped-date lists. No-school weekday cells should say `No School` and include the source reason.

## Q1 Unreal Pairing Rule

Each Q1 Unreal lesson runs across two valid instructional class days: one A day and one B day. `ue-q1-l01` starts on the first valid A/B pair beginning 2026-08-13. `ue-q1-l02` uses the next valid A/B pair, and so on through `ue-q1-l16`.

## Q2 File Organization + DaVinci Resolve Pairing Rule

The Q2 schedule begins Monday, October 12, 2026, which the block calendar labels `A`. The first two Q2 lesson blocks are file-organization openers, followed by seven DaVinci Resolve lessons through November 6. Eight archived Video Production items are then placed from November 9 through December 15 in their prior instructional order. Open dates through December 18 remain available for multi-session filming, editing, critique, recovery, and teacher-selected work.

## Q3 Unreal Castle Documentary Pairing Rule

The Q3 Unreal Castle Documentary schedule begins Tuesday, January 5, 2027, which the block calendar explicitly labels `A`. January 6 is `B`. The formal sixteen-lesson sequence runs through February 22, skips January 18, February 12, and February 15 no-school days, and follows the printed A/B labels.

Every Q3 instructional day should keep the dual focus: students build their Unreal castle project while also recording screen capture, camera footage, production log notes, and behind-the-scenes evidence for a making-of documentary about the castle being created. After the formal sixteen-lesson sequence, the rest of Q3 remains open Unreal production, critique, documentary editing, final polish, and export/submission time through March 11, 2027.

## Known Calendar Notes

- Staff development days, structured teacher planning days, holidays, and breaks are excluded.
- Universal Test Day is listed as Tuesday, TBD and is not assigned to a fixed date yet. When announced, it should be noted, but it does not pause or renumber the A/B cycle unless the teacher explicitly changes that rule.
- October 15, 2026 is listed as no school for ES/MS students only. DCC high school scheduling treats it as instructional unless the teacher changes that later.
- The source calendar's stated summary counts do not exactly match the fixed dates listed in the PDF. Generated schedules follow the fixed date list.

## Q2 DaVinci Trim Note

The Color page and Fairlight page transcript span, approximately `02:50:00-04:53:05`, is excluded from the active Q2 DaVinci Resolve portion and website schedule preview.
