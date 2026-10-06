import type { Lesson } from '../types';

// The two classroom openers appear in this order before the DaVinci lessons.
// File 2 belongs to Unreal but is also part of the Video Production opener sequence.
export const videoProductionOpeningLessonIds = ['vp-q2-file-org-01', 'ue-q2-file-org-01'];

export function videoProductionFoundationsLessons(lessons: Lesson[]): Lesson[] {
  return lessons
    .filter((lesson) => lesson.quarter === 'Q2' && lesson.unit === 'DaVinci Resolve Foundations')
    .sort((a, b) => a.lessonNumber - b.lessonNumber);
}
