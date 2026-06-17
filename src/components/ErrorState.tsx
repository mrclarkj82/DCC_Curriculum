export function ErrorState({ message }: { message: string }) {
  return (
    <div className="state-box error-state">
      <h2>Something needs attention</h2>
      <p>{message}</p>
    </div>
  );
}

