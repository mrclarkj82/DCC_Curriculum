import { FormEvent, useEffect, useState } from 'react';
import { ErrorState } from '../ErrorState';
import { LoadingState } from '../LoadingState';
import { firestoreErrorMessage } from '../../services/firestoreService';
import {
  submitBellRingerResponse,
  submitExitTicketResponse,
  subscribeToBellRingerResponse,
  subscribeToExitTicketResponse,
} from '../../services/responseService';
import {
  submitTeacherPreviewResponse,
  subscribeToTeacherPreviewResponse,
} from '../../services/studentPreviewService';
import type {
  ActiveClassItem,
  BellRingerResponse,
  ClassRecord,
  ExitTicketResponse,
  ResponseKind,
  TeacherPreviewResponse,
  UserProfile,
  ViewerMode,
} from '../../types';
import { isTeacherPreviewMode } from '../../types';
import { CompletionBadge } from './CompletionBadge';
import { ResponseTextArea } from './ResponseTextArea';

type StudentResponse = BellRingerResponse | ExitTicketResponse | TeacherPreviewResponse;

interface StudentResponseCardProps {
  kind: ResponseKind;
  title: string;
  eyebrow: string;
  prompt: string;
  emptyMessage: string;
  activeItem: ActiveClassItem;
  classRecord: ClassRecord;
  userProfile: UserProfile;
  viewerMode?: ViewerMode;
}

function formatSavedAt(value: unknown): string {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number') {
    return new Date(value).toLocaleString();
  }

  const timestamp = value as { seconds?: number; toDate?: () => Date };

  if (typeof timestamp.toDate === 'function') {
    return timestamp.toDate().toLocaleString();
  }

  if (typeof timestamp.seconds === 'number') {
    return new Date(timestamp.seconds * 1000).toLocaleString();
  }

  return 'saved';
}

export function StudentResponseCard({
  kind,
  title,
  eyebrow,
  prompt,
  emptyMessage,
  activeItem,
  classRecord,
  userProfile,
  viewerMode = 'student',
}: StudentResponseCardProps) {
  const [savedResponse, setSavedResponse] = useState<StudentResponse | null>(null);
  const [draftResponse, setDraftResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const trimmedPrompt = prompt.trim();
  const isComplete = Boolean(savedResponse?.response.trim());
  const textareaId = `${kind}-${classRecord.id}-${activeItem.id}`;
  const isPreviewMode = isTeacherPreviewMode(viewerMode);

  useEffect(() => {
    setMessage(null);
    setError(null);
    setSavedResponse(null);
    setDraftResponse('');

    if (!trimmedPrompt) {
      setIsLoading(false);
      return undefined;
    }

    setIsLoading(true);

    const handleResponse = (response: StudentResponse | null) => {
      setSavedResponse(response);
      setDraftResponse(response?.response ?? '');
      setIsLoading(false);
    };

    const handleError = (subscriptionError: Error) => {
      setError(firestoreErrorMessage(subscriptionError, 'Unable to load your saved response.'));
      setIsLoading(false);
    };

    if (isPreviewMode) {
      return subscribeToTeacherPreviewResponse(
        classRecord.id,
        activeItem.id,
        userProfile.uid,
        kind,
        handleResponse,
        handleError,
      );
    }

    return kind === 'bellRinger'
      ? subscribeToBellRingerResponse(
          classRecord.id,
          activeItem.id,
          userProfile.uid,
          handleResponse,
          handleError,
        )
      : subscribeToExitTicketResponse(
          classRecord.id,
          activeItem.id,
          userProfile.uid,
          handleResponse,
          handleError,
        );
  }, [activeItem.id, classRecord.id, isPreviewMode, kind, trimmedPrompt, userProfile.uid]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!draftResponse.trim()) {
      setError('Write a response before saving.');
      return;
    }

    setIsSaving(true);

    try {
      const input = {
        uid: userProfile.uid,
        studentName: userProfile.displayName || userProfile.email,
        studentEmail: userProfile.email,
        classId: classRecord.id,
        programAreaId: activeItem.programAreaId,
        activeItemType: activeItem.type,
        activeItemId: activeItem.id,
        prompt: trimmedPrompt,
        response: draftResponse,
      };

      if (isPreviewMode) {
        await submitTeacherPreviewResponse({
          teacherUid: userProfile.uid,
          teacherName: userProfile.displayName || userProfile.email,
          teacherEmail: userProfile.email,
          classId: classRecord.id,
          programAreaId: activeItem.programAreaId,
          activeItemType: activeItem.type,
          activeItemId: activeItem.id,
          responseKind: kind,
          prompt: trimmedPrompt,
          response: draftResponse,
        });
      } else if (kind === 'bellRinger') {
        await submitBellRingerResponse(input);
      } else {
        await submitExitTicketResponse(input);
      }

      setMessage(
        isPreviewMode
          ? savedResponse
            ? 'Preview response updated.'
            : 'Preview response submitted.'
          : savedResponse
            ? 'Response updated.'
            : 'Response submitted.',
      );
    } catch (saveError) {
      setError(firestoreErrorMessage(saveError, 'Unable to save your response.'));
    } finally {
      setIsSaving(false);
    }
  };

  if (!trimmedPrompt) {
    return (
      <section className="card mission-panel response-card">
        <div className="card-header">
          <div>
            <p className="retro-label">{eyebrow}</p>
            <h2>{title}</h2>
          </div>
          <CompletionBadge complete={false} label={title} />
        </div>
        <p className="muted">{emptyMessage}</p>
        {isPreviewMode && (
          <p className="preview-response-note">
            Preview Only - this does not count as real student work.
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="card mission-panel response-card neon-border">
      <div className="card-header">
        <div>
          <p className="retro-label">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <CompletionBadge complete={isComplete} label={title} />
      </div>
      <p className="response-prompt">{trimmedPrompt}</p>
      {isPreviewMode && (
        <p className="preview-response-note">
          Preview Only - saved preview responses stay separate from student completion data.
        </p>
      )}

      {isLoading ? (
        <LoadingState label="Loading your saved response..." />
      ) : (
        <form className="response-form" onSubmit={handleSubmit}>
          <ResponseTextArea
            id={textareaId}
            label={`${title} response`}
            value={draftResponse}
            disabled={isSaving}
            onChange={setDraftResponse}
          />
          <div className="button-row">
            <button className="gradient-button" type="submit" disabled={isSaving}>
              {isSaving
                ? 'Saving...'
                : isPreviewMode
                  ? savedResponse
                    ? 'Update Preview Response'
                    : 'Submit Preview Response'
                  : savedResponse
                    ? 'Update Response'
                    : 'Submit Response'}
            </button>
            {Boolean(savedResponse?.updatedAt) && (
              <p className="meta-line">Saved {formatSavedAt(savedResponse?.updatedAt)}</p>
            )}
          </div>
        </form>
      )}

      {message && <p className="form-message">{message}</p>}
      {error && <ErrorState message={error} />}
    </section>
  );
}
