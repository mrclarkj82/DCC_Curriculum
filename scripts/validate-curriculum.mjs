import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dataDir = join(root, 'curriculum', 'website-data');
const calendarDir = join(root, 'curriculum', 'calendar');
const appSeedDir = join(root, 'src', 'data', 'seed');

const readJson = (fileName) => JSON.parse(readFileSync(join(dataDir, fileName), 'utf8'));
const readCalendarJson = (fileName) =>
  JSON.parse(readFileSync(join(calendarDir, fileName), 'utf8'));
const readAppSeedJson = (fileName) => JSON.parse(readFileSync(join(appSeedDir, fileName), 'utf8'));

const programAreas = readJson('programAreas.seed.json');
const lessons = readJson('lessons.seed.json');
const assignments = readJson('assignments.seed.json');
const quizzes = readJson('quizzes.seed.json');
const quizAnswerKeys = readJson('quizAnswerKeys.seed.json');
const mediaProjects = readJson('mediaProjects.seed.json');
const broadcastUpdates = readJson('broadcastUpdates.seed.json');
const classes = readJson('classes.seed.json');
const lessonSchedule = readJson('lessonSchedule.seed.json');
const blockLessonCalendar = readJson('blockLessonCalendar.seed.json');
const appBlockLessonCalendar = readAppSeedJson('blockLessonCalendar.seed.json');
const instructionalDays = readCalendarJson('instructional-days.json');
const q1UnrealCalendarSchedule = readCalendarJson('q1-unreal-lesson-schedule.json');
const q1UnrealBlockCalendar = readCalendarJson('q1-unreal-block-calendar.json');
const q2DaVinciCalendarSchedule = readCalendarJson('q2-davinci-resolve-lesson-schedule.json');
const q2DaVinciBlockCalendar = readCalendarJson('q2-davinci-resolve-block-calendar.json');

const programAreaIds = new Set(programAreas.map((area) => area.id));
const lessonIds = new Set(lessons.map((lesson) => lesson.id));
const assignmentIds = new Set(assignments.map((assignment) => assignment.id));
const quizIds = new Set(quizzes.map((quiz) => quiz.id));
const mediaProjectIds = new Set(mediaProjects.map((project) => project.id));
const broadcastUpdateIds = new Set(broadcastUpdates.map((update) => update.id));
const activeItemTypes = new Set([
  'lesson',
  'assignment',
  'mediaProject',
  'broadcastUpdate',
  'quiz',
  'portfolioCheckpoint',
]);
const instructionalDayByDate = new Map(
  instructionalDays.days.map((instructionalDay) => [instructionalDay.date, instructionalDay]),
);

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const assertUniqueIds = (label, records) => {
  const ids = records.map((record) => record.id);
  assert(new Set(ids).size === ids.length, `${label} contains duplicate IDs`);
};

const assertProgramAreaIds = (label, records) => {
  for (const record of records) {
    assert(record.programAreaId, `${label}/${record.id} is missing programAreaId`);
    assert(
      programAreaIds.has(record.programAreaId),
      `${label}/${record.id} uses unknown programAreaId ${record.programAreaId}`,
    );
  }
};

const parseDate = (value) => {
  const parsed = new Date(`${value}T00:00:00Z`);
  assert(!Number.isNaN(parsed.getTime()), `Invalid date ${value}`);
  return parsed;
};

const isWeekend = (value) => {
  const day = parseDate(value).getUTCDay();
  return day === 0 || day === 6;
};

const weekdayNames = new Set(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

const isSameJson = (left, right) => JSON.stringify(left) === JSON.stringify(right);

const warnings = [];

assertUniqueIds('programAreas', programAreas);
assertUniqueIds('lessons', lessons);
assertUniqueIds('assignments', assignments);
assertUniqueIds('quizzes', quizzes);
assertUniqueIds('quizAnswerKeys', quizAnswerKeys);
assertUniqueIds('mediaProjects', mediaProjects);
assertUniqueIds('broadcastUpdates', broadcastUpdates);
assertUniqueIds('classes', classes);
assertUniqueIds('lessonSchedule', lessonSchedule);

assertProgramAreaIds('lessons', lessons);
assertProgramAreaIds('assignments', assignments);
assertProgramAreaIds('quizzes', quizzes);
assertProgramAreaIds('mediaProjects', mediaProjects);
assertProgramAreaIds('broadcastUpdates', broadcastUpdates);

for (const classRecord of classes) {
  assert(
    programAreaIds.has(classRecord.activeProgramAreaId),
    `Class ${classRecord.id} uses unknown activeProgramAreaId ${classRecord.activeProgramAreaId}`,
  );
  assert(
    activeItemTypes.has(classRecord.activeItemType),
    `Class ${classRecord.id} uses unsupported activeItemType ${classRecord.activeItemType}`,
  );
  assert(classRecord.activeItemId, `Class ${classRecord.id} is missing activeItemId`);
  assert(Array.isArray(classRecord.teacherIds), `Class ${classRecord.id} teacherIds must be an array`);
  assert(Array.isArray(classRecord.studentIds), `Class ${classRecord.id} studentIds must be an array`);

  if (classRecord.activeItemType === 'lesson') {
    assert(
      lessonIds.has(classRecord.activeItemId),
      `Class ${classRecord.id} references missing lesson ${classRecord.activeItemId}`,
    );
  }

  if (classRecord.activeItemType === 'assignment') {
    assert(
      assignmentIds.has(classRecord.activeItemId),
      `Class ${classRecord.id} references missing assignment ${classRecord.activeItemId}`,
    );
  }

  if (classRecord.activeItemType === 'mediaProject') {
    assert(
      mediaProjectIds.has(classRecord.activeItemId),
      `Class ${classRecord.id} references missing media project ${classRecord.activeItemId}`,
    );
  }

  if (classRecord.activeItemType === 'broadcastUpdate') {
    assert(
      broadcastUpdateIds.has(classRecord.activeItemId),
      `Class ${classRecord.id} references missing broadcast update ${classRecord.activeItemId}`,
    );
  }

  if (classRecord.activeItemType === 'quiz') {
    assert(
      quizIds.has(classRecord.activeItemId),
      `Class ${classRecord.id} references missing quiz ${classRecord.activeItemId}`,
    );
  }

  if (classRecord.activeItemType === 'portfolioCheckpoint') {
    warnings.push(
      `Class ${classRecord.id} uses portfolioCheckpoint ${classRecord.activeItemId}; placeholder validation only.`,
    );
  }
}

for (const assignment of assignments.filter((item) => item.programAreaId === 'unreal-engine')) {
  assert(
    lessonIds.has(assignment.lessonId),
    `Assignment ${assignment.id} references missing lesson ${assignment.lessonId}`,
  );
}

assert(
  Array.isArray(instructionalDays.days),
  'instructional-days.json must include a days array',
);

for (const instructionalDay of instructionalDays.days) {
  assert(instructionalDay.date, 'Instructional day record is missing date');
  assert(
    !isWeekend(instructionalDay.date) || instructionalDay.isInstructionalDay === false,
    `Weekend ${instructionalDay.date} must not be instructional`,
  );
}

const q1UnrealSchedule = lessonSchedule.filter(
  (item) => item.programAreaId === 'unreal-engine' && item.quarter === 'Q1',
);
const q1UnrealLessonNumbers = new Set(q1UnrealSchedule.map((item) => item.lessonNumber));
const q1UnrealScheduleByLessonId = new Map(
  q1UnrealSchedule.map((item) => [item.lessonId, item]),
);
const q2DaVinciSchedule = lessonSchedule.filter(
  (item) => item.programAreaId === 'video-production' && item.quarter === 'Q2',
);
const q2DaVinciLessonNumbers = new Set(q2DaVinciSchedule.map((item) => item.lessonNumber));
const q2DaVinciScheduleByLessonId = new Map(
  q2DaVinciSchedule.map((item) => [item.lessonId, item]),
);

for (let lessonNumber = 1; lessonNumber <= 16; lessonNumber += 1) {
  assert(
    q1UnrealLessonNumbers.has(lessonNumber),
    `Q1 Unreal lesson schedule is missing lesson ${lessonNumber}`,
  );
}

for (let lessonNumber = 1; lessonNumber <= 9; lessonNumber += 1) {
  assert(
    q2DaVinciLessonNumbers.has(lessonNumber),
    `Q2 DaVinci Resolve lesson schedule is missing lesson ${lessonNumber}`,
  );
}

for (const scheduleItem of lessonSchedule) {
  assert(
    programAreaIds.has(scheduleItem.programAreaId),
    `Lesson schedule ${scheduleItem.id} uses unknown programAreaId ${scheduleItem.programAreaId}`,
  );
  assert(
    scheduleItem.activeItemType === 'lesson',
    `Lesson schedule ${scheduleItem.id} must use activeItemType lesson`,
  );
  assert(
    lessonIds.has(scheduleItem.lessonId),
    `Lesson schedule ${scheduleItem.id} references missing lesson ${scheduleItem.lessonId}`,
  );
  assert(scheduleItem.aDayDate, `Lesson schedule ${scheduleItem.id} is missing aDayDate`);
  assert(scheduleItem.bDayDate, `Lesson schedule ${scheduleItem.id} is missing bDayDate`);
  assert(scheduleItem.aDayCycle === 'A', `Lesson schedule ${scheduleItem.id} aDayCycle must be A`);
  assert(scheduleItem.bDayCycle === 'B', `Lesson schedule ${scheduleItem.id} bDayCycle must be B`);
  assert(
    !isWeekend(scheduleItem.aDayDate),
    `Lesson schedule ${scheduleItem.id} A day falls on a weekend`,
  );
  assert(
    !isWeekend(scheduleItem.bDayDate),
    `Lesson schedule ${scheduleItem.id} B day falls on a weekend`,
  );

  const aDay = instructionalDayByDate.get(scheduleItem.aDayDate);
  const bDay = instructionalDayByDate.get(scheduleItem.bDayDate);

  assert(aDay, `Lesson schedule ${scheduleItem.id} A day is not in instructional-days.json`);
  assert(bDay, `Lesson schedule ${scheduleItem.id} B day is not in instructional-days.json`);
  assert(aDay.isInstructionalDay, `Lesson schedule ${scheduleItem.id} A day is not instructional`);
  assert(bDay.isInstructionalDay, `Lesson schedule ${scheduleItem.id} B day is not instructional`);
  assert(aDay.cycleDay === 'A', `Lesson schedule ${scheduleItem.id} A day does not match cycle A`);
  assert(bDay.cycleDay === 'B', `Lesson schedule ${scheduleItem.id} B day does not match cycle B`);
}

const assertNoWeekendDateList = (label, records) => {
  if (!records) {
    return;
  }

  assert(Array.isArray(records), `${label} must be an array when present`);

  for (const record of records) {
    assert(record.date, `${label} record is missing date`);
    assert(!isWeekend(record.date), `${label} includes weekend ${record.date}`);
    assert(
      record.dayOfWeek !== 'Saturday' && record.dayOfWeek !== 'Sunday',
      `${label} includes weekend day name for ${record.date}`,
    );
  }
};

assertNoWeekendDateList(
  'q1-unreal-lesson-schedule skippedDatesDuringSchedule',
  q1UnrealCalendarSchedule.skippedDatesDuringSchedule,
);
assertNoWeekendDateList(
  'q1-unreal-lesson-schedule noSchoolDatesDuringSchedule',
  q1UnrealCalendarSchedule.noSchoolDatesDuringSchedule,
);
assertNoWeekendDateList(
  'q2-davinci-resolve-lesson-schedule noSchoolDatesDuringSchedule',
  q2DaVinciCalendarSchedule.noSchoolDatesDuringSchedule,
);

const validateBlockLessonCalendar = (label, calendar, expectedScheduleByLessonId) => {
  assert(calendar.schoolYear, `${label} is missing schoolYear`);
  assert(
    programAreaIds.has(calendar.programAreaId),
    `${label} uses unknown programAreaId ${calendar.programAreaId}`,
  );
  assert(calendar.quarter, `${label} is missing quarter`);
  assert(Array.isArray(calendar.months), `${label} must include months`);
  assert(Array.isArray(calendar.noSchoolDates), `${label} must include noSchoolDates`);
  assertNoWeekendDateList(`${label} noSchoolDates`, calendar.noSchoolDates);
  const lessonLabelPattern = new RegExp(`^${calendar.quarter} L\\d+$`);

  const noSchoolDateSet = new Set(calendar.noSchoolDates.map((day) => day.date));
  const lessonDateCounts = new Map();

  for (const noSchoolDay of calendar.noSchoolDates) {
    const sourceDay = instructionalDayByDate.get(noSchoolDay.date);
    assert(sourceDay, `${label} no-school date ${noSchoolDay.date} is not in instructional-days`);
    assert(
      sourceDay.isInstructionalDay === false,
      `${label} no-school date ${noSchoolDay.date} is marked instructional in instructional-days`,
    );
    assert(
      sourceDay.excludedReason !== 'Weekend',
      `${label} no-school date ${noSchoolDay.date} must not use Weekend as the reason`,
    );
  }

  for (const month of calendar.months) {
    assert(month.month, `${label} month is missing month name`);
    assert(month.year, `${label} month ${month.month} is missing year`);
    assert(Array.isArray(month.weeks), `${label} ${month.month} must include weeks`);

    for (const week of month.weeks) {
      assert(week.weekStart, `${label} ${month.month} week is missing weekStart`);
      assert(Array.isArray(week.days), `${label} ${week.weekStart} must include days`);
      assert(week.days.length === 5, `${label} ${week.weekStart} must contain Monday-Friday only`);

      for (const day of week.days) {
        assert(day.date, `${label} ${week.weekStart} has a day without date`);
        assert(!isWeekend(day.date), `${label} includes weekend calendar cell ${day.date}`);
        assert(
          weekdayNames.has(day.dayOfWeek),
          `${label} ${day.date} must be a Monday-Friday calendar cell`,
        );
        assert(
          ['instructional', 'no-school', 'empty', 'outside-month'].includes(day.status),
          `${label} ${day.date} has unsupported status ${day.status}`,
        );

        if (day.status === 'instructional') {
          assert(day.lessonLabel, `${label} ${day.date} instructional cell is missing lessonLabel`);
          assert(
            lessonLabelPattern.test(day.lessonLabel),
            `${label} ${day.date} lessonLabel must look like ${calendar.quarter} L1`,
          );
          assert(
            day.heading === day.lessonLabel,
            `${label} ${day.date} heading must match lessonLabel`,
          );
          assert(day.lessonId, `${label} ${day.date} instructional cell is missing lessonId`);
          assert(lessonIds.has(day.lessonId), `${label} ${day.date} references missing lesson`);
          assert(day.lessonTitle, `${label} ${day.date} instructional cell is missing lessonTitle`);
          assert(
            programAreaIds.has(day.programAreaId),
            `${label} ${day.date} uses unknown programAreaId ${day.programAreaId}`,
          );
          assert(
            day.cycleDay === 'A' || day.cycleDay === 'B',
            `${label} ${day.date} instructional cell must have A/B cycleDay`,
          );
          assert(
            !noSchoolDateSet.has(day.date),
            `${label} ${day.date} is both instructional and no-school`,
          );

          const sourceDay = instructionalDayByDate.get(day.date);
          assert(sourceDay, `${label} ${day.date} is missing from instructional-days`);
          assert(sourceDay.isInstructionalDay, `${label} ${day.date} is not instructional`);
          assert(
            sourceDay.cycleDay === day.cycleDay,
            `${label} ${day.date} cycleDay does not match instructional-days`,
          );

          lessonDateCounts.set(day.lessonId, (lessonDateCounts.get(day.lessonId) ?? 0) + 1);
        }

        if (day.status === 'no-school') {
          assert(day.heading === 'No School', `${label} ${day.date} no-school heading mismatch`);
          assert(day.reason, `${label} ${day.date} no-school cell is missing reason`);
          assert(
            noSchoolDateSet.has(day.date),
            `${label} ${day.date} no-school cell is not listed in noSchoolDates`,
          );
          assert(!day.lessonId, `${label} ${day.date} no-school cell must not include lessonId`);
        }
      }
    }
  }

  for (const [lessonId, scheduleItem] of expectedScheduleByLessonId) {
    assert(
      lessonDateCounts.get(lessonId) === 2,
      `${label} maps ${lessonId} to ${lessonDateCounts.get(lessonId) ?? 0} class dates, expected 2`,
    );
    assert(
      lessonDateCounts.has(scheduleItem.lessonId),
      `${label} is missing lesson schedule cell for ${scheduleItem.id}`,
    );
  }
};

validateBlockLessonCalendar(
  'curriculum/calendar/q1-unreal-block-calendar.json',
  q1UnrealBlockCalendar,
  q1UnrealScheduleByLessonId,
);
validateBlockLessonCalendar(
  'curriculum/website-data/blockLessonCalendar.seed.json',
  blockLessonCalendar,
  q1UnrealScheduleByLessonId,
);
validateBlockLessonCalendar(
  'curriculum/calendar/q2-davinci-resolve-block-calendar.json',
  q2DaVinciBlockCalendar,
  q2DaVinciScheduleByLessonId,
);

assert(
  isSameJson(q1UnrealBlockCalendar, blockLessonCalendar),
  'blockLessonCalendar.seed.json must mirror q1-unreal-block-calendar.json',
);
assert(
  isSameJson(blockLessonCalendar, appBlockLessonCalendar),
  'src/data/seed/blockLessonCalendar.seed.json must mirror curriculum/website-data/blockLessonCalendar.seed.json',
);

const assertCalendarScheduleMirror = (label, calendarLessons, seedItems) => {
  assert(
    calendarLessons.length === seedItems.length,
    `${label} calendar lesson count must match lessonSchedule.seed.json entries`,
  );

  const seedById = new Map(seedItems.map((item) => [item.id, item]));

  for (const calendarLesson of calendarLessons) {
    const seedLesson = seedById.get(calendarLesson.id);
    assert(seedLesson, `${label} is missing seed schedule item ${calendarLesson.id}`);
    assert(
      isSameJson(calendarLesson, seedLesson),
      `${label} schedule item ${calendarLesson.id} must mirror lessonSchedule.seed.json`,
    );
  }
};

assertCalendarScheduleMirror(
  'q1-unreal-lesson-schedule',
  q1UnrealCalendarSchedule.lessons,
  q1UnrealSchedule,
);
assertCalendarScheduleMirror(
  'q2-davinci-resolve-lesson-schedule',
  q2DaVinciCalendarSchedule.lessons,
  q2DaVinciSchedule,
);

for (const quiz of quizzes) {
  for (const lessonId of quiz.lessonIds) {
    assert(lessonIds.has(lessonId), `Quiz ${quiz.id} references missing lesson ${lessonId}`);
  }

  assert(Array.isArray(quiz.questions), `Quiz ${quiz.id} must include questions`);

  for (const question of quiz.questions) {
    assert(question.id, `Quiz ${quiz.id} has a question without an id`);
    assert(question.text, `Quiz ${quiz.id}/${question.id} is missing question text`);
    assert(
      question.correctAnswer === undefined,
      `Public quiz ${quiz.id}/${question.id} must not include correctAnswer`,
    );
    assert(
      question.explanation === undefined,
      `Public quiz ${quiz.id}/${question.id} must not include explanation`,
    );
  }
}

for (const answerKey of quizAnswerKeys) {
  assert(quizIds.has(answerKey.quizId), `Answer key ${answerKey.id} references missing quiz`);
  assert(
    answerKey.id === answerKey.quizId,
    `Answer key ${answerKey.id} must use the same document ID as quizId`,
  );
  assert(Array.isArray(answerKey.answers), `Answer key ${answerKey.id} must include answers`);
}

for (const update of broadcastUpdates) {
  for (const projectId of update.relatedProjectIds) {
    assert(
      mediaProjectIds.has(projectId),
      `Broadcast update ${update.id} references missing media project ${projectId}`,
    );
  }
}

for (const warning of warnings) {
  console.warn(`Warning: ${warning}`);
}

console.log('Curriculum validation passed.');
