export function EvidenceChecklist({ items }: { items: string[] }) {
  if (!items.length) {
    return <p className="muted">No evidence requirements have been added yet.</p>;
  }

  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

