import { describe, expect, it } from 'vitest';
import {
  getAssignmentGameAccessStatusFromSubmission,
  submissionCompletesAssignmentGameGate,
} from './assignmentGameAccessService';
import type {
  ActiveClassItem,
  ClassRecord,
  StudentSubmission,
  SubmissionTarget,
  UserProfile,
} from '../types';

const student: UserProfile = {
  uid: 'student-1',
  displayName: 'Student One',
  email: 'student1@student.doralacademynv.org',
  photoURL: '',
  role: 'student',
  classIds: ['class-1'],
};

const classRecord: ClassRecord = {
  id: 'class-1',
  name: 'DCC',
  period: 'A',
  teacherIds: ['teacher-1'],
  studentIds: ['student-1'],
  activeProgramAreaId: 'unreal-engine',
  activeItemType: 'assignment',
  activeItemId: 'assignment-1',
  schoolYear: '2026-2027',
  createdAt: '',
  updatedAt: '',
};

const activeItem: ActiveClassItem = {
  id: 'assignment-1',
  type: 'assignment',
  programAreaId: 'unreal-engine',
  title: 'Assignment One',
  status: 'active',
  record: null,
};

const target: SubmissionTarget = {
  targetType: 'assignment',
  targetId: 'assignment-1',
  programAreaId: 'unreal-engine',
  title: 'Assignment One',
  submissionKind: 'unreal-evidence',
  requirements: ['Submit evidence'],
  evidenceChecklist: [{ label: 'Submit evidence', complete: false }],
  reflectionPrompt: 'What did you make?',
};

const completeSubmission: StudentSubmission = {
  id: 'submission-1',
  uid: 'student-1',
  studentName: 'Student One',
  studentEmail: 'student1@student.doralacademynv.org',
  classId: 'class-1',
  programAreaId: 'unreal-engine',
  targetType: 'assignment',
  targetId: 'assignment-1',
  activeItemType: 'assignment',
  activeItemId: 'assignment-1',
  title: 'Assignment One',
  submissionKind: 'unreal-evidence',
  driveLinks: [
    {
      url: 'https://drive.google.com/file/d/example',
      label: 'Evidence',
      type: 'google-drive',
      addedAt: '',
    },
  ],
  otherLinks: [],
  reflection: 'I completed the required work.',
  textResponse: '',
  evidenceChecklist: [{ label: 'Submit evidence', complete: true }],
  status: 'submitted',
  teacherFeedback: '',
  reviewedBy: '',
  reviewedAt: null,
};

describe('assignment game access service', () => {
  it('unlocks when a student submission is complete', () => {
    const access = getAssignmentGameAccessStatusFromSubmission(
      {
        activeItem,
        classRecord,
        studentId: student.uid,
        target,
        userProfile: student,
      },
      completeSubmission,
    );

    expect(access.canAccess).toBe(true);
    expect(access.submissionId).toBe(completeSubmission.id);
  });

  it('stays locked when required evidence is incomplete', () => {
    const incompleteSubmission = {
      ...completeSubmission,
      evidenceChecklist: [{ label: 'Submit evidence', complete: false }],
    };

    expect(submissionCompletesAssignmentGameGate(incompleteSubmission)).toBe(false);
  });
});
