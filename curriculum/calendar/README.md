# Calendar Scheduling

This folder contains the data source and generated schedule files used to map DCC Creative Studio lessons onto the 2026-2027 Doral school calendar.

## Source Of Truth

The source calendar is the attached PDF `2026-2027 Doral Calendar (List Form).pdf`. The normalized source text is preserved in `school-calendar.source.md`.

## Generated Files

- `instructional-days.json`: every date from 2026-08-03 through 2027-05-26 with instructional status, source notes, excluded reasons, and inferred A/B cycle days.
- `q1-unreal-lesson-schedule.json`: machine-readable Q1 Unreal lesson schedule with metadata and skipped-date notes.
- `q1-unreal-lesson-schedule.md`: human-readable Q1 Unreal lesson schedule table.
- `../website-data/lessonSchedule.seed.json`: website-ready seed data for future Firestore import.

## A/B Rules

The source calendar does not explicitly mark A/B days. For this schedule, A/B days are inferred as follows:

1. Q1 Unreal scheduling starts on 2026-08-13.
2. 2026-08-13 is `A`.
3. The next valid instructional day is `B`.
4. The sequence alternates across valid instructional weekdays only.
5. Saturdays, Sundays, and no-school days never count in the A/B sequence.

## Q1 Unreal Pairing Rule

Each Q1 Unreal lesson runs across two valid instructional class days: one A day and one B day. `ue-q1-l01` starts on the first valid A/B pair beginning 2026-08-13. `ue-q1-l02` uses the next valid A/B pair, and so on through `ue-q1-l16`.

## Known Calendar Notes

- Staff development days, structured teacher planning days, holidays, and breaks are excluded.
- Universal Test Day is listed as Tuesday, TBD and is not assigned to a fixed date yet. When announced, it should be noted, but it does not pause or renumber the A/B cycle unless the teacher explicitly changes that rule.
- October 15, 2026 is listed as no school for ES/MS students only. DCC high school scheduling treats it as instructional unless the teacher changes that later.
- The source calendar's stated summary counts do not exactly match the fixed dates listed in the PDF. Generated schedules follow the fixed date list.
