import type { StudentSubmission } from '../../types';
import { SubmissionStatusBadge } from './SubmissionStatusBadge';

function formatTimestamp(value: unknown): string {
  if (!value) {
    return 'Not recorded';
  }

  if (typeof value === 'string') {
    return value || 'Not recorded';
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

  return 'Recorded';
}

interface SubmittedLinksCardProps {
  submission: StudentSubmission | null;
}

export function SubmittedLinksCard({ submission }: SubmittedLinksCardProps) {
  if (!submission) {
    return (
      <section className="submitted-links-card">
        <div className="card-header">
          <h3>No evidence submitted yet</h3>
          <SubmissionStatusBadge status="not_submitted" />
        </div>
        <p className="muted">Your saved Google Drive evidence links will appear here.</p>
      </section>
    );
  }

  const allLinks = [...submission.driveLinks, ...submission.otherLinks];

  return (
    <section className="submitted-links-card">
      <div className="card-header">
        <h3>Saved Submission</h3>
        <SubmissionStatusBadge status={submission.status} />
      </div>
      <dl className="detail-list">
        <div>
          <dt>Submitted</dt>
          <dd>{formatTimestamp(submission.submittedAt)}</dd>
        </div>
        <div>
          <dt>Updated</dt>
          <dd>{formatTimestamp(submission.updatedAt)}</dd>
        </div>
      </dl>
      <ul className="submission-link-display-list">
        {allLinks.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.label || link.url}
            </a>
            <span>{link.type}</span>
          </li>
        ))}
      </ul>
      {submission.teacherFeedback && (
        <div className="teacher-feedback-callout">
          <p className="retro-label">Teacher Feedback</p>
          <p>{submission.teacherFeedback}</p>
        </div>
      )}
    </section>
  );
}
