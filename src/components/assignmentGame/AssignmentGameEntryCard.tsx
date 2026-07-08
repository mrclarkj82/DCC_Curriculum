import { Link } from 'react-router-dom';
import { useAssignmentGameAccess } from '../../hooks/useAssignmentGameAccess';
import type { ActiveClassItem, ClassRecord, SubmissionTarget, UserProfile } from '../../types';
import { StatusBadge } from '../StatusBadge';

interface AssignmentGameEntryCardProps {
  classRecord: ClassRecord | null;
  activeItem: ActiveClassItem | null;
  target: SubmissionTarget | null;
  userProfile: UserProfile | null;
}

export function AssignmentGameEntryCard({
  activeItem,
  classRecord,
  target,
  userProfile,
}: AssignmentGameEntryCardProps) {
  const access = useAssignmentGameAccess({
    activeItem,
    classRecord,
    studentId: userProfile?.uid ?? '',
    target,
    userProfile,
  });

  if (!userProfile || userProfile.role !== 'student') {
    return null;
  }

  return (
    <section className="card mission-panel neon-border assignment-game-entry-card">
      <div className="card-header">
        <div>
          <p className="retro-label">Assignment Game</p>
          <h2>Ember Gate</h2>
        </div>
        <StatusBadge status={access.canAccess ? 'Unlocked' : 'Locked'} />
      </div>
      <p>
        Complete the required evidence for {access.targetTitle} to unlock the first playable
        medieval action slice.
      </p>
      <p className="muted">{access.reason}</p>
      <div className="hero-actions">
        {access.canAccess ? (
          <Link className="gradient-button" to="/student/game">
            Play Ember Gate
          </Link>
        ) : (
          <Link className="outline-button" to={access.assignmentLink}>
            Finish Required Work
          </Link>
        )}
      </div>
    </section>
  );
}
