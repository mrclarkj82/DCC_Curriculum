import { Link } from 'react-router-dom';
import { hiddenFramePhase0Assets } from '../hiddenFramePhase0Assets';

export function Frame000Reveal() {
  return (
    <section className="hidden-frame-frame-000-reveal">
      <img
        src={hiddenFramePhase0Assets.ui.titleCard}
        alt="The Hidden Frame title card representing Frame 000"
      />
      <div>
        <p className="hidden-frame-kicker">Frame 000</p>
        <h1>Final Export</h1>
        <p>
          The first frame was never missing. It begins when a human choice enters the work: the
          angle, the cut, the material, the timing, the strange edge worth keeping.
        </p>
        <p>
          Tools render the image. Human decisions give it a reason to exist.
        </p>
        <div className="hidden-frame-actions">
          <Link className="hidden-frame-button" to="/hidden-frame/collection">
            View Final Collection
          </Link>
          <Link className="hidden-frame-secondary-link" to="/hidden-frame/archive">
            Return to Archive
          </Link>
        </div>
      </div>
    </section>
  );
}
