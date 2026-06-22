import type { SubmissionLinkInput } from '../../services/submissionService';

interface DriveLinkSubmissionFieldProps {
  links: SubmissionLinkInput[];
  disabled?: boolean;
  onChange: (links: SubmissionLinkInput[]) => void;
}

const emptyLink: SubmissionLinkInput = { label: '', url: '' };

export function DriveLinkSubmissionField({
  links,
  disabled = false,
  onChange,
}: DriveLinkSubmissionFieldProps) {
  const updateLink = (index: number, field: keyof SubmissionLinkInput, value: string) => {
    onChange(
      links.map((link, linkIndex) =>
        linkIndex === index ? { ...link, [field]: value } : link,
      ),
    );
  };

  const removeLink = (index: number) => {
    const nextLinks = links.filter((_, linkIndex) => linkIndex !== index);
    onChange(nextLinks.length ? nextLinks : [{ ...emptyLink }]);
  };

  return (
    <div className="submission-field-stack">
      <div>
        <p className="retro-label">Evidence Links</p>
        <p className="muted">
          Upload evidence to Google Drive first, make sure your teacher can view it, then paste the
          link here. Google Docs and YouTube links are also accepted.
        </p>
      </div>

      <div className="submission-link-list">
        {links.map((link, index) => (
          <div className="submission-link-row" key={`${index}-${link.url}`}>
            <label>
              Label
              <input
                value={link.label}
                disabled={disabled}
                onChange={(event) => updateLink(index, 'label', event.target.value)}
                placeholder={`Evidence ${index + 1}`}
              />
            </label>
            <label>
              Google Drive / Docs / YouTube URL
              <input
                type="url"
                value={link.url}
                disabled={disabled}
                onChange={(event) => updateLink(index, 'url', event.target.value)}
                placeholder="https://drive.google.com/..."
              />
            </label>
            <button
              className="outline-button"
              type="button"
              disabled={disabled}
              aria-label={`Remove evidence link ${index + 1}`}
              onClick={() => removeLink(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        className="secondary-button"
        type="button"
        disabled={disabled}
        onClick={() => onChange([...links, { ...emptyLink }])}
      >
        Add Another Link
      </button>
    </div>
  );
}
