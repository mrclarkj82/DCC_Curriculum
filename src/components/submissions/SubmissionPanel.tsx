import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ErrorState } from '../ErrorState';
import { LoadingState } from '../LoadingState';
import { DriveLinkSubmissionField } from './DriveLinkSubmissionField';
import { SubmissionEvidenceChecklist } from './EvidenceChecklist';
import { ReflectionField } from './ReflectionField';
import { SubmittedLinksCard } from './SubmittedLinksCard';
import {
  resubmitWork,
  submitWork,
  subscribeToSubmission,
  updateSubmission,
  type SubmissionLinkInput,
} from '../../services/submissionService';
import type {
  ActiveItemType,
  ClassRecord,
  StudentSubmission,
  SubmissionEvidenceChecklistItem,
  SubmissionTarget,
  UserProfile,
  ViewerMode,
} from '../../types';
import { isTeacherPreviewMode } from '../../types';

interface SubmissionPanelProps {
  classRecord: ClassRecord | null;
  activeItemType: ActiveItemType;
  activeItemId: string;
  target: SubmissionTarget | null;
  userProfile: UserProfile | null;
  viewerMode?: ViewerMode;
}

const starterLinks: SubmissionLinkInput[] = [{ label: '', url: '' }];

function linksFromSubmission(submission: StudentSubmission | null): SubmissionLinkInput[] {
  if (!submission) {
    return starterLinks;
  }

  const links = [...submission.driveLinks, ...submission.otherLinks].map((link) => ({
    label: link.label,
    url: link.url,
  }));

  return links.length ? links : starterLinks;
}

function checklistFromTarget(target: SubmissionTarget): SubmissionEvidenceChecklistItem[] {
  return target.evidenceChecklist.map((item) => ({ ...item }));
}

export function SubmissionPanel({
  classRecord,
  activeItemType,
  activeItemId,
  target,
  userProfile,
  viewerMode = 'student',
}: SubmissionPanelProps) {
  const isPreviewMode = isTeacherPreviewMode(viewerMode);
  const [submission, setSubmission] = useState<StudentSubmission | null>(null);
  const [links, setLinks] = useState<SubmissionLinkInput[]>(starterLinks);
  const [reflection, setReflection] = useState('');
  const [evidenceChecklist, setEvidenceChecklist] = useState<SubmissionEvidenceChecklistItem[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canUsePanel = Boolean(
    target && classRecord && userProfile?.role === 'student' && !isPreviewMode,
  );
  const isAccepted = submission?.status === 'accepted';
  const isDisabled = !canUsePanel || isAccepted || isSaving;
  const buttonLabel = useMemo(() => {
    if (isAccepted) {
      return 'Accepted';
    }

    if (submission?.status === 'needs_revision') {
      return isSaving ? 'Resubmitting...' : 'Resubmit Evidence';
    }

    if (submission) {
      return isSaving ? 'Saving...' : 'Update Evidence';
    }

    return isSaving ? 'Submitting...' : 'Submit Evidence';
  }, [isAccepted, isSaving, submission]);

  useEffect(() => {
    if (!target) {
      setSubmission(null);
      setEvidenceChecklist([]);
      setLinks(starterLinks);
      setReflection('');
      setIsLoading(false);
      setError(null);
      return undefined;
    }

    if (!classRecord || !userProfile || userProfile.role !== 'student' || isPreviewMode) {
      setSubmission(null);
      setEvidenceChecklist(checklistFromTarget(target));
      setLinks(starterLinks);
      setReflection('');
      setIsLoading(false);
      setError(null);
      return undefined;
    }

    setIsLoading(true);
    setError(null);

    return subscribeToSubmission(
      classRecord.id,
      target.targetType,
      target.targetId,
      userProfile.uid,
      (nextSubmission) => {
        setSubmission(nextSubmission);
        setLinks(linksFromSubmission(nextSubmission));
        setReflection(nextSubmission?.reflection ?? '');
        setEvidenceChecklist(
          nextSubmission?.evidenceChecklist.length
            ? nextSubmission.evidenceChecklist
            : checklistFromTarget(target),
        );
        setIsLoading(false);
      },
      (nextError) => {
        setError(nextError.message || 'Unable to load your saved submission.');
        setIsLoading(false);
      },
    );
  }, [
    activeItemId,
    activeItemType,
    classRecord?.id,
    isPreviewMode,
    target?.targetId,
    target?.targetType,
    userProfile?.role,
    userProfile?.uid,
  ]);

  if (!target) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!classRecord || !userProfile) {
      setError('Join or be assigned to a class before submitting evidence.');
      return;
    }

    if (isPreviewMode) {
      setError('Teacher preview mode cannot save real student submissions.');
      return;
    }

    setIsSaving(true);
    setMessage(null);
    setError(null);

    try {
      const payload = {
        uid: userProfile.uid,
        studentName: userProfile.displayName,
        studentEmail: userProfile.email,
        classId: classRecord.id,
        activeItemType,
        activeItemId,
        target,
        links,
        reflection,
        textResponse: '',
        evidenceChecklist,
      };

      if (submission?.status === 'needs_revision') {
        await resubmitWork(payload);
        setMessage('Evidence resubmitted for teacher review.');
      } else if (submission) {
        await updateSubmission(payload);
        setMessage('Submission updated.');
      } else {
        await submitWork(payload);
        setMessage('Evidence submitted.');
      }
    } catch (nextError) {
      const errorMessage =
        nextError instanceof Error ? nextError.message : 'Unable to save this submission.';
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="card mission-panel neon-border submission-panel">
      <div className="card-header">
        <div>
          <p className="retro-label">Google Drive Evidence</p>
          <h2>{target.title}</h2>
        </div>
        <span className="submission-kind-pill">{target.submissionKind}</span>
      </div>

      {isPreviewMode && (
        <p className="form-message">
          Teacher preview mode is read-only for submissions. No real student evidence will be
          created from this preview.
        </p>
      )}

      {userProfile?.role !== 'student' && !isPreviewMode && (
        <p className="muted">Submission controls are shown to students. Teachers review work from the Teacher page.</p>
      )}

      {!classRecord && userProfile?.role === 'student' && (
        <p className="muted">Join or be assigned to a class before submitting evidence.</p>
      )}

      <p className="muted">
        This workflow stores evidence links only. Raw file uploads, Firebase Storage uploads, video
        hosting, and video editing are intentionally not part of this phase.
      </p>

      {target.requirements.length > 0 && (
        <div className="submission-requirements">
          <p className="retro-label">What The Link Should Show</p>
          <ul>
            {target.requirements.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </div>
      )}

      {isLoading ? (
        <LoadingState label="Loading your saved submission..." />
      ) : (
        <>
          <SubmittedLinksCard submission={submission} />
          {message && <p className="form-message">{message}</p>}
          {error && <ErrorState message={error} />}
          <form className="submission-form" onSubmit={handleSubmit}>
            <DriveLinkSubmissionField
              links={links}
              disabled={isDisabled}
              onChange={setLinks}
            />
            <SubmissionEvidenceChecklist
              items={evidenceChecklist}
              disabled={isDisabled}
              onChange={setEvidenceChecklist}
            />
            <ReflectionField
              prompt={target.reflectionPrompt}
              value={reflection}
              disabled={isDisabled}
              onChange={setReflection}
            />
            <button className="gradient-button" type="submit" disabled={isDisabled}>
              {buttonLabel}
            </button>
          </form>
        </>
      )}
    </section>
  );
}
