interface ReflectionFieldProps {
  prompt: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function ReflectionField({
  prompt,
  value,
  disabled = false,
  onChange,
}: ReflectionFieldProps) {
  return (
    <label className="submission-textarea-label">
      Reflection
      <span className="muted">{prompt}</span>
      <textarea
        value={value}
        disabled={disabled}
        rows={5}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Explain what you made, what the link shows, and what you want your teacher to notice."
      />
    </label>
  );
}
