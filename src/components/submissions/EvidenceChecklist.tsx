import type { SubmissionEvidenceChecklistItem } from '../../types';

interface SubmissionEvidenceChecklistProps {
  items: SubmissionEvidenceChecklistItem[];
  disabled?: boolean;
  onChange: (items: SubmissionEvidenceChecklistItem[]) => void;
}

export function SubmissionEvidenceChecklist({
  items,
  disabled = false,
  onChange,
}: SubmissionEvidenceChecklistProps) {
  if (!items.length) {
    return (
      <p className="muted">
        No checklist items are attached to this active item yet. Use your teacher's in-class
        directions for what the link should show.
      </p>
    );
  }

  return (
    <fieldset className="submission-checklist">
      <legend>Evidence Checklist</legend>
      {items.map((item, index) => (
        <label key={`${index}-${item.label}`} className="submission-check-item">
          <input
            type="checkbox"
            checked={item.complete}
            disabled={disabled}
            onChange={(event) =>
              onChange(
                items.map((nextItem, itemIndex) =>
                  itemIndex === index
                    ? { ...nextItem, complete: event.target.checked }
                    : nextItem,
                ),
              )
            }
          />
          <span>{item.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
