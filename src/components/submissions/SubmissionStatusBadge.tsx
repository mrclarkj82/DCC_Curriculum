import type { SubmissionStatus } from '../../types';

const statusLabels: Record<SubmissionStatus, string> = {
  submitted: 'Submitted',
  resubmitted: 'Resubmitted',
  needs_revision: 'Needs Revision',
  accepted: 'Accepted',
};

interface SubmissionStatusBadgeProps {
  status: SubmissionStatus | 'not_submitted';
}

export function SubmissionStatusBadge({ status }: SubmissionStatusBadgeProps) {
  const label = status === 'not_submitted' ? 'Not Submitted' : statusLabels[status];

  return <span className={`submission-status-badge status-${status}`}>{label}</span>;
}
