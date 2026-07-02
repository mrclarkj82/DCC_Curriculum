import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const calendarDir = join(root, 'curriculum', 'calendar');
const websiteDataDir = join(root, 'curriculum', 'website-data');
const appSeedDir = join(root, 'src', 'data', 'seed');

const schedulePath = join(calendarDir, 'q1-unreal-lesson-schedule.json');
const instructionalDaysPath = join(calendarDir, 'instructional-days.json');
const blockCalendarPath = join(calendarDir, 'q1-unreal-block-calendar.json');
const blockCalendarMarkdownPath = join(calendarDir, 'q1-unreal-block-calendar.md');
const lessonScheduleMarkdownPath = join(calendarDir, 'q1-unreal-lesson-schedule.md');
const websiteBlockSeedPath = join(websiteDataDir, 'blockLessonCalendar.seed.json');
const appBlockSeedPath = join(appSeedDir, 'blockLessonCalendar.seed.json');

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

const writeJson = (path, data) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
};

const parseDate = (value) => new Date(`${value}T00:00:00Z`);

const formatDate = (date) => date.toISOString().slice(0, 10);

const addDays = (date, days) => {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
};

const compareDate = (a, b) => a.localeCompare(b);

const getWeekStart = (date) => addDays(date, -((date.getUTCDay() + 6) % 7));

const getWeekEnd = (date) => addDays(getWeekStart(date), 4);

const getMonthEnd = (year, monthIndex) => new Date(Date.UTC(year, monthIndex + 1, 0));

const isWeekendDate = (date) => {
  const day = date.getUTCDay();
  return day === 0 || day === 6;
};

const dayNameForDate = (value) => dayNames[parseDate(value).getUTCDay()];

const makeLessonLabel = (lesson) => `${lesson.quarter} L${lesson.lessonNumber}`;

const makeEmptyCell = (date, status, reason, programAreaId) => ({
  date,
  dayOfWeek: dayNameForDate(date),
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

const schedule = readJson(schedulePath);
const instructionalDays = readJson(instructionalDaysPath);
const instructionalDayByDate = new Map(instructionalDays.days.map((day) => [day.date, day]));
const firstLesson = schedule.lessons[0];
const lastLesson = schedule.lessons[schedule.lessons.length - 1];
const startDate = firstLesson.aDayDate;
const endDate = lastLesson.bDayDate;
const programAreaId = schedule.metadata.programAreaId;
const quarter = schedule.metadata.quarter;

const lessonByDate = new Map();

for (const lesson of schedule.lessons) {
  for (const slot of [
    { date: lesson.aDayDate, cycleDay: lesson.aDayCycle, calendarNote: lesson.aDayCalendarNote },
    { date: lesson.bDayDate, cycleDay: lesson.bDayCycle, calendarNote: lesson.bDayCalendarNote },
  ]) {
    const day = instructionalDayByDate.get(slot.date);
    lessonByDate.set(slot.date, {
      date: slot.date,
      dayOfWeek: day?.dayOfWeek ?? dayNameForDate(slot.date),
      cycleDay: slot.cycleDay,
      status: 'instructional',
      heading: makeLessonLabel(lesson),
      lessonLabel: makeLessonLabel(lesson),
      lessonId: lesson.lessonId,
      lessonTitle: lesson.lessonTitle,
      lessonNumber: lesson.lessonNumber,
      programAreaId: lesson.programAreaId,
      calendarNote: slot.calendarNote || day?.calendarNote || '',
      sourceNote: day?.sourceNote ?? '',
      reason: '',
      activeItemType: lesson.activeItemType,
    });
  }
}

const noSchoolDates = instructionalDays.days
  .filter((day) => {
    const date = parseDate(day.date);
    return (
      compareDate(day.date, startDate) >= 0 &&
      compareDate(day.date, endDate) <= 0 &&
      !isWeekendDate(date) &&
      day.isInstructionalDay === false
    );
  })
  .map((day) => ({
    date: day.date,
    dayOfWeek: day.dayOfWeek,
    reason: day.excludedReason || day.sourceNote || day.calendarNote || 'No school',
    calendarNote: day.calendarNote || '',
    sourceNote: day.sourceNote || '',
  }));

const noSchoolByDate = new Map(noSchoolDates.map((day) => [day.date, day]));

const visibleMonths = [];
let monthCursor = new Date(Date.UTC(parseDate(startDate).getUTCFullYear(), parseDate(startDate).getUTCMonth(), 1));
const endMonth = new Date(Date.UTC(parseDate(endDate).getUTCFullYear(), parseDate(endDate).getUTCMonth(), 1));

while (monthCursor <= endMonth) {
  visibleMonths.push({
    monthIndex: monthCursor.getUTCMonth(),
    month: monthNames[monthCursor.getUTCMonth()],
    year: monthCursor.getUTCFullYear(),
  });
  monthCursor = new Date(Date.UTC(monthCursor.getUTCFullYear(), monthCursor.getUTCMonth() + 1, 1));
}

const months = visibleMonths.map(({ monthIndex, month, year }, monthOffset) => {
  const monthStart = new Date(Date.UTC(year, monthIndex, 1));
  const monthEnd = getMonthEnd(year, monthIndex);
  const firstVisibleDate = monthOffset === 0 ? parseDate(startDate) : monthStart;
  const lastVisibleDate = monthOffset === visibleMonths.length - 1 ? parseDate(endDate) : monthEnd;
  const firstWeekStart = getWeekStart(firstVisibleDate);
  const lastWeekEnd = getWeekEnd(lastVisibleDate);
  const weeks = [];

  for (let weekCursor = firstWeekStart; weekCursor <= lastWeekEnd; weekCursor = addDays(weekCursor, 7)) {
    const days = [];

    for (let dayOffset = 0; dayOffset < 5; dayOffset += 1) {
      const current = addDays(weekCursor, dayOffset);
      const date = formatDate(current);

      if (current.getUTCMonth() !== monthIndex) {
        days.push(makeEmptyCell(date, 'outside-month', `Outside ${month} ${year}`, programAreaId));
        continue;
      }

      const lessonDay = lessonByDate.get(date);
      if (lessonDay) {
        days.push(lessonDay);
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
        compareDate(date, startDate) < 0
          ? 'Before Q1 Unreal schedule starts'
          : 'No Q1 Unreal lesson scheduled';
      days.push(makeEmptyCell(date, 'empty', reason, programAreaId));
    }

    weeks.push({
      weekStart: formatDate(weekCursor),
      weekEnd: formatDate(addDays(weekCursor, 4)),
      days,
    });
  }

  return {
    month,
    monthNumber: monthIndex + 1,
    year,
    weeks,
  };
});

const blockCalendar = {
  schoolYear: instructionalDays.metadata.schoolYear,
  programAreaId,
  quarter,
  source: schedule.metadata.source,
  sourceFile: schedule.metadata.sourceFile,
  startDate,
  endDate,
  weekdays: weekdayNames,
  summary: {
    lessonCount: schedule.lessons.length,
    instructionalDateCount: lessonByDate.size,
    noSchoolDateCount: noSchoolDates.length,
    monthCount: months.length,
  },
  months,
  noSchoolDates,
  notes: [
    ...schedule.metadata.calendarAnomalies,
    'Weekends are excluded from instructional scheduling but are not listed as no-school dates.',
    'No-school dates list actual weekday non-student days only.',
  ],
};

const updatedSchedule = {
  ...schedule,
  metadata: {
    ...schedule.metadata,
    noSchoolDateCount: noSchoolDates.length,
    weekendHandling:
      'Weekends are excluded from instructional scheduling and are not listed in noSchoolDatesDuringSchedule.',
  },
  noSchoolDatesDuringSchedule: noSchoolDates.map((day) => ({
    date: day.date,
    dayOfWeek: day.dayOfWeek,
    cycleDay: null,
    isInstructionalDay: false,
    calendarNote: day.calendarNote,
    sourceNote: day.sourceNote,
    excludedReason: day.reason,
  })),
};

delete updatedSchedule.skippedDatesDuringSchedule;

const formatMarkdownCell = (day) => {
  if (day.status === 'instructional') {
    return `**${day.lessonLabel}**<br>${day.cycleDay} Day<br>${day.lessonTitle}<br><code>${day.lessonId}</code>`;
  }

  if (day.status === 'no-school') {
    return `**No School**<br>${day.reason}`;
  }

  return `${day.date}<br><em>${day.reason}</em>`;
};

const markdownLines = [
  '# Q1 Unreal Block Calendar',
  '',
  'Source: `2026-2027 Doral Calendar (List Form).pdf`',
  '',
  `School year: **${blockCalendar.schoolYear}**`,
  '',
  `Schedule window: **${startDate}** through **${endDate}**`,
  '',
  'A/B method: The source calendar does not explicitly mark A/B days, so cycle days are inferred. Thursday, August 13, 2026 is `A`; the next valid instructional day is `B`; the sequence alternates across valid instructional weekdays only. Weekends and actual weekday no-school dates are excluded from scheduling.',
  '',
  'Weekends are not listed in `noSchoolDates`; that list is only for weekday non-student days from the school calendar.',
  '',
  '## Block Calendar',
  '',
];

const lessonScheduleMarkdownLines = [
  '# Q1 Unreal A/B Lesson Schedule',
  '',
  'Source: `2026-2027 Doral Calendar (List Form).pdf`',
  '',
  `Start date: **${startDate}**`,
  '',
  'A/B method: The source calendar does not explicitly mark A/B days, so cycle days are inferred. Thursday, August 13, 2026 is `A`; the next valid instructional day is `B`; the sequence alternates across valid instructional weekdays only. Weekends are excluded from instructional scheduling, and actual weekday no-school dates are skipped.',
  '',
  'Weekends are not listed as skipped dates. The no-school list below contains only actual weekday non-student days from the school calendar.',
  '',
  '## Lesson Schedule',
  '',
  '| Lesson | Lesson ID | Title | A Day | B Day | Notes |',
  '| --- | --- | --- | --- | --- | --- |',
];

for (const lesson of schedule.lessons) {
  lessonScheduleMarkdownLines.push(
    `| ${lesson.lessonNumber} | \`${lesson.lessonId}\` | ${lesson.lessonTitle} | ${lesson.aDayDate} (${lesson.aDayCycle}) | ${lesson.bDayDate} (${lesson.bDayCycle}) | ${lesson.notes || ''} |`,
  );
}

lessonScheduleMarkdownLines.push(
  '',
  '## No-School Weekdays During This Q1 Schedule Window',
  '',
  '| Date | Day | Reason | Source Note |',
  '| --- | --- | --- | --- |',
);

for (const day of noSchoolDates) {
  lessonScheduleMarkdownLines.push(
    `| ${day.date} | ${day.dayOfWeek} | ${day.reason} | ${day.sourceNote || day.calendarNote || ''} |`,
  );
}

lessonScheduleMarkdownLines.push('', '## Calendar Anomalies / Notes', '');

for (const note of blockCalendar.notes) {
  lessonScheduleMarkdownLines.push(`- ${note}`);
}

lessonScheduleMarkdownLines.push('');

for (const month of blockCalendar.months) {
  markdownLines.push(`### ${month.month} ${month.year}`, '');
  markdownLines.push('| Week | Monday | Tuesday | Wednesday | Thursday | Friday |');
  markdownLines.push('| --- | --- | --- | --- | --- | --- |');

  for (const week of month.weeks) {
    markdownLines.push(
      `| ${week.weekStart} | ${week.days.map((day) => formatMarkdownCell(day)).join(' | ')} |`,
    );
  }

  markdownLines.push('');
}

markdownLines.push('## No-School Weekdays During This Q1 Schedule Window', '');
markdownLines.push('| Date | Day | Reason | Source Note |');
markdownLines.push('| --- | --- | --- | --- |');

for (const day of noSchoolDates) {
  markdownLines.push(
    `| ${day.date} | ${day.dayOfWeek} | ${day.reason} | ${day.sourceNote || day.calendarNote || ''} |`,
  );
}

markdownLines.push('', '## Calendar Anomalies / Notes', '');

for (const note of blockCalendar.notes) {
  markdownLines.push(`- ${note}`);
}

markdownLines.push('');

writeJson(blockCalendarPath, blockCalendar);
writeJson(websiteBlockSeedPath, blockCalendar);
writeJson(appBlockSeedPath, blockCalendar);
writeJson(schedulePath, updatedSchedule);
writeFileSync(blockCalendarMarkdownPath, `${markdownLines.join('\n')}`);
writeFileSync(lessonScheduleMarkdownPath, `${lessonScheduleMarkdownLines.join('\n')}`);

console.log(`Wrote ${blockCalendarPath}`);
console.log(`Wrote ${blockCalendarMarkdownPath}`);
console.log(`Wrote ${lessonScheduleMarkdownPath}`);
console.log(`Wrote ${websiteBlockSeedPath}`);
console.log(`Wrote ${appBlockSeedPath}`);
console.log(`Updated ${schedulePath}`);
