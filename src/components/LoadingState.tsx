export function LoadingState({ label = 'Loading scaffold data...' }: { label?: string }) {
  return <div className="state-box">{label}</div>;
}

