import { Link } from 'react-router-dom';

interface FinalExportPanelProps {
  canRevealFinalFrame: boolean;
  recoveredPrerequisiteCount: number;
  totalPrerequisiteCount: number;
}

export function FinalExportPanel({
  canRevealFinalFrame,
  recoveredPrerequisiteCount,
  totalPrerequisiteCount,
}: FinalExportPanelProps) {
  return (
    <section className="hidden-frame-final-export-panel">
      <p className="hidden-frame-kicker">Final export</p>
      <h2>{canRevealFinalFrame ? 'Export Ready' : 'Export Waiting'}</h2>
      <p>
        {canRevealFinalFrame
          ? 'The recovered frames are aligned. Frame 000 can now be opened.'
          : `${recoveredPrerequisiteCount}/${totalPrerequisiteCount} prerequisite frames recovered locally.`}
      </p>
      <div className="hidden-frame-actions">
        {canRevealFinalFrame ? (
          <Link className="hidden-frame-button" to="/hidden-frame/frame-000">
            Open Frame 000
          </Link>
        ) : (
          <Link className="hidden-frame-secondary-link" to="/hidden-frame/collection">
            View Collection
          </Link>
        )}
        <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
          Back to Archive
        </Link>
      </div>
    </section>
  );
}
