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

// Keep the existing instructional-day labels authoritative when extending dates.
const instructionalDays = readJson(paths.instructionalDays);
const instructionalDayByDate = new Map(instructionalDays.days.map((day) => [day.date, day]));
const q2Source = readJson(paths.q2Schedule);
const q3Source = readJson(paths.q3Schedule);
const cycleMapBetween = (start, end) =>
  new Map(
    instructionalDays.days
      .filter(
        (day) =>
          day.isInstructionalDay &&
          ['A', 'B'].includes(day.cycleDay) &&
          day.date >= start &&
          day.date <= end,
      )
      .map((day) => [day.date, day.cycleDay]),
  );
const q2CycleMap = cycleMapBetween(q2Source.metadata.startDate, q2Source.metadata.endDate);
const q3CycleMap = cycleMapBetween(q3Source.metadata.startDate, q3Source.metadata.endDate);
const q2Activities = q2Source.activities ?? [];

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
  'The inferred Q1 cycle remains anchored on 2026-08-13 as A through September 23. The teacher-confirmed C day on September 24 and B day on September 25 shift the remaining Q1 labels. Teacher-provided block-calendar labels govern Q2 and Q3, including January 5, 2027 as an A day.';
instructionalDays.metadata.calendarAnomalies = [
  ...instructionalDays.metadata.calendarAnomalies.filter(
    (note) =>
      !note.includes('ACT testing does not pause or renumber') &&
      !note.includes('The explicit block calendar marks September 24, 2026 as a C day') &&
      !note.includes('September 24, 2026 is a teacher-confirmed C day'),
  ),
  'September 24, 2026 is a teacher-confirmed C day, September 25 is a B day, and the remaining Q1 A/B labels shift accordingly before Q2 begins from the printed block calendar.',
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

  if (options.startDate) {
    schedule.metadata.startDate = options.startDate;
    for (const cycle of ['A', 'B']) {
      const dates = [...cycleMap]
        .filter(([date, day]) => day === cycle && date >= options.startDate)
        .map(([date]) => date)
        .sort();
      schedule.lessons.forEach((lesson, index) => {
        lesson[cycle === 'A' ? 'aDayDate' : 'bDayDate'] = dates[index];
      });
    }
  }

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
        /[AB] classes see this first on 2026-10-12; [AB] classes see it on 2026-10-13\./,
        'A classes see this first on 2026-10-06; B classes see it on 2026-10-07. The teacher moved the Video Production start ahead of the grading-period boundary.',
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
  if (options.adjustmentNote) {
    const adjustmentNote = options.adjustmentNote;
    schedule.metadata.calendarAnomalies = [
      ...schedule.metadata.calendarAnomalies.filter(
        (note) => !note.startsWith('Teacher direction on October 2, 2026'),
      ),
      adjustmentNote,
    ];
  }
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
  startDate: q2Source.metadata.startDate,
  endDate: q2Source.metadata.endDate,
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
        sourceNote:
          activity.sourceTiming === 'October 2, 2026 schedule adjustment'
            ? 'Studio practice time gained by the teacher-directed October 6 Video Production start.'
            : 'Archived P1 Gated Gangsters classwork reviewed by teacher request.',
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
  const lastMonthDate = new Date(Date.UTC(lastDate.getUTCFullYear(), lastDate.getUTCMonth(), 1));
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
    const firstVisibleDate = monthOffset === 0 ? parseDate(startDate) : monthStart;
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
          days.push(
            makeEmptyCell(date, 'outside-month', `Outside ${month} ${year}`, programAreaId),
          );
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
  endDate: q2Schedule.metadata.endDate,
  activities: q2Activities,
  notes: [
    'A/B labels come from the teacher-provided 2026-2027 Doral Red Rock block calendar.',
    'Q2 begins with two file-organization openers and eleven DaVinci Resolve lessons including Cut and Fusion.',
    'Teacher direction on October 2 moves the Video Production opener to October 6 (A) and October 7 (B), ahead of the October 9 Q1 grading-period boundary. DaVinci Resolve begins October 12 (A) and October 13 (B).',
    'Teacher direction on October 6 extends the unit: final export November 12/13, support November 16-19, and twelve later project checkpoints November 20-January 14.',
    'Seven retained archived Video Production resources are organized into twelve project checkpoints after the DaVinci sequence.',
    'All 54 instructional dates from October 6 through January 14 are assigned. Stable Q2 unit labels extend into January; the next Unreal sequence moves to prevent overlap.',
    'Weekends are excluded and do not appear in noSchoolDates.',
  ],
});

const q3Block = buildBlockCalendar({
  schedule: q3Schedule,
  endDate: q3Schedule.metadata.endDate,
  notes: [
    'A/B labels come from the teacher-provided 2026-2027 Doral Red Rock block calendar.',
    'The shifted Unreal sequence begins January 15 (A) / January 19 (B) and ends March 4. Existing instructional-day labels are retained, including B-first pairs after February 22.',
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
      '## Video Production Activities and Studio Support',
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
