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

const programAreaIds = new Set(programAreas.map((area) => area.id));
const lessonIds = new Set(lessons.map((lesson) => lesson.id));
const mediaProjectIds = new Set(mediaProjects.map((project) => project.id));

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

assertProgramAreaIds('lessons', lessons);
assertProgramAreaIds('assignments', assignments);
assertProgramAreaIds('quizzes', quizzes);
assertProgramAreaIds('mediaProjects', mediaProjects);
assertProgramAreaIds('broadcastUpdates', broadcastUpdates);

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

