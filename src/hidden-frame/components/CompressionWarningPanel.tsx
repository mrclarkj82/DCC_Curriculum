import type { ReactNode } from 'react';
import type { HiddenFrameCompressionLogTone } from '../data/hiddenFrameCompressionLogs';
import { GlitchText } from './GlitchText';

interface CompressionWarningPanelProps {
  title: string;
  tone?: HiddenFrameCompressionLogTone;
  children: ReactNode;
}

export function CompressionWarningPanel({
  title,
  tone = 'warning',
  children,
}: CompressionWarningPanelProps) {
  return (
    <aside className={`hidden-frame-compression-warning hidden-frame-compression-warning--${tone}`}>
      <p className="hidden-frame-kicker">Compression event</p>
      <h2>
        <GlitchText>{title}</GlitchText>
      </h2>
      <div>{children}</div>
    </aside>
  );
}
