import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const calendarDir = join(root, 'curriculum', 'calendar');
const websiteDataDir = join(root, 'curriculum', 'website-data');
const appSeedDir = join(root, 'src', 'data', 'seed');

const paths = {
  instructionalDays: join(calendarDir, 'instructional-days.json'),
  q1Schedule: join(calendarDir, 'q1-unreal-lesson-schedule.json'),
  q1Block: join(calendarDir, 'q1-unreal-block-calendar.json'),
  q2Schedule: join(calendarDir, 'q2-davinci-resolve-lesson-schedule.json'),
  q2Block: join(calendarDir, 'q2-davinci-resolve-block-calendar.json'),
  q2BlockMarkdown: join(calendarDir, 'q2-davinci-resolve-block-calendar.md'),
  q2ScheduleMarkdown: join(calendarDir, 'q2-davinci-resolve-lesson-schedule.md'),
  q3Schedule: join(calendarDir, 'q3-unreal-castle-documentary-lesson-schedule.json'),
  q3Block: join(calendarDir, 'q3-unreal-castle-documentary-block-calendar.json'),
  q3BlockMarkdown: join(calendarDir, 'q3-unreal-castle-documentary-block-calendar.md'),
  q3ScheduleMarkdown: join(calendarDir, 'q3-unreal-castle-documentary-lesson-schedule.md'),
  lessonScheduleSeed: join(websiteDataDir, 'lessonSchedule.seed.json'),
  blockCalendarsSeed: join(websiteDataDir, 'blockLessonCalendars.seed.json'),
  appBlockCalendarsSeed: join(appSeedDir, 'blockLessonCalendars.seed.json'),
};

const sourceFile = 'Doral_Red_Rock_26-27_Block_Calendar_(8_5_x_11_in)_(2).pdf';
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

const writeJson = (path, value) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
};

const parseDate = (value) => new Date(`${value}T00:00:00Z`);
const formatDate = (date) => date.toISOString().slice(0, 10);
const dayName = (value) => dayNames[parseDate(value).getUTCDay()];

const addDays = (date, amount) => {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + amount);
  return next;
};

const getWeekStart = (date) => addDays(date, -((date.getUTCDay() + 6) % 7));
const getWeekEnd = (date) => addDays(getWeekStart(date), 4);
const getMonthEnd = (year, monthIndex) => new Date(Date.UTC(year, monthIndex + 1, 0));

const makeCycleMap = (aDates, bDates) =>
  new Map([
    ...aDates.map((date) => [date, 'A']),
    ...bDates.map((date) => [date, 'B']),
  ]);

const q2CycleMap = makeCycleMap(
  [
    '2026-10-12',
    '2026-10-14',
    '2026-10-19',
    '2026-10-21',
    '2026-10-23',
    '2026-10-27',
    '2026-10-29',
    '2026-11-03',
    '2026-11-05',
    '2026-11-09',
    '2026-11-12',
    '2026-11-16',
    '2026-11-18',
    '2026-11-20',
    '2026-12-01',
    '2026-12-03',
    '2026-12-07',
    '2026-12-09',
    '2026-12-11',
    '2026-12-15',
    '2026-12-17',
  ],
  [
    '2026-10-13',
    '2026-10-15',
    '2026-10-20',
    '2026-10-22',
    '2026-10-26',
    '2026-10-28',
    '2026-11-02',
    '2026-11-04',
    '2026-11-06',
    '2026-11-10',
    '2026-11-13',
    '2026-11-17',
    '2026-11-19',
    '2026-11-30',
    '2026-12-02',
    '2026-12-04',
    '2026-12-08',
    '2026-12-10',
    '2026-12-14',
    '2026-12-16',
    '2026-12-18',
  ],
);

const q3CycleMap = makeCycleMap(
  [
    '2027-01-05',
    '2027-01-07',
    '2027-01-11',
    '2027-01-13',
    '2027-01-15',
    '2027-01-20',
    '2027-01-22',
    '2027-01-26',
    '2027-01-28',
    '2027-02-01',
    '2027-02-03',
    '2027-02-05',
    '2027-02-09',
    '2027-02-11',
    '2027-02-17',
    '2027-02-19',
  ],
  [
    '2027-01-06',
    '2027-01-08',
    '2027-01-12',
    '2027-01-14',
    '2027-01-19',
    '2027-01-21',
    '2027-01-25',
    '2027-01-27',
    '2027-01-29',
    '2027-02-02',
    '2027-02-04',
    '2027-02-08',
    '2027-02-10',
    '2027-02-16',
    '2027-02-18',
    '2027-02-22',
  ],
);

const q2Activities = [
  {
    id: 'vp-q2-checkpoint-01',
    activityType: 'assignment',
    title: '1st Video Editing Assignment - Launch and Rough Cut',
    aDayDate: '2026-11-09',
    bDayDate: '2026-11-10',
    dueLabel: 'Build the exactly 30-second rough cut by the end of class',
    sourceTiming: 'Edited Nov 12, 2025',
    summary: 'Import and organize the provided media, assemble an exactly 30-second timeline, and complete a rough pacing check before polishing.',
  },
  {
    id: 'vp-q2-checkpoint-02',
    activityType: 'assignment',
    title: '1st Video Editing Assignment - Polish, Render, and Submit',
    aDayDate: '2026-11-12',
    bDayDate: '2026-11-13',
    dueLabel: 'Final MP4 and evidence link due by the end of class',
    sourceTiming: 'Assignment edited Nov 12, 2025; render material posted Nov 14, 2025',
    summary: 'Polish pacing, readable text, and audio balance, then use How to Render in DaVinci to export, verify playback, and submit evidence.',
  },
  {
    id: 'vp-q2-checkpoint-03',
    activityType: 'assignment',
    title: '2nd Video Editing Assignment - The Redo: Revision Plan',
    aDayDate: '2026-11-16',
    bDayDate: '2026-11-17',
    dueLabel: 'Revision plan and rebuilt rough cut due by the end of class',
    sourceTiming: 'Posted Dec 1, 2025',
    summary: 'Review the first edit, identify specific improvements, and rebuild the 30-second sequence with stronger flow, pacing, titles, and storytelling.',
  },
  {
    id: 'vp-q2-checkpoint-04',
    activityType: 'assignment',
    title: '2nd Video Editing Assignment - The Redo: Final Edit and Critique',
    aDayDate: '2026-11-18',
    bDayDate: '2026-11-19',
    dueLabel: 'Improved final export and evidence link due by the end of class',
    sourceTiming: 'Posted Dec 1, 2025',
    summary: 'Finish the improved edit, export and verify the MP4, compare it with the first version, and participate in a focused peer critique.',
  },
  {
    id: 'vp-q2-checkpoint-05',
    activityType: 'assignment',
    title: '1st Group Project: The Duel - Preproduction and Shot Plan',
    aDayDate: '2026-11-20',
    bDayDate: '2026-11-30',
    dueLabel: 'Concept, roles, locations, and 6-10-shot plan due by the end of class',
    sourceTiming: 'Edited Dec 1, 2025',
    summary: 'Assign rotating production roles and plan a safe 20-30 second visual duel with clear story beats, composed shots, music, and sound effects.',
  },
  {
    id: 'vp-q2-checkpoint-06',
    activityType: 'assignment',
    title: '1st Group Project: The Duel - Production',
    aDayDate: '2026-12-01',
    bDayDate: '2026-12-02',
    dueLabel: 'Capture all planned footage and organize the production files',
    sourceTiming: 'Edited Dec 1, 2025',
    summary: 'Film the planned 6-10 shots, rotate responsibilities, monitor continuity and safety, and organize footage for the edit.',
  },
  {
    id: 'vp-q2-checkpoint-07',
    activityType: 'assignment',
    title: '1st Group Project: The Duel - Edit, Screen, and Submit',
    aDayDate: '2026-12-03',
    bDayDate: '2026-12-04',
    dueLabel: 'Final 20-30 second film and evidence link due by the end of class',
    sourceTiming: 'Duel edited Dec 1, 2025; absent work posted Dec 9, 2025',
    summary: 'Edit, sound-design, export, screen, and submit the Duel. Students absent from production complete The Duel Absent Work analysis instead.',
  },
  {
    id: 'vp-q2-checkpoint-08',
    activityType: 'assignment',
    title: 'Group Project 2: The Movie Line Challenge - Preproduction',
    aDayDate: '2026-12-07',
    bDayDate: '2026-12-08',
    dueLabel: 'Interpretation, role rotation, and shot plan due by the end of class',
    sourceTiming: 'Posted Dec 7, 2025',
    summary: 'Interpret the assigned movie line, develop a clear 30-40 second story, assign roles, and create a practical production plan.',
  },
  {
    id: 'vp-q2-checkpoint-09',
    activityType: 'assignment',
    title: 'Group Project 2: The Movie Line Challenge - Production and Edit',
    aDayDate: '2026-12-09',
    bDayDate: '2026-12-10',
    dueLabel: 'Complete principal photography and assemble the rough cut',
    sourceTiming: 'Posted Dec 7, 2025',
    summary: 'Capture the planned footage, rotate production roles, organize media, and assemble a rough cut with intentional composition and pacing.',
  },
  {
    id: 'vp-q2-checkpoint-10',
    activityType: 'assignment',
    title: 'Group Project 2: The Movie Line Challenge - Final Cut and Screening',
    aDayDate: '2026-12-11',
    bDayDate: '2026-12-14',
    dueLabel: 'Final 30-40 second film and evidence link due by the end of class',
    sourceTiming: 'Posted Dec 7, 2025',
    summary: 'Polish the edit with music and sound design, export and verify the final film, screen it for feedback, and submit the evidence link.',
  },
  {
    id: 'vp-q2-checkpoint-11',
    activityType: 'assignment',
    title: 'Group Project 3: The Genre Challenge - Preproduction and Production',
    aDayDate: '2026-12-15',
    bDayDate: '2026-12-16',
    dueLabel: 'Genre plan, role rotation, shot list, and footage due by the end of class',
    sourceTiming: 'Posted Dec 17, 2025',
    summary: 'Choose a clear genre approach, plan a 35-45 second visual story with 6-10 shots, rotate roles, and capture the required footage.',
  },
  {
    id: 'vp-q2-checkpoint-12',
    activityType: 'assignment',
    title: 'Group Project 3: The Genre Challenge - Final Edit, Screening, and Submission',
    aDayDate: '2026-12-17',
    bDayDate: '2026-12-18',
    dueLabel: 'Final 35-45 second genre film and evidence link due by the end of class',
    sourceTiming: 'Posted Dec 17, 2025',
    summary: 'Complete the edit with purposeful pacing, music, and sound effects, screen the film, reflect on the genre choices, and submit evidence.',
  },
];

const instructionalDays = readJson(paths.instructionalDays);
const instructionalDayByDate = new Map(instructionalDays.days.map((day) => [day.date, day]));

for (const cycleMap of [q2CycleMap, q3CycleMap]) {
  for (const [date, cycleDay] of cycleMap) {
    const day = instructionalDayByDate.get(date);
    if (!day || !day.isInstructionalDay) {
      throw new Error(`Explicit block-calendar date ${date} is missing or not instructional`);
    }
    day.cycleDay = cycleDay;
  }
}

instructionalDays.metadata.sourceFile = sourceFile;
instructionalDays.metadata.cycleInference =
  'Q1 began from the original inferred cycle. Teacher-provided block-calendar labels override Q2 and Q3 schedule dates, including January 5, 2027 as an A day.';
instructionalDays.metadata.calendarAnomalies = [
  ...instructionalDays.metadata.calendarAnomalies.filter(
    (note) =>
      !note.includes('ACT testing does not pause or renumber') &&
      !note.includes('The explicit block calendar marks September 24, 2026 as a C day'),
  ),
  'The explicit block calendar marks September 24, 2026 as a C day. Q2 and Q3 use the printed A/B labels rather than continuing the earlier inference through that C day.',
];

const noSchoolDatesBetween = (startDate, endDate) =>
  instructionalDays.days
    .filter(
      (day) =>
        day.date >= startDate &&
        day.date <= endDate &&
        day.isInstructionalDay === false &&
        day.excludedReason !== 'Weekend',
    )
    .map((day) => ({
      date: day.date,
      dayOfWeek: day.dayOfWeek,
      cycleDay: null,
      isInstructionalDay: false,
      calendarNote: day.calendarNote || '',
      sourceNote: day.sourceNote || '',
      excludedReason: day.excludedReason || day.sourceNote || day.calendarNote || 'No school',
    }));

const reconcileSchedule = (path, cycleMap, options = {}) => {
  const schedule = readJson(path);

  for (const lesson of schedule.lessons) {
    const dates = [lesson.aDayDate, lesson.bDayDate];
    const aDayDate = dates.find((date) => cycleMap.get(date) === 'A');
    const bDayDate = dates.find((date) => cycleMap.get(date) === 'B');

    if (!aDayDate || !bDayDate) {
      throw new Error(`Could not reconcile ${lesson.id} with explicit A/B labels`);
    }

    lesson.aDayDate = aDayDate;
    lesson.bDayDate = bDayDate;
    lesson.aDayCycle = 'A';
    lesson.bDayCycle = 'B';
    lesson.aDayCalendarNote = instructionalDayByDate.get(aDayDate)?.calendarNote || '';
    lesson.bDayCalendarNote = instructionalDayByDate.get(bDayDate)?.calendarNote || '';
    lesson.source = 'teacher-provided-block-calendar';
    lesson.notes = (lesson.notes || '')
      .replace(
        'B classes see this first on 2026-10-12; A classes see it on 2026-10-13.',
        'A classes see this first on 2026-10-12; B classes see it on 2026-10-13.',
      )
      .replace('begins on an inferred B day', 'begins on the printed A day');
  }

  schedule.metadata.source = 'teacher-provided-block-calendar';
  schedule.metadata.sourceFile = sourceFile;
  schedule.metadata.cycleInference =
    'Uses the A/B labels printed on the teacher-provided 2026-2027 Doral Red Rock block calendar.';
  schedule.metadata.endDate = options.endDate || schedule.metadata.endDate;
  schedule.metadata.scheduledDateCount = schedule.lessons.length * 2;
  schedule.metadata.lessonCount = schedule.lessons.length;
  schedule.metadata.activityCount = options.activities?.length || 0;
  schedule.metadata.scheduledActivityDateCount = (options.activities?.length || 0) * 2;
  schedule.metadata.noSchoolDateCount = noSchoolDatesBetween(
    schedule.metadata.startDate,
    schedule.metadata.endDate,
  ).length;
  schedule.metadata.calendarAnomalies = [
    ...schedule.metadata.calendarAnomalies.filter(
      (note) =>
        !note.includes('inferred B day') &&
        !note.includes('No explicit A/B labels') &&
        !note.includes('ACT testing does not pause or renumber') &&
        !note.includes('A/B labels were corrected from the teacher-provided block calendar'),
    ),
    schedule.metadata.quarter === 'Q3'
      ? 'A/B labels were corrected from the teacher-provided block calendar; January 5, 2027 is A day.'
      : 'A/B labels were corrected from the teacher-provided block calendar.',
  ];
  schedule.noSchoolDatesDuringSchedule = noSchoolDatesBetween(
    schedule.metadata.startDate,
    schedule.metadata.endDate,
  );

  if (options.activities) {
    schedule.activities = options.activities;
  }

  return schedule;
};

const q2Schedule = reconcileSchedule(paths.q2Schedule, q2CycleMap, {
  endDate: '2026-12-18',
  activities: q2Activities,
});
const q3Schedule = reconcileSchedule(paths.q3Schedule, q3CycleMap);
const q1Schedule = readJson(paths.q1Schedule);

const makeEmptyCell = (date, status, reason, programAreaId) => ({
  date,
  dayOfWeek: dayName(date),
  cycleDay: null,
  status,
  heading: '',
  lessonLabel: '',
  lessonId: '',
  lessonTitle: '',
  programAreaId,
  calendarNote: '',
  sourceNote: '',
  reason,
});

const buildBlockCalendar = ({ schedule, endDate, activities = [], notes }) => {
  const { programAreaId, quarter, startDate } = schedule.metadata;
  const lessonByDate = new Map();

  for (const lesson of schedule.lessons) {
    for (const [date, cycleDay, calendarNote] of [
      [lesson.aDayDate, 'A', lesson.aDayCalendarNote],
      [lesson.bDayDate, 'B', lesson.bDayCalendarNote],
    ]) {
      const sourceDay = instructionalDayByDate.get(date);
      lessonByDate.set(date, {
        date,
        dayOfWeek: sourceDay?.dayOfWeek || dayName(date),
        cycleDay,
        status: 'instructional',
        heading: `${quarter} L${lesson.lessonNumber}`,
        lessonLabel: `${quarter} L${lesson.lessonNumber}`,
        lessonId: lesson.lessonId,
        lessonTitle: lesson.lessonTitle,
        lessonNumber: lesson.lessonNumber,
        programAreaId: lesson.programAreaId,
        calendarNote: calendarNote || sourceDay?.calendarNote || '',
        sourceNote: sourceDay?.sourceNote || '',
        reason: '',
        activeItemType: 'lesson',
      });
    }
  }

  const activityByDate = new Map();
  for (const activity of activities) {
    for (const [date, cycleDay] of [
      [activity.aDayDate, 'A'],
      [activity.bDayDate, 'B'],
    ]) {
      const sourceDay = instructionalDayByDate.get(date);
      activityByDate.set(date, {
        date,
        dayOfWeek: sourceDay?.dayOfWeek || dayName(date),
        cycleDay,
        status: 'activity',
        heading:
          activity.activityType === 'make-up'
            ? 'Make-Up'
            : activity.activityType === 'assessment'
              ? 'Assessment'
              : activity.activityType === 'material'
                ? 'Studio Support'
                : 'Project / Assignment',
        lessonLabel: '',
        lessonId: '',
        lessonTitle: '',
        programAreaId,
        calendarNote: sourceDay?.calendarNote || '',
        sourceNote: 'Archived P1 Gated Gangsters classwork reviewed by teacher request.',
        reason: '',
        activityId: activity.id,
        activityType: activity.activityType,
        activityTitle: activity.title,
        activitySummary: activity.summary,
        dueLabel: activity.dueLabel,
        sourceTiming: activity.sourceTiming,
      });
    }
  }

  const firstMonthDate = new Date(
    Date.UTC(parseDate(startDate).getUTCFullYear(), parseDate(startDate).getUTCMonth(), 1),
  );
  const lastDate = parseDate(endDate);
  const lastMonthDate = new Date(
    Date.UTC(lastDate.getUTCFullYear(), lastDate.getUTCMonth(), 1),
  );
  const blockNoSchoolDates = noSchoolDatesBetween(formatDate(firstMonthDate), endDate).map(
    (day) => ({
      date: day.date,
      dayOfWeek: day.dayOfWeek,
      reason: day.excludedReason,
      calendarNote: day.calendarNote,
      sourceNote: day.sourceNote,
    }),
  );
  const noSchoolByDate = new Map(blockNoSchoolDates.map((day) => [day.date, day]));
  const visibleMonths = [];

  for (
    let cursor = firstMonthDate;
    cursor <= lastMonthDate;
    cursor = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1))
  ) {
    visibleMonths.push({
      year: cursor.getUTCFullYear(),
      monthIndex: cursor.getUTCMonth(),
      month: monthNames[cursor.getUTCMonth()],
    });
  }

  const months = visibleMonths.map(({ year, monthIndex, month }, monthOffset) => {
    const monthStart = new Date(Date.UTC(year, monthIndex, 1));
    const monthEnd = getMonthEnd(year, monthIndex);
    const firstVisibleDate = monthOffset === 0 ? monthStart : monthStart;
    const lastVisibleDate =
      monthOffset === visibleMonths.length - 1 ? parseDate(endDate) : monthEnd;
    const weeks = [];

    for (
      let weekCursor = getWeekStart(firstVisibleDate);
      weekCursor <= getWeekEnd(lastVisibleDate);
      weekCursor = addDays(weekCursor, 7)
    ) {
      const days = [];

      for (let dayOffset = 0; dayOffset < 5; dayOffset += 1) {
        const current = addDays(weekCursor, dayOffset);
        const date = formatDate(current);

        if (current.getUTCMonth() !== monthIndex) {
          days.push(makeEmptyCell(date, 'outside-month', `Outside ${month} ${year}`, programAreaId));
          continue;
        }

        if (lessonByDate.has(date)) {
          days.push(lessonByDate.get(date));
          continue;
        }

        if (activityByDate.has(date)) {
          days.push(activityByDate.get(date));
          continue;
        }

        const noSchoolDay = noSchoolByDate.get(date);
        if (noSchoolDay) {
          days.push({
            date,
            dayOfWeek: noSchoolDay.dayOfWeek,
            cycleDay: null,
            status: 'no-school',
            heading: 'No School',
            lessonLabel: '',
            lessonId: '',
            lessonTitle: '',
            programAreaId,
            calendarNote: noSchoolDay.calendarNote,
            sourceNote: noSchoolDay.sourceNote,
            reason: noSchoolDay.reason,
          });
          continue;
        }

        const reason =
          date < startDate
            ? `Before ${quarter} schedule starts`
            : `${quarter} open studio, project production, critique, or teacher-selected work`;
        days.push(makeEmptyCell(date, 'empty', reason, programAreaId));
      }

      weeks.push({
        weekStart: formatDate(weekCursor),
        weekEnd: formatDate(addDays(weekCursor, 4)),
        days,
      });
    }

    return { month, monthNumber: monthIndex + 1, year, weeks };
  });

  return {
    schoolYear: instructionalDays.metadata.schoolYear,
    programAreaId,
    quarter,
    source: 'teacher-provided-block-calendar',
    sourceFile,
    startDate,
    endDate,
    gradingPeriodEndDate: schedule.metadata.gradingPeriodEndDate,
    weekdays: weekdayNames,
    summary: {
      lessonCount: schedule.lessons.length,
      instructionalDateCount: lessonByDate.size,
      ...(activities.length
        ? { activityCount: activities.length, activityDateCount: activityByDate.size }
        : {}),
      noSchoolDateCount: blockNoSchoolDates.length,
      monthCount: months.length,
    },
    months,
    noSchoolDates: blockNoSchoolDates,
    notes,
  };
};

const q2Block = buildBlockCalendar({
  schedule: q2Schedule,
  endDate: '2026-12-18',
  activities: q2Activities,
  notes: [
    'A/B labels come from the teacher-provided 2026-2027 Doral Red Rock block calendar.',
    'Q2 begins with two file-organization openers and seven DaVinci Resolve lessons.',
    'Seven retained archived Video Production resources are organized into twelve project checkpoints after the DaVinci sequence.',
    'Every remaining Q2 instructional date is assigned to production, editing, critique, make-up support, screening, or submission work.',
    'Weekends are excluded and do not appear in noSchoolDates.',
  ],
});

const q3Block = buildBlockCalendar({
  schedule: q3Schedule,
  endDate: q3Schedule.metadata.endDate,
  notes: [
    'A/B labels come from the teacher-provided 2026-2027 Doral Red Rock block calendar.',
    'January 5, 2027 is A day and January 6, 2027 is B day.',
    'Q3 Unreal combines castle-environment production with making-of documentary evidence.',
    'Weekends are excluded and do not appear in noSchoolDates.',
  ],
});

const formatCell = (day) => {
  if (day.status === 'instructional') {
    return `**${day.lessonLabel}**<br>${day.cycleDay} Day<br>${day.lessonTitle}<br><code>${day.lessonId}</code>`;
  }
  if (day.status === 'activity') {
    return `**${day.heading}**<br>${day.cycleDay} Day<br>${day.activityTitle}<br>${day.dueLabel}<br><small>${day.sourceTiming}</small>`;
  }
  if (day.status === 'no-school') {
    return `**No School**<br>${day.reason}`;
  }
  return `${day.date}<br><em>${day.reason}</em>`;
};

const renderBlockMarkdown = (calendar, title) => {
  const lines = [
    `# ${title}`,
    '',
    `Source: \`${sourceFile}\``,
    '',
    `School year: **${calendar.schoolYear}**`,
    '',
    `Schedule window: **${calendar.startDate}** through **${calendar.endDate}**`,
    '',
    'A/B method: Uses the day labels printed on the teacher-provided Doral Red Rock block calendar.',
    '',
    '## Block Calendar',
    '',
  ];

  for (const month of calendar.months) {
    lines.push(`### ${month.month} ${month.year}`, '');
    lines.push('| Week | Monday | Tuesday | Wednesday | Thursday | Friday |');
    lines.push('| --- | --- | --- | --- | --- | --- |');
    for (const week of month.weeks) {
      lines.push(`| ${week.weekStart} | ${week.days.map(formatCell).join(' | ')} |`);
    }
    lines.push('');
  }

  lines.push('## No-School Weekdays', '', '| Date | Day | Reason |', '| --- | --- | --- |');
  for (const day of calendar.noSchoolDates) {
    lines.push(`| ${day.date} | ${day.dayOfWeek} | ${day.reason} |`);
  }
  lines.push('', '## Calendar Notes', '');
  for (const note of calendar.notes) {
    lines.push(`- ${note}`);
  }
  lines.push('');
  return lines.join('\n').trimEnd();
};

const renderScheduleMarkdown = (schedule, title, activities = []) => {
  const lines = [
    `# ${title}`,
    '',
    `Source: \`${sourceFile}\``,
    '',
    `Start date: **${schedule.metadata.startDate}**`,
    '',
    `End date: **${schedule.metadata.endDate}**`,
    '',
    'A/B method: Uses the day labels printed on the teacher-provided Doral Red Rock block calendar.',
    '',
    '## Lesson Schedule',
    '',
    '| Lesson | Lesson ID | Title | A Day | B Day | Notes |',
    '| --- | --- | --- | --- | --- | --- |',
  ];

  for (const lesson of schedule.lessons) {
    lines.push(
      `| ${lesson.lessonNumber} | \`${lesson.lessonId}\` | ${lesson.lessonTitle} | ${lesson.aDayDate} (A) | ${lesson.bDayDate} (B) | ${lesson.notes || ''} |`,
    );
  }

  if (activities.length) {
    lines.push(
      '',
      '## Archived Video Production Activities',
      '',
      '| Activity | Type | A Day | B Day | Current timing | Archived source timing |',
      '| --- | --- | --- | --- | --- | --- |',
    );
    for (const activity of activities) {
      lines.push(
        `| ${activity.title} | ${activity.activityType} | ${activity.aDayDate} | ${activity.bDayDate} | ${activity.dueLabel} | ${activity.sourceTiming} |`,
      );
    }
  }

  lines.push('', '## No-School Weekdays During This Schedule Window', '');
  lines.push('| Date | Day | Reason |', '| --- | --- | --- |');
  for (const day of schedule.noSchoolDatesDuringSchedule) {
    lines.push(`| ${day.date} | ${day.dayOfWeek} | ${day.excludedReason} |`);
  }
  lines.push('', '## Calendar Notes', '');
  for (const note of schedule.metadata.calendarAnomalies) {
    lines.push(`- ${note}`);
  }
  lines.push('');
  return lines.join('\n').trimEnd();
};

writeJson(paths.instructionalDays, instructionalDays);
writeJson(paths.q2Schedule, q2Schedule);
writeJson(paths.q3Schedule, q3Schedule);
writeJson(paths.q2Block, q2Block);
writeJson(paths.q3Block, q3Block);
writeJson(paths.lessonScheduleSeed, [
  ...q1Schedule.lessons,
  ...q2Schedule.lessons,
  ...q3Schedule.lessons,
]);
writeJson(paths.blockCalendarsSeed, [readJson(paths.q1Block), q2Block, q3Block]);
writeJson(paths.appBlockCalendarsSeed, [readJson(paths.q1Block), q2Block, q3Block]);

writeFileSync(
  paths.q2BlockMarkdown,
  `${renderBlockMarkdown(q2Block, 'Q2 File Organization + DaVinci Resolve + Video Projects Block Calendar')}\n`,
);
writeFileSync(
  paths.q2ScheduleMarkdown,
  `${renderScheduleMarkdown(q2Schedule, 'Q2 File Organization + DaVinci Resolve Lesson Schedule', q2Activities)}\n`,
);
writeFileSync(
  paths.q3BlockMarkdown,
  `${renderBlockMarkdown(q3Block, 'Q3 Unreal Castle Documentary Block Calendar')}\n`,
);
writeFileSync(
  paths.q3ScheduleMarkdown,
  `${renderScheduleMarkdown(q3Schedule, 'Q3 Unreal Castle Documentary Lesson Schedule')}\n`,
);

console.log('Synchronized explicit A/B labels, Q2 archived activities, and schedule mirrors.');
