import type { HiddenFrameExpansionPoint } from '../data/hiddenFrameExpansionManifest';

interface ExpansionChecklistProps {
  points: HiddenFrameExpansionPoint[];
}

export function ExpansionChecklist({ points }: ExpansionChecklistProps) {
  return (
    <div className="hidden-frame-expansion-grid" aria-label="Hidden Frame expansion points">
      {points.map((point) => (
        <article className="hidden-frame-expansion-card" key={point.id}>
          <p className="hidden-frame-kicker">{point.ownerArea}</p>
          <h2>{point.label}</h2>
          <p>{point.description}</p>
          <p className="hidden-frame-expansion-card__path">{point.extensionPath}</p>
          <p>{point.safetyNote}</p>
        </article>
      ))}
    </div>
  );
}
