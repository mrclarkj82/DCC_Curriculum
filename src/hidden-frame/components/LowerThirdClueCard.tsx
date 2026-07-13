interface LowerThirdClueCardProps {
  text: string;
}

export function LowerThirdClueCard({ text }: LowerThirdClueCardProps) {
  return (
    <aside className="hidden-frame-lower-third" aria-label="Lower third clue preview">
      <span>Lower third</span>
      <strong>{text}</strong>
    </aside>
  );
}
