import type { HiddenFrameUnrealConcept } from '../data/hiddenFrameUnrealClues';

interface UnrealViewportReadoutProps {
  concept: HiddenFrameUnrealConcept;
  label: string;
  readout: string;
  thumbnail: string;
}

export function UnrealViewportReadout({
  concept,
  label,
  readout,
  thumbnail,
}: UnrealViewportReadoutProps) {
  return (
    <figure className={`hidden-frame-unreal-readout hidden-frame-unreal-readout--${concept}`}>
      <img src={thumbnail} alt="" aria-hidden="true" />
      <span className="hidden-frame-unreal-readout__reticle" aria-hidden="true" />
      <figcaption>
        <span>{label}</span>
        <strong>{readout}</strong>
      </figcaption>
    </figure>
  );
}
