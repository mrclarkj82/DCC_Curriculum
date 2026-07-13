import { hiddenFrameAchievements } from '../data/hiddenFrameAchievements';
import { AchievementBadge } from './AchievementBadge';

interface AchievementGridProps {
  earnedAchievementIds: string[];
}

export function AchievementGrid({ earnedAchievementIds }: AchievementGridProps) {
  return (
    <div className="hidden-frame-achievement-grid" aria-label="Recovered signal badges">
      {hiddenFrameAchievements.map((achievement) => (
        <AchievementBadge
          achievement={achievement}
          isEarned={earnedAchievementIds.includes(achievement.id)}
          key={achievement.id}
        />
      ))}
    </div>
  );
}
