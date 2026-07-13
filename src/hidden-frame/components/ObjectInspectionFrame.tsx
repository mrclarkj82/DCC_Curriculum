import type { HiddenFrameObjectConcept } from '../data/hiddenFrameObjectClues';

interface ObjectInspectionFrameProps {
  concept: HiddenFrameObjectConcept;
  label: string;
  note: string;
  thumbnail: string;
}

export function ObjectInspectionFrame({
  concept,
  label,
  note,
  thumbnail,
}: ObjectInspectionFrameProps) {
  return (
    <figure className={`hidden-frame-object-inspection hidden-frame-object-inspection--${concept}`}>
      <img src={thumbnail} alt="" aria-hidden="true" />
      <span className="hidden-frame-object-inspection__model" aria-hidden="true" />
      <figcaption>
        <span>{label}</span>
        <strong>{note}</strong>
      </figcaption>
    </figure>
  );
}
