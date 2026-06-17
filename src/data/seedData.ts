import programAreasSeed from './seed/programAreas.seed.json';
import lessonsSeed from './seed/lessons.seed.json';
import assignmentsSeed from './seed/assignments.seed.json';
import quizzesSeed from './seed/quizzes.seed.json';
import mediaProjectsSeed from './seed/mediaProjects.seed.json';
import broadcastUpdatesSeed from './seed/broadcastUpdates.seed.json';
import classesSeed from './seed/classes.seed.json';
import type {
  ActiveClassItem,
  Assignment,
  BroadcastUpdate,
  ClassRecord,
  Lesson,
  MediaProject,
  ProgramArea,
  Quiz,
} from '../types';

// Local JSON mirrors curriculum/website-data for development preview and static shell helpers.
// Phase 5 route content should prefer Firestore services as the long-term source of truth.
export const programAreas = programAreasSeed as ProgramArea[];
export const lessons = lessonsSeed as Lesson[];
export const assignments = assignmentsSeed as Assignment[];
export const quizzes = quizzesSeed as Quiz[];
export const mediaProjects = mediaProjectsSeed as MediaProject[];
export const broadcastUpdates = broadcastUpdatesSeed as BroadcastUpdate[];
export const classRecords = classesSeed as ClassRecord[];

export const getProgramArea = (id: string) => programAreas.find((area) => area.id === id);

export const getLesson = (id: string) => lessons.find((lesson) => lesson.id === id);

export const getAssignment = (id: string) =>
  assignments.find((assignment) => assignment.id === id);

export const getQuiz = (id: string) => quizzes.find((quiz) => quiz.id === id);

export const getMediaProject = (id: string) =>
  mediaProjects.find((project) => project.id === id);

export const getBroadcastUpdate = (id: string) =>
  broadcastUpdates.find((update) => update.id === id);

export const getClassRecord = (id: string) => classRecords.find((classRecord) => classRecord.id === id);

export const getLessonsForProgramArea = (programAreaId: string) =>
  lessons.filter((lesson) => lesson.programAreaId === programAreaId);

export const getAssignmentsForLesson = (lessonId: string) =>
  assignments.filter((assignment) => assignment.lessonId === lessonId);

export const getMediaProjectsForProgramArea = (programAreaId: string) =>
  mediaProjects.filter((project) => project.programAreaId === programAreaId);

export const getBroadcastUpdatesForProgramArea = (programAreaId: string) =>
  broadcastUpdates.filter((update) => update.programAreaId === programAreaId);

export const activeClassItem: ActiveClassItem = {
  id: 'ue-q1-l01',
  type: 'lesson',
  programAreaId: 'unreal-engine',
  title: 'Creating Your First Unreal Project',
  status: 'demo',
};
