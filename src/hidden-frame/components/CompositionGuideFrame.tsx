import type { HiddenFrameCompositionPrinciple } from '../data/hiddenFrameCameraClues';

interface CompositionGuideFrameProps {
  imageLabel: string;
  principle: HiddenFrameCompositionPrinciple;
  thumbnail: string;
}

export function CompositionGuideFrame({
  imageLabel,
  principle,
  thumbnail,
}: CompositionGuideFrameProps) {
  return (
    <figure
      className={`hidden-frame-composition-frame hidden-frame-composition-frame--${principle}`}
    >
      <img src={thumbnail} alt="" aria-hidden="true" />
      <span className="hidden-frame-composition-frame__guide" aria-hidden="true" />
      <figcaption>{imageLabel}</figcaption>
    </figure>
  );
}
