interface RedactedTextProps {
  label: string;
}

export function RedactedText({ label }: RedactedTextProps) {
  return (
    <span className="hidden-frame-redacted-text" aria-label={`Redacted: ${label}`} role="img">
      {label.replace(/./g, '█')}
    </span>
  );
}
