interface ResponseTextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ResponseTextArea({
  id,
  label,
  value,
  onChange,
  disabled = false,
  placeholder = 'Write your response here...',
}: ResponseTextAreaProps) {
  return (
    <label className="response-textarea-label" htmlFor={id}>
      {label}
      <textarea
        id={id}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        rows={6}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
