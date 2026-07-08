import { Link } from 'react-router-dom';
import type {
  AssignmentGameProgressSnapshot,
  AssignmentGameSaveData,
} from '../../features/assignmentGame/types';
import type { AssignmentGameAccessResult } from '../../services/assignmentGameAccessService';
import { LoadingState } from '../LoadingState';
import { AssignmentGameExperience } from './AssignmentGameExperience';

interface AssignmentGameGateViewProps {
  access: AssignmentGameAccessResult;
  saveData: AssignmentGameSaveData | null;
  isSaveLoading: boolean;
  isSaving: boolean;
  saveMessage: string | null;
  saveError: string | null;
  onSave: (progress: AssignmentGameProgressSnapshot) => Promise<void>;
}

export function AssignmentGameGateView({
  access,
  isSaveLoading,
  isSaving,
  onSave,
  saveData,
  saveError,
  saveMessage,
}: AssignmentGameGateViewProps) {
  if (access.state === 'loading') {
    return <LoadingState label={access.reason} />;
  }

  if (!access.canAccess) {
    return (
      <section className="card mission-panel neon-border assignment-game-lock-panel">
        <p className="retro-label">
          {access.state === 'unavailable' ? 'Game Unavailable' : 'Game Locked'}
        </p>
        <h2>Finish the required work before entering Ember Gate</h2>
        <p>{access.reason}</p>
        <div className="hero-actions">
          <Link className="gradient-button" to={access.assignmentLink}>
            Open Required Work
          </Link>
          <Link className="outline-button" to="/today">
            Back to Today
          </Link>
        </div>
      </section>
    );
  }

  return (
    <AssignmentGameExperience
      backHref={access.assignmentLink}
      initialSave={saveData}
      isSaveLoading={isSaveLoading}
      isSaving={isSaving}
      saveMessage={saveMessage}
      saveError={saveError}
      onSave={onSave}
    />
  );
}
