import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dataDir = join(root, 'curriculum', 'website-data');
const calendarDir = join(root, 'curriculum', 'calendar');

const readJson = (fileName) => JSON.parse(readFileSync(join(dataDir, fileName), 'utf8'));
const readCalendarJson = (fileName) =>
  JSON.parse(readFileSync(join(calendarDir, fileName), 'utf8'));

const programAreas = readJson('programAreas.seed.json');
const lessons = readJson('lessons.seed.json');
const assignments = readJson('assignments.seed.json');
const quizzes = readJson('quizzes.seed.json');
const mediaProjects = readJson('mediaProjects.seed.json');
const broadcastUpdates = readJson('broadcastUpdates.seed.json');
const classes = readJson('classes.seed.json');
const lessonSchedule = readJson('lessonSchedule.seed.json');
const instructionalDays = readCalendarJson('instructional-days.json');

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

const warnings = [];

assertUniqueIds('programAreas', programAreas);
assertUniqueIds('lessons', lessons);
assertUniqueIds('assignments', assignments);
assertUniqueIds('quizzes', quizzes);
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

for (let lessonNumber = 1; lessonNumber <= 16; lessonNumber += 1) {
  assert(
    q1UnrealLessonNumbers.has(lessonNumber),
    `Q1 Unreal lesson schedule is missing lesson ${lessonNumber}`,
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

for (const quiz of quizzes) {
  for (const lessonId of quiz.lessonIds) {
    assert(lessonIds.has(lessonId), `Quiz ${quiz.id} references missing lesson ${lessonId}`);
  }
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
