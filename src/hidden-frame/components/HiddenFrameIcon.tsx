import { Link } from 'react-router-dom';
import { hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

export type HiddenFrameIconVariant = 'subtle' | 'visible' | 'glitch';
export type HiddenFrameIconSize = 'sm' | 'md' | 'lg';

interface HiddenFrameIconProps {
  destinationPath?: string;
  label?: string;
  variant?: HiddenFrameIconVariant;
  size?: HiddenFrameIconSize;
  className?: string;
}

export function HiddenFrameIcon({
  destinationPath = '/hidden-frame',
  label = 'Open hidden frame clue',
  variant = 'subtle',
  size = 'sm',
  className,
}: HiddenFrameIconProps) {
  const symbol =
    variant === 'glitch'
      ? hiddenFramePhase0Assets.symbols.glitch
      : hiddenFramePhase0Assets.symbols.smallSvg;
  const iconClassName = ['hidden-frame-icon', `hidden-frame-icon--${variant}`, `is-${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <Link className={iconClassName} to={destinationPath} aria-label={label} title={label}>
      <img src={symbol} alt="" aria-hidden="true" />
    </Link>
  );
}
