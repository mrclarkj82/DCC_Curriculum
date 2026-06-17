import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const dataDir = join(root, 'curriculum', 'website-data');

const readJson = (fileName) => JSON.parse(readFileSync(join(dataDir, fileName), 'utf8'));

const programAreas = readJson('programAreas.seed.json');
const lessons = readJson('lessons.seed.json');
const assignments = readJson('assignments.seed.json');
const quizzes = readJson('quizzes.seed.json');
const mediaProjects = readJson('mediaProjects.seed.json');
const broadcastUpdates = readJson('broadcastUpdates.seed.json');
const classes = readJson('classes.seed.json');

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

assertUniqueIds('programAreas', programAreas);
assertUniqueIds('lessons', lessons);
assertUniqueIds('assignments', assignments);
assertUniqueIds('quizzes', quizzes);
assertUniqueIds('mediaProjects', mediaProjects);
assertUniqueIds('broadcastUpdates', broadcastUpdates);
assertUniqueIds('classes', classes);

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
}

for (const assignment of assignments.filter((item) => item.programAreaId === 'unreal-engine')) {
  assert(
    lessonIds.has(assignment.lessonId),
    `Assignment ${assignment.id} references missing lesson ${assignment.lessonId}`,
  );
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

console.log('Curriculum validation passed.');
