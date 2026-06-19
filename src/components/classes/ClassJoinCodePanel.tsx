import { useEffect, useState } from 'react';
import {
  disableJoinCode,
  generateJoinCodeForClass,
  regenerateJoinCodeForClass,
  subscribeToJoinCodeForClass,
} from '../../services/classJoinCodeService';
import { firestoreErrorMessage } from '../../services/firestoreService';
import type { ClassJoinCode, ClassRecord } from '../../types';
import { ErrorState } from '../ErrorState';
import { LoadingState } from '../LoadingState';
import { StatusBadge } from '../StatusBadge';

function formatTimestamp(value: unknown): string {
  if (!value) {
    return 'Never';
  }

  if (typeof value === 'string') {
    return value || 'Never';
  }

  const timestamp = value as { seconds?: number; toDate?: () => Date };

  if (typeof timestamp.toDate === 'function') {
    return timestamp.toDate().toLocaleString();
  }

  if (typeof timestamp.seconds === 'number') {
    return new Date(timestamp.seconds * 1000).toLocaleString();
  }

  return 'Recorded';
}

interface ClassJoinCodePanelProps {
  classRecord: ClassRecord;
  compact?: boolean;
}

export function ClassJoinCodePanel({ classRecord, compact = false }: ClassJoinCodePanelProps) {
  const [joinCode, setJoinCode] = useState<ClassJoinCode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    return subscribeToJoinCodeForClass(
      classRecord.id,
      (nextJoinCode) => {
        setJoinCode(nextJoinCode);
        setIsLoading(false);
      },
      (nextError) => {
        setError(firestoreErrorMessage(nextError, 'Unable to load the class join code.'));
        setIsLoading(false);
      },
    );
  }, [classRecord.id]);

  const runAction = async (action: () => Promise<ClassJoinCode | void>, successMessage: string) => {
    setIsSaving(true);
    setMessage(null);
    setError(null);

    try {
      await action();
      setMessage(successMessage);
    } catch (nextError) {
      setError(firestoreErrorMessage(nextError, 'Unable to update the class join code.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyCode = async () => {
    if (!joinCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(joinCode.code);
      setMessage('Class code copied.');
      setError(null);
    } catch {
      setError('Copy failed. Select the code and copy it manually.');
      setMessage(null);
    }
  };

  return (
    <section className={`class-code-panel ${compact ? 'compact' : ''}`}>
      <div className="section-heading-row">
        <div>
          <p className="retro-label">Class Join Code</p>
          <h3>{joinCode?.code ?? 'No active code'}</h3>
        </div>
        <StatusBadge status={joinCode?.isActive ? 'active' : 'disabled'} />
      </div>

      <p className="muted">
        Share this code with students in this class. Students must sign in with their
        @student.doralacademynv.org Google account before joining.
      </p>
      <p className="meta-line">Give this code only to students in this class.</p>

      {isLoading && <LoadingState label="Loading class join code..." />}
      {error && <ErrorState message={error} />}
      {message && <p className="form-message">{message}</p>}

      {joinCode && (
        <dl className="detail-list">
          <div>
            <dt>Usage Count</dt>
            <dd>{joinCode.usageCount}</dd>
          </div>
          <div>
            <dt>Last Used</dt>
            <dd>{formatTimestamp(joinCode.lastUsedAt)}</dd>
          </div>
        </dl>
      )}

      <div className="button-row">
        {!joinCode && (
          <button
            className="gradient-button"
            type="button"
            disabled={isSaving}
            onClick={() =>
              runAction(
                () => generateJoinCodeForClass(classRecord.id),
                'Class join code generated.',
              )
            }
          >
            {isSaving ? 'Generating...' : 'Generate Code'}
          </button>
        )}

        {joinCode && (
          <>
            <button
              className="secondary-button"
              type="button"
              aria-label={`Copy join code ${joinCode.code}`}
              onClick={handleCopyCode}
            >
              Copy Code
            </button>
            <button
              className="secondary-button"
              type="button"
              disabled={isSaving}
              onClick={() =>
                runAction(
                  () => regenerateJoinCodeForClass(classRecord.id),
                  'Class join code regenerated. The old code is disabled.',
                )
              }
            >
              {isSaving ? 'Regenerating...' : 'Regenerate Code'}
            </button>
            <button
              className="outline-button"
              type="button"
              disabled={isSaving}
              onClick={() =>
                runAction(() => disableJoinCode(joinCode.code), 'Class join code disabled.')
              }
            >
              {isSaving ? 'Disabling...' : 'Disable Code'}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
