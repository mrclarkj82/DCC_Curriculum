import type { RubricItem } from '../types';

export function RubricTable({ rubric }: { rubric: RubricItem[] }) {
  if (!rubric.length) {
    return <p className="muted">Rubric details are not available yet.</p>;
  }

  return (
    <table className="rubric-table">
      <thead>
        <tr>
          <th>Score</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rubric.map((item) => (
          <tr key={item.score}>
            <td>{item.score}</td>
            <td>{item.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

