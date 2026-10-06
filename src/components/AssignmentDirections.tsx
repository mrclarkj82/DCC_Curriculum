import type { Assignment } from '../types';

export function AssignmentDirections({ assignment }: { assignment: Assignment }) {
  return (
    <section className="card span-two mission-panel">
      <h2>Assignment Directions</h2>
      <p>{assignment.instructions}</p>
      <ol className="ordered-list">
        {assignment.requiredSteps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  );
}
