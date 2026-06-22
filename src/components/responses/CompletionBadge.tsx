interface CompletionBadgeProps {
  complete: boolean;
  label: string;
}

export function CompletionBadge({ complete, label }: CompletionBadgeProps) {
  return (
    <span
      className={`completion-badge ${complete ? 'completion-badge--complete' : 'completion-badge--pending'}`}
      aria-label={`${label}: ${complete ? 'complete' : 'not complete'}`}
    >
      <span aria-hidden="true">{complete ? '✓' : '○'}</span>
      {complete ? 'Complete' : 'Not Submitted'}
    </span>
  );
}
