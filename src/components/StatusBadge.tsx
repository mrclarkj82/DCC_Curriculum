export function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge status-${status.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`}>{status}</span>;
}

