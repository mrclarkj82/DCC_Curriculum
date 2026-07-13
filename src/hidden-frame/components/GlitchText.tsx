interface GlitchTextProps {
  children: string;
}

export function GlitchText({ children }: GlitchTextProps) {
  return (
    <span className="hidden-frame-glitch-text" data-text={children}>
      {children}
    </span>
  );
}
