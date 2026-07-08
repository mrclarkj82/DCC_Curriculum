import { Link } from 'react-router-dom';
import { useAssignmentGameAccess } from '../../hooks/useAssignmentGameAccess';
import { assignmentGameTitle } from '../../services/assignmentGameAccessService';
import type { ActiveClassItem, ClassRecord, SubmissionTarget, UserProfile } from '../../types';
import { StatusBadge } from '../StatusBadge';

interface AssignmentGameEntryCardProps {
  classRecord: ClassRecord;
  activeItem: ActiveClassItem;
  target: SubmissionTarget;
  userProfile: UserProfile;
}

export function AssignmentGameEntryCard({
  activeItem,
  classRecord,
  target,
  userProfile,
}: AssignmentGameEntryCardProps) {
  const access = useAssignmentGameAccess(userProfile.uid, target.targetId, {
    activeItem,
    classRecord,
    target,
    userProfile,
  });
  const isUnlocked = access.allowed;

  return (
    <section className="card mission-panel neon-border assignment-game-entry-card">
      <div className="card-header">
        <div>
          <p className="retro-label">Assignment Game</p>
          <h2>{assignmentGameTitle}</h2>
        </div>
        <StatusBadge status={isUnlocked ? 'Unlocked' : 'Locked'} />
      </div>
      <p>
        {isUnlocked
          ? "Your completion unlock has been verified for today's mission."
          : "Finish the required assignment work for today's mission to unlock The Ember Gate."}
      </p>
      {!isUnlocked && access.missingRequirements?.length ? (
        <ul className="assignment-game-missing-list">
          {access.missingRequirements.map((requirement) => (
            <li key={requirement}>{requirement}</li>
          ))}
        </ul>
      ) : (
        <p className="muted">{access.reason}</p>
      )}
      <div className="hero-actions">
        {isUnlocked ? (
          <Link className="gradient-button" to="/student/game">
            Open The Ember Gate
          </Link>
        ) : (
          <Link className="outline-button" to="/today">
            Back to Required Work
          </Link>
        )}
      </div>
    </section>
  );
}
