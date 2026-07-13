import type { HiddenFrameCompressionLog } from '../data/hiddenFrameCompressionLogs';
import { GlitchText } from './GlitchText';
import { RedactedText } from './RedactedText';

interface CorruptedFileCardProps {
  log: HiddenFrameCompressionLog;
}

export function CorruptedFileCard({ log }: CorruptedFileCardProps) {
  return (
    <article className={`hidden-frame-corrupted-card hidden-frame-corrupted-card--${log.tone}`}>
      <div className="hidden-frame-corrupted-card__meta">
        <span>{log.timestampLabel}</span>
        <strong>{log.tone}</strong>
      </div>
      <div className="hidden-frame-corrupted-card__body">
        <h2>
          <GlitchText>{log.title}</GlitchText>
        </h2>
        <p>{log.summary}</p>
        <p>{log.visibleText}</p>
        {log.redactedTerms && (
          <p className="hidden-frame-corrupted-card__redactions">
            {log.redactedTerms.map((term) => (
              <RedactedText key={term} label={term} />
            ))}
          </p>
        )}
        <p className="hidden-frame-corrupted-card__prompt">{log.restoredPrompt}</p>
      </div>
    </article>
  );
}
