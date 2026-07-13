import { useState } from 'react';

interface HiddenFrameResetPanelProps {
  onReset: () => void;
}

export function HiddenFrameResetPanel({ onReset }: HiddenFrameResetPanelProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleReset = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    onReset();
    setIsConfirming(false);
  };

  return (
    <section className="hidden-frame-reset-panel" aria-labelledby="hidden-frame-reset-title">
      <div>
        <p className="hidden-frame-kicker">Local progress</p>
        <h2 id="hidden-frame-reset-title">Reset this device</h2>
        <p>
          This only clears Hidden Frame progress stored in this browser. It does not affect grades,
          class records, submissions, or anyone else.
        </p>
      </div>
      <div className="hidden-frame-reset-panel__actions">
        <button className="hidden-frame-secondary-link" type="button" onClick={handleReset}>
          {isConfirming ? 'Confirm reset' : 'Reset local progress'}
        </button>
        {isConfirming && (
          <button
            className="hidden-frame-secondary-link"
            type="button"
            onClick={() => setIsConfirming(false)}
          >
            Cancel
          </button>
        )}
      </div>
    </section>
  );
}
